import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  const base = site.site_url.replace(/\/$/, '');
  const now = new Date();
  return [
    { url: `${base}/`,                 lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/mentions-legales/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
