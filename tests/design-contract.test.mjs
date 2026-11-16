import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import { createContract, validateContract, shapeErrors, safeRelativePath, VIEWPORTS, CHECKS, REVIEWS, VOICE_TONES, MOBILE_REVIEW_WIDTHS } from '../lib/design-contract.mjs';
import { exampleContract } from '../direction-room/example.mjs';

const blocks = (data, stage = 'brief', extra = {}) => validateContract(data, { stage, ...extra }).filter(i => i.level === 'blocker');
const codes = rows => rows.map(r => r.code);
function design() {
  const data = exampleContract();
  data.typography = { spec: 'proof/type.md', contentSource: 'Client supplied copy', specimens: ['A', 'B', 'C'].map(id => ({ id, path: `proof/${id}.html`, content: 'Same verified copy.' })), chosenId: 'C', reason: 'Reading task fits.', fontRights: 'System font; no distributed binary.', fallback: 'sans-serif' };
  data.voice.spec = 'proof/voice.md';
  data.mobile.spec = 'proof/mobile.md';
  return data;
}
function release(commit = 'a'.repeat(40)) {
  const data = design();
  data.qa = { commit, environment: 'Temporary automated test fixture — not client QA', mobileInspections: data.mobile.sections.flatMap(section => MOBILE_REVIEW_WIDTHS.map(width => ({ section, width, path: `proof/${section}-${width}.png`, status: 'pass', notes: 'Fixture only; not genuine visual QA.' }))), screenshots: [...VIEWPORTS.map(width => ({ width, height: 900, path: `proof/${width}.png` })), { width: 844, height: 390, path: 'proof/short.png' }], checks: CHECKS.map(id => ({ id, status: 'pass', evidence: 'proof/test-report.txt', notes: 'Fixture only.' })), reviews: REVIEWS.map(id => ({ id, status: 'pass', evidence: 'proof/test-report.txt', notes: 'Fixture only.' })), independentReview: { status: 'not-tested', notes: '' } };
  return data;
}
test('blank and malformed records never pass or throw', () => {
  assert.ok(blocks(createContract()).length);
  for (const value of [null, [], {}, 12, 'hello', { ...exampleContract(), concepts: [null] }, { ...exampleContract(), typography: { specimens: null } }]) {
    assert.ok(shapeErrors(value).length);
    assert.ok(blocks(value).length);
  }
});
test('complete brief remains distinct from design and release readiness', () => {
  assert.equal(blocks(exampleContract()).length, 0);
  assert.ok(blocks(exampleContract(), 'design').length);
  assert.ok(validateContract(exampleContract()).some(i => i.code === 'comparison-unavailable'));
});
test('a source label alone cannot verify an uncertain fact', () => {
  const data = exampleContract(); data.facts[1].status = 'uncertain';
  assert.ok(codes(blocks(data)).includes('evidence'));
  data.facts[1].status = 'verified'; data.facts[1].source = '';
  assert.ok(codes(blocks(data)).includes('evidence'));
});
test('renaming concepts and changing punctuation cannot hide duplicate structures', () => {
  const data = exampleContract(); const a = data.concepts[0];
  data.concepts[1] = { ...structuredClone(a), id: 'B', name: 'New palette', contentOrder: a.contentOrder.map(s => s.toUpperCase() + '!'), readingGrammar: a.readingGrammar.toUpperCase(), interaction: a.interaction + '!!!' };
  assert.ok(codes(blocks(data)).includes('duplicate-structure'));
});
test('matching a prior project produces a review warning, not an originality verdict', () => {
  const data = exampleContract(); data.comparison.projects.push({ ...data.concepts[0], name: 'Prior site' });
  assert.equal(blocks(data).length, 0);
  assert.ok(validateContract(data).some(i => i.code === 'prior-match' && i.level === 'review'));
});
test('duplicate IDs and nonexistent selections are blocked', () => {
  const data = exampleContract(); data.facts.push({ ...data.facts[0] }); data.selection.conceptId = 'Z';
  assert.ok(codes(blocks(data)).includes('duplicate-id')); assert.ok(codes(blocks(data)).includes('selection'));
});
test('new contracts include traceable voice and mobile plan without inventing a universal style', () => {
  const data = createContract();
  assert.equal(data.voice.approval, 'editorial-draft');
  assert.deepEqual(data.mobile.sections, []);
  assert.ok(VOICE_TONES.includes('professional-conversational'));
  assert.deepEqual(MOBILE_REVIEW_WIDTHS, [320, 390]);
  assert.ok(codes(blocks(data)).includes('voice-evidence'));
  assert.ok(codes(blocks(data)).includes('mobile-sections'));
});
test('older contracts get actionable missing-system blockers, not runtime exceptions', () => {
  const data = exampleContract();
  delete data.voice;
  delete data.mobile;
  assert.deepEqual(codes(blocks(data)).filter(c => c.endsWith('-missing')), ['voice-missing', 'mobile-missing']);
  assert.ok(blocks(data, 'design').length);
});
test('voice decisions must be grounded and explicit; draft approval stays a warning', () => {
  const data = design();
  assert.equal(blocks(data, 'design').length, 0);
  data.voice.tone = 'loud-corporate';
  data.voice.evidenceIds = ['unknown'];
  data.voice.samples = data.voice.samples.filter(s => s.id !== 'action');
  for (const code of ['voice-tone', 'evidence', 'voice-sample']) assert.ok(codes(blocks(data, 'design')).includes(code));
  const releaseData = release();
  assert.ok(validateContract(releaseData, { stage: 'release' }).some(i => i.code === 'voice-not-approved' && i.level === 'review'));
});
test('mobile release requires section-by-section screenshot inspections at 320 and 390, not a single hero shot', () => {
  const data = release();
  assert.equal(blocks(data, 'release').length, 0);
  data.qa.mobileInspections = data.qa.mobileInspections.filter(r => !(r.section === 'export' && r.width === 390));
  assert.ok(codes(blocks(data, 'release')).includes('mobile-unchecked'));
  data.qa.mobileInspections[0].status = 'fail';
  assert.ok(codes(blocks(data, 'release')).includes('mobile-fail'));
  data.qa.mobileInspections.push({ ...data.qa.mobileInspections[1] });
  assert.ok(codes(blocks(data, 'release')).includes('mobile-duplicate'));
});
test('mobile inspection evidence is included in artifact validation', () => {
  const data = release();
  assert.ok(data.qa.mobileInspections.every(r => r.path.startsWith('proof/')));
  assert.ok(data.qa.mobileInspections.every(r => r.status === 'pass'));
  assert.ok(data.qa.mobileInspections.length === data.mobile.sections.length * MOBILE_REVIEW_WIDTHS.length);
});
test('type gate requires equal copy and a real chosen specimen', () => {
  const data = design(); assert.equal(blocks(data, 'design').length, 0);
  data.typography.specimens[2].content = 'Different copy'; data.typography.chosenId = 'Z';
  assert.ok(codes(blocks(data, 'design')).includes('same-copy'));
  assert.ok(codes(blocks(data, 'design')).includes('type-selection'));
});
test('release checks commit, viewport coverage and observed states independently', () => {
  const data = release(); assert.equal(blocks(data, 'release').length, 0);
  assert.ok(codes(blocks(data, 'release', { expectedCommit: 'b'.repeat(40) })).includes('stale-commit'));
  data.qa.screenshots = data.qa.screenshots.filter(s => s.width !== 640 && s.height !== 390);
  data.qa.checks.find(r => r.id === 'keyboard').status = 'not-tested';
  const result = codes(blocks(data, 'release'));
  for (const code of ['viewport', 'short-viewport', 'unchecked']) assert.ok(result.includes(code));
});
test('only irrelevant product states can be marked not applicable', () => {
  const data = release(); data.qa.checks.find(r => r.id === 'loading-empty-error').status = 'not-applicable';
  assert.equal(blocks(data, 'release').length, 0);
  data.qa.checks.find(r => r.id === 'contrast').status = 'not-applicable';
  assert.ok(codes(blocks(data, 'release')).includes('unchecked'));
});
test('extra failed/unknown checks cannot hide behind required passes', () => {
  const data = release(); data.qa.checks.push({ id: 'extra', status: 'fail', evidence: '', notes: 'Failure' });
  assert.ok(codes(blocks(data, 'release')).includes('failed-check'));
  assert.ok(codes(blocks(data, 'release')).includes('unknown-check'));
});
test('safe artifact paths reject traversal, absolute paths, URLs and Windows paths', () => {
  for (const p of ['../a', 'a/../../b', '/etc/passwd', 'https://example.com/a', 'C:\\file', 'a\\b', 'a//b', './a', '']) assert.equal(safeRelativePath(p), false, p);
  assert.equal(safeRelativePath('proof/mobile-390.png'), true);
});

const cli = path.resolve(import.meta.dirname, '../scripts/design-gate.mjs');
test('CLI protects existing work, rejects missing artifacts and symlinks, validates JSON output', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lazarus-contract-'));
  try {
    const file = path.join(root, 'design-contract.json');
    const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
    assert.equal(run('init', file).status, 0);
    fs.writeFileSync(file, JSON.stringify(design()));
    const before = fs.readFileSync(file, 'utf8');
    assert.equal(run('init', file).status, 2); assert.equal(fs.readFileSync(file, 'utf8'), before);
    const missing = run('check', file, '--stage', 'design', '--json');
    assert.equal(missing.status, 1); assert.ok(JSON.parse(missing.stdout).issues.some(i => i.code === 'artifact'));
    fs.mkdirSync(path.join(root, 'proof'));
    for (const filename of ['type.md', 'A.html', 'B.html', 'C.html', 'voice.md', 'mobile.md']) fs.writeFileSync(path.join(root, 'proof', filename), 'Temporary test artifact');
    assert.equal(run('check', file, '--stage', 'design').status, 0);
    fs.unlinkSync(path.join(root, 'proof/A.html')); fs.symlinkSync(cli, path.join(root, 'proof/A.html'));
    assert.equal(run('check', file, '--stage', 'design').status, 1);
    assert.equal(run('check', file, '--stage', 'nonsense').status, 2);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test('release CLI handles nested records and rejects source disguised as evidence', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lazarus-release-'));
  try {
    const git = (...args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    git('init'); git('config', 'user.name', 'Test'); git('config', 'user.email', 'test@example.invalid');
    const records = path.join(root, 'design'); fs.mkdirSync(records);
    fs.writeFileSync(path.join(root, 'index.html'), '<h1>Source</h1>');
    const data = release();
    fs.mkdirSync(path.join(records, 'proof'));
    for (const specimen of data.typography.specimens) fs.writeFileSync(path.join(records, specimen.path), 'Fixture only');
    git('add', 'index.html', 'design/proof'); git('commit', '-m', 'Test source and type specimens');
    data.qa.commit = git('rev-parse', 'HEAD');
    const paths = [data.typography.spec, ...data.typography.specimens.map(s => s.path), data.voice.spec, data.mobile.spec, ...data.qa.mobileInspections.map(s => s.path), ...data.qa.screenshots.map(s => s.path), 'proof/test-report.txt'];
    paths.forEach(p => fs.writeFileSync(path.join(records, p), 'Fixture only'));
    const file = path.join(records, 'design-contract.json'); fs.writeFileSync(file, JSON.stringify(data));
    const run = () => spawnSync(process.execPath, [cli, 'check', file, '--stage', 'release'], { encoding: 'utf8' });
    assert.equal(run().status, 0);
    fs.writeFileSync(path.join(root, 'index.html'), '<h1>Changed</h1>'); assert.equal(run().status, 2);
    data.qa.checks[0].evidence = '../index.html'; fs.writeFileSync(file, JSON.stringify(data));
    assert.equal(run().status, 2, 'Application HTML is still source even when cited as evidence');
    data.qa.checks[0].evidence = 'proof/test-report.txt'; fs.writeFileSync(file, JSON.stringify(data));
    git('restore', 'index.html'); fs.writeFileSync(path.join(root, 'new.js'), 'newSource()'); assert.equal(run().status, 2);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
