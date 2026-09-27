'use strict';
(()=>{
 const state=BookingTest.read(),byId=id=>document.getElementById(id);
 if(byId('booking-success')){
  if(!state?.receipt){byId('missing-result').hidden=false;return;}
  const receipt=state.receipt;byId('booking-success').hidden=false;
  byId('booked-time').textContent=BookingTest.dateLabel(receipt.date)+' at '+receipt.time;
  byId('metrics').textContent=receipt.attempts+' Versuch(e) · Freigabe bis Bestätigung: '+((receipt.confirmedAt-state.config.releaseAt)/1000).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' Sekunden.';return;
 }
 if(state?.receipt){location.replace('Success.html');return;}
 const conflict=state?.error==='conflict';
 byId('booking-error').textContent=conflict?'The time you have chosen has unfortunately just been booked by another person. Please select a new time.':state?.error==='expired'?'No more available time slots. The booking window has expired.':'An unexpected error occurred. Booking status is unknown.';
 byId('otherTime').hidden=!conflict;byId('otherTime').addEventListener('click',()=>{location.href='index.html';});byId('manual-back').hidden=conflict;
 byId('error-help').textContent=conflict?'Please select another available time.':'Please check your booking status before trying again.';
})();
