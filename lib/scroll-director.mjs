/**
 * Lazarus Scroll Director — independent, zero-dependency decision helpers.
 * This records evidence and basic QA completeness; it does not grade aesthetics.
 * Node 22+.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REGISTRY_FILE = path.join(root, 'data/scroll-systems.json');
export const COMMON_CHECKS = Object.freeze([
  'no-js-content', 'reduced-motion', 'mobile-320', 'mobile-390',
  'short-height', 'keyboard', 'reverse-scroll', 'touch', 'scroll-escape',
  'semantic-reading-order', 'performance', 'source-rights'
]);
const roles = ['dominant', 'supporting'];
const families = ['navigation', 'narrative', 'editorial', 'transformation', 'experimental'];
const complexities = ['low', 'medium', 'high'];
const kinds = ['official-doc', 'platform-doc', 'library-doc', 'design-prompt', 'standards'];
const statuses = ['pass', 'fail', 'not-tested'];
const arr = value => Array.isArray(value) ? value : [];
const filled = value => typeof value === 'string' && value.trim().length > 0;
const substantial = (value, length = 15) => filled(value) && value.trim().length >= length;
const unique = values => new Set(values).size === values.length;

export function loadScrollRegistry(filename = REGISTRY_FILE) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

export function validateScrollRegistry(registry) {
  const failures = [];
  const err = message => failures.push(message);
  if (registry?.schemaVersion !== 1) err('schemaVersion must equal 1');
  if (registry?.maxRecommendedSystems !== 2 || registry?.maxDominantSystems !== 1)
    err('Selection limits must remain 2 total and 1 dominant');
  if (arr(registry?.systems).length !== 15) err('Expected exactly 15 scrolling systems');
  if (new Set(arr(registry?.systems).map(x => x.family)).size !== 5) err('Expected five independent families');
  if (!unique(arr(registry?.readerJobs)) || !unique(arr(registry?.evidenceTags))) err('Duplicate vocabulary entry');
  const ids = new Set();
  const srcIds = new Set();
  for (const source of arr(registry?.sources)) {
    if (!filled(source?.id) || srcIds.has(source.id)) err('Duplicate/invalid source ID: ' + source?.id);
    srcIds.add(source?.id);
    if (!filled(source?.title) || !kinds.includes(source?.kind) || !/^https:\/\/[^\s]+$/u.test(source?.url ?? ''))
      err('Source needs a title, classification and HTTPS link: ' + source?.id);
  }
  for (const s of arr(registry?.systems)) {
    if (!filled(s?.id) || ids.has(s.id)) err('Duplicate/invalid system ID: ' + s?.id);
    ids.add(s?.id);
    if (!families.includes(s?.family) || !roles.includes(s?.role) || !complexities.includes(s?.complexity))
      err(`Unrecognized family/role/complexity: ${s?.id}`);
    for (const key of ['title', 'purpose', 'trigger', 'canonicalState', 'visibleResult', 'rejectWhen']) {
      if (!filled(s?.[key])) err(`${s?.id}: missing ${key}`);
    }
    for (const field of ['baseline', 'native', 'advanced']) {
      if (!filled(s?.implementation?.[field])) err(`${s?.id}: missing implementation.${field}`);
    }
    for (const field of ['noJs', 'reducedMotion', 'mobile']) {
      if (!filled(s?.fallback?.[field])) err(`${s?.id}: missing fallback.${field}`);
    }
    for (const key of ['readerJobs', 'requiredEvidenceTags', 'qa', 'sourceIds', 'relatedAtlasMechanisms', 'risks']) {
      if (!Array.isArray(s?.[key])) err(`${s?.id}: ${key} must be an array`);
    }
    if (!arr(s?.readerJobs).length || !arr(s?.qa).length || !arr(s?.sourceIds).length) err(`${s?.id}: incomplete selection/QA/sources`);
    for (const job of arr(s?.readerJobs)) if (!arr(registry?.readerJobs).includes(job)) err(`${s?.id}: unknown reader job ${job}`);
    for (const tag of arr(s?.requiredEvidenceTags)) if (!arr(registry?.evidenceTags).includes(tag)) err(`${s?.id}: unknown evidence tag ${tag}`);
    for (const id of arr(s?.sourceIds)) if (!srcIds.has(id)) err(`${s?.id}: unknown source ${id}`);
    if (!['research-only', 'implemented-demo'].includes(s?.prototypeStatus)) err(`${s?.id}: unknown prototype status`);
  }
  return failures;
}

/** This is a matching filter, not a creative score or auto-selection. */
export function shortlistScroll(registry, { readerJobs = [], evidenceTags = [], role = null } = {}) {
  const jobs = new Set(arr(readerJobs));
  const evidence = new Set(arr(evidenceTags));
  return arr(registry?.systems).filter(s => role === null || s.role === role).map(s => ({
    id: s.id, title: s.title, family: s.family, role: s.role, complexity: s.complexity,
    matchedJobs: s.readerJobs.filter(j => jobs.has(j)),
    missingEvidence: s.requiredEvidenceTags.filter(t => !evidence.has(t)),
    rejectWhen: s.rejectWhen, fallback: s.fallback.noJs,
  })).filter(s => s.matchedJobs.length).sort((a, b) =>
    b.matchedJobs.length - a.matchedJobs.length || a.id.localeCompare(b.id));
}

export function createScrollPlan() {
  return {
    schemaVersion: 1,
    project: { name: '', audience: '', readerJobs: [], constraints: '', baseline: 'semantic-document' },
    evidence: [], // [{id,claim,source,status:'verified',tags:[]}]
    selections: [], // 0..2, max one dominant. See docs/scroll-systems/ADOPTION.md
    noScrollReason: '',
    rejected: [], // [{systemId,reason}]
    qa: { reviewedCommit: '', environment: '', checks: [] }
  };
}

/** Protect against traversal and symlinked files when recording QA evidence. */
export function safeProofFile(projectRoot, relativePath) {
  if (!filled(relativePath) || !filled(projectRoot) || path.isAbsolute(relativePath)) return false;
  try {
    const base = fs.realpathSync(projectRoot);
    const resolved = path.resolve(base, relativePath);
    const rel = path.relative(base, resolved);
    if (!rel || rel === '..' || rel.startsWith('..' + path.sep) || path.isAbsolute(rel)) return false;
    const real = fs.realpathSync(resolved);
    const realRel = path.relative(base, real);
    if (!realRel || realRel === '..' || realRel.startsWith('..' + path.sep) || path.isAbsolute(realRel)) return false;
    return fs.statSync(real).isFile() && fs.statSync(real).size > 0;
  } catch { return false; }
}

export function validateScrollPlan(plan, registry, {stage = 'decision', root: proofRoot = null, referencePlan = null} = {}) {
  const findings = [];
  const error = message => findings.push({severity:'error',message});
  const warn = message => findings.push({severity:'warning',message});
  if (!['decision', 'release'].includes(stage)) return {complete:false,findings:[{severity:'error',message:'Unknown stage '+stage}]};
  if (validateScrollRegistry(registry).length) error('Scroll registry has invalid structure');
  if (plan?.schemaVersion !== 1) error('Plan schemaVersion must be 1');
  const project = plan?.project ?? {};
  for (const key of ['name','audience','constraints']) if (!substantial(project[key], 6)) error(`project.${key} must describe client reality`);
  if (project?.baseline !== 'semantic-document') error('Baseline must be normal semantic document flow');
  if (!arr(project.readerJobs).length || !unique(arr(project.readerJobs))) error('project.readerJobs must be nonempty and unique');
  for (const job of arr(project.readerJobs)) if (!arr(registry?.readerJobs).includes(job)) error('Unknown reader job: '+job);

  const evidence = new Map();
  for (const e of arr(plan?.evidence)) {
    if (!filled(e?.id) || evidence.has(e.id)) error('Duplicate/missing evidence ID: '+ e?.id);
    else evidence.set(e.id, e);
    if (!filled(e?.claim) || !filled(e?.source) || e?.status !== 'verified') error(`Evidence ${e?.id}: verified claim and actual source are required`);
    if (!Array.isArray(e?.tags)) error(`Evidence ${e?.id}: tags must be an array`);
    for (const tag of arr(e?.tags)) if (!arr(registry?.evidenceTags).includes(tag)) error(`Evidence ${e?.id}: unknown tag ${tag}`);
  }

  const known = new Map(arr(registry?.systems).map(s => [s.id, s]));
  const selections = arr(plan?.selections);
  const ids = selections.map(x => x?.systemId);
  if (selections.length > 2) error('Maximum two scroll systems, including supporting interactions');
  if (!unique(ids)) error('Duplicate scroll system selection');
  if (selections.filter(x => known.get(x?.systemId)?.role === 'dominant').length > 1) error('Maximum one dominant scrolling system');
  if (selections.length === 2 && selections.every(x => known.get(x?.systemId)?.role === 'supporting'))
    warn('Two support systems without dominant effect: verify they are not ornamental additions');
  if (selections.length === 0 && !substantial(plan?.noScrollReason, 20))
    error('Zero scrolling systems requires a specific noScrollReason (20+ characters)');
  if (selections.length && filled(plan?.noScrollReason)) warn('noScrollReason is ignored when a system is selected');
  for (const sel of selections) {
    const s = known.get(sel?.systemId);
    if (!s) { error('Unknown system: '+sel?.systemId); continue; }
    for (const field of ['why','readerBenefit','implementation','stateSource','sourceBasis','rejectionConsidered']) {
      if (!substantial(sel?.[field], field === 'sourceBasis' ? 4 : 16)) error(`${s.id}: selection.${field} must be specific`);
    }
    if (!['docs-reviewed','authorized-implementation-inspected'].includes(sel.sourceBasis))
      error(`${s.id}: sourceBasis must disclose docs-reviewed or authorized-implementation-inspected`);
    if (sel.sourceBasis === 'authorized-implementation-inspected' && !substantial(sel.sourceDescription, 12))
      error(`${s.id}: name the inspected implementation`);
    if (!Array.isArray(sel.evidenceIds) || !arr(sel.evidenceIds).length) error(`${s.id}: link verified evidence IDs`);
    for (const id of arr(sel.evidenceIds)) if (!evidence.has(id)) error(`${s.id}: unknown evidence ID ${id}`);
    for (const tag of s.requiredEvidenceTags) {
      const satisfied = arr(sel.evidenceIds).some(id => evidence.get(id)?.status === 'verified' && arr(evidence.get(id)?.tags).includes(tag));
      if (!satisfied) error(`${s.id}: linked evidence lacks required tag ${tag}`);
    }
    if (!s.readerJobs.some(job => arr(project.readerJobs).includes(job))) error(`${s.id}: does not match any declared reader job`);
    if (arr(sel.nonTransferable).length < 2 || arr(sel.nonTransferable).some(x => !filled(x)))
      error(`${s.id}: identify two borrowed-source signatures not to reproduce`);
    for (const field of ['noJs','reducedMotion','mobile']) {
      if (!substantial(sel?.fallback?.[field], 16)) error(`${s.id}: missing concrete ${field} fallback`);
    }
  }
  const rejected = new Set();
  for (const item of arr(plan?.rejected)) {
    if (!known.has(item?.systemId)) error('Unknown rejected system '+item?.systemId);
    if (ids.includes(item?.systemId)) error('A selected system cannot be marked rejected: '+item?.systemId);
    if (rejected.has(item?.systemId)) error('Duplicate rejected system: '+item?.systemId);
    rejected.add(item?.systemId);
    if (!substantial(item?.reason, 15)) error('Rejected system needs a reason: '+item?.systemId);
  }
  if (!rejected.size) error('Record at least one rejected alternative');

  if (referencePlan !== null) {
    if (!Array.isArray(referencePlan?.selections)) error('Invalid reference plan selections');
    const count = selections.length + arr(referencePlan?.selections).length;
    if (count > 2) error(`Reference + scrolling plans select ${count} mechanisms; limit is two project-wide. Avoid double-counting by recording the same mechanism in only one plan.`);
    const atlasIds = arr(referencePlan?.selections).map(x => x?.mechanismId);
    for (const sel of selections) {
      const duplicate = known.get(sel?.systemId)?.relatedAtlasMechanisms.some(id => atlasIds.includes(id));
      if (duplicate) warn(`${sel.systemId}: overlaps an Atlas mechanism; verify this is not a second copy of the same behavior`);
    }
  } else if (selections.length) {
    warn('Reference plan not supplied: combined two-mechanism budget not cross-validated');
  }

  if (stage === 'release') {
    if (!/^[a-f0-9]{7,40}$/i.test(plan?.qa?.reviewedCommit ?? '')) error('qa.reviewedCommit needs real reviewed source SHA');
    if (!substantial(plan?.qa?.environment, 10)) error('qa.environment must identify browser and testing context');
    if (!filled(proofRoot)) error('Release requires --root to verify evidence files');
    const required = new Set(COMMON_CHECKS);
    for (const sel of selections) for (const check of known.get(sel.systemId)?.qa ?? []) required.add(check);
    const seen = new Set();
    for (const check of arr(plan?.qa?.checks)) {
      if (!filled(check?.id) || seen.has(check.id)) error('Duplicate/missing QA check ID: '+check?.id);
      seen.add(check?.id);
      if (!statuses.includes(check?.status)) error(`QA ${check?.id}: status must be pass/fail/not-tested`);
      if (check?.status === 'pass' && !safeProofFile(proofRoot, check?.evidencePath))
        error(`QA ${check?.id}: passing check requires a nonempty real evidence file inside project root`);
      if (check?.status !== 'pass') error(`QA ${check?.id}: cannot release with ${check?.status}`);
    }
    for (const check of required) if (!seen.has(check)) error('Missing release QA: '+check);
  }
  return {complete:!findings.some(x => x.severity === 'error'),findings};
}
