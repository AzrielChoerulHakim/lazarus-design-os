/* Lazarus Design OS — optional sculptural impasto comparative lab.
   This file controls information state only. The entire scene is a single raster
   file; no vector scene, stacked images, parallax or simulated painting effects. */
(() => {
  const paintings = {
    dissolution: {
      file: "assets/study-dissolution.webp",
      alt: "Original sculptural impasto study: a moonlit colonnade liquefies into heavy flowing pigments under an indigo sky."
    },
    procession: {
      file: "assets/study-procession.webp",
      alt: "Original impasto study: multiple stone arches progressively turn into long mineral ribbons of thick ochre paint."
    },
    horizon: {
      file: "assets/study-horizon.webp",
      alt: "Original impasto study: a monumental stone stair climbs toward a sea suspended in the sky above distant mountains."
    }
  };
  const layouts = {
    gallery: {
      thesis: "A gallery treats the painting as a complete featured work.",
      reading: "Statement → single painting → research register → quiet closing.",
      risk: "An image-led approach can conceal dense professional credentials."
    },
    folio: {
      thesis: "A folio begins with an indexed record, then an independent painting plate.",
      reading: "Research index → entire plate → description → next reading action.",
      risk: "An illustrative plate can be mistaken for verified professional evidence."
    },
    passage: {
      thesis: "A passage lets the whole painting mark a chapter change.",
      reading: "Thesis → uninterrupted image → three editorial chapters → close.",
      risk: "A sequential narrative can bury urgent projects or contact information."
    }
  };
  const tabs = [...document.querySelectorAll('.tabs [role="tab"]')];
  const select = document.getElementById('painting-select');
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  function chooseLayout(id, focus = false) {
    const info = layouts[id];
    if (!info) return;
    for (const tab of tabs) {
      const chosen = tab.dataset.layout === id;
      tab.setAttribute('aria-selected', String(chosen));
      tab.tabIndex = chosen ? 0 : -1;
      document.getElementById('panel-' + tab.dataset.layout).hidden = !chosen;
    }
    setText('mapping-thesis', info.thesis);
    setText('mapping-reading', info.reading);
    setText('mapping-risk', info.risk);
    if (focus) document.getElementById('tab-' + id).focus();
  }
  function choosePainting(id) {
    const art = paintings[id];
    if (!art) return;
    for (const img of document.querySelectorAll('img.master-image')) {
      img.src = art.file;
      img.alt = art.alt;
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => chooseLayout(tab.dataset.layout));
    tab.addEventListener('keydown', event => {
      let destination = index;
      if (event.key === 'ArrowRight') destination = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') destination = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') destination = 0;
      else if (event.key === 'End') destination = tabs.length - 1;
      else return;
      event.preventDefault();
      chooseLayout(tabs[destination].dataset.layout, true);
    });
  });
  select.addEventListener('change', () => choosePainting(select.value));
  chooseLayout('gallery');
  choosePainting(select.value);
})();