import {blankDraft,addService,MAX_SERVICES} from './draft.js';
import {contacts} from './contacts.js';
import {renderPreview} from './preview.js';
import {downloadHTML} from './export.js';
const draft=blankDraft();
const $=id=>document.getElementById(id);
function refresh() {
  const links=contacts(draft);
  $('email-hint').textContent=draft.email&&!links.email?'Not a valid email address. Displayed as text only.':'';
  $('phone-hint').textContent=draft.telephone&&!links.phone?'Use 3–15 digits with spaces, +, parentheses, periods or hyphens. Displayed as text only.':'';
  for(const option of $('ctaTarget').options) option.disabled=!links[option.value];
  if(!links.cta && (links.email||links.phone)) draft.ctaTarget=links.email?'email':'phone';
  $('ctaTarget').value=draft.ctaTarget;
  $('ctaTarget').disabled=!links.email&&!links.phone;
  $('cta-hint').textContent=!links.email&&!links.phone?'Add a valid email or phone number to make your contact button clickable.':'Only valid contact destinations are available.';
  $('add-service').disabled=draft.services.length>=MAX_SERVICES;
  renderPreview($('preview'),draft);
}
function serviceFields() {
  $('services').replaceChildren();
  draft.services.forEach((service,index)=>{
    const group=document.createElement('fieldset');group.className='service-editor';
    const legend=document.createElement('legend');legend.textContent='Service '+(index+1);group.append(legend);
    for(const key of ['name','description']) {
      const id='service-'+index+'-'+key;
      const label=document.createElement('label');label.htmlFor=id;label.textContent=key==='name'?'Service name':'Service description';
      const input=document.createElement(key==='name'?'input':'textarea');input.id=id;input.value=service[key];
      if(key==='description') input.rows=2;
      input.addEventListener('input',()=>{service[key]=input.value;refresh();});
      group.append(label,input);
    }
    const remove=document.createElement('button');remove.type='button';remove.className='remove';remove.textContent='Remove service '+(index+1);
    remove.addEventListener('click',()=>{draft.services.splice(index,1);serviceFields();refresh();$('add-service').focus();});
    group.append(remove);$('services').append(group);
  });
}
$('start-form').addEventListener('submit',event=>{
  event.preventDefault();draft.websiteBrief=$('brief').value;$('websiteBrief').value=draft.websiteBrief;
  $('welcome').hidden=true;$('workspace').hidden=false;refresh();$('businessName').focus();
});
for(const key of ['websiteBrief','businessName','description','email','telephone','ctaLabel','ctaTarget']) {
  $(key).addEventListener(key==='ctaTarget'?'change':'input',()=>{draft[key]=$(key).value;refresh();});
}
$('add-service').addEventListener('click',()=>{if(addService(draft)){serviceFields();refresh();$('service-'+(draft.services.length-1)+'-name').focus();}});
$('export').addEventListener('click',()=>{
  try {downloadHTML(draft);$('status').textContent='Download requested. Check your browser downloads for the HTML file. Your page has not been published.';}
  catch {$('status').textContent='Download could not start. Allow downloads in your browser, then try again. Your current edits are still here.';}
});
