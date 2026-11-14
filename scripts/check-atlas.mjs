import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root = path.resolve(import.meta.dirname, '..');
const errors = [];
function has(p) { return fs.existsSync(path.join(root, p)); }
const required = ['README.md','AGENTS.md','DESIGN.md','index.html','styles.css','app.js','data/atlas-data.js','docs/APPLE_CRAFT_STANDARD.md','docs/ANTI_GENERIC_AUDIT.md','docs/REFERENCE_ATLAS.md','docs/RESEARCH_EVIDENCE.md','docs/SKILL_REGISTRY.md','docs/SOURCE_POLICY.md','docs/WORKFLOW.md','templates/CLIENT_AGENT.md','.github/copilot-instructions.md'];
required.forEach(p => { if (!has(p)) errors.push('Missing: ' + p); });
let studies = [];
if (has('data/atlas-data.js')) {
  try {
    const ctx = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(root,'data/atlas-data.js'),'utf8'),ctx,{timeout:1500});
    studies = ctx.window.LAZARUS_STUDIES;
    if (!Array.isArray(studies) || studies.length !== 7) errors.push('Expected exactly seven studies');
    else {
      const seen = new Set();
      studies.forEach(s => {
        if (!s.id || seen.has(s.id)) errors.push('Duplicate/missing ID: ' + s.id);
        seen.add(s.id);
        for (const key of ['slug','title','subtitle','category','stack','mechanism','use','warning','method','source','note']) {
          if (!s[key] || typeof s[key] !== 'string') errors.push('Missing ' + key + ' in ' + s.id);
        }
        if (s.note && (!s.note.startsWith('docs/studies/') || s.note.includes('..') || !has(s.note))) errors.push('Missing/unsafe note: ' + s.note);
      });
    }
  } catch(e) { errors.push('Unable to parse catalogue: ' + e.message); }
}
if (has('index.html')) {
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  for(const asset of ['styles.css','app.js','data/atlas-data.js']) if(!html.includes(asset)) errors.push('index.html does not load ' + asset);
}
if (has('app.js')) {
  try { new vm.Script(fs.readFileSync(path.join(root,'app.js'),'utf8')); }
  catch(e) { errors.push('app.js syntax: ' + e.message); }
}
if(errors.length){ console.error('Lazarus Atlas verification FAILED\n' + errors.map(s=>' - '+s).join('\n')); process.exit(1); }
console.log('PASS: required files, seven distinct studies, note paths, catalogue shape and app.js syntax.');
