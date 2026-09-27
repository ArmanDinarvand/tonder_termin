'use strict';
const BookingTest=(()=>{
 const key='seite100-v2';
 const past=['2026-10-01','2026-10-06','2026-10-08','2026-10-27','2026-10-29','2026-11-03','2026-11-05','2026-11-10','2026-11-12','2026-11-17','2026-11-19','2026-11-24'];
 const dates=['2026-11-26','2026-12-01','2026-12-03','2026-12-08'];
 const ids=['telephone','email','field12433','field12508','field11321','field12539','field11295','field12499','field12537','field12538','field12540','field12510','field12541'];
 const defaultTimes=['09:30','09:45','10:15','10:30','11:00','11:15','11:45'];
 function phase(state,now=Date.now()){if(state?.receipt)return 'booked';if(!state?.config)return 'idle';if(now<state.config.releaseAt)return 'waiting';return now<state.config.releaseAt+state.config.duration*1000?'open':'expired';}
 function parseTimes(text){const times=[...new Set(text.split(',').map(t=>t.trim()))];if(!times.length||times.length>40||times.some(t=>!/^([01]\d|2[0-3]):[0-5]\d$/.test(t)))throw Error('Uhrzeiten im Format 10:15 eingeben (maximal 40).');return times.sort();}
 function fresh(config,now=Date.now()){
  if(!Number.isFinite(config.releaseAt)||config.releaseAt<=now)throw Error('Bitte eine Freigabezeit in der Zukunft wählen.');
  if(!Number.isInteger(config.duration)||config.duration<1||config.duration>3600)throw Error('Das Buchungsfenster muss 1–3600 Sekunden betragen.');
  if(!Number.isInteger(config.failures)||config.failures<0||config.failures>100)throw Error('Fehlversuche müssen zwischen 0 und 100 liegen.');
  if(!['conflict','unknown'].includes(config.failureMode))throw Error('Unbekannte Fehlerart.');
  const times=parseTimes(config.times.join(','));
  return {config:{...config,times},blocked:[],attempts:0,selected:null,receipt:null,error:null,events:[{at:now,message:'Freigabe eingestellt.'}]};
 }
 function canSelect(state,date,time,now=Date.now()){return phase(state,now)==='open'&&dates.includes(date)&&state.config.times.includes(time)&&!state.blocked.includes(date+'|'+time);}
 function select(state,date,time,now=Date.now()){
  if(!canSelect(state,date,time,now))throw Error('Dieser Termin ist nicht verfügbar.');
  state.selected={date,time,at:now};state.error=null;state.events.push({at:now,message:'Termin '+date+' '+time+' ausgewählt.'});return state;
 }
 function commit(state,now=Date.now()){
  if(state.receipt)return 'success';
  if(!state.selected||!canSelect(state,state.selected.date,state.selected.time,now)){state.error='expired';return 'error';}
  state.attempts++;
  if(state.attempts<=state.config.failures){state.error=state.config.failureMode;state.blocked.push(state.selected.date+'|'+state.selected.time);state.events.push({at:now,message:'Versuch '+state.attempts+': '+(state.error==='conflict'?'Termin inzwischen vergeben.':'Unklare Antwort.')});state.selected=null;return 'error';}
  state.receipt={...state.selected,confirmedAt:now,attempts:state.attempts};state.events.push({at:now,message:'Buchung bestätigt.'});return 'success';
 }
 function read(){try{const schedule=JSON.parse(localStorage.getItem(key+'-schedule'));if(!schedule)return null;const current=JSON.parse(sessionStorage.getItem(key));const state=current?.scheduleId===schedule.scheduleId?current:schedule;if(state.config)state.config.times=[...defaultTimes];return state;}catch{return null;}}
 function save(state){sessionStorage.setItem(key,JSON.stringify(state));}
 function localDateTime(date){return new Date(date.getTime()-date.getTimezoneOffset()*60000).toISOString().slice(0,19);}
 function dateLabel(date){const d=new Date(date+'T12:00:00'),day=d.getDate();const suffix=day%100>=11&&day%100<=13?'ᵗʰ':({1:'ˢᵗ',2:'ⁿᵈ',3:'ʳᵈ'}[day%10]||'ᵗʰ');return d.toLocaleDateString('en-US',{weekday:'long'})+' '+d.toLocaleDateString('en-US',{month:'long'})+' '+day+suffix+', '+d.getFullYear();}
 return {key,past,dates,ids,defaultTimes,phase,parseTimes,fresh,canSelect,select,commit,read,save,localDateTime,dateLabel};
})();
if(typeof module!=='undefined')module.exports=BookingTest;
