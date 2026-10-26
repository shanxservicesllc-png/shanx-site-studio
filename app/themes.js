import {contacts} from './contacts.js';
export const siteCSS = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:#152b48;background:#fff;font:17px/1.65 system-ui,-apple-system,"Segoe UI",sans-serif;overflow-wrap:anywhere}
a{color:#154dc4}a:focus-visible{outline:3px solid #d99b20;outline-offset:5px}h1,h2,h3,p{margin-top:0}h1{font-size:clamp(2.25rem,6vw,4.5rem);line-height:1.08;letter-spacing:-.045em;margin-bottom:24px}h2{font-size:2rem;letter-spacing:-.025em}h3{line-height:1.25}
.wrap{max-width:1100px;margin:auto;padding:0 6%}.site-header{border-bottom:1px solid #dce5f1}.nav{display:flex;justify-content:space-between;align-items:center;gap:24px;padding-top:24px;padding-bottom:24px}.brand{font-weight:800;font-size:1.15rem;color:#142d50}.links{display:flex;gap:24px;flex-wrap:wrap}.links a{text-decoration:none;font-size:.9rem;font-weight:650}
.hero{background:#eff5ff;border-bottom:1px solid #dce5f1;padding:80px 0}.hero p{max-width:700px;white-space:pre-wrap;font-size:1.15rem;color:#405572}.cta{display:inline-block;padding:13px 23px;margin-top:12px;border-radius:6px;background:#164fca;color:white;font-weight:700;text-decoration:none}.cta-inactive{background:#e0e7f0;color:#405572}
.services{padding-top:62px;padding-bottom:62px}.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.service{border:1px solid #dce5f1;border-top:4px solid #205bc9;border-radius:6px;padding:26px}.service p{white-space:pre-wrap;color:#52627b;margin-bottom:0}.contact{background:#102746;color:white;padding:44px 0}.contact a{color:#b8d5ff}.contact-list{display:flex;gap:24px;flex-wrap:wrap}.contact h2{margin-bottom:18px}.contact p{margin:0}
@media(max-width:680px){.nav{align-items:flex-start;flex-direction:column;gap:14px}.hero{padding:48px 0}.cards{grid-template-columns:1fr}.services{padding-top:38px;padding-bottom:38px}.contact-list{flex-direction:column;gap:12px}}
`;
const node = (tag, attrs={}, children=[]) => ({tag,attrs,children});
const textBlock = (tag,text,attrs={}) => node(tag,attrs,[String(text ?? '')]);
export function siteTree(draft) {
  const targets=contacts(draft);
  const services=draft.services.slice(0,3).filter(s=>s.name || s.description);
  const action=draft.ctaLabel ? textBlock(targets.cta?'a':'span',draft.ctaLabel,
    targets.cta?{class:'cta',href:targets.cta}:{class:'cta cta-inactive'}) : null;
  return node('div',{class:'clean-professional'},[
    node('header',{class:'site-header'},[node('nav',{class:'wrap nav','aria-label':'Website'},[
      textBlock('span',draft.businessName,{class:'brand'}),
      node('div',{class:'links'},[...(services.length?[textBlock('a','Services',{href:'#services'})]:[]),textBlock('a','Contact',{href:'#contact'})])
    ])]),
    node('main',{},[
      node('section',{class:'hero'},[node('div',{class:'wrap'},[
        textBlock('h1',draft.businessName),textBlock('p',draft.description),...(action?[action]:[])
      ])]),
      ...(services.length?[node('section',{id:'services',class:'wrap services'},[
        textBlock('h2','Our services'),node('div',{class:'cards'},services.map(s=>node('article',{class:'service'},[textBlock('h3',s.name),textBlock('p',s.description)])))
      ])]:[])
    ]),
    node('footer',{id:'contact',class:'contact'},[node('div',{class:'wrap'},[
      textBlock('h2','Get in touch'),node('div',{class:'contact-list'},[
        ...(draft.email?[textBlock(targets.email?'a':'p',draft.email,targets.email?{href:targets.email}:{})]:[]),
        ...(draft.telephone?[textBlock(targets.phone?'a':'p',draft.telephone,targets.phone?{href:targets.phone}:{})]:[])
      ])
    ])])
  ]);
}
