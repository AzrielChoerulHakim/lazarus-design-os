import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { browserServer } from './browser-server.mjs';
const root=path.resolve(import.meta.dirname,'..');
const shots=path.join(root,'screenshots/surrealist-lab');
fs.mkdirSync(shots,{recursive:true});
const server=await browserServer(root);
const browser=await chromium.launch({headless:true,...(process.env.LAZARUS_CHROMIUM_PATH?{executablePath:process.env.LAZARUS_CHROMIUM_PATH}:{})});
const report={viewports:[],notes:['One raster image per artboard, with no SVG or decorative stacks.','Automated geometry is not final art-direction approval.']};
const errors=[];
try {
 for(const [width,height] of [[320,900],[390,844],[640,900],[768,1024],[1024,768],[1440,900],[844,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<=390});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(server.base)&&r.status()>=400)errors.push(r.status()+' '+r.url())});
  await page.goto(server.base+'/visual-lab/surrealist/');
  for(const slug of ['threshold','monograph']){
    await page.locator('#tab-'+slug).click();
    assert.equal(await page.locator('#panel-'+slug).isVisible(),true);
    const img=page.locator('#panel-'+slug+' figure img');
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(image=>image.decode());
    const geometry=await img.evaluate(image=>{
      const rect=image.getBoundingClientRect();
      return {naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight,width:rect.width,left:rect.left,right:rect.right};
    });
    assert.ok(geometry.naturalWidth>=200,slug+' image not loaded');
    assert.ok(geometry.width>0&&geometry.left>=-2&&geometry.right<=width+2,slug+' image clipped: '+JSON.stringify(geometry));
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=2,slug+' horizontal overflow '+overflow);
    assert.equal(await page.locator('#panel-'+slug+' figure img').count(),1);
    assert.equal(await page.locator('#panel-'+slug+' svg').count(),0);
    await page.screenshot({path:path.join(shots,slug+'-'+width+'x'+height+'.png'),fullPage:true});
  }
  await page.locator('#tab-threshold').click();
  await page.locator('#enter-threshold').click();
  assert.equal(await page.locator('#threshold-dossier').isVisible(),true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#threshold-dossier').isHidden(),true);
  await page.locator('#tab-threshold').focus();
  await page.locator('#tab-threshold').press('ArrowRight');
  assert.equal(await page.locator('#tab-monograph').getAttribute('aria-selected'),'true');
  report.viewports.push({width,height,results:['two loaded rasters','no visual overlap','no horizontal overflow','accessible tabs and note']});
  await page.close();
 }
 assert.deepEqual(errors,[],'Browser asset/page errors');
}finally{
 report.errors=errors;fs.writeFileSync(path.join(shots,'report.json'),JSON.stringify(report,null,2));
 await browser.close();server.close();
}
console.log('PASS: both single-raster artboards, keyboard controls and seven viewports.');