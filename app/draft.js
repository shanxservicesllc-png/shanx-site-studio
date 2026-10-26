export const MAX_SERVICES = 3;
export function blankDraft() {
  return {schemaVersion:1, websiteBrief:'',businessName:'',description:'',services:[],
    email:'',telephone:'',ctaLabel:'',ctaTarget:'email',theme:'clean-professional'};
}
export function addService(draft) {
  if (draft.services.length >= MAX_SERVICES) return false;
  draft.services.push({name:'',description:''}); return true;
}

export function validateDraft(value) {
  const draft=blankDraft();
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.schemaVersion !== 1) return {draft,recovered:true};
  let recovered=false;
  for (const key of ['websiteBrief','businessName','description','email','telephone','ctaLabel']) {
    if (typeof value[key]==='string') draft[key]=value[key]; else recovered=true;
  }
  for (const [key,allowed] of Object.entries({theme:['clean-professional','bold-creative'],ctaTarget:['email','phone']})) {
    if (allowed.includes(value[key])) draft[key]=value[key]; else recovered=true;
  }
  if (Array.isArray(value.services)) {
    recovered ||= value.services.length>MAX_SERVICES;
    draft.services=value.services.slice(0,MAX_SERVICES).map(service=>{
      const result={name:'',description:''};
      for (const key of ['name','description']) {
        if (service && typeof service[key]==='string') result[key]=service[key]; else recovered=true;
      }
      return result;
    });
  } else recovered=true;
  return {draft,recovered};
}
