import { createContract, shapeErrors, validateContract } from '../lib/design-contract.mjs';
import { exampleContract } from './example.mjs';
const $ = selector => document.querySelector(selector);
let data = createContract();
let activeConcept = 'A';
let dirty = false;
let showAll = false;
const node = (tag, content, className) => { const element = document.createElement(tag); if (content !== undefined) element.textContent = content; if (className) element.className = className; return element; };
const announce = (message, error = false) => { $('#notice').textContent = message; $('#notice').classList.toggle('error', error); };
const lines = value => value.split('\n').map(s => s.trim()).filter(Boolean);
const ids = value => value.split(',').map(s => s.trim()).filter(Boolean);
function changed() { dirty = true; announce('Ada perubahan yang belum disimpan. Unduh JSON sebelum menutup tab.'); review(); matrix(); }
function field(container, id, title, value, save, { multiline = false, hint = '', options } = {}) {
  const label = node('label', undefined, 'field'); label.htmlFor = id;
  label.append(node('span', title));
  const input = node(options ? 'select' : multiline ? 'textarea' : 'input');
  input.id = id;
  if (options) for (const [val, name] of options) { const option = node('option', name); option.value = val; input.append(option); }
  if (multiline) input.rows = 3;
  input.value = value;
  input.addEventListener(options ? 'change' : 'input', () => { save(input.value); changed(); });
  label.append(input);
  if (hint) { const help = node('small', hint); help.id = id + '-hint'; label.append(help); input.setAttribute('aria-describedby', help.id); }
  container.append(label);
  return input;
}
function removeRow(buttonName, action) { const button = node('button', 'Hapus', 'remove'); button.type = 'button'; button.setAttribute('aria-label', buttonName); button.addEventListener('click', action); return button; }
function entries(selector, rows, title, fields) {
  const container = $(selector); container.replaceChildren();
  rows.forEach((item, i) => {
    const entry = node('div', undefined, 'entry');
    const heading = node('div', undefined, 'entry-heading');
    heading.append(node('strong', `${title} ${i + 1}`), removeRow(`Hapus ${title} ${i + 1}`, () => { rows.splice(i, 1); renderSelection(); changed(); $(selector).previousElementSibling?.querySelector('button')?.focus(); }));
    entry.append(heading);
    for (const [key, name, format] of fields) field(entry, `${selector.slice(1)}-${i}-${key}`, name, Array.isArray(item[key]) ? item[key].join(format === 'lines' ? '\n' : ', ') : item[key], value => { item[key] = format === 'lines' ? lines(value) : format === 'ids' ? ids(value) : value; }, { multiline: format !== 'ids' });
    container.append(entry);
  });
}
function renderFacts() {
  $('#facts').replaceChildren();
  data.facts.forEach((fact, i) => {
    const entry = node('div', undefined, 'entry');
    const heading = node('div', undefined, 'entry-heading');
    heading.append(node('strong', fact.id), removeRow(`Hapus bukti ${fact.id}`, () => { data.facts.splice(i, 1); renderFacts(); changed(); $('#add-fact').focus(); }));
    entry.append(heading);
    field(entry, `fact-${i}-claim`, 'Fakta atau hal yang perlu dipastikan', fact.claim, value => { fact.claim = value; }, { multiline: true });
    field(entry, `fact-${i}-source`, 'Sumber', fact.source, value => { fact.source = value; }, { multiline: true, hint: 'File, tautan, atau keterangan yang bisa ditelusuri.' });
    field(entry, `fact-${i}-status`, 'Status bukti', fact.status, value => { fact.status = value; }, { options: [['uncertain', 'Belum pasti'], ['verified', 'Terverifikasi']] });
    $('#facts').append(entry);
  });
}
function renderBrief() {
  $('#project-fields').replaceChildren();
  for (const [key, label, hint] of [['name', 'Nama proyek', ''], ['audience', 'Siapa pembacanya?', 'Sebutkan orang dan konteks pemakaiannya.'], ['primaryTask', 'Apa yang harus bisa mereka lakukan?', 'Satu tugas utama yang konkret.'], ['thesis', 'Mengapa website ini perlu bentuk tersebut?', 'Bentuk → bukti klien → kebutuhan pembaca.']]) field($('#project-fields'), 'project-' + key, label, data.project[key], value => { data.project[key] = value; }, { multiline: key !== 'name', hint });
  renderFacts();
}
function renderConcept() {
  const current = data.concepts.find(c => c.id === activeConcept) || data.concepts[0];
  $('#concept-tabs').replaceChildren(); $('#concept-editor').replaceChildren();
  if (!current) return;
  activeConcept = current.id;
  data.concepts.forEach((concept, index) => {
    const button = node('button', concept.id); button.type = 'button'; button.role = 'tab'; button.id = 'concept-tab-' + index;
    button.setAttribute('aria-selected', String(concept.id === activeConcept)); button.tabIndex = concept.id === activeConcept ? 0 : -1;
    button.setAttribute('aria-controls', 'concept-editor'); button.setAttribute('aria-label', `Konsep ${concept.id}`);
    button.addEventListener('click', () => { activeConcept = concept.id; renderConcept(); $('#concept-tab-' + index).focus(); });
    button.addEventListener('keydown', event => {
      const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']; if (!keys.includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? data.concepts.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + data.concepts.length) % data.concepts.length;
      activeConcept = data.concepts[next].id; renderConcept(); $('#concept-tab-' + next).focus();
    });
    $('#concept-tabs').append(button);
    if (concept.id === activeConcept) $('#concept-editor').setAttribute('aria-labelledby', button.id);
  });
  $('#concept-editor').append(node('p', `Arah ${current.id} · Jelaskan bentuknya, bukan warnanya.`, 'concept-title'));
  const fields = [['name', 'Nama arah', 'text'], ['contentOrder', 'Urutan informasi', 'lines'], ['readingGrammar', 'Cara membaca & hierarki', 'long'], ['media', 'Perlakuan gambar atau artefak', 'long'], ['interaction', 'Interaksi utama', 'long'], ['evidenceIds', 'ID bukti yang mendukung', 'ids'], ['tradeoff', 'Konsekuensi / alasan menolak arah ini', 'long']];
  for (const [key, label, type] of fields) field($('#concept-editor'), 'concept-' + key, label, Array.isArray(current[key]) ? current[key].join(type === 'lines' ? '\n' : ', ') : current[key], value => { current[key] = type === 'lines' ? lines(value) : type === 'ids' ? ids(value) : value; }, { multiline: type === 'long' || type === 'lines', hint: type === 'lines' ? 'Satu bagian per baris, dari awal hingga akhir.' : type === 'ids' ? 'Pisahkan dengan koma, misalnya F1, F2.' : '' });
}
function renderSelection() {
  $('#selection-fields').replaceChildren(); $('#signature-fields').replaceChildren(); $('#comparison-fields').replaceChildren();
  field($('#selection-fields'), 'selection-concept', 'Arah yang dipilih', data.selection.conceptId, value => { data.selection.conceptId = value; }, { options: [['', 'Belum dipilih'], ...data.concepts.map(c => [c.id, `${c.id} · ${c.name || 'Belum diberi nama'}`])] });
  field($('#selection-fields'), 'selection-reason', 'Mengapa arah ini lebih sesuai?', data.selection.reason, value => { data.selection.reason = value; }, { multiline: true });
  for (const [key, label] of [['description', 'Apa keputusan khasnya?'], ['benefit', 'Apa manfaatnya bagi pembaca?'], ['fallback', 'Bagaimana jika efek atau interaksi tidak tersedia?'], ['evidenceIds', 'ID bukti pendukung']]) field($('#signature-fields'), 'signature-' + key, label, key === 'evidenceIds' ? data.signature[key].join(', ') : data.signature[key], value => { data.signature[key] = key === 'evidenceIds' ? ids(value) : value; }, { multiline: key !== 'evidenceIds' });
  entries('#decisions', data.decisions, 'Keputusan', [['choice', 'Pilihan'], ['evidenceIds', 'ID bukti', 'ids'], ['benefit', 'Manfaat pembaca'], ['tradeoff', 'Konsekuensi']]);
  entries('#avoid', data.avoid, 'Pola', [['pattern', 'Pola yang dihindari'], ['reason', 'Alasan khusus proyek ini']]);
  entries('#prior-projects', data.comparison.projects, 'Pembanding', [['name', 'Nama / sumber proyek'], ['contentOrder', 'Urutan isi', 'lines'], ['readingGrammar', 'Cara membaca'], ['interaction', 'Interaksi utama']]);
  field($('#comparison-fields'), 'comparison-note', 'Apa yang berbeda atau belum bisa dibandingkan?', data.comparison.note, value => { data.comparison.note = value; }, { multiline: true, hint: 'Jika proyek terdahulu tidak tersedia, nyatakan keterbatasannya.' });
}
function matrix() {
  $('#concept-matrix').replaceChildren();
  for (const concept of data.concepts) {
    const tr = node('tr'); const name = node('th', `${concept.id} · ${concept.name || 'Belum ditulis'}`); name.scope = 'row';
    const order = node('td'); const ol = node('ol'); concept.contentOrder.forEach(value => ol.append(node('li', value))); order.append(ol);
    tr.append(name, order, node('td', concept.readingGrammar || '—'), node('td', concept.interaction || '—')); $('#concept-matrix').append(tr);
  }
}
function review() {
  const issues = validateContract(data);
  const blockers = issues.filter(i => i.level === 'blocker');
  $('#project-label').textContent = data.project.name || 'Proyek belum diberi nama';
  const started = Object.values(data.project).some(value => value.trim());
  $('#review-summary').textContent = !started ? 'Mulai dari tugas pembaca dan satu bukti. Tujuh arah menyusul setelahnya.' : blockers.length ? `${blockers.length} isian atau hubungan bukti perlu dilengkapi.` : 'Brief tercatat. Lanjutkan ke spesimen dan penilaian hasil render.';
  $('#fact-count').textContent = data.facts.filter(f => f.status === 'verified' && f.claim.trim() && f.source.trim()).length;
  $('#concept-count').textContent = `${data.concepts.filter(c => c.name.trim() && c.contentOrder.length && c.readingGrammar.trim() && c.interaction.trim()).length} / 7`;
  const chosen = data.concepts.find(c => c.id === data.selection.conceptId);
  $('#chosen-label').textContent = chosen ? `${chosen.id} · ${chosen.name || 'Belum diberi nama'}` : 'Belum dipilih';
  $('#issues').replaceChildren();
  // Put structural/evidence problems before empty-field reminders.
  const sorted = [...issues].sort((a, b) => Number(a.code === 'missing') - Number(b.code === 'missing'));
  for (const issue of showAll ? sorted : sorted.slice(0, 6)) { const li = node('li'); li.append(node('span', issue.level === 'blocker' ? 'Perlu dilengkapi' : 'Perlu penilaian'), document.createTextNode(issueText(issue))); $('#issues').append(li); }
  $('#all-issues').hidden = issues.length <= 6;
  $('#all-issues').textContent = showAll ? 'Ringkas catatan' : `Lihat seluruh ${issues.length} catatan`;
}
function issueText(issue) {
  const fields = { name: 'nama', audience: 'pembaca', primaryTask: 'tugas utama', thesis: 'alasan bentuk', claim: 'fakta', source: 'sumber', readingGrammar: 'cara membaca', media: 'perlakuan aset', interaction: 'interaksi', tradeoff: 'konsekuensi', reason: 'alasan', description: 'keputusan khas', benefit: 'manfaat', fallback: 'alternatif tanpa efek', choice: 'pilihan', pattern: 'pola', note: 'catatan perbandingan' };
  const parts = issue.field.split('.');
  const label = fields[parts.at(-1)] || parts.at(-1);
  const location = parts[0] === 'concepts' ? `konsep ${parts[1]}` : parts[0] === 'facts' ? `bukti ${parts[1]}` : parts[0] === 'project' ? 'brief' : parts[0] === 'signature' ? 'keputusan khas' : parts[0] === 'decisions' ? 'keputusan dominan' : parts[0] === 'avoid' ? 'pola yang dihindari' : parts[0] === 'selection' ? 'pilihan arah' : 'perbandingan';
  const messages = {
    missing: `Lengkapi ${label} pada ${location}.`,
    facts: 'Tambahkan setidaknya satu fakta terverifikasi beserta sumbernya.',
    evidence: `Hubungkan ${location} dengan ID fakta yang sudah terverifikasi dan memiliki sumber.`,
    'content-order': `Tulis urutan informasi untuk ${location}.`,
    'concept-count': 'Susun tujuh usulan struktur.',
    selection: 'Pilih salah satu konsep yang tersedia.',
    decisions: 'Catat keputusan dominan, bukti, manfaat pembaca dan konsekuensinya.',
    avoid: 'Sebutkan pola yang perlu dihindari beserta alasan khusus proyek ini.',
    'comparison-unavailable': 'Proyek terdahulu belum tersedia. Kemiripan lintas proyek belum diperiksa.',
    'comparison-order': 'Catat urutan isi proyek pembanding.',
    'duplicate-id': 'Gunakan ID yang terisi dan unik untuk setiap catatan.',
    'fact-status': 'Status bukti harus Terverifikasi atau Belum pasti.',
    'prior-match': 'Struktur terpilih sama dengan sebuah proyek pembanding. Bandingkan hasil render, lalu jelaskan atau revisi.',
    'duplicate-structure': `Konsep ${issue.message.split(' ')[0]} dan ${issue.message.split(' ')[2]} memiliki urutan, cara membaca dan interaksi yang sama. Ubah strukturnya.`,
    'similar-order': `Konsep ${issue.message.split(' ')[0]} dan ${issue.message.split(' ')[2]} memiliki urutan isi yang sama. Periksa apakah perbedaannya cukup mendasar.`
  };
  return messages[issue.code] || issue.message;
}
function panel(name, moveFocus = false) {
  document.querySelectorAll('[data-panel]').forEach(button => { if (button.dataset.panel === name) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current'); });
  for (const key of ['brief', 'concepts', 'selection']) $('#panel-' + key).hidden = key !== name;
  if (name === 'selection') renderSelection();
  if (moveFocus) { const heading = $('#panel-' + name + ' h2'); heading.tabIndex = -1; heading.focus(); }
}
function render() { renderBrief(); renderConcept(); renderSelection(); matrix(); review(); }
function canReplace() { return !dirty || window.confirm('Ada perubahan yang belum diunduh. Ganti isi tab ini?'); }
function replace(next, message) { data = next; activeConcept = data.concepts[0]?.id || 'A'; dirty = false; showAll = false; render(); panel('brief'); announce(message); }
document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click', () => panel(button.dataset.panel)));
document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => panel(button.dataset.next, true)));
$('#add-fact').addEventListener('click', () => { let i = 1; while (data.facts.some(f => f.id === 'F' + i)) i++; data.facts.push({ id: 'F' + i, claim: '', source: '', status: 'uncertain' }); renderFacts(); changed(); $(`#fact-${data.facts.length - 1}-claim`).focus(); });
for (const [button, selector, rows, blank] of [['#add-decision', '#decisions', () => data.decisions, () => ({ choice: '', evidenceIds: [], benefit: '', tradeoff: '' })], ['#add-avoid', '#avoid', () => data.avoid, () => ({ pattern: '', reason: '' })], ['#add-prior', '#prior-projects', () => data.comparison.projects, () => ({ name: '', contentOrder: [], readingGrammar: '', interaction: '' })]]) $(button).addEventListener('click', () => { rows().push(blank()); renderSelection(); changed(); $(selector).lastElementChild?.querySelector('textarea,input')?.focus(); });
$('#all-issues').addEventListener('click', () => { showAll = !showAll; review(); });
$('#new-project').addEventListener('click', () => { if (canReplace()) replace(createContract(), 'Brief baru. Belum disimpan; isian hanya berada di tab ini.'); });
$('#load-example').addEventListener('click', () => { if (canReplace()) replace(exampleContract(), 'CONTOH TERISI: proyek Direction Room dalam repo ini, bukan data klien. Ini belum merupakan bukti rilis.'); });
$('#import-project').addEventListener('click', () => $('#import-file').click());
$('#import-file').addEventListener('change', async event => {
  const file = event.target.files[0]; event.target.value = ''; if (!file) return;
  try {
    if (file.size > 1024 * 1024) throw new Error('Ukuran maksimum JSON adalah 1 MiB.');
    const imported = JSON.parse(await file.text()); const errors = shapeErrors(imported);
    if (errors.length) throw new Error(errors.slice(0, 3).join(' · '));
    if (imported.concepts.length !== 7 || new Set(imported.concepts.map(c => c.id)).size !== 7 || imported.concepts.some(c => !c.id.trim())) throw new Error('Editor membutuhkan tujuh konsep dengan ID unik.');
    if (canReplace()) replace(imported, `Dibuka: ${file.name}. Bagian typography dan qa tetap dipertahankan saat diekspor.`);
  } catch (error) { announce(`File tidak dibuka: ${error.message}`, true); }
});
$('#export-project').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2) + '\n'], { type: 'application/json' }));
  const a = node('a'); a.href = url; a.download = 'design-contract.json'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  dirty = false; announce('Unduhan JSON dimulai. Simpan file untuk melanjutkan; kelengkapan brief bukan persetujuan rilis.');
});
window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
render();
