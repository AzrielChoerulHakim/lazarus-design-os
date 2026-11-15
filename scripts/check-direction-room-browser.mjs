import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { browserServer } from './browser-server.mjs';
import { exampleContract } from '../direction-room/example.mjs';

const root = path.resolve(import.meta.dirname, '..');
const shots = path.join(root, 'screenshots/direction-room'); fs.mkdirSync(shots, { recursive: true });
const server = await browserServer(root);
const browser = await chromium.launch({ headless: true, ...(process.env.LAZARUS_CHROMIUM_PATH ? { executablePath: process.env.LAZARUS_CHROMIUM_PATH } : {}) });
const errors = [];
const report = { browser: browser.version(), viewports: [], interactions: [], limitations: ['Browser text doubling is a stress test, not native browser zoom.', 'Touch uses Chromium emulation, not a physical phone.', 'No independent perception study or full accessibility certification.'] };
const overflow = page => page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 2 }));
async function checkPage(page, label) {
  const result = await overflow(page);
  assert.equal(result.overflow, false, `${label} document overflows: ${JSON.stringify(result)}`);
  const clipped = await page.locator('button').evaluateAll(elements => elements.filter(el => el.checkVisibility() && (el.scrollWidth > el.clientWidth + 3 || el.scrollHeight > el.clientHeight + 3)).map(el => el.textContent));
  assert.deepEqual(clipped, [], `${label} clipped controls`);
}
try {
  for (const [width, height] of [[320, 900], [390, 844], [640, 900], [768, 1024], [1024, 768], [1440, 900], [844, 390]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width <= 390 });
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(server.base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(server.base + '/direction-room/');
    await page.locator('#load-example').click();
    assert.match(await page.locator('#review-summary').innerText(), /Brief tercatat/);
    for (const panel of ['brief', 'concepts', 'selection']) {
      await page.locator(`[data-panel="${panel}"]`).click();
      await checkPage(page, `${width} ${panel}`);
    }
    await page.locator('[data-panel="concepts"]').click();
    await page.locator('[role="tab"]').first().press('ArrowRight');
    assert.equal(await page.locator('#concept-tab-1').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#concept-name').inputValue(), 'Antrean audit');
    await page.locator('#concept-tab-1').press('End');
    assert.equal(await page.locator('#concept-tab-6').getAttribute('aria-selected'), 'true');
    await page.locator('#concept-tab-6').press('Home');
    await page.locator('summary').click();
    assert.equal(await page.locator('#concept-matrix tr').count(), 7);
    await checkPage(page, `${width} matrix`);
    await page.screenshot({ path: path.join(shots, `concepts-${width}.png`), fullPage: true });
    await page.locator('[data-panel="brief"]').click();
    await page.locator('#project-name').fill('Pengarsipan Putusan & Pengetahuan Multibahasa <img src=x onerror=alert(1)>');
    assert.match(await page.locator('#project-label').innerText(), /<img src=x/);
    assert.equal(await page.locator('#project-label img').count(), 0);
    await checkPage(page, `${width} long text`);
    await page.locator('#project-name').fill('Direction Room — contoh repository');
    await page.screenshot({ path: path.join(shots, `brief-${width}.png`), fullPage: true });
    await page.addStyleTag({ content: '* {line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}' });
    for (const panel of ['brief', 'concepts', 'selection']) { await page.locator(`[data-panel="${panel}"]`).click(); await checkPage(page, `${width} spacing ${panel}`); }
    report.viewports.push({ width, height, panels: 3, overflow: false, spacingOverride: 'pass', longContent: 'pass', reducedMotion: 'pass' });
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(server.base + '/direction-room/');
  await page.locator('#load-example').tap();
  await page.locator('#project-name').fill('Round trip <script>window.bad = true</script>');
  const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#export-project').click()]);
  const exported = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
  assert.equal(exported.project.name, 'Round trip <script>window.bad = true</script>');
  assert.equal(exported.concepts.length, 7);
  await page.locator('#new-project').click();
  assert.equal(await page.locator('#project-name').inputValue(), '');
  exported.qa.environment = 'Preserved QA from import'; exported.typography.fontRights = 'Preserved rights record';
  await page.locator('#import-file').setInputFiles({ name: 'round-trip.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(exported)) });
  await page.waitForFunction(() => document.querySelector('#notice').textContent.startsWith('Dibuka:'));
  assert.equal(await page.locator('#project-name').inputValue(), exported.project.name);
  const [second] = await Promise.all([page.waitForEvent('download'), page.locator('#export-project').click()]);
  const roundTrip = JSON.parse(fs.readFileSync(await second.path(), 'utf8'));
  assert.deepEqual(roundTrip, exported);
  await page.locator('#import-file').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{invalid') });
  await page.waitForFunction(() => document.querySelector('#notice').textContent.startsWith('File tidak dibuka:'));
  assert.match(await page.locator('#notice').innerText(), /File tidak dibuka/);
  assert.equal(await page.locator('#project-name').inputValue(), exported.project.name);
  await page.locator('#import-file').setInputFiles({ name: 'wrong-shape.json', mimeType: 'application/json', buffer: Buffer.from('{"schemaVersion":99}') });
  await page.waitForFunction(() => document.querySelector('#notice').textContent.includes('schemaVersion'));
  assert.match(await page.locator('#notice').innerText(), /File tidak dibuka/);
  assert.equal(await page.locator('#project-name').inputValue(), exported.project.name);
  await page.locator('#project-name').fill('Keep unsaved work');
  page.once('dialog', dialog => dialog.dismiss());
  await page.locator('#load-example').click();
  assert.equal(await page.locator('#project-name').inputValue(), 'Keep unsaved work');
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#load-example').click();
  assert.match(await page.locator('#project-name').inputValue(), /contoh repository/);
  await page.locator('#add-fact').click();
  assert.equal(await page.locator('#fact-2-claim').isVisible(), true);
  await page.getByRole('button', { name: 'Hapus bukti F3', exact: true }).click();
  assert.equal(await page.locator('#fact-2-claim').count(), 0);
  await page.locator('[data-panel="selection"]').click();
  await page.locator('#add-decision').click();
  assert.equal(await page.locator('#decisions .entry').count(), 2);
  await page.getByRole('button', { name: 'Hapus Keputusan 2', exact: true }).click();
  assert.equal(await page.locator('#decisions .entry').count(), 1);
  await page.locator('#selection-concept').selectOption('D');
  assert.match(await page.locator('#chosen-label').innerText(), /D · Matriks/);
  await page.locator('#export-project').click(); // clear dirty state before reload
  await page.reload();
  assert.equal(await page.locator('#project-name').inputValue(), '');
  report.interactions.push('touch edit', 'seven tab keyboard navigation', 'selection', 'add/remove rows', 'safe literal text', 'lossless JSON round trip', 'invalid import preserves work', 'unsaved replacement cancellation', 'no hidden persistence');

  await page.locator('#load-example').click();
  const originalBody = await page.locator('body').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  await page.evaluate(() => {
    const samples = [...document.querySelectorAll('body,body *')].map(el => [el, parseFloat(getComputedStyle(el).fontSize)]);
    for (const [el, size] of samples) el.style.fontSize = `${size * 2}px`;
  });
  assert.equal(await page.locator('body').evaluate(el => parseFloat(getComputedStyle(el).fontSize)), originalBody * 2);
  await checkPage(page, '200% synthetic text enlargement');
  await page.screenshot({ path: path.join(shots, 'text-200.png'), fullPage: true });
  report.interactions.push('200% synthetic text enlargement, brief panel');
  await page.close();
  assert.deepEqual(errors, [], 'Browser runtime and local asset errors');
} finally {
  fs.writeFileSync(path.join(shots, 'report.json'), JSON.stringify(report, null, 2));
  await browser.close(); server.close();
}
console.log('PASS: Direction Room at 7 viewports, 3 panels, spacing/long-text checks, keyboard/touch, safe rendering, JSON round trip and state preservation. See report for limits.');
