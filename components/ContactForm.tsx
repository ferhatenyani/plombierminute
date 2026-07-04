'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { SelectDemande } from './SelectDemande';
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

    // Honeypot — Web3Forms convention is `botcheck`. If filled, silently
    // succeed and drop the payload so the bot can't tell it was caught.
    if (typeof data.get('botcheck') === 'string' && (data.get('botcheck') as string).length > 0) {
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
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {/* Web3Forms honeypot — must stay hidden from real users */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Nom et prénom *</span>
          <input
            required
            name="name"
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

      <div className="block">
        <span className="text-sm font-medium text-ink">Objet de votre demande</span>
        <div className="mt-2">
          <SelectDemande name="objet" required />
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">Votre message *</span>
        <textarea
          required
          name="message"
          rows={6}
          className="field mt-2 resize-y"
          placeholder="Décrivez votre besoin (type d'intervention, urgence, accès au logement…)"
        />
      </label>

      <p className="text-xs leading-relaxed text-muted">
        En envoyant ce formulaire, vous acceptez que vos nom, téléphone et
        message soient utilisés pour traiter votre demande. Ces données ne
        sont ni cédées ni commercialisées. Détails et vos droits dans nos{' '}
        <a
          href="/mentions-legales/"
          className="font-medium text-brand-600 hover:underline"
        >
          mentions légales &amp; RGPD
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
              <Icon name="phone" className="h-5 w-5" /> Envoyer ma demande
            </>
          )}
        </button>
        {status === 'success' && (
          <span
            role="status"
            className="inline-flex items-center gap-2 rounded-md bg-success-500/10 px-3 py-2 text-sm text-success-600"
          >
            <Icon name="check" className="h-4 w-4" />
            Message envoyé. Nous vous recontactons rapidement.
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
