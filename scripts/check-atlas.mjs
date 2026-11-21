import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { createContract } from '../lib/design-contract.mjs';
const root = path.resolve(import.meta.dirname, '..');
const errors = [];
function has(p) { return fs.existsSync(path.join(root, p)); }
const required = ['README.md','AGENTS.md','DESIGN.md','index.html','styles.css','app.js','data/atlas-data.js','docs/APPLE_CRAFT_STANDARD.md','docs/ANTI_GENERIC_AUDIT.md','docs/REFERENCE_ATLAS.md','docs/RESEARCH_EVIDENCE.md','docs/SKILL_REGISTRY.md','docs/SOURCE_POLICY.md','docs/WORKFLOW.md','docs/TYPOGRAPHY_SYSTEM.md','docs/TYPOGRAPHY_QA.md','templates/CLIENT_AGENT.md','templates/TYPE_SPEC.md','.github/copilot-instructions.md','.github/skills/lazarus-type-director/SKILL.md','type-lab/index.html','type-lab/type-lab.css','type-lab/type-lab.js','type-lab/README.md'];
required.push('docs/TONE_OF_VOICE_SYSTEM.md','docs/MOBILE_VISUAL_INTEGRITY.md','templates/TONE_OF_VOICE.md','templates/MOBILE_VISUAL_QA.md','scripts/mobile-visual-audit.mjs','tests/mobile-visual-audit.test.mjs','.github/skills/lazarus-voice-director/SKILL.md','.github/skills/lazarus-mobile-integrity/SKILL.md');
required.push('docs/ORIGINALITY_PROTOCOL.md','docs/DESIGN_CONTRACT.md','docs/V4_DESIGN_DECISIONS.md','docs/v4-type-specimens.html','templates/design-contract.json','direction-room/index.html','direction-room/room.css','direction-room/room.mjs','direction-room/example.mjs','lib/design-contract.mjs','scripts/design-gate.mjs','tests/design-contract.test.mjs','scripts/check-direction-room-browser.mjs');
required.push('docs/SCROLL_SYSTEMS.md','docs/scroll-systems/ADOPTION.md','docs/scroll-systems/IMPLEMENTATION_RECIPES.md','docs/scroll-systems/QA_MATRIX.md','docs/scroll-systems/SOURCES.md','data/scroll-systems.json','.github/skills/lazarus-scroll-director/SKILL.md','lib/scroll-director.mjs','scripts/scroll-director.mjs','templates/scroll-plan.json','tests/scroll-director.test.mjs','scroll-lab/index.html','scroll-lab/style.css','scroll-lab/app.js','scroll-lab/README.md');
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

for (const module of ['lib/scroll-director.mjs','scripts/scroll-director.mjs','scroll-lab/app.js','lib/design-contract.mjs','direction-room/room.mjs','direction-room/example.mjs','scripts/design-gate.mjs','scripts/browser-server.mjs','scripts/check-direction-room-browser.mjs']) {
  try { execFileSync(process.execPath, ['--check', path.join(root, module)], { stdio: 'pipe' }); }
  catch { errors.push('Missing or invalid module: ' + module); }
}
if (has('templates/design-contract.json')) {
  try { if (JSON.stringify(JSON.parse(fs.readFileSync(path.join(root,'templates/design-contract.json'),'utf8'))) !== JSON.stringify(createContract())) errors.push('Contract template differs from CLI defaults'); }
  catch { errors.push('Invalid contract template JSON'); }
}
if (has('direction-room/room.mjs')) {
  const js = fs.readFileSync(path.join(root,'direction-room/room.mjs'),'utf8');
  if (/(?:fetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|navigator\.sendBeacon|\.innerHTML\s*=)/.test(js)) errors.push('Direction Room must keep input local and render it as text');
}
if (has('index.html') && !fs.readFileSync(path.join(root,'index.html'),'utf8').includes('./direction-room/')) errors.push('Catalogue does not link Direction Room');

if(errors.length){ console.error('Lazarus Atlas verification FAILED\n' + errors.map(s=>' - '+s).join('\n')); process.exit(1); }
console.log('PASS: atlas, typography tools, Direction Room modules, contract template and integration guards. Browser and editorial QA still required.');
