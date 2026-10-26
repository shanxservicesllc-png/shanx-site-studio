export function emailTarget(value) {
  const email = String(value ?? '').trim();
  // Deliberately a practical single-address subset; never accept URI parameters.
  return /^[a-zA-Z0-9.!#$%&'*+/=_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/.test(email)
    ? 'mailto:' + encodeURIComponent(email).replace(/%40/g,'@') : null;
}
export function phoneTarget(value) {
  const phone = String(value ?? '').trim();
  if (!/^\+?[0-9 ().-]+$/.test(phone)) return null;
  const digits = phone.replace(/\D/g,'');
  if (digits.length < 3 || digits.length > 15) return null;
  return 'tel:' + (phone.startsWith('+') ? '+' : '') + digits;
}
export function contacts(draft) {
  const email=emailTarget(draft.email), phone=phoneTarget(draft.telephone);
  return {email,phone,cta:draft.ctaTarget === 'phone' ? phone : email};
}
