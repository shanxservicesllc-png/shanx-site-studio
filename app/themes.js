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
  if (draft.theme==='bold-creative') return boldTree(draft);
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

const boldCSS = `
*{box-sizing:border-box}body{margin:0;background:#171c1b;color:#f2f3e9;font:17px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;overflow-wrap:anywhere}a{color:#b9efdc}a:focus-visible{outline:3px solid #e6c46b;outline-offset:6px}h1,h2,h3,p{margin-top:0}.bold-wrap{max-width:1200px;margin:auto;padding:0 6%}.editorial-header{display:flex;justify-content:space-between;align-items:center;gap:25px;padding-top:28px;padding-bottom:28px;border-bottom:1px solid #43504a}.wordmark{font-weight:800;letter-spacing:-.5px;max-width:65%}.editorial-header a{text-decoration:none;font-size:13px;text-transform:uppercase;letter-spacing:2px}.dramatic-hero{padding-top:78px;padding-bottom:78px;display:grid;grid-template-columns:2fr 1fr;gap:36px;align-items:end}.hero-title{font-size:clamp(3rem,8vw,7rem);font-weight:850;line-height:.98;letter-spacing:-.055em;margin-bottom:0}.hero-note{border-top:3px solid #e3c274;padding-top:22px}.hero-note p{white-space:pre-wrap;color:#d3ded7}.cta{display:inline-block;background:#b7efda;color:#18241f;text-decoration:none;padding:14px 22px;font-weight:750;border-radius:0}.cta-inactive{background:#3c4942;color:#e1e6e2}.editorial-services{background:#c7eddd;color:#172d25;padding-top:50px;padding-bottom:56px}.editorial-services h2{font-family:Georgia,serif;font-size:2.7rem;font-weight:400}.service-row{display:grid;grid-template-columns:65px 1fr 1fr;gap:22px;border-top:1px solid #829f91;padding:30px 0}.service-row:nth-of-type(even){margin-left:8%}.service-number{font-size:13px;font-weight:700}.service-row h3{font-size:1.7rem;line-height:1.15;letter-spacing:-.8px;margin:0}.service-row p{white-space:pre-wrap;margin:0}.closing-contact{display:grid;grid-template-columns:1fr 1fr;gap:40px;padding-top:60px;padding-bottom:65px}.closing-contact h2{font-family:Georgia,serif;color:#e6c46b;font-weight:400;font-size:clamp(2.5rem,6vw,4rem);line-height:1.1;margin:0}.contact-details{display:flex;flex-direction:column;align-items:flex-start;gap:14px}.contact-details p{margin:0}.bold-footer{border-top:1px solid #43504a;padding-top:20px;padding-bottom:20px;color:#a6b7ac;font-size:12px}
@media(max-width:700px){.dramatic-hero{grid-template-columns:1fr;padding-top:45px;padding-bottom:45px;gap:30px}.hero-title{font-size:clamp(2.8rem,12vw,5rem)}.service-row{grid-template-columns:35px 1fr;gap:14px}.service-row p{grid-column:2}.service-row:nth-of-type(even){margin-left:0}.closing-contact{grid-template-columns:1fr;gap:25px}.editorial-header{align-items:flex-start}.editorial-services h2{font-size:2.2rem}}
`;
export function themeCSS(theme) {return theme==='bold-creative'?boldCSS:siteCSS;}
function boldTree(draft) {
  const targets=contacts(draft);
  const services=draft.services.slice(0,3).filter(s=>s.name||s.description);
  const action=draft.ctaLabel?textBlock(targets.cta?'a':'span',draft.ctaLabel,targets.cta?{class:'cta',href:targets.cta}:{class:'cta cta-inactive'}):null;
  return node('div',{class:'bold-creative'},[
    node('header',{class:'bold-wrap editorial-header'},[textBlock('span',draft.businessName,{class:'wordmark'}),textBlock('a','Get in touch ↗',{href:'#contact'})]),
    node('main',{},[
      node('section',{class:'bold-wrap dramatic-hero'},[textBlock('h1',draft.businessName,{class:'hero-title'}),node('aside',{class:'hero-note'},[textBlock('p',draft.description),...(action?[action]:[])])]),
      ...(services.length?[node('section',{id:'services',class:'editorial-services'},[node('div',{class:'bold-wrap'},[textBlock('h2','What we do.'),...services.map((s,i)=>node('article',{class:'service-row'},[textBlock('span',String(i+1).padStart(2,'0'),{class:'service-number','aria-hidden':'true'}),textBlock('h3',s.name),textBlock('p',s.description)]))])])]:[]),
      node('section',{id:'contact',class:'bold-wrap closing-contact'},[textBlock('h2','Let’s make it happen.'),node('div',{class:'contact-details'},[
        ...(draft.email?[textBlock(targets.email?'a':'p',draft.email,targets.email?{href:targets.email}:{})]:[]),
        ...(draft.telephone?[textBlock(targets.phone?'a':'p',draft.telephone,targets.phone?{href:targets.phone}:{})]:[])
      ])])
    ]),
    textBlock('footer',draft.businessName,{class:'bold-wrap bold-footer'})
  ]);
}
