# PlombierMinute

A static, French-language, **single-page** vitrine site for an urgent-plumbing
business. Design is calm, mobile-first, and trust-oriented (Bleu Médical
palette: light backgrounds, medical-blue primary, one controlled red CTA for
emergencies). The client edits all content himself via a Git-backed CMS, with
zero servers and zero recurring infrastructure cost.

- **Framework**: Next.js 15 (App Router) with `output: 'export'` (pure static HTML)
- **Hosting**: Netlify (free tier)
- **CMS**: [Sveltia CMS](https://github.com/sveltia/sveltia-cms) served at `/admin`
- **Content storage**: YAML + Markdown files in `/content`, committed to this Git repo
- **Contact form**: Netlify Forms (free, no signup)
- **Structure**: one scrollable page (Hero → Services → Pourquoi nous → Zone → Contact), plus a separate `/mentions-legales/` page linked in the footer.
- **No database, no API, no server runtime.**

---

## Table of contents

1. [Local development](#local-development)
2. [Deploy to Netlify](#deploy-to-netlify)
3. [Set up the GitHub OAuth App (for `/admin`)](#set-up-the-github-oauth-app-for-admin)
4. [Inviting the client to edit content](#inviting-the-client-to-edit-content)
5. [Where the client edits content (French)](#where-the-client-edits-content-french)
6. [Netlify Forms — receive contact submissions](#netlify-forms--receive-contact-submissions)
7. [SEO checklist already in place + Google Business Profile](#seo-checklist-already-in-place--google-business-profile)
8. [Placeholders to replace (`[À REMPLIR]`)](#placeholders-to-replace--remplir)
9. [Image sources, licenses & credits](#image-sources-licenses--credits)
10. [Project structure](#project-structure)
11. [Swapping the contact-form provider](#swapping-the-contact-form-provider)

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produces /out for Netlify
npm run fetch-images # re-runs the image downloader (idempotent)
```

Node 20+ recommended. The build is a pure static export — no runtime server required.

To edit content locally in the CMS, open `http://localhost:3000/admin/` in a
Chromium browser (Chrome/Edge/Brave/Arc). Sveltia CMS uses the File System
Access API to read/write files directly in `/content` — no GitHub auth, no
proxy. Firefox/Safari fall back to the GitHub backend (so they require the
OAuth setup below).

---

## Deploy to Netlify

1. Push this repo to GitHub.
2. On Netlify → **Add new site** → **Import an existing project** → pick this repo.
3. Netlify auto-detects [`netlify.toml`](./netlify.toml) — keep:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: 20 (already pinned)
4. Click **Deploy**. The site goes live on `https://<your-name>.netlify.app`.
5. (Optional) Add a custom domain in Netlify → **Domain settings** → set HTTPS.

**Do not install `@netlify/plugin-nextjs`** — that plugin is for the SSR runtime
and conflicts with our static export.

---

## Set up the GitHub OAuth App (for `/admin`)

The client edits the site at `https://<site>/admin/`. Sveltia CMS commits to
GitHub on their behalf, so they sign in with GitHub. You need to register an
OAuth App once.

**Recommended path — [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) Cloudflare Worker** (no Netlify Identity dependency, free Cloudflare tier):

1. **Create a GitHub OAuth App**
   - GitHub → *Settings* → *Developer settings* → *OAuth Apps* → **New OAuth App**.
   - **Application name**: `PlombierMinute CMS`
   - **Homepage URL**: `https://<your-netlify-domain>`
   - **Authorization callback URL**: `https://<your-cloudflare-worker>.workers.dev/callback`
   - Copy the **Client ID** and generate a **Client Secret**.

2. **Deploy the auth Worker** (Cloudflare account required — free tier is enough):
   - Clone <https://github.com/sveltia/sveltia-cms-auth>, follow its README.
   - Set worker secrets `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
   - Note the public worker URL (e.g. `https://plombierminute-auth.example.workers.dev`).

3. **Wire the CMS to your Worker**
   - Edit [`public/admin/config.yml`](./public/admin/config.yml):
     ```yaml
     backend:
       name: github
       repo: OWNER/plombierminute   # ← change OWNER/plombierminute to <your-github-org>/<this-repo-name>
       branch: main
       base_url: https://plombierminute-auth.example.workers.dev   # ← uncomment & set to your worker
       auth_endpoint: auth
     ```
   - Commit and push.

4. **Smoke test**
   - Open `https://<site>/admin/` → **Login with GitHub** → authorize the OAuth App → you should land in the CMS dashboard.

**Fallback path — Personal Access Token (no Worker needed)**
If you don't want to set up an OAuth App at all, the client can sign in to
`/admin` with a GitHub Personal Access Token (Sveltia offers this option in the
sign-in screen). Faster to set up but less polished for non-technical users.

---

## Inviting the client to edit content

Sveltia CMS commits **as the logged-in GitHub user**, so the client's GitHub
account must have **write access** to this repo.

1. Have the client create a free GitHub account if they don't have one.
2. In this repo on GitHub → **Settings** → **Collaborators** → **Add people**
   → invite the client's username → choose **Write** permission.
3. The client accepts the email invitation.
4. Send them the URL: `https://<your-site>/admin/`.

---

## Where the client edits content (French)

The CMS UI **chrome** (menus, buttons) is currently English-only in the
official Sveltia build. **All field labels and help text inside this site are
in French** — that's where the client spends 100% of their time. The chrome
limitation is cosmetic.

What the client can edit, in French:

| In `/admin` (label visible to client) | File on disk                       |
| ------------------------------------ | ---------------------------------- |
| Réglages du site                     | `content/site.yml`                 |
| Services / interventions             | `content/services/*.md`            |
| Pourquoi nous choisir                | `content/avantages/*.md`           |
| Zone d'intervention                  | `content/zone.yml`                 |
| Coordonnées de contact               | `content/contact.yml`              |
| Mentions légales                     | `content/mentions-legales.md`      |

Image uploads via `/admin` land in `/public/images/` and are referenced from
content as `/images/<filename>`.

When the client clicks **Save**, Sveltia commits to the `main` branch, Netlify
detects the push and rebuilds the site (~30 s deploy).

---

## Netlify Forms — receive contact submissions

The contact form (`/contact`) uses [Netlify Forms](https://docs.netlify.com/forms/setup/).
Two pieces make this work:

1. **`/public/__forms.html`** — a hidden static HTML form Netlify's build bot
   detects at deploy time. Field `name=` attributes match the React form one-for-one.
2. **`components/ContactForm.tsx`** — the visible React form. Submission goes
   through `lib/submitContact.ts`, which POSTs URL-encoded data to `/` with a
   `form-name=contact` field. Honeypot (`bot-field`) is wired.

**Set the notification email**:
Netlify → site → **Forms** → click the `contact` form → **Settings & usage** →
**Form notifications** → add the client's email. You can also configure Slack
or webhook notifications from the same page.

Spam protection: honeypot is built in. If spam becomes an issue, enable
Netlify's reCAPTCHA in the same Form settings panel.

---

## SEO checklist already in place + Google Business Profile

This site already ships with:

- `<html lang="fr">` on the root layout
- Per-page `<title>` and `<meta name="description">` (French, location-aware)
- Open Graph + Twitter Card tags (hero image as default share card)
- Canonical URL per page
- Generated `sitemap.xml` ([`app/sitemap.ts`](./app/sitemap.ts))
- Generated `robots.txt` ([`app/robots.ts`](./app/robots.ts))
- JSON-LD `Plumber` LocalBusiness schema injected from `content/site.yml`,
  `content/contact.yml` and `content/zone.yml` (in [`app/layout.tsx`](./app/layout.tsx))
- Semantic headings (one `<h1>` per page) and French `alt` attributes on every image
- Optimized JPEGs + lazy-loaded backgrounds for Core Web Vitals

**The other half of local-plumber SEO is Google Business Profile.** This is a
free, manual setup that complements (does not replace) the on-site SEO above:

1. Go to <https://business.google.com> and create a profile.
2. Use the same name (`PlombierMinute`), phone, address, hours and service area
   as in `/admin → Réglages du site` and `/admin → Coordonnées de contact`.
3. Add 5–10 real photos of completed work (the gallery makes a good starting
   point).
4. Encourage clients to leave Google reviews — these are the #1 ranking factor
   for "plombier urgent près de moi" searches.

There is nothing to build for this — but flag it to the client because without
it, the site will rank well for branded searches but underperform for generic
local queries.

---

## Placeholders to replace (`[À REMPLIR]`)

Search the repo for `[À REMPLIR` to find every spot where the client's real
data needs to go. The defaults are clearly-marked French placeholders so they
stand out at runtime and in the CMS. Notable slots:

- `content/site.yml` → `phone`
- `content/contact.yml` → `adresse`, `code_postal`, `ville`, `telephone`, `email`, `siret`
- `content/zone.yml` → `zones_couvertes` (verify the actual coverage), `note`
- `content/mentions-legales.md` → `editeur`, `adresse_editeur`, `responsable_publication`,
  `email_editeur`, `telephone_editeur`, body text

All of the above are editable from `/admin` in French — the client doesn't need
to touch source files.

---

## Image sources, licenses & credits

All images are royalty-free, commercial-use OK, attribution not legally
required but credited here as good practice.

| File                              | Source                                                                                                          | License  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| `hero-1.jpg`                      | <https://www.pexels.com/photo/32588548/>                                                                        | Pexels   |
| `hero-alt.jpg`                    | <https://www.pexels.com/photo/plumber-installs-pipe-fittings-6419128/>                                          | Pexels   |
| `service-fuite-eau.jpg`           | <https://www.pexels.com/photo/leaking-pipe-fixed-with-plastic-15206136/>                                        | Pexels   |
| `service-debouchage.jpg`          | <https://www.pexels.com/photo/water-kitchen-bubble-sink-87299/>                                                 | Pexels   |
| `service-chauffe-eau.jpg`         | <https://www.pexels.com/photo/cold-warm-heating-boiler-3173206/>                                                | Pexels   |
| `service-sanitaires.jpg`          | <https://www.pexels.com/photo/7031719/>                                                                         | Pexels   |
| `service-salle-de-bain.jpg`       | <https://unsplash.com/photos/a-plumber-repairs-plumbing-in-a-bathroom-jaP5ClBdIyU>                              | Unsplash |
| `service-cuisine.jpg`             | <https://www.pexels.com/photo/6253786/>                                                                         | Pexels   |
| `trust-rapidite.jpg`              | <https://www.pexels.com/photo/man-in-orange-work-clothes-standing-beside-a-van-carrying-vaccum-cleaner-and-bag-6195899/> | Pexels   |
| `trust-disponibilite.jpg`         | <https://www.pexels.com/photo/woman-in-yellow-dress-shirt-using-computer-8204317/>                              | Pexels   |
| `trust-devis-gratuit.jpg`         | <https://www.pexels.com/photo/photo-of-people-shaking-hands-8112186/>                                           | Pexels   |
| `trust-experience.jpg`            | <https://unsplash.com/photos/man-wearing-black-pullover-hoodie-holding-tool-NfG4rXmceFM>                        | Unsplash |
| `zone-bg.jpg`                     | <https://www.pexels.com/photo/a-man-standing-by-his-van-parked-on-a-street-in-a-city-22147530/>                 | Pexels   |
| `contact-bg.jpg`                  | <https://www.pexels.com/photo/a-man-and-a-woman-working-in-call-center-8204327/>                                | Pexels   |

To swap any image, the client uploads via `/admin` → field shows a preview →
new image lands in `/public/images/`. The full URL list (with the exact
download URL for each slot) lives in [`scripts/fetch-images.mjs`](./scripts/fetch-images.mjs).

---

## Project structure

```
.
├── app/                       # Next.js App Router
│   ├── layout.tsx             # root: <html lang="fr">, JSON-LD, header/footer
│   ├── page.tsx               # SINGLE PAGE: Hero + Services + Pourquoi + Zone + Contact
│   ├── mentions-legales/page.tsx  # only other route
│   ├── sitemap.ts             # builds sitemap.xml (2 URLs)
│   ├── robots.ts              # builds robots.txt
│   └── globals.css            # Bleu Médical tokens, buttons, fields
├── components/                # React UI — light-mode, no gradients, simple regular grids
│   ├── Header.tsx             # sticky, anchor-nav + mobile drawer
│   ├── Footer.tsx
│   ├── EmergencyDock.tsx      # mobile floating call button
│   ├── Hero.tsx               # single-column stacked → 7/5 split at lg
│   ├── PageHero.tsx           # small hero used by /mentions-legales
│   ├── ServicesSection.tsx    # #services anchor
│   ├── ServicesGrid.tsx       # 1/2/3-col simple grid (identical cards)
│   ├── AvantagesSection.tsx   # #pourquoi anchor, 1/2/4-col
│   ├── ZoneSection.tsx        # #zone anchor
│   ├── ContactSection.tsx     # #contact anchor
│   ├── ContactForm.tsx        # Netlify Forms
│   └── Icon.tsx               # inline SVG icon set
├── lib/
│   ├── content.ts             # build-time YAML/MD loader
│   ├── submitContact.ts       # swap-in-one-file form provider
│   └── theme.ts               # Bleu Médical color tokens
├── content/                   # source of truth for all page content
│   ├── site.yml
│   ├── contact.yml
│   ├── zone.yml
│   ├── mentions-legales.md
│   ├── services/*.md          # 6 services
│   └── avantages/*.md         # 4 trust points
├── public/
│   ├── admin/                 # Sveltia CMS (index.html + config.yml, FR labels)
│   ├── images/                # downloaded images (14 files, no more gallery)
│   └── __forms.html           # Netlify Forms detection page (hidden)
├── scripts/
│   └── fetch-images.mjs       # idempotent image downloader
├── netlify.toml               # build command, publish dir, headers
├── next.config.mjs            # output: 'export'
├── tailwind.config.ts         # theme tokens (Bleu Médical semantic colors)
└── README.md                  # this file
```

## Design system (Bleu Médical)

Semantic color tokens live in [`tailwind.config.ts`](./tailwind.config.ts) and
[`lib/theme.ts`](./lib/theme.ts). To rebrand, edit those two files only.

| Token         | Hex       | Use                                            |
| ------------- | --------- | ---------------------------------------------- |
| `bg`          | `#F6F8FB` | page background                                |
| `surface`     | `#FFFFFF` | cards, header                                  |
| `ink`         | `#0A2240` | headings, high-contrast text                   |
| `body`        | `#2B3645` | body text                                      |
| `muted`       | `#6B7A8C` | captions, helper text                          |
| `brand-500`   | `#1357A6` | primary blue (nav-active, icon chips)          |
| `brand-600`   | `#0E4380` | brand hover / dark variant                     |
| `urgent-500`  | `#D33B2C` | emergency CTA (used sparingly, high signal)    |
| `success-500` | `#1F8D5A` | form success message                           |
| `border`      | `#E2E8EF` | card & field borders                           |

Type: **Plus Jakarta Sans** (body) + **Fraunces** (display headings). Loaded
via `next/font/google` — self-hosted, no CLS.

Layout rules baked into the design:
- Mobile-first: every section starts single-column, then adds columns at `sm` (640px), `md` (768px), and `lg` (1024px).
- 44px minimum tap targets on all interactive elements (`btn` class enforces `min-height: 44px`).
- Body text ≥16px on mobile (avoids iOS zoom-on-focus).
- Simple regular grids only: 1 / 2 / 3 / 4 columns. No bento, no asymmetry.
- All cards on a given page share the same size and radius.
- One primary CTA per section (the emergency red button); everything else is neutral / outline.

---

## Swapping the contact-form provider

If you ever want to move off Netlify Forms (to Web3Forms, Formspree, Resend,
an SMTP relay, …) edit a single file: **[`lib/submitContact.ts`](./lib/submitContact.ts)**.
Keep the `(data: FormData) => Promise<void>` signature and the React form
won't change.

Also remove the hidden `/public/__forms.html` if you no longer want Netlify to
detect a form on this site.
