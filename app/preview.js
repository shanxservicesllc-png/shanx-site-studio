import {siteTree,siteCSS} from './themes.js';
function toDOM(doc,tree) {
  if (typeof tree === 'string') return doc.createTextNode(tree);
  const element=doc.createElement(tree.tag);
  for (const [key,value] of Object.entries(tree.attrs)) element.setAttribute(key,value);
  element.append(...tree.children.map(child=>toDOM(doc,child)));
  return element;
}
export function renderPreview(frame,draft) {
  const doc=frame.contentDocument;
  doc.documentElement.lang='en';
  const title=doc.createElement('title');title.textContent='Live website preview';
  const style=doc.createElement('style');style.textContent=siteCSS;
  const viewport=doc.createElement('meta');viewport.name='viewport';viewport.content='width=device-width,initial-scale=1';
  doc.head.replaceChildren(title,viewport,style);
  doc.body.replaceChildren(toDOM(doc,siteTree(draft)));
}
