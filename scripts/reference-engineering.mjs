#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createPlan, loadRegistry, shortlist, validatePlan, validateRegistry } from '../lib/reference-engineering.mjs';

const [cmd, ...argv] = process.argv.slice(2);
const option = (name, defaultValue = '') => { const i=argv.indexOf(name); return i>=0 ? (argv[i+1]??'') : defaultValue; };
const words = (arg) => arg.split(',').map(s=>s.trim()).filter(Boolean);
function usage() {
  console.log(`Lazarus Reference Engineering v1\n\nCommands:\n  catalog\n  suggest --jobs show-chronology,coordinate-ui-state [--evidence verified-chronology]\n  init <path/to/reference-engineering-plan.json>\n  check <plan.json> [--stage decision|release] [--root /client/root] [--json]\n  registry-check\n\nNo operation modifies a client or GitHub project without explicit file writes.`);
}
function fail(s, code=2) { console.error(s); process.exitCode=code; }
try {
  const registry = loadRegistry();
  if (cmd === 'registry-check') {
    const errors=validateRegistry(registry);
    if(errors.length) fail(errors.join('\n'),1); else console.log(`PASS: ${registry.studies.length} studies and ${registry.mechanisms.length} mechanisms.`);
  } else if (cmd === 'catalog') {
    registry.mechanisms.forEach(m=>console.log(`${m.id.padEnd(29)} ${m.family.padEnd(12)} ${m.complexity.padEnd(6)} ${m.problem}`));
  } else if (cmd === 'suggest') {
    const jobs=words(option('--jobs')); const evidence=words(option('--evidence'));
    if(!jobs.length) fail('Set --jobs using one or more job tags; run catalog for patterns.');
    else {
      const candidates=shortlist(registry,{readerJobs:jobs,evidenceTags:evidence});
      if (!candidates.length) console.log('No task-matched mechanisms. Prefer simple semantic HTML.');
      for(const c of candidates){ console.log(`\n${c.id} [${c.readiness}] — ${c.matchedJobs.join(', ')}`); console.log(`  Problem: ${c.problem}`); console.log(`  Requires evidence: ${c.missingEvidence.join(', ')||'no additional tagged evidence'}`); console.log(`  Fallback: ${c.fallback}`); }
      console.log('\nShortlist only: no automatic art-direction selection. Maximum two per project.');
    }
  } else if (cmd === 'init') {
    const file=argv[0];
    if(!file || file.startsWith('--')) fail('Provide a target JSON filepath.');
    else if(fs.existsSync(file)) fail(`Refusing to overwrite ${file}`,1);
    else { fs.mkdirSync(path.dirname(path.resolve(file)),{recursive:true}); fs.writeFileSync(file,JSON.stringify(createPlan(),null,2)+'\n',{flag:'wx'}); console.log('Created '+file); }
  } else if (cmd === 'check') {
    const file=argv[0];
    if(!file || file.startsWith('--')) fail('Provide a plan JSON filepath.');
    else {
      const stage=option('--stage','decision');
      const root=option('--root') || (stage==='release' ? null : path.dirname(path.resolve(file)));
      const result=validatePlan(JSON.parse(fs.readFileSync(file,'utf8')),registry,{stage,root});
      if(argv.includes('--json')) console.log(JSON.stringify(result,null,2));
      else { console.log(`${result.complete?'COMPLETE':'INCOMPLETE'} (${stage})`); result.findings.forEach(f=>console.log(`  ${f.severity}: ${f.message}`)); }
      if(!result.complete) process.exitCode=1;
    }
  } else { usage(); if(cmd && cmd!=='help') process.exitCode=2; }
} catch(error) { fail(`Reference engineering error: ${error.message}`); }
