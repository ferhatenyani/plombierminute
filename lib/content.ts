// Build-time content loader. Reads YAML + Markdown from /content and returns
// typed objects. Server-only — never import into a client component.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readYaml<T = unknown>(rel: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, rel), 'utf8');
  return yaml.load(raw) as T;
}

function readMarkdownFolder<T extends Record<string, unknown>>(folder: string) {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [] as Array<T & { body: string }>;
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      return { ...(data as T), body: content.trim() };
    });
}

function readMarkdownFile<T extends Record<string, unknown>>(rel: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, rel), 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as T), body: content.trim() };
}

// ---------- types ----------
export type Site = {
  site_title: string;
  tagline: string;
  hero_heading: string;
  hero_subtext: string;
  hero_image: string;
  logo?: string;
  phone: string;
  emergency_label: string;
  cta_primary_label: string;
  cta_secondary_label: string;
  response_minutes: string;
  default_zone: string;
  site_url: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
};

export type Service = {
  titre: string;
  slug: string;
  ordre: number;
  icone?: string;
  image: string;
  description: string;
  body: string;
};

export type Avantage = {
  titre: string;
  ordre: number;
  icone?: string;
  image?: string;
  body: string;
};

export type Zone = {
  titre: string;
  intro: string;
  zone_image: string;
  zones_couvertes: string[];
  delai_intervention: string;
  map_embed_url?: string;
  note?: string;
};

export type Contact = {
  adresse: string;
  code_postal: string;
  ville: string;
  telephone: string;
  email: string;
  horaires: string;
  horaires_bureau: string;
  intro: string;
  contact_image: string;
  map_embed_url?: string;
  siret?: string;
};

export type Mentions = {
  titre: string;
  editeur: string;
  adresse_editeur: string;
  responsable_publication: string;
  email_editeur: string;
  telephone_editeur: string;
  hebergeur: string;
  adresse_hebergeur: string;
  telephone_hebergeur: string;
  seo_title: string;
  seo_description: string;
  body: string;
};

// ---------- public API (build-time) ----------
export const getSite = () => readYaml<Site>('site.yml');
export const getContact = () => readYaml<Contact>('contact.yml');
export const getZone = () => readYaml<Zone>('zone.yml');

export const getServices = () =>
  readMarkdownFolder<Service>('services').sort((a, b) => a.ordre - b.ordre);
export const getAvantages = () =>
  readMarkdownFolder<Avantage>('avantages').sort((a, b) => a.ordre - b.ordre);
export const getMentions = () => readMarkdownFile<Mentions>('mentions-legales.md');

// ---------- helpers ----------
export const telHref = (phone: string) =>
  `tel:${phone.replace(/[^+0-9]/g, '')}`;

export const mailHref = (email: string) => `mailto:${email}`;
