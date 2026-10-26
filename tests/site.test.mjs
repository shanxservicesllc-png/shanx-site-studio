import test from 'node:test';
import assert from 'node:assert/strict';
import {blankDraft,addService} from '../app/draft.js';
import {emailTarget,phoneTarget,contacts} from '../app/contacts.js';
import {exportHTML,filename} from '../app/export.js';
import {siteTree} from '../app/themes.js';
test('blank state is independent and does not invent a business',()=>{
 const a=blankDraft(),b=blankDraft();assert.equal(a.businessName,'');addService(a);assert.equal(b.services.length,0);
 assert.equal(exportHTML(b).includes('class="service"'),false);
});
test('services are capped at three in editor and export, including bypassed state',()=>{
 const d=blankDraft();for(let i=0;i<3;i++) assert.equal(addService(d),true);
 assert.equal(addService(d),false);d.services=[1,2,3,4].map(n=>({name:'Service '+n,description:''}));
 const html=exportHTML(d);assert.equal((html.match(/class="service"/g)||[]).length,3);assert.ok(!html.includes('Service 4'));
});
test('contact targets use only fixed schemes and reject hostile values',()=>{
 assert.equal(emailTarget(' contact@example.com '),'mailto:contact@example.com');
 assert.equal(phoneTarget('+1 (555) 123-4567'),'tel:+15551234567');
 for(const value of ['javascript:alert(1)','a@b.com?subject=x','a@b.com\nBcc:x','<img>@example.com','a @b.com','a@b..com']) assert.equal(emailTarget(value),null,value);
 for(const value of ['javascript:1','++123','123;456','12','1234567890123456','123x456']) assert.equal(phoneTarget(value),null,value);
 assert.equal(contacts({...blankDraft(),ctaTarget:'phone',email:'a@b.com'}).cta,null);
});
test('all business text is inert, Unicode survives and brief remains private',()=>{
 const d=blankDraft();const attack='<script>window.pwned=1</script><img src=x onerror="alert(1)"> & 雪';
 Object.assign(d,{businessName:attack,description:attack,ctaLabel:attack,email:'javascript:alert(1)',telephone:attack,websiteBrief:'PRIVATE BRIEF'});
 d.services=[{name:attack,description:attack}];
 const html=exportHTML(d);
 assert.ok(!/<script|<img| onerror=/.test(html.replaceAll('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;','')));
 assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('&amp; 雪'));
 assert.ok(!html.includes('PRIVATE BRIEF'));assert.ok(!html.includes('href="javascript:'));
 assert.ok(!html.includes('localStorage'));assert.ok(!html.includes('<script'));
 assert.ok(html.includes('<meta name="viewport"'));assert.ok(html.includes('<style>'));
});
test('export reflects edits and contains only internal or validated contact URLs',()=>{
 const d={...blankDraft(),businessName:'One',email:'a@b.com',telephone:'+1 555 123 4567',ctaLabel:'Contact'};
 let html=exportHTML(d);assert.ok(html.includes('mailto:a@b.com'));assert.ok(html.includes('tel:+15551234567'));
 d.businessName='Two';html=exportHTML(d);assert.ok(html.includes('<h1>Two</h1>'));assert.ok(!html.includes('<h1>One</h1>'));
 for(const match of html.matchAll(/href="([^"]*)"/g)) assert.match(match[1],/^(#|mailto:|tel:)/);
 assert.ok(!/https?:|@import|url\(/.test(html));
 assert.equal(siteTree(d).tag,'div');
});
test('filenames cannot contain paths, markup, or unsafe punctuation',()=>{
 assert.equal(filename('../../<>'),'business-website.html');
 assert.equal(filename('North Star'),'North-Star.html');
 assert.ok(filename('A'.repeat(200)).length<=75);
});
