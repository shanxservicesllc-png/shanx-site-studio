import test from 'node:test';
import assert from 'node:assert/strict';
import {blankDraft} from '../app/draft.js';
import {siteTree,siteCSS,themeCSS} from '../app/themes.js';
import {exportHTML} from '../app/export.js';
function structure(node){return typeof node==='string'?'text':node.tag+'('+node.children.map(structure).join(',')+')';}
test('theme changes semantic structure and preserves original Clean CSS',()=>{
 const draft={...blankDraft(),businessName:'Example',services:[{name:'One',description:'Detail'}]};
 const clean=siteTree(draft);draft.theme='bold-creative';const bold=siteTree(draft);
 assert.notEqual(structure(clean),structure(bold));assert.equal(themeCSS('clean-professional'),siteCSS);assert.notEqual(themeCSS('bold-creative'),siteCSS);
 assert.ok(exportHTML(draft).includes('editorial-services'));assert.ok(!exportHTML(draft).includes('class="cards"'));
});
test('Bold export escapes every field, limits services and uses validated contact destinations',()=>{
 const attack='<script>window.pwned=1</script><img src=x onerror="alert(1)"> & 雪';
 const draft={...blankDraft(),theme:'bold-creative',businessName:attack,description:attack,ctaLabel:attack,email:'javascript:alert(1)',telephone:'javascript:alert(1)',services:Array.from({length:4},()=>({name:attack,description:attack}))};
 const html=exportHTML(draft);assert.ok(!/<script|<img|href="javascript:/.test(html));assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('雪'));assert.equal((html.match(/class="service-row"/g)||[]).length,3);assert.ok(!html.includes('href="tel:'));
 draft.telephone='+1 (555) 123-4567';draft.ctaTarget='phone';assert.ok(exportHTML(draft).includes('href="tel:+15551234567"'));
 assert.ok(!/https?:|@import|url\(/.test(html));
});
