import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { useRouter } from 'next/router';

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const enabled = /^G-[A-Z0-9]+$/.test(gaId || '');
const preferenceKey = 'corpo-analytics-consent';
const subscribe = callback => {
  window.addEventListener('storage', callback);
  window.addEventListener('analytics-preference', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('analytics-preference', callback);
  };
};
const snapshot = () => {
  try { return localStorage.getItem(preferenceKey) || 'pending'; }
  catch { return 'pending'; }
};

export function AnalyticsPreferencesButton() {
  if (!enabled) return null;
  return <button className="link-button" onClick={() => window.dispatchEvent(new Event('open-analytics-preferences'))}>Preferências de cookies</button>;
}

export default function Analytics() {
  const consent = useSyncExternalStore(subscribe, snapshot, () => 'pending');
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const lastPage = useRef('');
  const { pathname } = useRouter();

  useEffect(() => {
    const open = () => setPreferencesOpen(true);
    window.addEventListener('open-analytics-preferences', open);
    return () => window.removeEventListener('open-analytics-preferences', open);
  }, []);

  useEffect(() => {
    if (!enabled || consent !== 'accepted' || !ready || lastPage.current === pathname) return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.origin + pathname,
      page_title: document.title,
    });
    lastPage.current = pathname;
  }, [consent, ready, pathname]);

  function choose(value) {
    try { localStorage.setItem(preferenceKey, value); } catch { /* Sem armazenamento, a medição permanece desativada. */ }
    window.dispatchEvent(new Event('analytics-preference'));
    setPreferencesOpen(false);
    if (value === 'rejected' && ready) {
      window[`ga-disable-${gaId}`] = true;
      // Apaga cookies de medição no host e nos domínios ancestrais permitidos.
      const hostParts = location.hostname.split('.');
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        document.cookie = `${name}=; Max-Age=0; path=/`;
        for (let i = 0; i < hostParts.length - 1; i++) {
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostParts.slice(i).join('.')}`;
        }
      }
      window.location.reload();
    }
  }

  if (!enabled) return null;
  return <>
    {consent === 'accepted' && <Script
      id="google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      strategy="afterInteractive"
      onReady={() => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', gaId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
        setReady(true);
      }}
    />}
    {(consent === 'pending' || preferencesOpen) && <section className="consent-panel" aria-label="Preferências de cookies">
      <p>Utilizamos cookies opcionais para analisar o uso do site e melhorar sua experiência. Você pode aceitar ou recusar esses cookies a qualquer momento. Saiba mais em nossa <Link href="/privacidade/">Política de Privacidade</Link>.</p>
      <div className="consent-actions">
        <button onClick={() => choose('rejected')}>Recusar cookies</button>
        <button onClick={() => choose('accepted')}>Aceitar cookies</button>
      </div>
    </section>}
  </>;
}
