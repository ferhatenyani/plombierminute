// Single module responsible for shipping a contact-form payload.
// Default: Netlify Forms (no signup, free, works with static export).
// To swap providers (Web3Forms / Formspree / Resend / etc.), replace
// the body of `submitContact` — keep the (data: FormData) => Promise<void>
// signature so the React form does not change.

export async function submitContact(data: FormData): Promise<void> {
  // Netlify Forms expects URL-encoded body POSTed to any page on the same
  // domain. The hidden static form at /public/__forms.html (form name="contact")
  // is what Netlify detects at build time.
  const params = new URLSearchParams();
  data.forEach((v, k) => {
    params.append(k, typeof v === 'string' ? v : v.name);
  });
  // Ensure the form-name is present even if the React form omits it.
  if (!params.has('form-name')) params.set('form-name', 'contact');

  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    throw new Error(
      `Échec de l'envoi (code ${res.status}). Vérifiez votre connexion ou appelez-nous directement.`,
    );
  }
}
