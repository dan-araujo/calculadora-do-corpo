import Link from 'next/link';
import { AnalyticsPreferencesButton } from './analytics';

export default function Footer() {
  const year = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(new Date());
  return <footer className="rodape">
    <p className="aviso-rodape">Ferramentas educativas para adultos. As estimativas não substituem uma avaliação individual.</p>
    <div className="base-rodape">
      <p className="direitos-autorais">© {year} Calculadora do Corpo. Todos os direitos reservados.</p>
      <div className="links-rodape" role="navigation" aria-label="Links do rodapé"><Link href="/">Calculadoras</Link><Link href="/privacidade/">Privacidade</Link><AnalyticsPreferencesButton /></div>
    </div>
  </footer>;
}
