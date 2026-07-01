'use client';

import { Icon } from './Icon';

type Props = { phoneHref: string; phoneLabel: string };

// Mobile-only floating call dock. Bottom-right, always above content,
// 44px tap target.
export function EmergencyDock({ phoneHref, phoneLabel }: Props) {
  return (
    <a
      href={phoneHref}
      className="btn btn-urgent fixed bottom-4 right-4 z-30 px-4 text-sm shadow-cardHover lg:hidden"
      aria-label={`Appeler le ${phoneLabel} pour une urgence plomberie`}
      data-emergency-call
    >
      <span className="pulse-dot" aria-hidden />
      <Icon name="phone" className="h-4 w-4" />
      <span className="font-semibold">Urgence</span>
    </a>
  );
}
