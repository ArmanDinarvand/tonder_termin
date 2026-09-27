'use strict';
(()=>{
 const input=document.getElementById('release'),status=document.getElementById('settings-status');
 input.value=BookingTest.localDateTime(new Date(Date.now()+60000));
 const previous=BookingTest.read();if(previous?.config)status.textContent='Gespeicherte Freigabe: '+new Date(previous.config.releaseAt).toLocaleString('de-DE');
 function save(quick){try{const releaseAt=quick?Date.now()+30000:new Date(input.value).getTime();const state=BookingTest.fresh({releaseAt,duration:300,failures:Number(document.getElementById('failures').value),failureMode:'conflict',times:BookingTest.defaultTimes});state.scheduleId=Date.now()+'-'+Math.random().toString(16).slice(2);localStorage.setItem(BookingTest.key+'-schedule',JSON.stringify(state));input.value=BookingTest.localDateTime(new Date(releaseAt));status.textContent='Freigabe gespeichert: '+new Date(releaseAt).toLocaleString('de-DE')+'. Die Terminseite erkennt sie beim nächsten Neuladen.';}catch(error){status.textContent=error.message;}}
 document.getElementById('save').addEventListener('click',()=>save(false));document.getElementById('quick').addEventListener('click',()=>save(true));
})();
