(function () {
  'use strict';
  const studies = Array.isArray(window.LAZARUS_STUDIES) ? window.LAZARUS_STUDIES : [];
  const list = document.getElementById('study-list');
  const detail = document.getElementById('study-detail');
  const counter = document.getElementById('result-count');
  const search = document.getElementById('atlas-search');
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  let activeCategory = 'All';
  let selectedId = studies.length ? studies[0].id : null;

  function node(tag, className, value) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined) el.textContent = String(value);
    return el;
  }
  function field(name, value) {
    const wrap = node('div', 'detail-field');
    wrap.append(node('span', 'detail-label', name), node('p', 'detail-value', value));
    return wrap;
  }
  function currentResults() {
    const query = search.value.trim().toLocaleLowerCase();
    return studies.filter(function (s) {
      const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
      const corpus = [s.title, s.subtitle, s.category, s.stack, s.mechanism, s.use, s.warning, s.method].join(' ').toLocaleLowerCase();
      return matchesCategory && (!query || corpus.includes(query));
    });
  }
  function paintDetail(item) {
    detail.replaceChildren();
    if (!item) {
      detail.append(node('h3', '', 'Nothing matches.'), node('p', 'detail-deck', 'Try a broader term or choose All to explore the full archive.'));
      return;
    }
    const top = node('div', 'detail-top');
    top.append(node('span', 'detail-index', 'STUDY / ' + item.id), node('span', 'detail-context', item.stack));
    const heading = node('h3', '', item.title);
    heading.id = 'detail-title';
    const subtitle = node('p', 'detail-deck', item.subtitle);
    detail.append(top, heading, subtitle);
    detail.append(
      field('THE MECHANISM', item.mechanism),
      field('WHEN TO USE IT', item.use),
      field('WHAT NOT TO COPY', item.warning),
      field('TRANSFER THE METHOD', item.method)
    );
    const a = node('a', 'detail-link', 'READ TECHNICAL NOTE ↗');
    a.href = 'https://github.com/AzrielChoerulHakim/lazarus-design-os/blob/main/' + item.note;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    detail.append(a);
  }
  function selectStudy(id, scrollOnMobile) {
    selectedId = id;
    const found = studies.find(function (s) { return s.id === selectedId; });
    Array.from(list.querySelectorAll('button')).forEach(function (b) {
      b.setAttribute('aria-current', String(b.dataset.id === selectedId));
    });
    paintDetail(found);
    if (scrollOnMobile && window.matchMedia('(max-width:820px)').matches) {
      document.getElementById('detail-shell').scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }
  function render() {
    const visible = currentResults();
    if (!visible.some(function (s) { return s.id === selectedId; })) selectedId = visible.length ? visible[0].id : null;
    counter.textContent = visible.length + ' / ' + studies.length + ' STUDIES';
    list.replaceChildren();
    if (!visible.length) list.append(node('p', 'empty', 'No studies matched. Clear the search or change the filter.'));
    visible.forEach(function (item) {
      const button = node('button', 'study-button');
      button.type = 'button';
      button.dataset.id = item.id;
      button.setAttribute('aria-current', String(item.id === selectedId));
      button.setAttribute('aria-label', 'Open ' + item.title + ' study');
      const main = node('span', 'study-main');
      main.append(node('span', 'study-title', item.title), node('span', 'study-subtitle', item.subtitle), node('span', 'study-tag', item.category.toUpperCase()));
      button.append(node('span', 'study-num', item.id), main, node('span', 'study-arrow', '↗'));
      button.addEventListener('click', function () { selectStudy(item.id, true); });
      list.append(button);
    });
    paintDetail(visible.find(function (s) { return s.id === selectedId; }));
  }
  search.addEventListener('input', render);
  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      activeCategory = button.dataset.filter;
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
      render();
    });
  });
  render();
})();
