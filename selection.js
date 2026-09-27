'use strict';
const byId=id=>document.getElementById(id);
let state=BookingTest.read();
function draw(){
 byId('past-days').replaceChildren();byId('future-days').replaceChildren();
 for(const date of BookingTest.past){const row=document.createElement('div');row.className='day';const name=document.createElement('span');name.textContent=BookingTest.dateLabel(date);const warning=document.createElement('span');warning.className='warning';warning.textContent='⚠ No more available time slots';row.append(name,warning);byId('past-days').append(row);}
 for(const date of BookingTest.dates){
  const day=document.createElement('details');day.className='appointment-day';day.dataset.date=date;day.open=false;
  const summary=document.createElement('summary');const name=document.createElement('span');name.textContent=BookingTest.dateLabel(date);const availability=document.createElement('span');availability.className='warning availability';summary.append(name,availability);day.append(summary);
  const slots=document.createElement('div');slots.className='slots';
  let hour=null,row=null;
  for(const time of BookingTest.defaultTimes){if(time.slice(0,2)!==hour){hour=time.slice(0,2);row=document.createElement('div');row.className='slot-row';slots.append(row);}const button=document.createElement('button');button.type='button';button.textContent=Number(hour)+':'+time.slice(3)+' a.m.';button.dataset.date=date;button.dataset.time=time;button.disabled=true;
   button.addEventListener('click',()=>{try{state=BookingTest.read();BookingTest.select(state,date,time);BookingTest.save(state);location.href='ContactInfo-Test.html';}catch(error){byId('status').textContent=error.message;}});row.append(button);}
  day.append(slots);byId('future-days').append(day);
 }
 byId('events').replaceChildren();for(const event of state?.events||[]){const li=document.createElement('li');li.textContent=new Date(event.at).toLocaleTimeString('de-DE')+' — '+event.message;byId('events').append(li);}
 tick();
}
function tick(){
 state=BookingTest.read();
 const now=Date.now(),phase=BookingTest.phase(state,now);
 for(const button of document.querySelectorAll('.slots button')){const disabled=!BookingTest.canSelect(state,button.dataset.date,button.dataset.time,now);if(button.disabled!==disabled)button.disabled=disabled;}
 for(const day of document.querySelectorAll('.appointment-day')){const available=!!day.querySelector('button:not(:disabled)');const label=day.querySelector('.availability');const className=available?'availability available':'availability warning';const text=available?'Available':phase==='expired'||phase==='booked'||phase==='open'?'⚠ No more available time slots':'⚠ Not open for booking';if(label.className!==className)label.className=className;if(label.textContent!==text)label.textContent=text;}
 const status=phase==='booked'?'Your appointment has already been booked.':'';if(byId('status').textContent!==status)byId('status').textContent=status;
}
window.addEventListener('pageshow',()=>{state=BookingTest.read();draw();});draw();

window.addEventListener('storage',event=>{if(event.key===BookingTest.key+'-schedule'||event.key===null)tick();});
window.addEventListener('focus',tick);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
setInterval(tick,250);
