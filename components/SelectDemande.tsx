'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon';

type Option = {
  value: string;
  label: string;
  hint?: string;
  icon: string;
  urgent?: boolean;
};

const OPTIONS: Option[] = [
  {
    value: "Urgence : fuite d'eau",
    label: "Urgence : fuite d'eau",
    hint: 'Intervention prioritaire',
    icon: 'drop',
    urgent: true,
  },
  {
    value: 'Urgence : débouchage',
    label: 'Urgence : débouchage',
    hint: 'Canalisation, WC, évier',
    icon: 'pipe',
    urgent: true,
  },
  {
    value: 'Panne de chauffe-eau',
    label: 'Panne de chauffe-eau',
    hint: 'Eau chaude coupée ou en panne',
    icon: 'flame',
  },
  {
    value: 'Devis pour installation',
    label: 'Devis pour installation',
    hint: 'Sanitaires, cuisine, salle de bain',
    icon: 'clipboard',
  },
  {
    value: 'Autre demande',
    label: 'Autre demande',
    hint: 'Question, conseil, autre besoin',
    icon: 'clipboard',
  },
];

type Props = {
  name: string;
  required?: boolean;
  placeholder?: string;
};

export function SelectDemande({ name, required, placeholder = 'Choisir un sujet…' }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selected = OPTIONS.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open) {
      const el = listRef.current?.querySelector<HTMLLIElement>(`[data-idx="${active}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [open, active]);

  function commit(idx: number) {
    setValue(OPTIONS[idx].value);
    setActive(idx);
    setOpen(false);
    btnRef.current?.focus();
  }

  function onTriggerKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onListKey(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % OPTIONS.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + OPTIONS.length) % OPTIONS.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(OPTIONS.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      commit(active);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
        className={`select-demande__trigger ${open ? 'is-open' : ''} ${selected ? 'has-value' : ''}`}
      >
        <span className="select-demande__icon" aria-hidden>
          <Icon
            name={selected?.icon ?? 'clipboard'}
            className="h-4 w-4"
          />
        </span>
        <span className="select-demande__label">
          {selected ? selected.label : placeholder}
        </span>
        <span className="select-demande__chevron" aria-hidden>
          <Icon name="chevron-down" className="h-4 w-4" />
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label="Objet de votre demande"
          onKeyDown={onListKey}
          className="select-demande__list"
        >
          {OPTIONS.map((opt, i) => {
            const isSel = opt.value === value;
            const isAct = i === active;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSel}
                data-idx={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => commit(i)}
                className={`select-demande__option ${isAct ? 'is-active' : ''} ${isSel ? 'is-selected' : ''} ${opt.urgent ? 'is-urgent' : ''}`}
              >
                <span className="select-demande__opt-icon" aria-hidden>
                  <Icon name={opt.icon} className="h-4 w-4" />
                </span>
                <span className="select-demande__opt-body">
                  <span className="select-demande__opt-label">{opt.label}</span>
                  {opt.hint && (
                    <span className="select-demande__opt-hint">{opt.hint}</span>
                  )}
                </span>
                {isSel && (
                  <span className="select-demande__check" aria-hidden>
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
