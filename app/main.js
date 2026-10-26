import {blankDraft,addService,MAX_SERVICES} from './draft.js';
import {contacts} from './contacts.js';
import {renderPreview} from './preview.js';
import {downloadHTML} from './export.js';
import {readDraft,saveDraft,clearDraft} from './storage.js';
const restored=readDraft();
let draft=restored.draft;
const $=id=>document.getElementById(id);
function refresh(persist=true) {
  const links=contacts(draft);
  $('email-hint').textContent=draft.email&&!links.email?'Not a valid email address. Displayed as text only.':'';
  $('phone-hint').textContent=draft.telephone&&!links.phone?'Use 3–15 digits with spaces, +, parentheses, periods or hyphens. Displayed as text only.':'';
  for(const option of $('ctaTarget').options) option.disabled=!links[option.value];
  if(!links.cta && (links.email||links.phone)) draft.ctaTarget=links.email?'email':'phone';
  $('ctaTarget').value=draft.ctaTarget;
  $('ctaTarget').disabled=!links.email&&!links.phone;
  $('cta-hint').textContent=!links.email&&!links.phone?'Add a valid email or phone number to make your contact button clickable.':'Only valid contact destinations are available.';
  $('add-service').disabled=draft.services.length>=MAX_SERVICES;
  $('preview-theme').textContent=draft.theme==='bold-creative'?'Bold Creative':'Clean Professional';
  renderPreview($('preview'),draft);
  if(persist) $('save-status').textContent=saveDraft(draft)?'Draft saved on this browser.':'Draft not saved. Keep this tab open and export your work; changes may not survive closing.';
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
for(const key of ['websiteBrief','businessName','description','email','telephone','ctaLabel','ctaTarget','theme']) {
  $(key).addEventListener(['ctaTarget','theme'].includes(key)?'change':'input',()=>{draft[key]=$(key).value;refresh();});
}
$('add-service').addEventListener('click',()=>{if(addService(draft)){serviceFields();refresh();$('service-'+(draft.services.length-1)+'-name').focus();}});
$('export').addEventListener('click',()=>{
  try {downloadHTML(draft);$('status').textContent='Download requested. Check your browser downloads for the HTML file. Your page has not been published.';}
  catch {$('status').textContent='Download could not start. Allow downloads in your browser, then try again. Your current edits are still here.';}
});
$('clear-data').addEventListener('click',()=>{
  if(!window.confirm('Clear the saved draft and reset this editor? Previously downloaded HTML files will remain.')) return;
  if(!clearDraft()) {
    $('save-status').textContent='Saved data could not be cleared. Your current edits are preserved. Allow browser storage and try again.';
    return;
  }
  draft=blankDraft();fillFields();$('brief').value='';
  $('workspace').hidden=true;$('welcome').hidden=false;
  $('save-status').textContent='Saved draft cleared. Downloaded HTML files were not removed.';
  $('status').textContent='';refresh(false);$('brief').focus();
});
function fillFields() {
  for(const key of ['websiteBrief','businessName','description','email','telephone','ctaLabel','ctaTarget','theme']) $(key).value=draft[key];
  serviceFields();
}
fillFields();
$('save-status').textContent=restored.warning || (restored.found?'Saved draft restored on this browser.':'Your draft will save on this browser as you edit.');
if(restored.found) {$('welcome').hidden=true;$('workspace').hidden=false;refresh(false);}
