/** Original progressive enhancement. No client facts, network, timer or scroll hijack. */
const entries=[...document.querySelectorAll('[data-entry]')];
const links=[...document.querySelectorAll('[data-entry-link]')];
const status=document.getElementById('record-status');
const available=new Map(entries.map(element=>[element.id,element]));
if(entries.length && links.length && status){
  function selectFromHash(){
    const raw=decodeURIComponent(location.hash.slice(1));
    const selected=available.has(raw)?raw:entries[0].id;
    entries.forEach(entry=>{entry.hidden=entry.id!==selected;});
    links.forEach(link=>{
      if(link.dataset.entryLink===selected) link.setAttribute('aria-current','true');
      else link.removeAttribute('aria-current');
    });
    const active=available.get(selected);
    status.textContent=`Showing ${active.querySelector('.entry-meta')?.textContent||'selected entry'}.`;
  }
  // Preserve all semantic content if module fails before enhancement is attached.
  addEventListener('hashchange',selectFromHash);
  document.documentElement.dataset.enhanced='true';
  selectFromHash();
}
