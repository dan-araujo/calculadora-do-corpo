import { writeFileSync, rmSync } from 'node:fs';
import nextEnv from '@next/env';
import { getSiteUrl, pageMetadata } from '../src/lib/site.mjs';

nextEnv.loadEnvConfig(process.cwd());
const siteUrl = getSiteUrl();
if (!siteUrl) {
  rmSync('public/sitemap.xml', { force: true });
  writeFileSync('public/robots.txt', 'User-agent: *\nAllow: /\n');
  console.warn('NEXT_PUBLIC_SITE_URL ausente: configure o endereço definitivo para gerar sitemap e canonical.');
} else {
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  const urls = Object.keys(pageMetadata).map(path => `<url><loc>${escape(siteUrl + (path === '/' ? '/' : `${path}/`))}</loc></url>`).join('\n');
  writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`SEO: sitemap com ${Object.keys(pageMetadata).length} páginas para ${siteUrl}.`);
}
