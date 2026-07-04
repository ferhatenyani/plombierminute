// Single module responsible for shipping a contact-form payload.
// Provider: Web3Forms (https://web3forms.com) — free tier, 250 emails/mo,
// no signup for the visitor, no server code. To swap providers later
// (Formspree / EmailJS / Resend / SMTP relay), replace the body of
// `submitContact` and keep the (data: FormData) => Promise<void> signature.
//
// The access key below identifies the destination email. To rotate it,
// change this single constant and redeploy. Web3Forms access keys are
// designed to be public (client-side visible) and can be revoked from
// the Web3Forms dashboard at any time.

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'f5e06d69-bdf8-4447-b2b5-0a6259723337';

export async function submitContact(data: FormData): Promise<void> {
  // Ensure the access key + a subject line are on the payload.
  const payload = new FormData();
  data.forEach((v, k) => payload.append(k, typeof v === 'string' ? v : v.name));
  payload.set('access_key', WEB3FORMS_ACCESS_KEY);
  if (!payload.get('subject')) {
    const objet = payload.get('objet');
    payload.set(
      'subject',
      objet ? `Nouvelle demande — ${objet}` : 'Nouvelle demande — BTP France',
    );
  }
  payload.set('from_name', 'Formulaire BTP France');

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    body: payload,
  });

  let json: { success?: boolean; message?: string } = {};
  try { json = await res.json(); } catch { /* not JSON — fall through */ }

  if (!res.ok || json.success === false) {
    throw new Error(
      json.message ??
        `Échec de l'envoi (code ${res.status}). Vérifiez votre connexion ou appelez-nous directement.`,
    );
  }
}
