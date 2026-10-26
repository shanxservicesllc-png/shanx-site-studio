export const MAX_SERVICES = 3;
export function blankDraft() {
  return {schemaVersion:1, websiteBrief:'',businessName:'',description:'',services:[],
    email:'',telephone:'',ctaLabel:'',ctaTarget:'email',theme:'clean-professional'};
}
export function addService(draft) {
  if (draft.services.length >= MAX_SERVICES) return false;
  draft.services.push({name:'',description:''}); return true;
}
