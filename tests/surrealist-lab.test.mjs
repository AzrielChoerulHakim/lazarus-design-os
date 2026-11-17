import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'../visual-lab/surrealist');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const js=fs.readFileSync(path.join(root,'app.js'),'utf8');
test('exactly two curated raster-only scenes',()=>{
 for(const name of ['threshold','monograph']){
  assert.match(html,new RegExp('id="tab-'+name+'"[^>]+role="tab"'));
  assert.match(html,new RegExp('id="panel-'+name+'"[^>]+role="tabpanel"'));
  assert.match(html,new RegExp('data-lazarus-section="'+name+'"'));
 }
 assert.equal((html.match(/<img\b/g)||[]).length,2);
 assert.equal((html.match(/role="tabpanel"/g)||[]).length,2);
 for(const asset of ['hero-master.webp','passage-master.webp'])assert.match(html,new RegExp(asset.replace('.','\\.')));
});
test('hard no-SVG, no visual stacking or artificial 3D policy',()=>{
 assert.doesNotMatch(html,/<svg\b|<canvas\b|<picture\b|<model-viewer\b|<iframe\b/i);
 assert.doesNotMatch(css,/data:image|image-set\(|url\(|background-image|mix-blend-mode|filter:\s*drop-shadow|clip-path|gradient\(/i);
 assert.doesNotMatch(css,/\.threshold__(orbital|scene|floating|veil)|\.monograph__(muse|chiaroscuro|sculptural)/i);
 assert.doesNotMatch(js,/pointermove|requestAnimationFrame|parallax|setProperty\(('|")--p/i);
 assert.match(css,/object-fit:contain/);
});
test('HTML ids unique and direct JavaScript references resolve',()=>{
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size);
 for(const m of js.matchAll(/getElementById\('([^']+)'\)/g))assert.ok(ids.includes(m[1]),'Missing '+m[1]);
 assert.doesNotThrow(()=>new vm.Script(js));
});
test('mobile layouts and motion safe',()=>{
 assert.match(css,/@media\(max-width:660px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(html,/STUDI KONSEP/);
 assert.doesNotMatch(html,/award-winning|1000\+|99%/i);
});
