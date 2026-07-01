'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { submitContact } from '@/lib/submitContact';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot — if filled, silently accept and drop
    if (typeof data.get('bot-field') === 'string' && (data.get('bot-field') as string).length > 0) {
      setStatus('success');
      form.reset();
      return;
    }

    try {
      await submitContact(data);
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Merci de réessayer ou de nous appeler.",
      );
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="grid gap-4"
      noValidate
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Ne pas remplir :
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Nom et prénom *</span>
          <input
            required
            name="nom"
            type="text"
            autoComplete="name"
            className="field mt-2"
            placeholder="Jean Dupont"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Téléphone *</span>
          <input
            required
            name="telephone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="field mt-2"
            placeholder="06 12 34 56 78"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">E-mail *</span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="field mt-2"
          placeholder="jean.dupont@exemple.fr"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Objet de votre demande</span>
        <select
          name="objet"
          className="field field-select mt-2"
          defaultValue=""
          required
        >
          <option value="" disabled>Choisir un sujet…</option>
          <option value="fuite">Urgence — fuite d'eau</option>
          <option value="debouchage">Urgence — débouchage</option>
          <option value="chauffe-eau">Panne de chauffe-eau</option>
          <option value="devis">Devis pour installation</option>
          <option value="autre">Autre demande</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Votre message *</span>
        <textarea
          required
          name="message"
          rows={5}
          className="field mt-2 resize-y"
          placeholder="Décrivez votre besoin (type d'intervention, urgence, accès au logement…)"
        />
      </label>

      <p className="text-xs text-muted">
        En envoyant ce formulaire, vous acceptez que vos données soient utilisées
        pour traiter votre demande, conformément à notre{' '}
        <a href="/mentions-legales/" className="font-medium text-brand-600 hover:underline">
          politique RGPD
        </a>.
      </p>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-urgent w-full sm:w-auto disabled:opacity-60"
        >
          {status === 'sending' ? (
            'Envoi en cours…'
          ) : (
            <>
              <Icon name="mail" className="h-5 w-5" /> Envoyer ma demande
            </>
          )}
        </button>
        {status === 'success' && (
          <span
            role="status"
            className="inline-flex items-center gap-2 rounded-md bg-success-500/10 px-3 py-2 text-sm text-success-600"
          >
            <Icon name="check" className="h-4 w-4" />
            Message envoyé — nous vous recontactons sous 15 minutes.
          </span>
        )}
        {status === 'error' && (
          <span
            role="alert"
            className="inline-flex items-center gap-2 rounded-md bg-urgent-50 px-3 py-2 text-sm text-urgent-700"
          >
            {errorMsg ?? "Une erreur est survenue. Merci de réessayer."}
          </span>
        )}
      </div>
    </form>
  );
}
