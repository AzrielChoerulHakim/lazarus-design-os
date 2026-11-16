#!/usr/bin/env node
// Optional Playwright probe: observed geometry + screenshots, never aesthetic approval.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
if (!argv.length || argv.includes('--help')) {
  console.log('Usage: node scripts/mobile-visual-audit.mjs <http(s)://site|file:///page> [--output directory]');
  console.log('Mark reading content data-lazarus-critical and decorative objects data-lazarus-decoration.');
  process.exit(argv.length ? 0 : 2);
}
const target = argv.shift();
let out = 'screenshots/mobile-visual-audit';
while (argv.length) {
  const opt = argv.shift();
  if (opt !== '--output' || !argv.length) throw new Error('Only --output directory is supported.');
  out = argv.shift();
}
const url = /^https?:\/\/|^file:\/\//i.test(target) ? target : pathToFileURL(path.resolve(target)).href;
fs.mkdirSync(out, { recursive: true });
let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.error('Install Playwright and Chromium first: npm install --no-save playwright && npx playwright install chromium'); process.exit(2); }

const targets = [{ width: 320, height: 700 }, { width: 390, height: 844 }, { width: 640, height: 900 }, { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }, { width: 844, height: 390, short: true }];
const browser = await chromium.launch({ headless: true });
const report = { url, generatedAt: new Date().toISOString(), scope: 'Geometry hints and screenshots; manual visual inspection of every section is still mandatory.', viewports: [], errors: [] };
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const viewport of targets) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
    const observed = await page.evaluate(() => {
      const rect = element => { const r = element.getBoundingClientRect(); return { x: r.left, y: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
      const isVisible = element => {
        const s = getComputedStyle(element), r = element.getBoundingClientRect();
        return s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity) > 0 && r.width > 0 && r.height > 0;
      };
      const critical = [...document.querySelectorAll('[data-lazarus-critical]')].filter(isVisible);
      const decorations = [...document.querySelectorAll('[data-lazarus-decoration]')].filter(isVisible);
      const name = (element, index) => element.getAttribute('data-lazarus-critical') || element.getAttribute('data-lazarus-decoration') || element.id || element.tagName.toLowerCase() + ':' + index;
      const collisions = [];
      critical.forEach((c, i) => decorations.forEach((d, j) => {
        if (c.contains(d) || d.contains(c)) return;
        const a = rect(c), b = rect(d);
        const area = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
        if (area > 0 && area / Math.max(1, a.width * a.height) > 0.03)
          collisions.push({ critical: name(c, i), decoration: name(d, j), coveredRatio: +(area / (a.width * a.height)).toFixed(3) });
      }));
      const clipped = critical.filter(e => e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2).map((e, i) => ({ element: name(e, i), scrollWidth: e.scrollWidth, clientWidth: e.clientWidth, scrollHeight: e.scrollHeight, clientHeight: e.clientHeight }));
      const sections = [...document.querySelectorAll('[data-lazarus-section]')].map((e, i) => ({ selector: '[data-lazarus-section]', index: i, name: e.getAttribute('data-lazarus-section') || e.id || 'section-' + i }));
      return {
        width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
        criticalCount: critical.length, decorationCount: decorations.length,
        collisions, clipped, sections
      };
    });
    const label = viewport.short ? 'short-844x390' : String(viewport.width);
    const screenshot = path.join(out, label + '.png');
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled' });
    const sectionShots = [];
    if ([320, 390].includes(viewport.width) && !viewport.short) {
      const sectionList = page.locator('[data-lazarus-section]');
      for (let i = 0; i < await sectionList.count(); i++) {
        const item = sectionList.nth(i);
        const name = (await item.getAttribute('data-lazarus-section') || String(i)).replace(/[^a-z0-9_-]+/gi, '-').slice(0, 60);
        const imagePath = path.join(out, label + '-section-' + i + '-' + name + '.png');
        await item.screenshot({ path: imagePath, animations: 'disabled', timeout: 15000 });
        sectionShots.push({ section: name, path: imagePath });
      }
    }
    const errors = [...(observed.horizontalOverflow ? ['Document wider than viewport'] : []), ...observed.collisions.map(c => 'Decorative overlap: ' + c.critical + '/' + c.decoration), ...observed.clipped.map(c => 'Potential clipping: ' + c.element)];
    if (errors.length) report.errors.push({ viewport: label, errors });
    report.viewports.push({ ...viewport, screenshot, sectionShots, ...observed, status: errors.length ? 'needs-fix' : 'manual-review-required' });
  }
} finally { await browser.close(); }
const reportFile = path.join(out, 'audit-report.json');
fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ report: reportFile, viewportCount: report.viewports.length, flaggedViewports: report.errors.length, manualReviewRequired: true }, null, 2));
process.exitCode = report.errors.length ? 1 : 0;
