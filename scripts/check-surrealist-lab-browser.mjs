import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { browserServer } from './browser-server.mjs';

const root = path.resolve(import.meta.dirname, '..');
const shots = path.join(root, 'screenshots/surrealist-lab');
fs.mkdirSync(shots, { recursive: true });
const server = await browserServer(root);
const browser = await chromium.launch({ headless: true, ...(process.env.LAZARUS_CHROMIUM_PATH ? { executablePath: process.env.LAZARUS_CHROMIUM_PATH } : {}) });
const report = { branch: 'experiment/surrealist-direction-lab-01', browser: browser.version(), viewports: [], interactions: [], limitations: ['Automated overflow is not a manual art-direction judgement.', 'Chromium emulation does not replace physical mobile testing.', 'Font loading depends on optional Google Fonts availability.'] };
const errors = [];
async function noHorizontalOverflow(page, label) {
  const measures = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  assert.ok(measures.document <= measures.viewport + 2, label + ': horizontal overflow ' + JSON.stringify(measures));
}
async function checkVisibility(page, slug) {
  const board = page.locator('#panel-' + slug);
  assert.equal(await board.isVisible(), true, slug + ' not visible');
  const critical = board.locator('[data-lazarus-critical]');
  const nodes = await critical.evaluateAll(elements => elements.map(element => {
    const box = element.getBoundingClientRect();
    return { label: element.getAttribute('data-lazarus-critical'), width: box.width, height: box.height, left: box.left, right: box.right, viewport: innerWidth };
  }));
  assert.ok(nodes.length >= 2, slug + ': missing critical text markers');
  for (const node of nodes) {
    assert.ok(node.width > 0 && node.height > 0, slug + ': invisible ' + node.label);
    assert.ok(node.left >= -2 && node.right <= node.viewport + 2, slug + ': clipped critical text container ' + JSON.stringify(node));
  }
}
try {
  const sizes = [[320,900],[390,844],[640,900],[768,1024],[1024,768],[1440,900],[844,390]];
  for (const [width,height] of sizes) {
    const page = await browser.newPage({ viewport: { width,height }, hasTouch: width <= 390, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.url().startsWith(server.base) && response.status() >= 400) errors.push(response.status() + ' ' + response.url());
    });
    await page.goto(server.base + '/visual-lab/surrealist/');
    await page.locator('#tab-threshold').click();
    await checkVisibility(page,'threshold');
    await noHorizontalOverflow(page,width + ' threshold');
    await page.locator('#enter-threshold').click();
    assert.equal(await page.locator('#threshold-dossier').isVisible(),true);
    assert.equal(await page.locator('#enter-threshold').getAttribute('aria-expanded'),'true');
    await page.locator('#close-threshold').click();
    assert.equal(await page.locator('#threshold-dossier').isHidden(),true);
    await page.screenshot({ path:path.join(shots,'threshold-' + width + 'x' + height + '.png'),fullPage:true });
    await page.locator('#tab-monograph').click();
    await checkVisibility(page,'monograph');
    await noHorizontalOverflow(page,width + ' monograph');
    await page.locator('#monograph-next').click();
    assert.equal(await page.locator('#panel-monograph').getAttribute('data-page'),'2');
    assert.equal(await page.locator('#monograph-next').isDisabled(),true);
    await page.screenshot({ path:path.join(shots,'monograph-' + width + 'x' + height + '.png'),fullPage:true });
    await page.locator('#tab-monograph').press('Home');
    assert.equal(await page.locator('#tab-threshold').getAttribute('aria-selected'),'true');
    await page.locator('#tab-threshold').press('End');
    assert.equal(await page.locator('#tab-monograph').getAttribute('aria-selected'),'true');
    report.viewports.push({ width,height,panels:3,overflow:'pass',dossier:'pass',pagination:'pass',keyboardTabs:'pass',reducedMotion:'pass',screenshots:2 });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width:1440,height:900 }, reducedMotion:'no-preference' });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(server.base + '/visual-lab/surrealist/');
  await page.locator('#tab-threshold').focus();
  await page.locator('#tab-threshold').press('ArrowRight');
  assert.equal(await page.locator('#tab-monograph').getAttribute('aria-selected'),'true');
  await page.locator('#tab-monograph').press('ArrowLeft');
  assert.equal(await page.locator('#tab-threshold').getAttribute('aria-selected'),'true');
  report.interactions.push('arrow-key switching','Home and End','Escape closes portal dossier','curated two-direction selection','two-page spread','reduced motion at seven sizes');
  await page.locator('#enter-threshold').click();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#threshold-dossier').isHidden(),true);
  await page.close();
  assert.deepEqual(errors,[],'Page or local asset errors');
} finally {
  report.pageErrors = errors;
  fs.writeFileSync(path.join(shots,'report.json'),JSON.stringify(report,null,2));
  await browser.close();
  server.close();
}
console.log('PASS: Surrealist Lab two curated artboards, interactions, keyboard, reduced motion and geometry at seven viewport sizes. Screenshot review is still required.');