(() => {
  'use strict';
  // Local-only preview: user-entered content is never persisted, transmitted or evaluated.
  const form = document.getElementById('controls');
  const titleInput = document.getElementById('input-title');
  const bodyInput = document.getElementById('input-body');
  const metaInput = document.getElementById('input-meta');
  const sizeInput = document.getElementById('body-size');
  const measureInput = document.getElementById('line-measure');
  const languageInput = document.getElementById('proof-lang');
  const proofArea = document.getElementById('proofs');
  const surfaces = Array.from(document.querySelectorAll('.proof-surface'));
  const widths = Array.from(document.querySelectorAll('[data-width]'));
  const status = document.getElementById('width-status');
  const reset = document.getElementById('reset');

  const defaults = {
    title: titleInput.value,
    body: bodyInput.value,
    meta: metaInput.value,
    size: sizeInput.value,
    measure: measureInput.value,
    language: languageInput.value
  };

  function renderText() {
    const title = titleInput.value.trim() || '—';
    const body = bodyInput.value.trim() || '—';
    const meta = metaInput.value.trim() || '—';
    document.querySelectorAll('[data-proof-title]').forEach(node => { node.textContent = title; });
    document.querySelectorAll('[data-proof-body]').forEach(node => { node.textContent = body; });
    document.querySelectorAll('[data-proof-meta]').forEach(node => { node.textContent = meta; });
    document.querySelectorAll('.specimen').forEach(node => { node.lang = languageInput.value; });
  }

  function renderScale() {
    const size = Math.max(14, Math.min(22, Number(sizeInput.value) || 17));
    const measure = Math.max(42, Math.min(78, Number(measureInput.value) || 64));
    proofArea.style.setProperty('--proof-body-size', size + 'px');
    proofArea.style.setProperty('--proof-measure', measure + 'ch');
    document.getElementById('size-output').textContent = size + ' px';
    document.getElementById('measure-output').textContent = measure + ' ch';
  }

  function chooseWidth(value) {
    const width = [390, 768, 1040].includes(Number(value)) ? Number(value) : 1040;
    widths.forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.width) === width));
    });
    surfaces.forEach(surface => surface.style.setProperty('--proof-width', width + 'px'));
    status.textContent = 'Proof width: up to ' + width + ' CSS px';
  }

  function restore() {
    titleInput.value = defaults.title;
    bodyInput.value = defaults.body;
    metaInput.value = defaults.meta;
    sizeInput.value = defaults.size;
    measureInput.value = defaults.measure;
    languageInput.value = defaults.language;
    renderText();
    renderScale();
    chooseWidth(1040);
  }

  [titleInput, bodyInput, metaInput].forEach(node => node.addEventListener('input', renderText));
  languageInput.addEventListener('change', renderText);
  [sizeInput, measureInput].forEach(node => node.addEventListener('input', renderScale));
  widths.forEach(button => button.addEventListener('click', () => chooseWidth(button.dataset.width)));
  reset.addEventListener('click', restore);
  form.addEventListener('submit', event => event.preventDefault());

  renderText();
  renderScale();
  chooseWidth(1040);
})();