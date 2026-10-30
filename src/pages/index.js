import ImagemOtimizada from '../components/imagem-otimizada';
import Link from 'next/link';
import { calculators } from '../lib/site.mjs';

export default function Home() {
  return (
    <main>
      <section className="apresentacao-inicial">
        <p className="chamada-inicial">Conheça. Calcule. Entenda.</p>
        <h1>Um ponto de partida para cuidar de você.</h1>
        <p>Explore calculadoras de saúde, nutrição e atividade física, com explicações para ajudar você a entender cada estimativa.</p>
      </section>
      <section className="grade-calculadoras" aria-label="Calculadoras disponíveis">
        {calculators.map((item, index) => (
          <Link className="cartao-calculadora" href={`/${item.slug}/`} key={item.slug}>
            <div className="imagem-cartao"><ImagemOtimizada src={`/images/${item.image}`} alt="" width={320} height={220}
              loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : undefined}
              sizes="(max-width: 480px) 260px, (max-width: 800px) 40vw, (max-width: 1050px) 27vw, 260px" /></div>
            <div className="cabecalho-cartao"><h2>{item.title}</h2><span className="seta-cartao" aria-hidden="true">↗</span></div>
            <p>{item.description}</p>
          </Link>
        ))}
      </section>
      <p className="aviso-inicial">Cada corpo tem uma história. Os resultados são estimativas para adultos e devem ser interpretados considerando seu contexto e, quando necessário, com orientação profissional.</p>
    </main>
  );
}
