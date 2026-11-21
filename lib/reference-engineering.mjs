/**
 * Lazarus Reference Engineering, v1. Original decision validator and selector.
 * Keeps visual judgment human: a passing record is documentary completeness only.
 * Node >=22, no runtime dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = path.dirname(fileURLToPath(import.meta.url));
export const REGISTRY_PATH = path.resolve(BASE, '../data/reference-mechanisms.json');
export const RELEASE_CHECKS = Object.freeze([
  'data-authenticity', 'source-rights', 'non-imitation', 'keyboard',
  'reduced-motion', 'no-js-content', 'mobile-320', 'mobile-390', 'short-height',
]);
export const STAGES = Object.freeze(['decision', 'release']);
const isText = (s) => typeof s === 'string' && s.trim().length > 0;
const unique = (xs) => [...new Set(xs)];
const items = (value) => Array.isArray(value) ? value : [];
const word = (v) => String(v ?? '').trim();
const ERROR = 'error';
const WARN = 'warning';

export function loadRegistry(filename = REGISTRY_PATH) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}
export function validateRegistry(registry) {
  const errors = [];
  if (registry?.schemaVersion !== 1) errors.push('Registry schemaVersion must be 1');
  const knownStudies = new Set();
  for (const s of items(registry?.studies)) {
    if (!isText(s.id) || knownStudies.has(s.id)) errors.push('Study ID missing/duplicate: ' + s.id);
    knownStudies.add(s.id);
    if (!isText(s.note) || !s.note.startsWith('docs/studies/')) errors.push(`Invalid note for ${s.id}`);
  }
  if (knownStudies.size !== 7) errors.push(`Expected 7 studies, found ${knownStudies.size}`);
  const seen = new Set();
  for (const m of items(registry?.mechanisms)) {
    if (!isText(m.id) || seen.has(m.id)) errors.push('Mechanism ID missing/duplicate: ' + m.id);
    seen.add(m.id);
    if (!knownStudies.has(m.studyId)) errors.push(`Unknown study for ${m.id}: ${m.studyId}`);
    for (const key of ['family','problem','fallback']) if (!isText(m[key])) errors.push(`${m.id}: missing ${key}`);
    for (const key of ['jobTags','requiredEvidenceTags','recipe','qa','avoid','rejectWhen']) {
      if (!Array.isArray(m[key])) errors.push(`${m.id}: ${key} must be an array`);
    }
    if (!items(m.jobTags).length || !items(m.recipe).length || !items(m.qa).length || !items(m.avoid).length)
      errors.push(`${m.id}: incomplete selection, engineering or QA information`);
    if (!['low','medium','high'].includes(m.complexity)) errors.push(`${m.id}: unknown complexity`);
    if (!['none','optional'].includes(m.motion)) errors.push(`${m.id}: motion cannot be mandatory`);
  }
  if (seen.size < 7) errors.push('Expected multiple independent mechanism families');
  return errors;
}

/** Candidate finder, NOT automated art direction. No scores or aesthetic ranks. */
export function shortlist(registry, { readerJobs = [], evidenceTags = [], max = 12 } = {}) {
  const jobs = new Set(items(readerJobs));
  const evidence = new Set(items(evidenceTags));
  const candidates = items(registry?.mechanisms).map(m => {
    const matchedJobs = items(m.jobTags).filter(t => jobs.has(t));
    const missingEvidence = items(m.requiredEvidenceTags).filter(t => !evidence.has(t));
    return { id: m.id, studyId: m.studyId, family: m.family, problem: m.problem,
      complexity: m.complexity, matchedJobs, missingEvidence,
      readiness: missingEvidence.length ? 'needs-verified-evidence' : 'eligible-for-judgment',
      fallback: m.fallback };
  }).filter(c => c.matchedJobs.length);
  // Task alignment determines ordering; readiness is disclosed, never silently filtered.
  candidates.sort((a,b) => b.matchedJobs.length - a.matchedJobs.length || a.id.localeCompare(b.id));
  return candidates.slice(0, Math.max(0, max));
}

export function createPlan() {
  return {
    schemaVersion: 1,
    project: { name: '', audience: '', goal: '', readerJobs: [], constraints: '' },
    evidence: [], // [{ id, claim, source, status:'verified', tags:[...] }]
    selections: [], // 0–2; see docs/reference-engineering/ADOPTION.md
    noMechanismReason: '', // Required when zero mechanisms are the best solution
    rejectedAlternatives: [], // [{mechanismId, reason}]
    qa: { reviewedCommit: '', environment: '', checks: [] },
  };
}

/** Prevent path traversal and symlink escape for review evidence. */
export function safeEvidenceFile(root, relative) {
  if (!isText(relative) || path.isAbsolute(relative)) return false;
  const base = fs.realpathSync(root);
  const candidate = path.resolve(base, relative);
  if (path.relative(base, candidate).startsWith('..') || path.relative(base, candidate) === '') return false;
  try {
    const real = fs.realpathSync(candidate);
    const rel = path.relative(base, real);
    return !rel.startsWith('..') && rel !== '' && fs.statSync(real).isFile() && fs.statSync(real).size > 0;
  } catch { return false; }
}

export function validatePlan(plan, registry, { stage = 'decision', root = null } = {}) {
  const findings = [];
  const add = (severity, msg) => findings.push({severity, message:msg});
  if (!STAGES.includes(stage)) return {complete:false,findings:[{severity:ERROR,message:'Unknown stage: '+stage}]};
  if (plan?.schemaVersion !== 1) add(ERROR,'Plan schemaVersion must be 1');
  if (validateRegistry(registry).length) add(ERROR,'Mechanism registry failed validation');
  const p = plan?.project ?? {};
  for (const key of ['name','audience','goal','constraints']) {
    if (!isText(p[key])) add(ERROR,`project.${key} must explain the actual client context`);
  }
  if (!items(p.readerJobs).length) add(ERROR,'project.readerJobs must describe the reader task');
  for (const job of items(p.readerJobs)) if (!items(registry?.allowedJobTags).includes(job)) add(ERROR,`Unknown reader job: ${job}`);

  const evidenceById = new Map();
  for (const e of items(plan?.evidence)) {
    if (!isText(e?.id) || evidenceById.has(e?.id)) add(ERROR,'Evidence ID missing or duplicate: '+ e?.id);
    else evidenceById.set(e.id,e);
    if (!isText(e?.claim) || !isText(e?.source)) add(ERROR,`Evidence ${e?.id}: supply claim and actual source`);
    if (e?.status !== 'verified') add(ERROR,`Evidence ${e?.id}: only verified material can justify the mechanism`);
    if (!Array.isArray(e?.tags)) add(ERROR,`Evidence ${e?.id}: tags must be an array`);
    for (const tag of items(e?.tags)) if (!items(registry?.allowedEvidenceTags).includes(tag)) add(ERROR,`Evidence ${e?.id}: unknown tag ${tag}`);
  }
  const mechanismById = new Map(items(registry?.mechanisms).map(m=>[m.id,m]));
  const selectedIds = new Set();
  const selected = items(plan?.selections);
  if (selected.length > 2) add(ERROR,'Select at most two mechanisms');
  if (!selected.length && (!isText(plan?.noMechanismReason) || word(plan.noMechanismReason).length<20))
    add(ERROR,'Zero mechanisms is valid only with a concrete noMechanismReason (>=20 characters)');
  if (selected.length && isText(plan?.noMechanismReason))
    add(WARN,'noMechanismReason is ignored while a mechanism is selected');
  for (const s of selected) {
    const m = mechanismById.get(s?.mechanismId);
    if (!m) { add(ERROR,'Unknown selected mechanism: '+s?.mechanismId); continue; }
    if (selectedIds.has(m.id)) add(ERROR,'Duplicate selection: '+m.id);
    selectedIds.add(m.id);
    for (const field of ['why','audienceBenefit','implementation','fallback']) {
      if (!isText(s[field]) || word(s[field]).length < 15) add(ERROR,`${m.id}: ${field} needs a concrete explanation (>=15 characters)`);
    }
    if (!['notes-only','authorized-source-inspected'].includes(s.sourceBasis)) add(ERROR,`${m.id}: sourceBasis must disclose actual access`);
    if (s.sourceBasis === 'authorized-source-inspected' && !isText(s.sourceDescription))
      add(ERROR,`${m.id}: identify the authorized inspected source`);
    if (items(s.nonTransferable).length < 2 || items(s.nonTransferable).some(x=>!isText(x)))
      add(ERROR,`${m.id}: name at least two concrete source signatures that will NOT be copied`);
    if (!items(s.evidenceIds).length) add(ERROR,`${m.id}: link verified evidence IDs`);
    const linked = items(s.evidenceIds).map(id=>evidenceById.get(id));
    for (const id of items(s.evidenceIds)) if (!evidenceById.has(id)) add(ERROR,`${m.id}: unknown evidence ID ${id}`);
    for (const tag of items(m.requiredEvidenceTags)) {
      if (!linked.some(e=>e?.status==='verified' && items(e.tags).includes(tag)))
        add(ERROR,`${m.id}: missing linked evidence with required tag ${tag}`);
    }
    if (!items(m.jobTags).some(t=>items(p.readerJobs).includes(t)))
      add(WARN,`${m.id}: no reader job matches this mechanism; explain the mismatch`);
    if (m.motion !== 'none' && !isText(s.motionJustification))
      add(ERROR,`${m.id}: motion is optional and must have a rationale`);
  }
  const rejects = new Set();
  for (const r of items(plan?.rejectedAlternatives)) {
    if (!mechanismById.has(r?.mechanismId)) add(ERROR,'Unknown rejected mechanism '+r?.mechanismId);
    if (selectedIds.has(r?.mechanismId)) add(ERROR,'Selected mechanism also marked rejected: '+r?.mechanismId);
    if (rejects.has(r?.mechanismId)) add(ERROR,'Duplicate rejected alternative: '+r?.mechanismId);
    rejects.add(r?.mechanismId);
    if (!isText(r?.reason)) add(ERROR,'Rejected alternative needs a reason: '+r?.mechanismId);
  }
  if (!rejects.size) add(ERROR,'Record at least one rejected alternative and why it lost');

  if (stage === 'release') {
    if (!/^[a-f\d]{40}$/i.test(word(plan?.qa?.reviewedCommit))) add(ERROR,'qa.reviewedCommit must be an observed full 40-character SHA');
    if (!isText(plan?.qa?.environment)) add(ERROR,'qa.environment must describe tested browser/device');
    if (!root) add(ERROR,'--root is required for source-bound release evidence');
    const required = unique([...items(registry.universalReleaseChecks), ...selected.flatMap(s=>items(mechanismById.get(s.mechanismId)?.qa))]);
    const checks = items(plan?.qa?.checks);
    const checked = new Map();
    for (const c of checks) {
      if (!isText(c?.id) || checked.has(c.id)) add(ERROR,'QA check ID missing or duplicate: '+c?.id);
      checked.set(c?.id,c);
      if (!['pass','fail','not-tested'].includes(c?.status)) add(ERROR,`QA ${c?.id}: unknown status`);
      if (c?.status === 'pass' && (!isText(c?.notes) || c.notes.trim().length<15)) add(ERROR,`QA ${c?.id}: observed notes must explain the check`);
      if (c?.status === 'pass' && root && !safeEvidenceFile(root,c?.evidencePath))
        add(ERROR,`QA ${c?.id}: missing, empty or unsafe evidence file`);
    }
    for (const id of required) {
      const c=checked.get(id);
      if (!c) add(ERROR,`Required QA not recorded: ${id}`);
      else if (c.status!=='pass') add(ERROR,`Required QA is not passing: ${id}`);
    }
    add(WARN,'Artifact existence and recorded passes do not prove test authenticity, rights, visual quality or originality.');
  }
  return { complete: !findings.some(f=>f.severity===ERROR), stage, findings, selected: [...selectedIds] };
}
