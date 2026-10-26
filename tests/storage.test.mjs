import test from 'node:test';
import assert from 'node:assert/strict';
import {blankDraft,validateDraft} from '../app/draft.js';
import {STORAGE_KEY,readDraft,saveDraft,clearDraft} from '../app/storage.js';
function memory() {const data=new Map();return {data,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};}
test('all draft fields survive save/restore, including theme, brief and contact choice',()=>{
 const storage=memory();const draft={...blankDraft(),websiteBrief:'Private reference',businessName:'雪 & Co',description:'Two\nlines',services:[{name:'One',description:'Details'}],email:'a@example.com',telephone:'+12345',ctaLabel:'Call',ctaTarget:'phone',theme:'bold-creative'};
 assert.equal(readDraft(()=>storage).found,false);assert.ok(saveDraft(draft,()=>storage));assert.deepEqual(readDraft(()=>storage).draft,draft);
 assert.equal(readDraft(()=>storage).warning,'');
});
test('clear removes only the app key',()=>{
 const storage=memory();storage.setItem('unrelated','keep');saveDraft(blankDraft(),()=>storage);
 assert.ok(clearDraft(()=>storage));assert.equal(storage.getItem(STORAGE_KEY),null);assert.equal(storage.getItem('unrelated'),'keep');
});
test('bad JSON, inaccessible storage and quota failures remain recoverable',()=>{
 const storage=memory();storage.setItem(STORAGE_KEY,'{bad');assert.ok(readDraft(()=>storage).warning);
 const blocked=()=>{throw Error('blocked')};assert.ok(readDraft(blocked).warning);assert.equal(saveDraft(blankDraft(),blocked),false);assert.equal(clearDraft(blocked),false);
 const draft={...blankDraft(),businessName:'Keep this'};assert.equal(saveDraft(draft,()=>({setItem(){throw Error('quota')}})),false);assert.equal(draft.businessName,'Keep this');
});
test('invalid schema and individual fields recover safely; extra services are capped',()=>{
 for(const value of [null,[],{},'text',{schemaVersion:2}]) assert.ok(validateDraft(value).recovered);
 const d={...blankDraft(),businessName:'Valid',description:42,theme:'unknown',ctaTarget:'javascript:',services:[null,{name:'OK',description:'text'},{name:4},{name:'fourth'}]};
 const result=validateDraft(d);assert.ok(result.recovered);assert.equal(result.draft.businessName,'Valid');assert.equal(result.draft.description,'');assert.equal(result.draft.theme,'clean-professional');assert.equal(result.draft.ctaTarget,'email');assert.equal(result.draft.services.length,3);
});
