import Link from 'next/link';
import { AnalyticsPreferencesButton } from './analytics';

export default function Footer() {
  return <footer className="site-footer">
    <p>Calculadora do Corpo · Ferramentas educativas para adultos. As estimativas não substituem uma avaliação individual.</p>
    <div className="footer-links"><Link href="/">Todas as calculadoras</Link><Link href="/privacidade/">Privacidade</Link><AnalyticsPreferencesButton /></div>
  </footer>;
}
