(() => {
  'use strict';
  const directions = [
    {id:1,title:'The Monograph',question:'What if the portfolio read like a single authored book?',structure:'A volume with a typographic opening, photographic plate, chapter index and long-form essays. Reading replaces the familiar hero–cards–CTA skeleton.',interaction:'Chapter navigation, accessible table of contents and deep links to complete editorial case studies.',tradeoff:'Strong authorship and a slow, considered rhythm; less suited to visitors who need instant project filtering.'},
    {id:2,title:'Cartography',question:'What if geography—not the project card—were the navigation?',structure:'Geographic project field plus a linked site directory. Visitors navigate by location, climate and spatial context rather than by chronological thumbnail grid.',interaction:'Selecting a place updates the map’s active pin and a corresponding project dossier.',tradeoff:'Powerful when geography matters, but needs verified location data and a linear alternative to any map.'},
    {id:3,title:'Film Sequence',question:'What if the practice were understood through one unfolding story?',structure:'A series of cinematic project chapters with one immersive composition on screen at a time, contextual annotation and intentional progression.',interaction:'Chapter selector changes narrative and scene. Production might use actual client footage or photography, but never mandatory autoplay.',tradeoff:'Memorable when the client owns exceptional visuals; weak without genuinely strong media or on low bandwidth.'},
    {id:4,title:'Blueprint',question:'What if a portfolio behaved like an archive of decisions?',structure:'Working document interface: hierarchical folders, enlarged drawings, file-specific metadata and technical annotations. No promotional hero required.',interaction:'Browse project files; selected drawing and factual specification panel remain synchronized.',tradeoff:'Strong for detail-oriented audiences and documented technical work; can alienate first-time visitors unless the hierarchy is simple.'},
    {id:5,title:'Public Index',question:'What if the work spoke in plain, public-facing language?',structure:'A civic poster + concise searchable project ledger. Prioritizes type, category, year, and outcomes instead of a photographic grid.',interaction:'Scan or select a project row; the active project summary is updated immediately.',tradeoff:'Brave, fast and information-dense; may be too assertive for a practice seeking quiet domestic intimacy.'},
    {id:6,title:'Object Gallery',question:'What if every project were examined as a physical artifact?',structure:'Museum-like single-object display, measured captions and spatial studies. Visitors inspect one item deeply instead of many shallow cards.',interaction:'Choose object number to update the displayed artifact and museum label.',tradeoff:'Good for designed objects, models and process documentation; demands authentic detailed assets and careful 3D performance.'},
    {id:7,title:'Material Journal',question:'What if the process became the protagonist?',structure:'A journal of material experiments, sketches and light studies. Projects emerge through their making rather than appearing as finished facades.',interaction:'Read material sequences and connect experiments to completed client case studies.',tradeoff:'Rich intellectual identity for research-led studios, but risks under-selling finished work unless cross-referenced.'}
  ];
  const stage = document.getElementById('stage');
  const title = document.getElementById('selected-title');
  const counter = document.getElementById('selected-counter');
  const buttons = Array.from(document.querySelectorAll('.choice-strip button'));
  const fromURL = Number(new URLSearchParams(window.location.search).get('concept'));
  let selected = Number.isInteger(fromURL) && fromURL >= 1 && fromURL <= 7 ? fromURL : 1;

  function show(id) {
    if (id < 1) id = 7;
    if (id > 7) id = 1;
    const template = document.getElementById('view-' + id);
    const def = directions[id - 1];
    if (!template || !def) return;
    stage.replaceChildren(template.content.cloneNode(true));
    selected = id;
    title.textContent = String(id).padStart(2, '0') + ' — ' + def.title;
    counter.textContent = String(id).padStart(2, '0') + ' / 07';
    for (const [key, value] of Object.entries({
      'concept-question':def.question,
      'concept-structure':def.structure,
      'concept-interaction':def.interaction,
      'concept-tradeoff':def.tradeoff
    })) document.getElementById(key).textContent = value;
    buttons.forEach(button => { button.setAttribute('aria-pressed', String(Number(button.dataset.id) === id)); });
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('concept', id);
      window.history.replaceState(null, '', url);
    } catch (_) { /* still works as a local file */ }
    wireLocalInteraction(id);
  }
  function wireLocalInteraction(id) {
    if (id === 2) {
      const labels = {a:'RUMAH SORE',b:'PAVILIUN UTARA',c:'RUANG PANTAI',d:'STUDIO TANAH'};
      const places = Array.from(stage.querySelectorAll('[data-map]'));
      places.forEach(place => place.addEventListener('click', () => {
        places.forEach(p => p.classList.toggle('active', p === place));
        stage.querySelectorAll('[data-pin]').forEach(pin => pin.classList.toggle('active', pin.dataset.pin === place.dataset.map));
        stage.querySelector('#map-readout').textContent = 'SELECTED: ' + labels[place.dataset.map];
      }));
    }
    if (id === 3) {
      const chapters=[
        ['The hour<br><em>between.</em>','A house that belongs as much to its shadows as to its walls.'],
        ['The space<br><em>in passing.</em>','A threshold that changes with the movement of its people.'],
        ['Where light<br><em>returns.</em>','An architecture that allows the day to remain visible.']
      ];
      stage.querySelectorAll('[data-film]').forEach(button => button.addEventListener('click', () => {
        const n = Number(button.dataset.film);
        const h = stage.querySelector('#film-title');
        // markup is constant, authored locally and never derived from user input
        h.innerHTML = chapters[n][0];
        stage.querySelector('#film-description').textContent = chapters[n][1];
        stage.querySelector('#film-part').textContent = String(n + 1).padStart(2,'0');
        stage.querySelector('.con-film').dataset.phase = n;
        stage.querySelectorAll('[data-film]').forEach(b => b.classList.toggle('active',b === button));
      }));
    }
    if (id === 4) {
      const names=[
        ['RS_024 / SECTION A—A','RUMAH SORE','RS-024/A','CAST CONCRETE, TIMBER'],
        ['PU_025 / ELEVATION B—B','PAVILIUN UTARA','PU-025/B','RECYCLED STEEL, GLASS'],
        ['RP_023 / SECTION C—C','RUANG PANTAI','RP-023/C','STONE, VENTILATED WOOD'],
        ['ST_026 / ELEVATION A—A','STUDIO TANAH','ST-026/A','EARTH BLOCK, TERRAZZO']
      ];
      stage.querySelectorAll('[data-blue]').forEach(b=>b.addEventListener('click',()=>{
        const [file,project,num,material]=names[Number(b.dataset.blue)];
        stage.querySelector('#blue-file-label').textContent=file;
        stage.querySelector('#blue-project').textContent=project;
        stage.querySelector('#blue-number').textContent=num;
        stage.querySelector('#blue-material').textContent=material;
        stage.querySelectorAll('[data-blue]').forEach(el=>el.classList.toggle('active',el===b));
      }));
    }
    if (id === 5) {
      const categories=['RUMAH SORE — RESIDENTIAL','PAVILIUN UTARA — PUBLIC','RUANG PANTAI — COASTAL','STUDIO TANAH — WORKPLACE'];
      stage.querySelectorAll('[data-public]').forEach(b=>b.addEventListener('click',()=>{
        stage.querySelector('#public-readout').textContent=categories[Number(b.dataset.public)];
        stage.querySelectorAll('[data-public]').forEach(el=>el.classList.toggle('active',el===b));
      }));
    }
    if (id === 6) {
      const names=[
        ['House of<br><i>afternoon.</i>','A model study on the relationship between shadow, threshold and domestic time.'],
        ['Pavilion of<br><i>quiet use.</i>','A civic structure considered through weight, repetition and approach.'],
        ['Room for<br><i>the weather.</i>','A coastal experiment in opening, enclosure and light.']
      ];
      stage.querySelectorAll('[data-object]').forEach(b=>b.addEventListener('click',()=>{
        let n=Number(b.dataset.object);
        stage.querySelector('#object-title').innerHTML=names[n][0];
        stage.querySelector('#object-desc').textContent=names[n][1];
        stage.querySelector('.con-object').dataset.object=n;
        stage.querySelectorAll('[data-object]').forEach(el=>el.classList.toggle('active',el===b));
      }));
    }
  }
  buttons.forEach(button=>button.addEventListener('click',()=>show(Number(button.dataset.id))));
  document.getElementById('prev').addEventListener('click',()=>show(selected-1));
  document.getElementById('next').addEventListener('click',()=>show(selected+1));
  window.addEventListener('keydown',event=>{
    const active = document.activeElement;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || (active && ['INPUT','TEXTAREA','SELECT'].includes(active.tagName))) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); show(selected + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(selected - 1); }
  });
  window.addEventListener('popstate',()=>{
    const num=Number(new URLSearchParams(window.location.search).get('concept'));
    if(num>=1&&num<=7)show(num);
  });
  show(selected);
})();
