/**
 * Original scroll coordination primitive (no CSS opinions, no forced pinning).
 * Feed its progress to one state model; never derive independent phase clocks.
 */
export const clamp01 = n => Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));

/** Measures a sticky-stage outer wrapper against its viewport.
 * A non-scrollable section reaches 1 only after its top passes the viewport.
 */
export function stageProgress({top,height}, viewportHeight) {
  const travel=Math.max(0,height-viewportHeight);
  if(travel===0) return top<=0 ? 1 : 0;
  return clamp01(-top/travel);
}
export function activePhase(progress,count) {
  if(!Number.isInteger(count) || count<1) throw new RangeError('At least one phase is required');
  return Math.min(count-1,Math.round(clamp01(progress)*(count-1)));
}

/** Browser adapter: one passive scroll handler and at most one scheduled frame.
 * User code owns full reduced-motion/without-JS content and any optional sticky layout.
 */
export function observeStageProgress({element,onChange,win=window,doc=document}={}) {
  if(!element || typeof element.getBoundingClientRect!=='function' || typeof onChange!=='function')
    throw new TypeError('element and onChange callback are required');
  let frame=null, destroyed=false, prev=-1;
  const measure=()=>{
    frame=null;
    if(destroyed || doc.hidden) return;
    const progress=stageProgress(element.getBoundingClientRect(),win.innerHeight);
    if(progress!==prev){prev=progress;onChange(progress);}
  };
  const schedule=()=>{
    if(destroyed || frame!==null || doc.hidden)return;
    frame=win.requestAnimationFrame(measure);
  };
  const onVisibility=()=>{if(!doc.hidden)schedule();};
  win.addEventListener('scroll',schedule,{passive:true});
  win.addEventListener('resize',schedule,{passive:true});
  doc.addEventListener('visibilitychange',onVisibility);
  schedule();
  return ()=>{
    destroyed=true;
    win.removeEventListener('scroll',schedule);
    win.removeEventListener('resize',schedule);
    doc.removeEventListener('visibilitychange',onVisibility);
    if(frame!==null) win.cancelAnimationFrame(frame);
    frame=null;
  };
}
