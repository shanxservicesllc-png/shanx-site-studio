import {siteTree,siteCSS} from './themes.js';
export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
export function serialize(tree) {
  if (typeof tree === 'string') return escapeHTML(tree);
  const attrs=Object.entries(tree.attrs).map(([key,value])=>' '+key+'="'+escapeHTML(value)+'"').join('');
  return '<'+tree.tag+attrs+'>'+tree.children.map(serialize).join('')+'</'+tree.tag+'>';
}
export function exportHTML(draft) {
  return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escapeHTML(draft.businessName || 'Business website')+'</title><style>'+siteCSS+'</style></head><body>'+serialize(siteTree(draft))+'</body></html>';
}
export function filename(name) {
  const stem=String(name).normalize('NFKD').replace(/[^a-zA-Z0-9 -]/g,'').trim().replace(/\s+/g,'-').slice(0,70);
  return (stem || 'business-website')+'.html';
}
export function downloadHTML(draft) {
  const url=URL.createObjectURL(new Blob([exportHTML(draft)],{type:'text/html;charset=utf-8'}));
  const link=document.createElement('a');
  link.href=url;link.download=filename(draft.businessName);document.body.append(link);
  try {link.click();} finally {link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
}
