'use strict';
const form=document.getElementById('mainForm');
form.addEventListener('submit',event=>{event.preventDefault();const fields=[...form.querySelectorAll('[aria-required="true"]')];for(const field of fields)field.required=true;if(!form.reportValidity())return;document.getElementById('preview-status').textContent='Test completed. Selected country: '+document.getElementById('dialCode').selectedOptions[0].textContent+'. No booking was sent.';});
