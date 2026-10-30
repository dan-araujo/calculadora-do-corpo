import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSiteUrl, pageMetadata } from '../lib/site.mjs';

export default function Seo() {
  const { pathname } = useRouter();
  const metadata = pageMetadata[pathname];
  if (!metadata) return <Head>
    <title>Página não encontrada | Calculadora do Corpo</title>
    <meta name="robots" content="noindex" />
  </Head>;
  const siteUrl = getSiteUrl();
  const canonical = siteUrl ? `${siteUrl}${pathname === '/' ? '/' : `${pathname}/`}` : '';
  return <Head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {canonical && <link rel="canonical" href={canonical} />}
    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Calculadora do Corpo" />
    {siteUrl && <>
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Calculadora do Corpo: calculadoras gratuitas de saúde, nutrição e atividade física." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
      <meta name="twitter:image:alt" content="Calculadora do Corpo: saúde, nutrição e atividade física." />
    </>}
    {canonical && <meta property="og:url" content={canonical} />}
  </Head>;
}
