#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createContract, validateContract, artifactPaths, safeRelativePath } from '../lib/design-contract.mjs';

const args = process.argv.slice(2);
const help = `Lazarus Design Gate (Node 22+)\n\n  node scripts/design-gate.mjs init /path/to/client/design-contract.json\n  node scripts/design-gate.mjs check /path/to/client/design-contract.json --stage brief|design|release [--root /client] [--commit FULL_SHA] [--json]\n\nArtifact paths are relative to --root (default: contract directory).\nBrief checks decisions; design adds type artifacts; release adds recorded QA.\nThis checks evidence completeness, not originality or WCAG conformance.`;
try {
  const command = args.shift();
  if (!command || command === '--help') { console.log(help); process.exit(0); }
  const file = args.shift();
  if (!file || file.startsWith('--')) throw new Error('Supply a contract file path.');
  if (command === 'init') {
    if (args.length) throw new Error('init accepts only a file path.');
    fs.writeFileSync(path.resolve(file), JSON.stringify(createContract(), null, 2) + '\n', { flag: 'wx' });
    console.log(`Created ${file}. Fill it with real client evidence; existing files are never overwritten.`);
    process.exit(0);
  }
  if (command !== 'check') throw new Error(`Unknown command: ${command}`);
  const options = { stage: 'brief', root: path.dirname(path.resolve(file)), json: false };
  const seen = new Set();
  while (args.length) {
    const option = args.shift();
    if (seen.has(option)) throw new Error(`Repeated option: ${option}`);
    seen.add(option);
    if (option === '--json') options.json = true;
    else if (['--stage', '--root', '--commit'].includes(option)) {
      const value = args.shift();
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${option}`);
      options[option.slice(2)] = value;
    } else throw new Error(`Unknown option: ${option}`);
  }
  if (!['brief', 'design', 'release'].includes(options.stage)) throw new Error('stage must be brief, design or release.');
  if (fs.statSync(file).size > 1024 * 1024) throw new Error('Contract exceeds 1 MiB. Link evidence instead of embedding it.');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const root = fs.realpathSync(options.root);
  let expectedCommit = options.commit;
  if (options.stage === 'release') {
    const gitAt = (directory, ...params) => execFileSync('git', ['-C', directory, ...params], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const repoRoot = fs.realpathSync(gitAt(root, 'rev-parse', '--show-toplevel'));
    const git = (...params) => gitAt(repoRoot, ...params);
    expectedCommit ||= git('rev-parse', 'HEAD');
    if (!/^[a-f\d]{40}$/i.test(expectedCommit)) throw new Error('--commit must be a full commit SHA.');
    if (git('rev-parse', `${expectedCommit}^{commit}`) !== expectedCommit) throw new Error('The reviewed commit is not available in this checkout.');
    // Evidence/report-only changes may follow capture; source changes invalidate it.
    const source = /\.(?:html?|css|[cm]?[jt]sx?|vue|svelte|astro|json|ya?ml|svg|png|jpe?g|webp|woff2?)$/i;
    // A report cannot exempt an application script from source provenance checks.
    const artifacts = new Set(artifactPaths(data, options.stage)
      .filter(p => /\.(?:png|jpe?g|webp|pdf|md|txt|log|json)$/i.test(p))
      .map(p => path.relative(repoRoot, path.resolve(root, p)).split(path.sep).join('/')));
    const changed = git('diff', '--name-only', expectedCommit).split('\n').filter(Boolean);
    const untracked = git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean);
    const contractRelative = path.relative(repoRoot, path.resolve(file)).split(path.sep).join('/');
    const dirty = [...changed, ...untracked].filter(p => source.test(p) && p !== contractRelative && !artifacts.has(p));
    if (dirty.length) throw new Error(`Source changed since the reviewed commit: ${dirty.join(', ')}. Commit the implementation and recapture QA.`);
  }
  const issues = validateContract(data, { stage: options.stage, expectedCommit });
  for (const entry of artifactPaths(data, options.stage)) {
    let valid = safeRelativePath(entry);
    try {
      if (valid) {
        const target = fs.realpathSync(path.join(root, entry));
        valid = target.startsWith(root + path.sep) && fs.statSync(target).isFile() && fs.statSync(target).size > 0;
      }
    } catch { valid = false; }
    if (!valid) issues.push({ level: 'blocker', code: 'artifact', field: entry, message: `Missing, empty or unsafe artifact: ${entry}` });
  }
  const blockers = issues.filter(i => i.level === 'blocker').length;
  const result = { stage: options.stage, status: blockers ? 'incomplete' : 'complete', scope: 'Evidence completeness only; no originality or accessibility certification.', issues };
  if (options.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`${blockers ? 'INCOMPLETE' : 'COMPLETE'}: ${options.stage} contract · ${blockers} blockers`);
    issues.forEach(i => console.log(`  ${i.level.toUpperCase()} ${i.code}: ${i.message}`));
    console.log(result.scope);
  }
  process.exitCode = blockers ? 1 : 0;
} catch (error) { console.error(`Design Gate: ${error.message}`); process.exitCode = 2; }
