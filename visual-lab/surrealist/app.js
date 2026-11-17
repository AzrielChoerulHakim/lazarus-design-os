/* Surrealist Field Lab 01 — original, dependency-free interactions.
   No unverified client facts, analytics, network requests or forced scroll. */
(() => {
  const tabs = Array.from(document.querySelectorAll('[role="tab"][data-concept]'));
  const concepts = {
    threshold: {
      title: 'THE THRESHOLD',
      question: 'Can navigation feel like crossing a threshold?',
      structure: 'Arrival → world → intentional entry → documented work.',
      motion: 'Subtle depth reinforces a spatial relationship; clicking opens an evidence dossier.',
      tradeoff: 'A large atmospheric scene has a real performance cost; the text and dossier must stand without it.'
    },
    monograph: {
      title: 'UNFOLDING MONOGRAPH',
      question: 'Could a portfolio behave like a collectible art publication?',
      structure: 'Editorial statement → plate → spread sequence → individual work.',
      motion: 'Page turning indicates a new reading unit; no scroll trap or autoplay is needed.',
      tradeoff: 'Strong authorship and tactile detail, but longer material needs a searchable project index.'
    }
  };
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  const entryButton = document.getElementById('enter-threshold');
  const closeButton = document.getElementById('close-threshold');
  const dossier = document.getElementById('threshold-dossier');

  function closeDossier(returnFocus = false) {
    if (dossier.hidden) return;
    dossier.hidden = true;
    entryButton.setAttribute('aria-expanded', 'false');
    document.getElementById('panel-threshold').classList.remove('is-entered');
    if (returnFocus) entryButton.focus();
  }
  entryButton.addEventListener('click', () => {
    if (!dossier.hidden) {
      closeDossier(true);
      return;
    }
    dossier.hidden = false;
    entryButton.setAttribute('aria-expanded', 'true');
    document.getElementById('panel-threshold').classList.add('is-entered');
    closeButton.focus();
  });
  closeButton.addEventListener('click', () => closeDossier(true));

  function selectConcept(slug, focusTab = false) {
    if (!concepts[slug]) return;
    closeDossier();
    for (const tab of tabs) {
      const selected = tab.dataset.concept === slug;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById('panel-' + tab.dataset.concept);
      panel.hidden = !selected;
    }
    const concept = concepts[slug];
    setText('active-name', concept.title);
    setText('concept-question', concept.question);
    setText('concept-structure', concept.structure);
    setText('concept-motion', concept.motion);
    setText('concept-tradeoff', concept.tradeoff);
    if (focusTab) document.getElementById('tab-' + slug).focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectConcept(tab.dataset.concept));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectConcept(tabs[next].dataset.concept, true);
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dossier.hidden) {
      closeDossier(true);
    }
  });

  /* The monograph has a finite, keyboard-accessible spread navigation. */
  const monograph = document.getElementById('panel-monograph');
  const previous = document.getElementById('monograph-prev');
  const next = document.getElementById('monograph-next');
  let page = 1;
  function showPage(number) {
    page = Math.max(1, Math.min(2, number));
    monograph.dataset.page = String(page);
    previous.disabled = page === 1;
    next.disabled = page === 2;
    setText('monograph-counter', 'SPREAD 0' + page + ' / 02');
  }
  previous.addEventListener('click', () => showPage(page - 1));
  next.addEventListener('click', () => showPage(page + 1));

  /* Restrained spatial response only for hover-capable desktops.
     The parallax has no bearing on accessible text or project selection. */
  const portal = document.getElementById('panel-threshold');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  portal.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || reducedMotion.matches) return;
    const rect = portal.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    portal.style.setProperty('--px', x.toFixed(3));
    portal.style.setProperty('--py', y.toFixed(3));
  });
  portal.addEventListener('pointerleave', () => {
    portal.style.setProperty('--px', '0');
    portal.style.setProperty('--py', '0');
  });
  selectConcept('threshold');
  showPage(1);
})();