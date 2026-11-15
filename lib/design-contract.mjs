// Shared by Direction Room and the CLI. No network, DOM, filesystem or dependencies.
export const VIEWPORTS = [320, 390, 640, 768, 1024, 1440];
export const CHECKS = ['keyboard', 'focus', 'touch', 'reduced-motion', 'core-actions', 'text-resize-200', 'reflow-320', 'text-spacing', 'contrast', 'font-fallback', 'content-stress', 'loading-empty-error'];
export const REVIEWS = ['identity-swap', 'structural-skeleton', 'decision-rationale'];
const text = value => typeof value === 'string' && value.trim().length > 0;
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const normalize = value => value.normalize('NFKC').toLocaleLowerCase('en').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const signature = concept => [concept.contentOrder.map(normalize).join('|'), normalize(concept.readingGrammar), normalize(concept.interaction)].join('::');

export function createContract() {
  return {
    schemaVersion: 1,
    project: { name: '', audience: '', primaryTask: '', thesis: '' },
    facts: [{ id: 'F1', claim: '', source: '', status: 'uncertain' }],
    concepts: 'ABCDEFG'.split('').map(id => ({ id, name: '', contentOrder: [], readingGrammar: '', media: '', interaction: '', evidenceIds: [], tradeoff: '' })),
    selection: { conceptId: '', reason: '' },
    signature: { description: '', evidenceIds: [], benefit: '', fallback: '' },
    decisions: [],
    avoid: [],
    comparison: { projects: [], note: '' },
    typography: { spec: '', contentSource: '', specimens: [], chosenId: '', reason: '', fontRights: '', fallback: '' },
    qa: { commit: '', environment: '', screenshots: [], checks: [], reviews: [], independentReview: { status: 'not-tested', notes: '' } }
  };
}

// Reject malformed imports rather than silently discarding fields or crashing on them.
export function shapeErrors(data) {
  const errors = [];
  const record = (value, where, fields) => {
    if (!object(value)) { errors.push(`${where} must be an object`); return false; }
    for (const field of fields) if (typeof value[field] !== 'string') errors.push(`${where}.${field} must be text`);
    return true;
  };
  const strings = (value, where) => { if (!Array.isArray(value) || value.some(v => typeof v !== 'string')) errors.push(`${where} must be an array of text`); };
  const records = (value, where, fields, extra = () => {}) => {
    if (!Array.isArray(value)) { errors.push(`${where} must be an array`); return; }
    if (value.length > 100) { errors.push(`${where} exceeds 100 records`); return; }
    value.forEach((v, i) => { if (record(v, `${where}[${i}]`, fields)) extra(v, `${where}[${i}]`); });
  };
  if (!object(data)) return ['The contract must be an object'];
  if (data.schemaVersion !== 1) errors.push('Unsupported schemaVersion (expected 1)');
  record(data.project, 'project', ['name', 'audience', 'primaryTask', 'thesis']);
  records(data.facts, 'facts', ['id', 'claim', 'source', 'status']);
  records(data.concepts, 'concepts', ['id', 'name', 'readingGrammar', 'media', 'interaction', 'tradeoff'], (v, p) => { strings(v.contentOrder, `${p}.contentOrder`); strings(v.evidenceIds, `${p}.evidenceIds`); });
  record(data.selection, 'selection', ['conceptId', 'reason']);
  if (record(data.signature, 'signature', ['description', 'benefit', 'fallback'])) strings(data.signature.evidenceIds, 'signature.evidenceIds');
  records(data.decisions, 'decisions', ['choice', 'benefit', 'tradeoff'], (v, p) => strings(v.evidenceIds, `${p}.evidenceIds`));
  records(data.avoid, 'avoid', ['pattern', 'reason']);
  if (record(data.comparison, 'comparison', ['note'])) records(data.comparison.projects, 'comparison.projects', ['name', 'readingGrammar', 'interaction'], (v, p) => strings(v.contentOrder, `${p}.contentOrder`));
  if (record(data.typography, 'typography', ['spec', 'contentSource', 'chosenId', 'reason', 'fontRights', 'fallback'])) records(data.typography.specimens, 'typography.specimens', ['id', 'path', 'content']);
  if (record(data.qa, 'qa', ['commit', 'environment'])) {
    records(data.qa.screenshots, 'qa.screenshots', ['path'], (v, p) => { for (const k of ['width', 'height']) if (!Number.isInteger(v[k]) || v[k] <= 0) errors.push(`${p}.${k} must be a positive integer`); });
    records(data.qa.checks, 'qa.checks', ['id', 'status', 'evidence', 'notes']);
    records(data.qa.reviews, 'qa.reviews', ['id', 'status', 'evidence', 'notes']);
    record(data.qa.independentReview, 'qa.independentReview', ['status', 'notes']);
  }
  return errors;
}

export function validateContract(data, { stage = 'brief', expectedCommit } = {}) {
  const issues = [];
  const add = (code, field, message, level = 'blocker') => issues.push({ level, code, field, message });
  if (!['brief', 'design', 'release'].includes(stage)) { add('stage', '', `Unknown stage: ${stage}`); return issues; }
  const malformed = shapeErrors(data);
  if (malformed.length) return malformed.map(message => ({ level: 'blocker', code: 'shape', field: '', message }));
  const required = (value, field) => { if (!text(value)) add('missing', field, `Complete ${field}.`); };
  const unique = (rows, field) => {
    const seen = new Set();
    for (const row of rows) {
      if (!text(row.id) || seen.has(normalize(row.id))) add('duplicate-id', field, `${field} needs unique, nonempty IDs.`);
      seen.add(normalize(row.id));
    }
  };
  Object.entries(data.project).forEach(([key, value]) => { if (['name', 'audience', 'primaryTask', 'thesis'].includes(key)) required(value, `project.${key}`); });
  unique(data.facts, 'facts');
  const verified = new Set(data.facts.filter(f => f.status === 'verified' && text(f.claim) && text(f.source)).map(f => f.id));
  if (!verified.size) add('facts', 'facts', 'Add at least one verified fact with its source.');
  for (const fact of data.facts) {
    required(fact.claim, `facts.${fact.id}.claim`);
    if (!['verified', 'uncertain'].includes(fact.status)) add('fact-status', 'facts', `Invalid status for ${fact.id}.`);
    if (fact.status === 'verified') required(fact.source, `facts.${fact.id}.source`);
  }
  const evidence = (ids, field) => {
    if (!ids.length) add('evidence', field, `${field} must cite a verified fact ID.`);
    for (const id of ids) if (!verified.has(id)) add('evidence', field, `${field} cites ${id}, which is missing or unverified.`);
  };
  if (data.concepts.length !== 7) add('concept-count', 'concepts', 'Develop seven concept proposals.');
  unique(data.concepts, 'concepts');
  for (const concept of data.concepts) {
    const field = `concepts.${concept.id}`;
    for (const key of ['name', 'readingGrammar', 'media', 'interaction', 'tradeoff']) required(concept[key], `${field}.${key}`);
    if (!concept.contentOrder.length || concept.contentOrder.some(v => !text(v))) add('content-order', field, `Describe the content order for ${concept.id}.`);
    evidence(concept.evidenceIds, `${field}.evidenceIds`);
  }
  for (let i = 0; i < data.concepts.length; i++) {
    const a = data.concepts[i];
    if (!a.contentOrder.length || !text(a.readingGrammar) || !text(a.interaction)) continue;
    for (const b of data.concepts.slice(i + 1)) {
      if (signature(a) === signature(b)) add('duplicate-structure', 'concepts', `${a.id} and ${b.id} have the same content order, reading grammar and interaction. Rework the proposals.`);
      else if (a.contentOrder.map(normalize).join('|') === b.contentOrder.map(normalize).join('|')) add('similar-order', 'concepts', `${a.id} and ${b.id} share a content order. Review whether the difference is structural.`, 'review');
    }
  }
  const selected = data.concepts.find(c => c.id === data.selection.conceptId);
  if (!selected) add('selection', 'selection.conceptId', 'Select an existing concept.');
  required(data.selection.reason, 'selection.reason');
  for (const key of ['description', 'benefit', 'fallback']) required(data.signature[key], `signature.${key}`);
  evidence(data.signature.evidenceIds, 'signature.evidenceIds');
  if (!data.decisions.length) add('decisions', 'decisions', 'Record a dominant decision, evidence, reader benefit and tradeoff.');
  for (const [i, decision] of data.decisions.entries()) {
    for (const key of ['choice', 'benefit', 'tradeoff']) required(decision[key], `decisions.${i}.${key}`);
    evidence(decision.evidenceIds, `decisions.${i}.evidenceIds`);
  }
  if (!data.avoid.length) add('avoid', 'avoid', 'Name a project-specific default to avoid and explain why.');
  for (const [i, item] of data.avoid.entries()) { required(item.pattern, `avoid.${i}.pattern`); required(item.reason, `avoid.${i}.reason`); }
  required(data.comparison.note, 'comparison.note');
  if (!data.comparison.projects.length) add('comparison-unavailable', 'comparison', 'No previous project supplied; cross-project sameness has not been checked.', 'review');
  for (const prior of data.comparison.projects) {
    for (const key of ['name', 'readingGrammar', 'interaction']) required(prior[key], `comparison.${key}`);
    if (!prior.contentOrder.length || prior.contentOrder.some(v => !text(v))) add('comparison-order', 'comparison', 'Describe the previous project’s content order.');
    if (selected && signature(prior) === signature(selected)) add('prior-match', 'comparison', `The selected structure matches ${prior.name}. Inspect the rendered pair and explain or revise.`, 'review');
  }
  if (stage === 'brief') return issues;
  for (const key of ['spec', 'contentSource', 'chosenId', 'reason', 'fontRights', 'fallback']) required(data.typography[key], `typography.${key}`);
  const specimens = data.typography.specimens;
  if (specimens.length !== 3) add('specimen-count', 'typography.specimens', 'Provide three monochrome same-copy specimen artifacts.');
  unique(specimens, 'typography.specimens');
  for (const specimen of specimens) { required(specimen.path, `typography.${specimen.id}.path`); required(specimen.content, `typography.${specimen.id}.content`); }
  if (new Set(specimens.map(s => s.content.trim())).size > 1) add('same-copy', 'typography.specimens', 'All three specimens must declare the exact same copy.');
  if (!specimens.some(s => s.id === data.typography.chosenId)) add('type-selection', 'typography.chosenId', 'Choose one of the supplied type specimens.');
  if (stage === 'design') return issues;
  if (!/^[a-f\d]{40}$/i.test(data.qa.commit)) add('commit', 'qa.commit', 'Record the full 40-character reviewed Git commit.');
  if (expectedCommit && data.qa.commit !== expectedCommit) add('stale-commit', 'qa.commit', 'QA evidence does not name the expected source commit.');
  required(data.qa.environment, 'qa.environment');
  for (const width of VIEWPORTS) if (!data.qa.screenshots.some(s => s.width === width && text(s.path))) add('viewport', 'qa.screenshots', `Missing screenshot at ${width} CSS px.`);
  if (!data.qa.screenshots.some(s => s.width > s.height && s.height <= 500 && text(s.path))) add('short-viewport', 'qa.screenshots', 'Include a short landscape viewport (height ≤ 500 CSS px).');
  for (const row of data.qa.screenshots) required(row.path, 'qa.screenshots.path');
  const checkRows = (rows, ids, field) => {
    unique(rows, field);
    for (const row of rows) {
      if (!ids.includes(row.id)) add('unknown-check', field, `Unknown ${field} ID: ${row.id}.`);
      if (!['pass', 'fail', 'not-tested', 'not-applicable'].includes(row.status)) add('check-status', field, `Invalid status for ${row.id}.`);
      if (row.status === 'fail') add('failed-check', field, `${row.id} failed; resolve it before release.`);
    }
    for (const id of ids) {
      const row = rows.find(r => r.id === id);
      if (id === 'loading-empty-error' && row?.status === 'not-applicable' && text(row.notes)) continue;
      if (!row || row.status !== 'pass') add('unchecked', field, `${id} needs an observed pass, evidence and notes.`);
      else { required(row.evidence, `${field}.${id}.evidence`); required(row.notes, `${field}.${id}.notes`); }
    }
  };
  checkRows(data.qa.checks, CHECKS, 'qa.checks');
  checkRows(data.qa.reviews, REVIEWS, 'qa.reviews');
  const independent = data.qa.independentReview;
  if (!['recorded', 'not-tested'].includes(independent.status)) add('independent-status', 'qa.independentReview', 'Use recorded or not-tested for independent feedback.');
  if (independent.status === 'recorded') required(independent.notes, 'qa.independentReview.notes');
  else add('independent-review', 'qa.independentReview', 'Independent perception review is not recorded; originality remains an editorial judgment.', 'review');
  return issues;
}

export function artifactPaths(data, stage) {
  if (stage === 'brief' || shapeErrors(data).length) return [];
  const paths = [data.typography.spec, ...data.typography.specimens.map(s => s.path)];
  if (stage === 'release') paths.push(...data.qa.screenshots.map(s => s.path), ...[...data.qa.checks, ...data.qa.reviews].filter(r => r.status === 'pass').map(r => r.evidence));
  return [...new Set(paths.filter(text))];
}

export function safeRelativePath(value) {
  return text(value) && !/[\\:\u0000]/.test(value) && !value.startsWith('/') && value.split('/').every(part => part !== '..' && part !== '.' && part !== '');
}
