import { activePhase, observeStageProgress } from '../../lib/scroll-progress.mjs';
const container=document.getElementById('journey');
const steps=[...document.querySelectorAll('[data-phase]')];
const label=document.getElementById('current-phase');
const bar=document.getElementById('progress-fill');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let cleanup=null;
function reset(){
  if(cleanup){cleanup();cleanup=null;}
  steps.forEach(li=>li.classList.remove('is-active'));
  label.textContent='All four stages are available in the document.';
  bar.style.width='0%';
}
function start(){
  reset();
  if(reduced.matches || !container || !steps.length)return;
  let selected=-1;
  cleanup=observeStageProgress({element:container,onChange:p=>{
    const index=activePhase(p,steps.length);
    bar.style.width=`${Math.round(p*100)}%`;
    if(index===selected)return;
    selected=index;
    steps.forEach((li,i)=>li.classList.toggle('is-active',i===selected));
    const title=steps[selected].querySelector('h3')?.textContent||'Selected stage';
    label.textContent=`${selected+1} of ${steps.length}: ${title}`;
  }});
}
reduced.addEventListener('change',start);
start();
