import { useState } from "react";
import {
    calcular1RepeticaoMaximaPorBrzycki,
    calcular1RepeticaoMaximaPorEpley,
    calcular1RepeticaoMaximaPorLander,
    calcular1RepeticaoMaximaPorLombardi,
    calcular1RepeticaoMaximaPorOConner,
    calcular1RepeticaoMaximaPorWathen,
    mostrarCargasRecomendadas1RepeticaoMaxima
} from "./api/calculadoras";
import Image from "next/image";
import Autores1RepeticaoMaxima from "./autores-1rm";

export default function RepeticaoMaxima() {
    const [pesoLevantado, setPesoLevantado] = useState(0);
    const [numeroRepeticoes, setNumeroRepeticoes] = useState(10);
    const [tipoTreinamento, setTipoTreinamento] = useState("treino-hipertrofia");
    const [resultados, setResultados] = useState({});
    const [mostrarResultado, setMostrarResultado] = useState(false);



    const calculo1RepeticaoMaxima = async (e) => {
        e.preventDefault();

        const epleyFormula1RM = calcular1RepeticaoMaximaPorEpley(parseInt(pesoLevantado), parseInt(numeroRepeticoes));
        const landerFormula1RM = calcular1RepeticaoMaximaPorLander(parseInt(pesoLevantado), parseInt(numeroRepeticoes));
        const oConnerFormula1RM = calcular1RepeticaoMaximaPorOConner(parseInt(pesoLevantado), parseInt(numeroRepeticoes));
        const lombardiFormula1RM = calcular1RepeticaoMaximaPorLombardi(parseInt(pesoLevantado), parseInt(numeroRepeticoes));
        const brzyckiformula1RM = calcular1RepeticaoMaximaPorBrzycki(parseInt(pesoLevantado), parseInt(numeroRepeticoes));
        const wathenFormula1RM = calcular1RepeticaoMaximaPorWathen(parseInt(pesoLevantado), parseInt(numeroRepeticoes));

        const cargaRecomendadaPorEpley = mostrarCargasRecomendadas1RepeticaoMaxima(epleyFormula1RM, tipoTreinamento);
        const cargaRecomendadaPorLander = mostrarCargasRecomendadas1RepeticaoMaxima(landerFormula1RM, tipoTreinamento);
        const cargaRecomendadaPorOConner = mostrarCargasRecomendadas1RepeticaoMaxima(oConnerFormula1RM, tipoTreinamento);
        const cargaRecomendadaPorLombardi = mostrarCargasRecomendadas1RepeticaoMaxima(lombardiFormula1RM, tipoTreinamento);
        const cargaRecomendadaPorBrzycki = mostrarCargasRecomendadas1RepeticaoMaxima(brzyckiformula1RM, tipoTreinamento);
        const cargaRecomendadaPorWathen = mostrarCargasRecomendadas1RepeticaoMaxima(wathenFormula1RM, tipoTreinamento);

        const resultados = {
            epley: cargaRecomendadaPorEpley[1],
            lander: cargaRecomendadaPorLander[1],
            oConner: cargaRecomendadaPorOConner[1],
            lombardi: cargaRecomendadaPorLombardi[1],
            brzycki: cargaRecomendadaPorBrzycki[1],
            wathen: cargaRecomendadaPorWathen[1]
        };

        setResultados(resultados);
        setMostrarResultado(true);
    }


    return (
        <main>
            <article className="flex flex-wrap">
                <section className="form-1rm">
                    <form onSubmit={calculo1RepeticaoMaxima}>
                        <h1>Calculadora de 1 Repetição Máxima (1RM)</h1>
                        <div className="input-linha">
                            <label htmlFor="peso-levantado" className="input-label">
                                Carga Levantada (kg):
                            </label>
                            <input type="number"
                                value={pesoLevantado}
                                min={1}
                                onChange={(e) => setPesoLevantado(e.target.value)}
                                className="input-campo" required />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="numero-repeticoes" className="input-label">
                                Número de Repetições (1-10):
                            </label>
                            <input
                                min={1}
                                max={10}
                                step="1"
                                id="numero-repeticoes"
                                type="number"
                                value={numeroRepeticoes}
                                onChange={(e) => setNumeroRepeticoes(e.target.value)}
                                className="input-campo" required />

                        </div>
                        <div className="input-linha">
                            <label htmlFor="tipoTreinamento" className="input-label label-treinamento">Tipo de Treinamento:</label>
                            <select value={tipoTreinamento}
                                onChange={(e) => setTipoTreinamento(e.target.value)}
                                className="input-campo select-formulario">
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
                        <button type="submit" style={{marginLeft: "25%"}} className="botao-1rm">
                            Calcular
                        </button>
                    </form>
                </section>
                    <Image src={"/images/supino.png"} alt="Icone supino" width={150} height={150}
                        className="imagem-demo" />
                <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                    <h3 className="text-xl">A carga recomendada em 1 Repetição Máxima para o seu tipo de treinamento é:</h3>
                    {Object.entries(resultados).map(([formula, valor]) => (
                        <h2 key={formula} className="text-2xl">
                            <div className="flex flex-row justify-center">
                                <strong className="mr-1">{formula.charAt(0).toUpperCase() + formula.slice(1)}:</strong> {valor} kgs.
                                <a href={`#${formula}`}><Image src={"/images/interrogacao.png"} width={16} height={16} className="question" /></a>
                            </div>
                        </h2>
                    ))}
                </div>
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
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