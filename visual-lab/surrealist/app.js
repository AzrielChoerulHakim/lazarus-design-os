/* Lazarus Surrealist Lab: semantic interactions only.
   Art direction is authored in the two raster assets; no image stacking,
   no vector scenes, no pointer-based depth effects or decorative animation. */
(() => {
  const concepts = {
    threshold: {
      name: 'THE THRESHOLD',
      question: 'Can a single authored image carry the atmosphere?',
      structure: 'Statement → master scene → optional field note.',
      lighting: 'Cool lunar key from the upper left; warm material bounce; depth contained in one raster.',
      tradeoff: 'The image establishes mood, but genuine client work must still provide the evidence.'
    },
    monograph: {
      name: 'UNFOLDING MONOGRAPH',
      question: 'Can editorial pacing make one architectural image worth studying?',
      structure: 'Editorial thesis → uninterrupted plate → annotation.',
      lighting: 'One coherent environment: close stone, midground stair, distant arches and mountains.',
      tradeoff: 'Long creative portfolios still require an indexed, accessible archive of projects.'
    }
  };
  const tabs = [...document.querySelectorAll('[role="tab"][data-concept]')];
  const note = document.getElementById('threshold-dossier');
  const entry = document.getElementById('enter-threshold');
  const close = document.getElementById('close-threshold');
  function closeNote(returnFocus = false) {
    if (note.hidden) return;
    note.hidden = true;
    entry.setAttribute('aria-expanded', 'false');
    if (returnFocus) entry.focus();
  }
  entry.addEventListener('click', () => {
    const shouldOpen = note.hidden;
    note.hidden = !shouldOpen;
    entry.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) close.focus();
  });
  close.addEventListener('click', () => closeNote(true));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNote(true);
  });
  const setText = (id, value) => {
    const target = document.getElementById(id);
    if (target) target.textContent = value;
  };
  function select(slug, focus = false) {
    const c = concepts[slug];
    if (!c) return;
    closeNote();
    for (const tab of tabs) {
      const active = tab.dataset.concept === slug;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById('panel-' + tab.dataset.concept).hidden = !active;
    }
    setText('active-name', c.name);
    setText('concept-question', c.question);
    setText('concept-structure', c.structure);
    setText('concept-motion', c.lighting);
    setText('concept-tradeoff', c.tradeoff);
    if (focus) document.getElementById('tab-' + slug).focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset.concept));
    tab.addEventListener('keydown', e => {
      let next = index;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault();
      select(tabs[next].dataset.concept, true);
    });
  });
  select('threshold');
})();