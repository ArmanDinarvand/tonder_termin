'use strict';
(()=>{
 const byId=id=>document.getElementById(id),state=BookingTest.read();
 const status=document.createElement('p');status.id='contact-status';status.setAttribute('role','status');form.prepend(status);
 const old=byId('submit-btn'),confirm=old.cloneNode(true);old.replaceWith(confirm);byId('confirmation').hidden=true;
 if(state?.receipt){location.replace('Success.html');return;}
 if(!state?.selected){status.textContent='Please select an appointment first.';confirm.disabled=true;const back=document.createElement('a');back.href='index.html';back.textContent='Select another time';status.append(' ',back);return;}
 document.querySelector('h1').textContent='Time: '+BookingTest.dateLabel(state.selected.date)+' at '+state.selected.time;
 for(const id of BookingTest.ids){const field=byId(id);if(id!=='telephone')field.required=true;if(['email','field12499','field12541'].includes(id))field.type='email';}
 let submitted=false;
 confirm.addEventListener('click',()=>{
  if(submitted)return;
  if(!form.reportValidity()){status.textContent='Please complete all mandatory fields.';return;}
  submitted=true;confirm.disabled=true;
  try{
   const current=BookingTest.read();if(!current)throw Error('Test session missing.');
   const dial=byId('dialCode');
   const submittedFields=[{label:'Country calling code',value:dial.selectedOptions[0].textContent},...fields.map(([id,label])=>({label,value:byId(id).value}))];
   const outcome=BookingTest.commit(current);
   if(outcome==='success')current.receipt.submittedFields=submittedFields;
   BookingTest.save(current);location.href=outcome==='success'?'Success.html':'ErrorPage.html';
  }
  catch{status.textContent='An unexpected error occurred. Booking status is unknown. Please check before trying again.';}
 });
})();
