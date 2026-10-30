import { useState } from 'react';
import Image from 'next/image';
import { calcularQuantidadeAguaConsumida } from '../lib/calculadoras.mjs';

const litros = ml => `${(ml / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 3 })} L`;

export default function ConsumoAgua() {
  const [peso, setPeso] = useState('');
  const [nivelAtividade, setNivelAtividade] = useState('sedentario');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function calcular(event) {
    event.preventDefault();
    try {
      setResultado(calcularQuantidadeAguaConsumida(peso, nivelAtividade));
      setErro('');
    } catch (error) { setErro(error.message); setResultado(null); }
  }
  function mudarPeso(value) { setPeso(value); setResultado(null); }
  function mudarAtividade(value) { setNivelAtividade(value); setResultado(null); }

  return <main>
    <article>
      <section className="form-calculadora">
        <form onSubmit={calcular}>
          <h1>Calculadora de consumo de água</h1>
          <p className="form-help" id="escopo-agua">Estimativa educativa para adultos saudáveis. Use o peso habitual como referência.</p>
          <div className="input-linha">
            <label htmlFor="peso" className="input-label">Peso (kg):</label>
            <input id="peso" type="number" inputMode="decimal" min="0.1" step="0.1" value={peso} onChange={e => mudarPeso(e.target.value)} required className="input-campo" aria-describedby="escopo-agua" />
          </div>
          <div className="input-linha">
            <label htmlFor="nivelAtividade" className="input-label">Atividade física:</label>
            <select id="nivelAtividade" value={nivelAtividade} onChange={e => mudarAtividade(e.target.value)} className="input-campo select-formulario">
              <option value="sedentario">Sem exercício no dia</option>
              <option value="ativo">Com exercício no dia</option>
            </select>
          </div>
          <p className="form-help">A base é de 35 ml/kg. Para um dia com exercício, mostramos também uma simulação de 500 ml a 1 L adicionais; a reposição real precisa considerar as perdas de suor.</p>
          {erro && <p className="form-error" role="alert">{erro}</p>}
          <button type="submit">Calcular</button>
        </form>
      </section>
      <Image src="/images/agua.png" alt="" width={150} height={150} className="imagem-demo" />
      <div role="status" aria-live="polite" aria-atomic="true">
        {resultado && <section className="resultado">
          <h2>Estimativa diária de referência</h2>
          <p className="result-value">{litros(resultado.base)}</p>
          <p>{resultado.base.toLocaleString('pt-BR')} ml, calculados com 35 ml por kg.</p>
          {resultado.minimo !== resultado.maximo && <>
            <h3>Simulação para um dia com exercício</h3>
            <p className="result-value">{litros(resultado.minimo)} a {litros(resultado.maximo)}</p>
            <p>Base mais 500 ml a 1 L. Essa faixa é ilustrativa e não define sua necessidade individual durante ou após o treino.</p>
          </>}
          <p className="form-help">Distribua a ingestão ao longo do dia. A necessidade varia com clima, alimentação e condições de saúde.</p>
        </section>}
      </div>
    </article>
    <section className="informacoes"><div className="container-informacoes">
      <h2>Por que beber água é importante?</h2>
      <p>A água participa do transporte de nutrientes, da digestão e da eliminação de resíduos. Ela também ajuda a regular a temperatura corporal, especialmente quando perdemos líquido pelo suor. Manter a hidratação faz parte do cuidado diário com o funcionamento do organismo.</p>
      <h3>Quanto de água beber por dia?</h3>
      <p>Uma referência prática divulgada pela Universidade Federal do Sul da Bahia é usar 35 ml de água para cada quilograma de peso corporal habitual em adultos saudáveis. Esse cálculo é uma estimativa inicial: idade, alimentação, temperatura, atividade física e condições de saúde podem mudar a necessidade de líquidos.</p>
      <span className="texto-destaque">Quantidade de referência (ml/dia) = peso corporal (kg) × 35 ml</span>
      <p>Por exemplo, para uma pessoa de 70 kg: 70 × 35 = 2.450 ml, ou 2,45 litros por dia. Alimentos e outras bebidas também fornecem água; a estimativa não deve ser interpretada como obrigação de ingerir esse volume além de todos os líquidos já consumidos.</p>
      <hr />
      <h2>Água e atividade física</h2>
      <h3>É preciso acrescentar 500 ml a 1 L?</h3>
      <p>Durante o exercício, o suor aumenta a perda de água. Um acréscimo de 500 ml a 1 L aparece nesta calculadora como uma simulação simples para o dia com exercício, e não como uma recomendação universal. Um treino curto e leve pode exigir um ajuste diferente de uma sessão longa, intensa ou realizada no calor.</p>
      <p>O posicionamento da National Athletic Trainers’ Association orienta individualizar a reposição conforme a taxa de suor, a duração do exercício e o ambiente. Essa fonte não estabelece 500 ml a 1 L extras por dia para todas as pessoas. Evite forçar grandes volumes de água; tanto a desidratação quanto o consumo excessivo podem causar problemas.</p>
      <h3>Como cuidar da hidratação no dia a dia?</h3>
      <ul className="list-disc">
        <li>Deixe água disponível e beba ao longo do dia, prestando atenção à sede.</li>
        <li>Planeje o acesso à água antes, durante e depois da atividade física.</li>
        <li>Em exercícios prolongados ou com muito suor, procure orientação sobre a reposição de líquidos e eletrólitos.</li>
      </ul>
      <hr />
      <h2>Quando buscar orientação individual?</h2>
      <p>Esta ferramenta não foi feita para crianças nem para definir a ingestão em gestantes, lactantes ou pessoas com restrição de líquidos. Doenças renais, cardíacas e outras condições clínicas podem exigir orientação específica. Nesses casos, siga a recomendação da equipe de saúde em vez de uma fórmula geral.</p>
      <div className="fontes">
        <h3>Fontes e referências</h3>
        <a href="https://www.ufsb.edu.br/proaf/proaf/dace/cqv/setor-de-promocao-a-saude-estudantil/acao-bem-estar/acao-de-nutricao/promovendo-alimentacao-saudavel/ei-ja-bebeu-agua-hoje" target="_blank" rel="noopener noreferrer">Universidade Federal do Sul da Bahia — Ei, já bebeu água hoje? Referência didática de 35 ml/kg em adultos e funções da água.</a>
        <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5634236/" target="_blank" rel="noopener noreferrer">McDermott e colaboradores. National Athletic Trainers’ Association Position Statement: Fluid Replacement for the Physically Active. Journal of Athletic Training, 2017. Reposição individualizada no exercício.</a>
        <a href="https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Guia alimentar para a população brasileira, 2ª edição. Água na alimentação e atenção à sede.</a>
      </div>
    </div></section>
  </main>;
}
