import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  COMMON_CHECKS, createScrollPlan, loadScrollRegistry, shortlistScroll,
  safeProofFile, validateScrollPlan, validateScrollRegistry
} from '../lib/scroll-director.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registry = loadScrollRegistry();
const selected = (systemId, evidenceIds = ['E-01']) => ({
  systemId,
  why: 'A verified narrative requires one stable panel across the source facts.',
  readerBenefit: 'Readers can compare content without losing the related diagram.',
  implementation: 'Semantic HTML, CSS sticky and IntersectionObserver with cleanup.',
  stateSource: 'Actual ordered evidence IDs embedded in accessible DOM sections.',
  sourceBasis: 'docs-reviewed',
  sourceDescription: '',
  evidenceIds,
  nonTransferable: ['source style and color scheme', 'source content and illustration layout'],
  rejectionConsidered: 'Horizontal pinning was rejected because it blocks direct reading.',
  fallback: {
    noJs: 'Keep full textual evidence within normal ordered sections.',
    reducedMotion: 'Render static figures with automatic document height and no pinning.',
    mobile: 'Place each figure with its relevant evidence immediately above each text.',
  }
});
const plan = () => ({
  ...createScrollPlan(),
  project: {name:'Illustrative client portfolio', audience:'Readers studying real evidence', readerJobs:['read-evidence','compare-artifacts'], constraints:'Low-powered mobile and no forced movement', baseline:'semantic-document'},
  evidence:[{id:'E-01',claim:'Actual evidence is documented in the source materials',source:'client evidence / chapter 1',status:'verified',tags:['verified-evidence','verified-sections','licensed-media','paired-authentic-assets']}],
  selections:[selected('sticky-evidence-exchange')],
  rejected:[{systemId:'horizontal-editorial-gallery',reason:'No authentic panoramic image sequence exists.'}]
});
const valid = (p, options = {}) => validateScrollPlan(p, registry, options);

 test('registry includes exactly fifteen independently documented systems', () => {
  assert.deepEqual(validateScrollRegistry(registry), []);
  assert.equal(registry.systems.length, 15);
  assert.equal(registry.sources.length, 19);
  assert.equal(new Set(registry.systems.map(s=>s.id)).size,15);
  assert.equal(new Set(registry.systems.map(s=>s.family)).size,5);
 });
 test('all related Atlas mechanism IDs are real and source IDs resolve', () => {
  const ref=JSON.parse(fs.readFileSync(path.join(root,'data/reference-mechanisms.json'),'utf8'));
  const atlas=new Set(ref.mechanisms.map(x=>x.id));
  const sources=new Set(registry.sources.map(x=>x.id));
  for(const s of registry.systems){
    for(const id of s.relatedAtlasMechanisms) assert.ok(atlas.has(id),`${s.id}: invalid Atlas ${id}`);
    for(const id of s.sourceIds) assert.ok(sources.has(id),`${s.id}: unknown source ${id}`);
  }
 });
 test('registry fails tampered source, required fallback and duplicate entries', () => {
  const clone=structuredClone(registry);
  clone.systems[1].id=clone.systems[0].id;
  clone.systems[2].fallback.noJs='';
  clone.systems[3].sourceIds=['unknown-source'];
  const errors=validateScrollRegistry(clone).join('\n');
  assert.match(errors,/Duplicate\/invalid/);
  assert.match(errors,/fallback.noJs/);
  assert.match(errors,/unknown source/);
 });
 test('recommendations are relevance filters with visible evidence gaps',()=>{
  const options=shortlistScroll(registry,{readerJobs:['understand-process'],evidenceTags:[],role:'dominant'});
  assert.ok(options.some(x=>x.id==='data-linked-scrub'&&x.missingEvidence.includes('verified-data')));
  assert.ok(options.every(x=>x.role==='dominant'));
  assert.ok(options.every(x=>x.matchedJobs.length));
 });
 test('complete decision with one grounded scroll system passes',()=>{
  const result=valid(plan());
  assert.equal(result.complete,true,JSON.stringify(result.findings));
  assert.ok(result.findings.some(x=>x.severity==='warning'&&x.message.includes('combined')));
 });
 test('plain semantic page with justified zero scroll systems passes',()=>{
  const p=plan();p.selections=[];
  p.noScrollReason='Client content is short and semantic anchors fulfill every reader goal.';
  assert.equal(valid(p).complete,true);
 });
 test('missing reason for no effects fails decision',()=>{
  const p=plan();p.selections=[];
  assert.equal(valid(p).complete,false);
 });
 test('missing linked evidence and invented facts fail decision',()=>{
  const p=plan();p.evidence[0].status='unverified';p.selections[0].evidenceIds=['MISSING'];
  const issues=valid(p).findings.map(x=>x.message).join('\n');
  assert.match(issues,/only verified|verified claim|verified/);
  assert.match(issues,/unknown evidence/);
 });
 test('more than one dominant is a blocker',()=>{
  const p=plan();p.selections.push(selected('before-after-wipe'));
  const issues=valid(p).findings.map(x=>x.message).join('\n');
  assert.match(issues,/Maximum one dominant/);
 });
 test('three patterns or duplicate IDs are blockers',()=>{
  const p=plan();p.selections.push(selected('chapter-index-sync'), selected('chapter-index-sync'));
  const issues=valid(p).findings.map(x=>x.message).join('\n');
  assert.match(issues,/Maximum two/);assert.match(issues,/Duplicate/);
 });
 test('combined Atlas budget is enforced',()=>{
  const p=plan();p.selections.push(selected('chapter-index-sync'));
  const referencePlan={selections:[{mechanismId:'meaningful-media-reveal'}]};
  const issues=valid(p,{referencePlan}).findings.map(x=>x.message).join('\n');
  assert.match(issues,/limit is two/);
 });
 test('overlap with Atlas emits a warning but does not quietly duplicate pattern',()=>{
  const p=plan();const referencePlan={selections:[{mechanismId:'progressive-chapter'}]};
  const issues=valid(p,{referencePlan}).findings;
  assert.equal(issues.some(x=>x.severity==='error'),false);
  assert.ok(issues.some(x=>x.severity==='warning'&&x.message.includes('overlaps')));
 });
 test('source disclosure and two anti-imitation exclusions are required',()=>{
  const p=plan();p.selections[0].sourceBasis='authorized-implementation-inspected';p.selections[0].nonTransferable=[];
  const issues=valid(p).findings.map(x=>x.message).join('\n');
  assert.match(issues,/inspected implementation/);
  assert.match(issues,/two borrowed-source signatures/);
 });
 test('proof file checker rejects traversal and symlink escapes',()=>{
  const t=fs.mkdtempSync(path.join(os.tmpdir(),'scroll-director-'));
  try {
    fs.mkdirSync(path.join(t,'qa'));
    fs.writeFileSync(path.join(t,'qa','proof.txt'),'real observation');
    assert.equal(safeProofFile(t,'qa/proof.txt'),true);
    assert.equal(safeProofFile(t,'../outside.txt'),false);
    assert.equal(safeProofFile(t,path.join(t,'qa/proof.txt')),false);
    fs.symlinkSync('/etc/hosts',path.join(t,'qa','out-link'));
    assert.equal(safeProofFile(t,'qa/out-link'),false);
  } finally {fs.rmSync(t,{recursive:true,force:true})}
 });
 test('release gate requires all common and specific checks with real proof',()=>{
  const t=fs.mkdtempSync(path.join(os.tmpdir(),'scroll-director-release-'));
  try {
    const p=plan();p.qa.reviewedCommit='abcdef1234567';p.qa.environment='Chromium desktop and emulated narrow viewports';
    const item=registry.systems.find(x=>x.id==='sticky-evidence-exchange');
    const checks=new Set([...COMMON_CHECKS,...item.qa]);
    fs.mkdirSync(path.join(t,'qa'));
    fs.writeFileSync(path.join(t,'qa','observation.log'),'Observed verified manual/browser QA evidence');
    p.qa.checks=[...checks].map(id=>({id,status:'pass',evidencePath:'qa/observation.log'}));
    assert.equal(valid(p,{stage:'release',root:t}).complete,true);
    p.qa.checks[0].evidencePath='../README.md';
    assert.equal(valid(p,{stage:'release',root:t}).complete,false);
    p.qa.checks[0].evidencePath='qa/observation.log';
    p.qa.checks[1].status='not-tested';
    assert.equal(valid(p,{stage:'release',root:t}).complete,false);
  } finally {fs.rmSync(t,{recursive:true,force:true})}
 });
 test('CLI registry check, catalog and recommendations work offline',()=>{
  const cli=path.join(root,'scripts/scroll-director.mjs');
  const check=execFileSync(process.execPath,[cli,'registry-check'],{encoding:'utf8'});
  assert.match(check,/PASS: 15 systems/);
  const catalog=execFileSync(process.execPath,[cli,'catalog'],{encoding:'utf8'});
  assert.equal(catalog.trim().split('\n').length,15);
  const shortlist=execFileSync(process.execPath,[cli,'recommend','--jobs','compare-artifacts','--evidence','licensed-media'],{encoding:'utf8'});
  assert.match(shortlist,/Candidates only/);
 });
 test('CLI decision check on completed fixture, and refusal to overwrite init',()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'scroll-director-cli-'));
  try {
    const cli=path.join(root,'scripts/scroll-director.mjs');
    const target=path.join(tmp,'plan.json');
    execFileSync(process.execPath,[cli,'init',target]);
    assert.deepEqual(JSON.parse(fs.readFileSync(target,'utf8')),createScrollPlan());
    assert.throws(()=>execFileSync(process.execPath,[cli,'init',target],{stdio:'pipe'}));
    fs.writeFileSync(target,JSON.stringify(plan()));
    const out=execFileSync(process.execPath,[cli,'check',target,'--stage','decision'],{encoding:'utf8'});
    assert.match(out,/COMPLETE/);
  } finally {fs.rmSync(tmp,{recursive:true,force:true})}
 });
