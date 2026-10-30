import Image from 'next/image';
import Link from 'next/link';
import { calculators } from '../lib/site.mjs';

export default function Home() {
  return (
    <main>
      <section className="home-intro">
        <p className="eyebrow">Conheça. Calcule. Entenda.</p>
        <h1>Um ponto de partida para cuidar de você.</h1>
        <p>Explore calculadoras de saúde, nutrição e atividade física, com explicações para ajudar você a entender cada estimativa.</p>
      </section>
      <section className="calculator-grid" aria-label="Calculadoras disponíveis">
        {calculators.map((item) => (
          <Link className="calculator-card" href={`/${item.slug}/`} key={item.slug}>
            <div className="card-art"><Image src={`/images/${item.image}`} alt="" width={112} height={112} /></div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span className="card-action">Abrir calculadora <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </section>
      <p className="home-note">Cada corpo tem uma história. Os resultados são estimativas para adultos e devem ser interpretados considerando seu contexto e, quando necessário, com orientação profissional.</p>
    </main>
  );
}
