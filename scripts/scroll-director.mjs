#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {createScrollPlan,loadScrollRegistry,shortlistScroll,validateScrollPlan,validateScrollRegistry} from '../lib/scroll-director.mjs';

const [action, ...args] = process.argv.slice(2);
const option = (key, fallback = '') => {const i=args.indexOf(key);return i >= 0 ? args[i+1] ?? '' : fallback};
const csv = v => String(v || '').split(',').map(x => x.trim()).filter(Boolean);
const fail = (message, status = 1) => {console.error(message);process.exitCode=status};
const help = () => console.log(`Lazarus Scroll Director — 15 systems, Node 22+\n\n  catalog\n  recommend --jobs explore-portfolio,compare-artifacts [--evidence licensed-media] [--role dominant|supporting]\n  init <path/to/scroll-plan.json>\n  check <path/to/scroll-plan.json> [--stage decision|release] [--root /client/root] [--reference-plan /client/reference-engineering-plan.json] [--json]\n  registry-check\n\nNo command changes the repository or deploys a website.`);
try {
  const registry = loadScrollRegistry();
  if (action === 'registry-check') {
    const errors = validateScrollRegistry(registry);
    if (errors.length) fail(errors.join('\n'));
    else console.log(`PASS: ${registry.systems.length} systems, ${registry.sources.length} sources, 5 categories.`);
  } else if (action === 'catalog') {
    for (const s of registry.systems) console.log(`${s.id.padEnd(30)} ${s.family.padEnd(15)} ${s.role.padEnd(11)} ${s.complexity}`);
  } else if (action === 'recommend') {
    const jobs = csv(option('--jobs'));
    const role = option('--role') || null;
    if (!jobs.length || (role !== null && !['dominant', 'supporting'].includes(role))) fail('Provide --jobs and optional --role dominant|supporting',2);
    else {
      const options = shortlistScroll(registry,{readerJobs:jobs,evidenceTags:csv(option('--evidence')),role});
      if (!options.length) console.log('No matching systems. Use normal document flow.');
      for (const item of options) console.log(`${item.id} [${item.role}/${item.complexity}] — ${item.matchedJobs.join(', ')}\n  Evidence needed: ${item.missingEvidence.join(', ') || 'none'}\n  Reject when: ${item.rejectWhen}`);
      console.log('\nCandidates only. The selected art direction and technical pattern need human decision.');
    }
  } else if (action === 'init') {
    const filename = args[0];
    if (!filename || filename.startsWith('--')) fail('Provide plan path',2);
    else if (fs.existsSync(filename)) fail(`Refusing overwrite: ${filename}`);
    else {fs.mkdirSync(path.dirname(path.resolve(filename)),{recursive:true});fs.writeFileSync(filename,JSON.stringify(createScrollPlan(),null,2)+'\n',{flag:'wx'});console.log('Created '+filename)}
  } else if (action === 'check') {
    const filename = args[0];
    if (!filename || filename.startsWith('--')) fail('Provide scroll plan path',2);
    else {
      const stage = option('--stage','decision');
      const referenceFile = option('--reference-plan');
      const referencePlan = referenceFile ? JSON.parse(fs.readFileSync(referenceFile,'utf8')) : null;
      const plan = JSON.parse(fs.readFileSync(filename,'utf8'));
      const report = validateScrollPlan(plan,registry,{stage,root:option('--root')||null,referencePlan});
      if (args.includes('--json')) console.log(JSON.stringify(report,null,2));
      else {console.log(`${report.complete?'COMPLETE':'INCOMPLETE'} ${stage} scroll plan`);for(const f of report.findings) console.log(`  ${f.severity}: ${f.message}`)}
      if (!report.complete) process.exitCode = 1;
    }
  } else {help();if (action && action!=='help') process.exitCode = 2}
} catch (err) {fail(`Scroll Director: ${err.message}`,2)}
