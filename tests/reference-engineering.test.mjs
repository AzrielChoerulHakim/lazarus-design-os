import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createPlan, loadRegistry, RELEASE_CHECKS, safeEvidenceFile, shortlist, validatePlan, validateRegistry } from '../lib/reference-engineering.mjs';
const reg = loadRegistry();
const app = path.resolve(import.meta.dirname,'../scripts/reference-engineering.mjs');

function validFixture() {
  const plan=createPlan();
  plan.project={name:'FICTIONAL CASE FILE',audience:'People reviewing the documented case',goal:'Compare sourced records to decide what happened',readerJobs:['justify-decision','compare-states'],constraints:'Static hosting, readable on budget phones; motion optional'};
  plan.evidence=[{id:'F1',claim:'Three dated entries have citations in the fictional demo source',source:'FICTIONAL training record; not a real client claim',status:'verified',tags:['verified-evidence']}];
  plan.selections=[{mechanismId:'evidence-state',sourceBasis:'notes-only',why:'Different documents should update their explanation and active marker together.',audienceBenefit:'Readers understand which dated piece of evidence supports the claim.',evidenceIds:['F1'],implementation:'One active index drives visible entry and its explanatory panel; anchors retain no-script behavior.',fallback:'A visible list of all evidence entries remains in the document without JavaScript.',nonTransferable:['Original cyan on black decision dashboard','The marine WebGL environment'],motionJustification:'Selection feedback may fade softly but does not require motion.'}];
  plan.rejectedAlternatives=[{mechanismId:'progressive-chapter',reason:'Scroll-pinned chapters slow down direct document lookup.'}];
  plan.qa={reviewedCommit:'a'.repeat(40),environment:'Example: Chromium desktop and emulated 320/390; replace with actual result',checks:[]};
  return plan;
}
function evidenceDir(t) {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'lazarus-reference-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const proof=path.join(root,'proof');fs.mkdirSync(proof);
  const plan=validFixture();
  for(const id of new Set([...RELEASE_CHECKS,...reg.mechanisms.find(m=>m.id==='evidence-state').qa])) {
    fs.writeFileSync(path.join(proof,id+'.txt'),'EXAMPLE TEST EVIDENCE for '+id+'; replace with observed proof\n');
    plan.qa.checks.push({id,status:'pass',evidencePath:'proof/'+id+'.txt',notes:'Example observation for '+id+'; replace with actual measured results.'});
  }
  return {root,plan};
}
test('registry is a valid, diversified 7-study / 12-mechanism library',()=>{
  assert.deepEqual(validateRegistry(reg),[]);
  assert.equal(reg.studies.length,7);
  assert.equal(reg.mechanisms.length,12);
  assert.ok(new Set(reg.mechanisms.map(m=>m.family)).size>=5);
  assert.ok(reg.mechanisms.every(m=>m.fallback.length>30));
});
test('shortlist exposes missing evidence; does not force a visual direction',()=>{
  const candidates=shortlist(reg,{readerJobs:['show-chronology']});
  assert.ok(candidates.some(x=>x.id==='chronology-state' && x.readiness==='needs-verified-evidence'));
  const ready=shortlist(reg,{readerJobs:['show-chronology'],evidenceTags:['verified-chronology']});
  assert.equal(ready.find(x=>x.id==='chronology-state').readiness,'eligible-for-judgment');
  assert.equal(shortlist(reg,{readerJobs:['nonsense']}).length,0);
});
test('init produces an intentionally incomplete, fact-free blank plan',()=>{
  const plan=createPlan();
  assert.equal(plan.evidence.length,0);
  assert.equal(plan.selections.length,0);
  assert.equal(validatePlan(plan,reg).complete,false);
});
test('valid sourced decision is complete with one selection and one rejection',()=>{
  const result=validatePlan(validFixture(),reg);
  assert.equal(result.complete,true,JSON.stringify(result.findings));
});
test('release needs actual evidence artifacts and reviewed source commit',t=>{
  const {root,plan}=evidenceDir(t);
  assert.equal(validatePlan(plan,reg,{stage:'release',root}).complete,true);
  fs.unlinkSync(path.join(root,'proof','keyboard.txt'));
  assert.equal(validatePlan(plan,reg,{stage:'release',root}).complete,false);
});
test('unknown selections and more than two are rejected',()=>{
  const plan=validFixture();plan.selections[0].mechanismId='fake';
  assert.equal(validatePlan(plan,reg).complete,false);
  const p=validFixture();p.selections.push({...p.selections[0],mechanismId:'reversible-dialog'});
  p.selections.push({...p.selections[0],mechanismId:'measured-display-type'});
  assert.equal(validatePlan(p,reg).complete,false);
});
test('unverified facts and mismatched evidence tags cannot justify a mechanism',()=>{
  const a=validFixture();a.evidence[0].status='uncertain';
  assert.equal(validatePlan(a,reg).complete,false);
  const b=validFixture();b.evidence[0].tags=[];
  assert.equal(validatePlan(b,reg).complete,false);
});
test('cannot pretend notes-only research was an inspected original source',()=>{
  const plan=validFixture();plan.selections[0].sourceBasis='authorized-source-inspected';
  assert.equal(validatePlan(plan,reg).complete,false);
});
test('cannot drop source signature exclusions or rejected alternatives',()=>{
  const a=validFixture();a.selections[0].nonTransferable=['just one'];
  assert.equal(validatePlan(a,reg).complete,false);
  const b=validFixture();b.rejectedAlternatives=[];
  assert.equal(validatePlan(b,reg).complete,false);
});
test('QA fail, not-tested, fake notes and missing SHA block release',t=>{
  const {root,plan}=evidenceDir(t);
  plan.qa.checks.find(c=>c.id==='keyboard').status='not-tested';
  assert.equal(validatePlan(plan,reg,{stage:'release',root}).complete,false);
  plan.qa.checks.find(c=>c.id==='keyboard').status='pass';
  plan.qa.checks.find(c=>c.id==='keyboard').notes='x';
  assert.equal(validatePlan(plan,reg,{stage:'release',root}).complete,false);
  plan.qa.checks.find(c=>c.id==='keyboard').notes='Observed keyboard navigation success in Chrome.';
  plan.qa.reviewedCommit='1234';
  assert.equal(validatePlan(plan,reg,{stage:'release',root}).complete,false);
});
test('evidence path must not escape root by traversal, missing path or symlink',t=>{
  const {root}=evidenceDir(t);
  assert.equal(safeEvidenceFile(root,'proof/keyboard.txt'),true);
  assert.equal(safeEvidenceFile(root,'../outside.txt'),false);
  assert.equal(safeEvidenceFile(root,'missing.txt'),false);
  assert.equal(safeEvidenceFile(root,'/etc/passwd'),false);
  const remote=fs.mkdtempSync(path.join(os.tmpdir(),'lazarus-external-'));
  t.after(()=>fs.rmSync(remote,{recursive:true,force:true}));
  fs.writeFileSync(path.join(remote,'external.txt'),'hello world');
  fs.symlinkSync(path.join(remote,'external.txt'),path.join(root,'proof','evil-link'));
  assert.equal(safeEvidenceFile(root,'proof/evil-link'),false);
});
test('CLI catalog and registry-check run without dependencies',()=>{
  assert.match(execFileSync(process.execPath,[app,'registry-check'],{encoding:'utf8'}),/PASS: 7 studies and 12 mechanisms/);
  assert.match(execFileSync(process.execPath,[app,'catalog'],{encoding:'utf8'}),/chronology-state/);
});

import { activePhase, clamp01, observeStageProgress, stageProgress } from '../lib/scroll-progress.mjs';
test('scroll geometry clamps reverse progress, zero travel and index boundaries',()=>{
  assert.equal(clamp01(-10),0);assert.equal(clamp01(12),1);
  assert.equal(stageProgress({top:200,height:2000},800),0);
  assert.equal(stageProgress({top:-600,height:2000},800),0.5);
  assert.equal(stageProgress({top:-1400,height:2000},800),1);
  assert.equal(stageProgress({top:10,height:100},800),0);
  assert.equal(stageProgress({top:0,height:100},800),1);
  assert.equal(activePhase(.8,4),2);
  assert.equal(activePhase(1,4),3);
  assert.throws(()=>activePhase(0,0),RangeError);
});
test('scroll adapter coalesces frames, pauses hidden documents and cleans up',()=>{
  const handlers={win:{},doc:{}};let queued=new Map(),count=0,rect={top:-400,height:1600};const received=[];
  const win={innerHeight:800,requestAnimationFrame(fn){queued.set(++count,fn);return count},cancelAnimationFrame(i){queued.delete(i)},addEventListener(n,fn){handlers.win[n]=fn},removeEventListener(n){delete handlers.win[n]}};
  const doc={hidden:false,addEventListener(n,fn){handlers.doc[n]=fn},removeEventListener(n){delete handlers.doc[n]}};
  const element={getBoundingClientRect:()=>rect};
  const stop=observeStageProgress({element,win,doc,onChange:x=>received.push(x)});
  assert.equal(queued.size,1);
  handlers.win.scroll(); handlers.win.scroll();assert.equal(queued.size,1);
  for(const fn of queued.values())fn();queued.clear();assert.deepEqual(received,[.5]);
  doc.hidden=true;handlers.win.scroll();assert.equal(queued.size,0);
  rect={top:-800,height:1600};doc.hidden=false;handlers.doc.visibilitychange();
  for(const fn of queued.values())fn();queued.clear();assert.deepEqual(received,[.5,1]);
  handlers.win.scroll();stop();assert.equal(queued.size,0);assert.equal(Object.keys(handlers.win).length,0);
});


test('an intentional zero-mechanism choice is allowed for simple reading tasks',()=>{
  const p=validFixture();
  p.project.readerJobs=['read-profile'];
  p.selections=[];
  p.noMechanismReason='A fully semantic CV and factual work list serve this audience without special interaction.';
  assert.equal(validatePlan(p,reg).complete,true);
  assert.equal(shortlist(reg,{readerJobs:['read-profile']}).length,0);
});

// These tests do not replace a real browser/keyboard/No-JS run.
test('blank JSON template exactly matches the initializer',()=>{
  const template=JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname,'../templates/reference-engineering-plan.json'),'utf8'));
  assert.deepEqual(template,createPlan());
});
test('two teaching demos retain semantic text without JavaScript',()=>{
  const root=path.resolve(import.meta.dirname,'../examples');
  const evidence=fs.readFileSync(path.join(root,'synchronized-evidence/index.html'),'utf8');
  const scroll=fs.readFileSync(path.join(root,'scroll-coordination/index.html'),'utf8');
  assert.equal((evidence.match(/<article\b/g)||[]).length,3);
  assert.equal((evidence.match(/href="#record-/g)||[]).length,3);
  assert.equal((scroll.match(/<li data-phase=/g)||[]).length,4);
  assert.match(scroll,/<ol id="process-steps">/);
  for(const name of ['synchronized-evidence','scroll-coordination']){
    const js=fs.readFileSync(path.join(root,name,'enhance.mjs'),'utf8');
    assert.doesNotThrow(()=>execFileSync(process.execPath,['--check',path.join(root,name,'enhance.mjs')]));
    assert.doesNotMatch(js,/XMLHttpRequest|fetch\(|localStorage|sessionStorage/);
  }
});
