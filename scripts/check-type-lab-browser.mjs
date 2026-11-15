import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { browserServer } from './browser-server.mjs';

// A real-browser smoke test for the proofing tool, not a claim of WCAG conformance.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shotDir = path.join(root, 'screenshots', 'type-lab');
fs.mkdirSync(shotDir, { recursive: true });
const server = await browserServer(root);
const base = server.base;
const errors = [];
const browser = await chromium.launch({ headless: true, ...(process.env.LAZARUS_CHROMIUM_PATH ? { executablePath: process.env.LAZARUS_CHROMIUM_PATH } : {}) });
const report = [];
try {
  for (const width of [320,390,640,768,1024,1440]) {
    const page = await browser.newPage({ viewport:{width,height:900}, deviceScaleFactor:1 });
    page.on('pageerror',error => errors.push(width + ' page JS exception: ' + error.message));
    page.on('response',response => {
      if(response.url().startsWith(base) && response.status() >= 400) errors.push(width + ' missing local asset ' + response.url());
    });
    await page.goto(base + '/type-lab/',{waitUntil:'load'});
    const titles = await page.locator('[data-proof-title]').allTextContents();
    if (titles.length !== 3 || !titles.every(x => x === titles[0])) errors.push(width+' same-copy proof failed');
    const body = await page.locator('[data-proof-body]').allTextContents();
    if (body.length !== 3 || !body.every(x => x === body[0])) errors.push(width+' same-body proof failed');
    if ((await page.locator('.proof').count()) !== 3) errors.push(width+' missing three reading structures');
    await page.screenshot({path:path.join(shotDir,'type-lab-'+width+'.png'),fullPage:true});
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    if(overflow)errors.push(width+' horizontal document overflow');
    const rect = await page.locator('.proof-surface').first().boundingBox();
    report.push({width,visibleColumnWidth:rect?.width,overflow});
    // On mobile the proof specimens appear first and editing is an accessible disclosure.
    if(width<=760){
      if(await page.locator('#controls').isVisible()) errors.push(width+' mobile editor should start collapsed');
      await page.locator('#controls-toggle').click();
      if((await page.locator('#controls-toggle').getAttribute('aria-expanded'))!=='true') errors.push(width+' mobile editor disclosure state missing');
    }
    // One interaction path per viewport; text is treated as text, never HTML.
    await page.locator('#input-title').fill('Verified heading <script>not code</script>');
    const newTitles = await page.locator('[data-proof-title]').allTextContents();
    if (!newTitles.every(x => x === 'Verified heading <script>not code</script>')) errors.push(width+' title sync or safe text failed');
    await page.locator('[data-width="390"]').click();
    if ((await page.locator('[data-width="390"]').getAttribute('aria-pressed')) !== 'true') errors.push(width+' selected preview width state missing');
    const preview = await page.locator('.proof-surface').first().boundingBox();
    if(preview && preview.width > 392)errors.push(width+' preview exceeded selected 390px column');
    await page.locator('#body-size').evaluate(node => { node.value='20'; node.dispatchEvent(new Event('input',{bubbles:true})); });
    const font = await page.locator('.specimen p[data-proof-body]').first().evaluate(node => parseFloat(getComputedStyle(node).fontSize));
    if (Math.abs(font-20)>0.1)errors.push(width+' reading size control did not update: '+font);
    await page.locator('#line-measure').evaluate(node => { node.value='52'; node.dispatchEvent(new Event('input',{bubbles:true})); });
    if((await page.locator('#measure-output').textContent()) !== '52 ch') errors.push(width+' measure control failed');
    await page.locator('#proof-lang').selectOption('id');
    const langs=await page.locator('.specimen').evaluateAll(nodes=>nodes.map(node=>node.lang));
    if(!langs.every(x=>x==='id')) errors.push(width+' language metadata failed');
    await page.locator('#reset').click();
    if(!(await page.locator('#input-title').inputValue()).includes('Typography is information architecture')) errors.push(width+' reset failed');
    if((await page.locator('[data-width="1040"]').getAttribute('aria-pressed')) !== 'true') errors.push(width+' reset width state failed');
    if(width<=760){
      await page.locator('#controls-done').click();
      if((await page.locator('#controls-toggle').getAttribute('aria-expanded'))!=='false') errors.push(width+' mobile editor did not close');
      if(await page.locator('#controls').isVisible()) errors.push(width+' mobile editor should hide when done');
    }
    await page.close();
  }

  // The Design OS catalogue was typeset in this revision too: audit its actual viewport.
  for(const width of [320,390,640,768,1024,1440]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    page.on('pageerror',error=>errors.push('catalogue '+width+' JS exception: '+error.message));
    await page.goto(base+'/',{waitUntil:'load'});
    if(!(await page.locator('#page-title').isVisible())) errors.push('catalogue '+width+' missing heading');
    const mark=await page.locator('.monogram').evaluate(el=>({display:getComputedStyle(el).display,overflow:el.scrollWidth>el.clientWidth+1}));
    if(!['inline-flex','flex'].includes(mark.display) || mark.overflow) errors.push('catalogue '+width+' monogram glyph layout regression: '+JSON.stringify(mark));
    if((await page.locator('a[href="./type-lab/"]').count())<1) errors.push('catalogue '+width+' missing Type Lab link');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth > window.innerWidth + 2);
    if(overflow) errors.push('catalogue '+width+' horizontal document overflow');
    if([320,390,1440].includes(width)) await page.screenshot({path:path.join(shotDir,'catalogue-'+width+'.png'),fullPage:true});
    report.push({width,catalogueOverflow:overflow});
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
fs.writeFileSync(path.join(shotDir,'proofing-report.json'),JSON.stringify(report,null,2));
if (errors.length) { console.error('Type Lab browser verification FAILED\n' + errors.map(x=>' - '+x).join('\n')); process.exitCode = 1; }
else console.log('PASS: Type Lab 3 same-copy structures × 6 widths, controls and safe local text; Design OS catalogue × 6 widths; nine screenshots. This does NOT certify optical typography or WCAG.');
