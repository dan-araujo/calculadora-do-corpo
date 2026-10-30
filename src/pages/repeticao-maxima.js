import CalculatorResult from '../components/calculator-result';
import NumericInput from '../components/numeric-input';
import CalculatorForm from '../components/calculator-form';
import CalculatorHeader from '../components/calculator-header';
import { useState } from "react";
import {
    calcular1RepeticaoMaximaPorBrzycki,
    calcular1RepeticaoMaximaPorEpley,
    calcular1RepeticaoMaximaPorLander,
    calcular1RepeticaoMaximaPorLombardi,
    calcular1RepeticaoMaximaPorOConner,
    calcular1RepeticaoMaximaPorWathen,
    mostrarCargasRecomendadas1RepeticaoMaxima
} from "../lib/calculadoras.mjs";
import Image from "next/image";
import Autores1RepeticaoMaxima from "../components/autores-1rm";

export default function RepeticaoMaxima() {
    const [pesoLevantado, setPesoLevantado] = useState('');
    const [numeroRepeticoes, setNumeroRepeticoes] = useState(10);
    const [tipoTreinamento, setTipoTreinamento] = useState("treino-hipertrofia");
    const [resultados, setResultados] = useState({});
    const [mostrarResultado, setMostrarResultado] = useState(false);



    const calculo1RepeticaoMaxima = async (e) => {
        e.preventDefault();

        const epleyFormula1RM = calcular1RepeticaoMaximaPorEpley(parseFloat(pesoLevantado), parseInt(numeroRepeticoes));
        const landerFormula1RM = calcular1RepeticaoMaximaPorLander(parseFloat(pesoLevantado), parseInt(numeroRepeticoes));
        const oConnerFormula1RM = calcular1RepeticaoMaximaPorOConner(parseFloat(pesoLevantado), parseInt(numeroRepeticoes));
        const lombardiFormula1RM = calcular1RepeticaoMaximaPorLombardi(parseFloat(pesoLevantado), parseInt(numeroRepeticoes));
        const brzyckiformula1RM = calcular1RepeticaoMaximaPorBrzycki(parseFloat(pesoLevantado), parseInt(numeroRepeticoes));
        const wathenFormula1RM = calcular1RepeticaoMaximaPorWathen(parseFloat(pesoLevantado), parseInt(numeroRepeticoes));

        const cargaRecomendadaPorEpley = mostrarCargasRecomendadas1RepeticaoMaxima(epleyFormula1RM, tipoTreinamento);
        const cargaRecomendadaPorLander = mostrarCargasRecomendadas1RepeticaoMaxima(landerFormula1RM, tipoTreinamento);
        const cargaRecomendadaPorOConner = mostrarCargasRecomendadas1RepeticaoMaxima(oConnerFormula1RM, tipoTreinamento);
        const cargaRecomendadaPorLombardi = mostrarCargasRecomendadas1RepeticaoMaxima(lombardiFormula1RM, tipoTreinamento);
        const cargaRecomendadaPorBrzycki = mostrarCargasRecomendadas1RepeticaoMaxima(brzyckiformula1RM, tipoTreinamento);
        const cargaRecomendadaPorWathen = mostrarCargasRecomendadas1RepeticaoMaxima(wathenFormula1RM, tipoTreinamento);

        const resultados = {
            epley: { maxima: epleyFormula1RM, treino: cargaRecomendadaPorEpley },
            lander: { maxima: landerFormula1RM, treino: cargaRecomendadaPorLander },
            oConner: { maxima: oConnerFormula1RM, treino: cargaRecomendadaPorOConner },
            lombardi: { maxima: lombardiFormula1RM, treino: cargaRecomendadaPorLombardi },
            brzycki: { maxima: brzyckiformula1RM, treino: cargaRecomendadaPorBrzycki },
            wathen: { maxima: wathenFormula1RM, treino: cargaRecomendadaPorWathen }
        };

        setResultados(resultados);
        setMostrarResultado(true);
    }


    return (
        <main>
            <article className="area-calculadora">
                <section className="formulario-1rm">
                    <CalculatorForm onResetResult={() => setMostrarResultado(false)} onSubmit={calculo1RepeticaoMaxima}>
                        <CalculatorHeader title="Calculadora de 1 Repetição Máxima (1RM)" image="/images/supino.png" />
                        <div className="linha-campo">
                            <label htmlFor="peso-levantado" className="rotulo-campo">
                                Carga Levantada (kg):
                            </label>
                            <NumericInput field="pesoLevantado" id="peso-levantado"
                                value={pesoLevantado}
                                onChange={(e) => setPesoLevantado(e.target.value)}
                                className="campo-formulario" required />
                        </div>
                        <div className="linha-campo">
                            <label htmlFor="numero-repeticoes" className="rotulo-campo">
                                Número de Repetições (1-10):
                            </label>
                            <NumericInput field="numeroRepeticoes"
                                id="numero-repeticoes"
                                value={numeroRepeticoes}
                                onChange={(e) => setNumeroRepeticoes(e.target.value)}
                                className="campo-formulario" required />

                        </div>
                        <div className="linha-campo">
                            <label htmlFor="tipoTreinamento" className="rotulo-campo rotulo-treinamento">Tipo de Treinamento:</label>
                            <select id="tipoTreinamento" value={tipoTreinamento}
                                onChange={(e) => setTipoTreinamento(e.target.value)}
                                className="campo-formulario seletor-formulario">
                                <option value="treino-forca">
                                    Treino de Força
                                </option>
                                <option value="treino-hipertrofia">
                                    Treino de Hipertrofia
                                </option>
                                <option value="treino-emagrecimento">
                                    Treino de Emagrecimento
                                </option>
                                <option value="manutencao-muscular">
                                    Treino para Manutenção Muscular
                                </option>
                            </select>
                        </div>
                        <button type="submit" className="botao-1rm">
                            Calcular
                        </button>
                    </CalculatorForm>
                </section>

                <CalculatorResult visible={mostrarResultado}>
                    <h3 className="text-xl">Estimativa de 1RM e faixa de carga para o treino selecionado:</h3>
                    {Object.entries(resultados).map(([formula, valor]) => (
                        <h2 key={formula} className="text-2xl">
                            <div className="flex flex-col items-center">
                                <strong className="mr-1">{formula.charAt(0).toUpperCase() + formula.slice(1)}:</strong> {valor.maxima} kg de 1RM
                                <span className="block text-base">Treino: {valor.treino[0] > 0 ? `${valor.treino[0]} a ` : 'até '}{valor.treino[1]} kg</span>
                                <a aria-label={`Entenda a fórmula de ${formula.charAt(0).toUpperCase() + formula.slice(1)}`} href={`#${formula}`}><Image src={"/images/interrogacao.png"} width={16} height={16} className="icone-ajuda"  alt="" /></a>
                            </div>
                        </h2>
                    ))}
                </CalculatorResult>
            </article>
            <section className="informacoes">
                <div className="conteiner-informacoes">
                    <h2>O que é 1 Repetição Máxima (1RM)?</h2>
                    <p>É uma medida usada no treinamento de força para determinar a
                        carga máxima que uma pessoa pode levantar em um determinado exercício. É definido como
                        o maior peso que uma pessoa consegue levantar com a técnica adequada em uma única repetição do exercício específico.</p>

                    <p>O teste de 1RM é frequentemente realizado em exercícios como agachamento, supino, levantamento terra e
                        outros movimentos compostos. Ele é usado para avaliar a força máxima de um indivíduo em um determinado exercício
                        e acompanhar o progresso ao longo do tempo.</p>

                    <p>Deve ser realizado com cautela, levando em consideração a segurança e a técnica adequada. Geralmente,
                        é recomendado que o teste seja supervisionado por um profissional qualificado, como um treinador pessoal ou
                        um educador físico, para garantir a execução correta do exercício e evitar lesões.</p>

                    <p>Conhecer o seu 1RM pode ser útil para programar um treinamento adequado, determinar a intensidade dos exercícios,
                        ajustar as cargas de trabalho e estabelecer metas de progresso. No entanto, o seu treinamento não precisa
                        se limitar apenas a levantar cargas máximas, mas também pode incluir outras faixas de intensidade e variações
                        de exercícios que promovem um desenvolvimento muscular e força equilibrados.</p>

                    <br />
                    <p>É importante notar que, embora essas fórmulas possam fornecer uma estimativa útil, a determinação precisa
                        do 1RM geralmente requer um teste direto, com supervisão adequada e progressão gradual para evitar lesões.
                        Se você estiver interessado em estimar seu 1RM ou trabalhar com cargas máximas, é recomendado buscar orientação
                        de um profissional de educação física ou treinador experiente para garantir a segurança e eficácia do treinamento.</p>

                    <Autores1RepeticaoMaxima />
                </div>
            </section>
        </main>
    );
}
