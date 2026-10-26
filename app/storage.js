import {blankDraft,validateDraft} from './draft.js';
export const STORAGE_KEY='shanx-site-studio:draft:v1';
// Access the storage property inside try/catch: even its getter may throw.
export function readDraft(getStorage=()=>window.localStorage) {
  try {
    const raw=getStorage().getItem(STORAGE_KEY);
    if (raw===null) return {draft:blankDraft(),found:false,warning:''};
    const {draft,recovered}=validateDraft(JSON.parse(raw));
    return {draft,found:true,warning:recovered?'Some saved draft data could not be restored. Recovered valid fields; review before editing.':''};
  } catch {
    return {draft:blankDraft(),found:false,warning:'Saved draft could not be read. You can edit and export, but changes may not survive closing.'};
  }
}
export function saveDraft(draft,getStorage=()=>window.localStorage) {
  try {getStorage().setItem(STORAGE_KEY,JSON.stringify(validateDraft(draft).draft));return true;} catch {return false;}
}
export function clearDraft(getStorage=()=>window.localStorage) {
  try {getStorage().removeItem(STORAGE_KEY);return true;} catch {return false;}
}
