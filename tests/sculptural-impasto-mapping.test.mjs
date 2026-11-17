import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const lab=path.join(root,'visual-lab/sculptural-impasto');
const docs=path.join(root,'visual-directions/01-sculptural-impasto');
const read=(base,file)=>fs.readFileSync(path.join(base,file),'utf8');
const html=read(lab,'index.html'),css=read(lab,'styles.css'),js=read(lab,'app.js');
const map=JSON.parse(read(docs,'mapping-data.json'));
test('three genuinely separated layout DOMs and real content controls',()=>{
 for(const name of ['gallery','folio','passage']){
  assert.match(html,new RegExp('id="tab-'+name+'"[^>]+role="tab"'));
  assert.match(html,new RegExp('id="panel-'+name+'"[^>]+role="tabpanel"'));
  assert.match(html,new RegExp('data-lazarus-section="'+name+'"'));
  assert.match(css,new RegExp('\\.study-'+name+'\\{'));
 }
 assert.equal((html.match(/role="tabpanel"/g)||[]).length,3);
 assert.equal((html.match(/<img\b/g)||[]).length,3);
 assert.match(html,/id="painting-select"/);
 assert.equal((html.match(/When matter/g)||[]).length,3);
 assert.equal((html.match(/Atelier Sera is a fictional/g)||[]).length,3);
});
test('hard no composited artwork, SVG, fake lighting or parallax',()=>{
 assert.doesNotMatch(html,/<svg\b|<canvas\b|<picture\b|<model-viewer\b/i);
 assert.doesNotMatch(css,/background-image|image-set\(|data:image|url\(|gradient\(|mix-blend-mode|clip-path|drop-shadow|filter\s*:/i);
 assert.doesNotMatch(js,/pointermove|requestAnimationFrame|setProperty\(|createElement\(['"]canvas/i);
 for(const name of ['gallery','folio','passage'])assert.match(html,new RegExp('data-art="'+name+'"'));
});
test('HTML ids are unique, DOM element references exist, Javascript valid',()=>{
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size);
 for(const match of js.matchAll(/getElementById\('([^']+)'\)/g))assert.ok(ids.includes(match[1]),'Missing '+match[1]);
 assert.doesNotThrow(()=>new vm.Script(js));
});
test('formal mapping data preserves OS independence and image invariants',()=>{
 assert.equal(map.schemaVersion,1);
 assert.equal(map.studies.length,3);
 assert.equal(map.globalInvariant.sceneAsset,'one-complete-raster');
 assert.equal(map.globalInvariant.artisticSvg,false);
 assert.equal(map.globalInvariant.layeredMedia,false);
 assert.equal(map.globalInvariant.toneOfVoiceIndependent,true);
 assert.equal(map.globalInvariant.mandatoryCoreWorkflowUnchanged,true);
 for(const s of map.studies){
  assert.ok(s.originalSize[0]>0 && s.originalSize[1]>0);
  assert.ok(s.contradiction.length>=20);
  assert.ok(s.mobile.includes('image') || s.mobile.includes('painting'));
 }
});
test('responsive accessibility and source-truth copy are explicit',()=>{
 for(const w of [1080,840,640,380])assert.ok(css.includes('@media(max-width:'+w+'px)'));
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(html,/konten fiktif/);
 assert.doesNotMatch(html,/award-winning|satisfied clients|1000\+/i);
});
test('all six documentation texts exist without new contract version',()=>{
 for(const file of ['VISUAL_DNA.md','COMPOSITION_MAPPING.md','LIGHTING_DEPTH_MAP.md','SECTION_GRAMMAR.md','RESPONSIVE_MAPPING.md','VISUAL_QA.md']){
  assert.ok(fs.statSync(path.join(docs,file)).size>=1200,file+' incomplete');
 }
});