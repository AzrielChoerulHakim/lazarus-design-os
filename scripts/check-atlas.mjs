import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root = path.resolve(import.meta.dirname, '..');
const errors = [];
function has(p) { return fs.existsSync(path.join(root, p)); }
const required = ['README.md','AGENTS.md','DESIGN.md','index.html','styles.css','app.js','data/atlas-data.js','docs/APPLE_CRAFT_STANDARD.md','docs/ANTI_GENERIC_AUDIT.md','docs/REFERENCE_ATLAS.md','docs/RESEARCH_EVIDENCE.md','docs/SKILL_REGISTRY.md','docs/SOURCE_POLICY.md','docs/WORKFLOW.md','docs/TYPOGRAPHY_SYSTEM.md','docs/TYPOGRAPHY_QA.md','templates/CLIENT_AGENT.md','templates/TYPE_SPEC.md','.github/copilot-instructions.md','.github/skills/lazarus-type-director/SKILL.md','type-lab/index.html','type-lab/type-lab.css','type-lab/type-lab.js','type-lab/README.md'];
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

/* Typography system integration: static source guards, not a substitute for browser QA. */
if (has('type-lab/index.html') && has('type-lab/type-lab.js') && has('type-lab/type-lab.css')) {
  const html = fs.readFileSync(path.join(root,'type-lab/index.html'),'utf8');
  const js = fs.readFileSync(path.join(root,'type-lab/type-lab.js'),'utf8');
  const css = fs.readFileSync(path.join(root,'type-lab/type-lab.css'),'utf8');
  for (const id of ['input-title','input-body','input-meta','body-size','line-measure','proof-lang','width-status','proofs']) {
    if (!html.includes('id="' + id + '"')) errors.push('Missing type-lab control: ' + id);
  }
  for (const attr of ['data-proof-title','data-proof-body','data-proof-meta']) {
    const matches = html.match(new RegExp(attr,'g')) || [];
    if (matches.length !== 3) errors.push('Type-lab requires 3 equal-source specimen fields: ' + attr);
  }
  for (const width of ['390','768','1040']) if (!html.includes('data-width="' + width + '"')) errors.push('Type-lab missing proof width ' + width);
  if (!html.includes('type-lab.css') || !html.includes('type-lab.js')) errors.push('Type-lab missing linked assets');
  if (!css.includes('@container proof') || !css.includes('prefers-reduced-motion')) errors.push('Type-lab missing container reflow/reduced motion');
  if (!js.includes('textContent') || /(?:fetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|navigator\.sendBeacon)/.test(js)) errors.push('Type-lab must use safe local-only text preview');
  try { new vm.Script(js); } catch(e) { errors.push('Type-lab JS syntax: ' + e.message); }
}
if (has('index.html') && !fs.readFileSync(path.join(root,'index.html'),'utf8').includes('./type-lab/')) errors.push('Catalogue does not link Typography Lab');
if (has('AGENTS.md') && !fs.readFileSync(path.join(root,'AGENTS.md'),'utf8').includes('TYPOGRAPHY_SYSTEM.md')) errors.push('Agent rules missing mandatory typography reading');
if (has('.github/skills/lazarus-anti-generic/SKILL.md') && fs.readFileSync(path.join(root,'.github/skills/lazarus-anti-generic/SKILL.md'),'utf8').includes('record the other two')) errors.push('Outdated three-option wording in anti-generic skill');

if(errors.length){ console.error('Lazarus Atlas verification FAILED\n' + errors.map(s=>' - '+s).join('\n')); process.exit(1); }
console.log('PASS: atlas data, catalogue assets and syntax, mandatory type docs/skill, local-only three-way Type Lab and integration guards. Browser typography QA still required.');
