import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/content';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const site = getSite();
  const base = site.site_url.replace(/\/$/, '');
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/'] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
