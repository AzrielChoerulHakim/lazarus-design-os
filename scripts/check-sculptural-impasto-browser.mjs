import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { browserServer } from './browser-server.mjs';

const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'screenshots/sculptural-impasto');
fs.mkdirSync(out,{recursive:true});
const server=await browserServer(root);
const browser=await chromium.launch({headless:true,...(process.env.LAZARUS_CHROMIUM_PATH?{executablePath:process.env.LAZARUS_CHROMIUM_PATH}:{})});
const report={viewports:[],images:[],errors:[],limitation:'Screenshot automation can check crop/overflow and file presence; it cannot certify oil painting material or artistic quality. Staging assets may be low-resolution.'};
try{
 for(const [width,height] of [[320,900],[390,844],[640,900],[768,1024],[1024,768],[1440,900],[844,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<=390});
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(server.base)&&r.status()>=400)report.errors.push(r.status()+' '+r.url())});
  await page.goto(server.base+'/visual-lab/sculptural-impasto/',{waitUntil:'load'});
  for(const variant of ['gallery','folio','passage']){
   await page.locator('#tab-'+variant).click();
   const panel=page.locator('#panel-'+variant);
   assert.ok(await panel.isVisible(),variant+' hidden');
   const imgs=panel.locator('img.master-image');
   assert.equal(await imgs.count(),1,'More than one art image in '+variant);
   const img=imgs.first();
   await img.scrollIntoViewIfNeeded();
   await img.evaluate(async img=>{if(!img.complete)await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});await img.decode()});
   const geo=await img.evaluate(img=>{const r=img.getBoundingClientRect();return {naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,width:r.width,left:r.left,right:r.right}});
   assert.ok(geo.naturalWidth>=190&&geo.naturalHeight>=120,'Missing raster: '+variant);
   assert.ok(geo.left>=-2&&geo.right<=width+2,'Painting clipped: '+JSON.stringify(geo));
   assert.equal(await panel.locator('svg,canvas,picture').count(),0);
   const widthDiff=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(widthDiff<=2,variant+' horizontal overflow '+widthDiff+' @'+width);
   const words=await panel.locator('h2').innerText();
   assert.match(words,/When matter/i);
   await page.screenshot({path:path.join(out,variant+'-'+width+'x'+height+'.png'),fullPage:true});
   report.images.push({variant,width,sourcePixels:[geo.naturalWidth,geo.naturalHeight]});
  }
  await page.locator('#painting-select').selectOption('horizon');
  assert.ok((await page.locator('#panel-passage img').getAttribute('src')).endsWith('study-horizon.webp'));
  await page.locator('#tab-passage').press('Home');
  assert.equal(await page.locator('#tab-gallery').getAttribute('aria-selected'),'true');
  await page.locator('#tab-gallery').press('ArrowLeft');
  assert.equal(await page.locator('#tab-passage').getAttribute('aria-selected'),'true');
  const desktopMeasure=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth}));
  report.viewports.push({width,height,layoutChecks:3,status:'geometry and interactions passed',...desktopMeasure});
  await page.close();
 }
 assert.deepEqual(report.errors,[]);
}finally{
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
 await browser.close();server.close();
}
console.log('PASS: three isolated compositions; painter selection; 7 viewport image, interaction and overflow checks');