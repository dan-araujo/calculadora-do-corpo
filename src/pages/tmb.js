import { useState } from "react";
import { calcularTaxaMetabolicaBasal } from "./api/calculadoras";
import Image from "next/image";
import AutoresTMB from "./autores-tmb";

export default function TaxaMetabolicaBasal() {
    const [idade, setIdade] = useState(0);
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [genero, setGenero] = useState('masculino');
    const [formulaTMB, setFormulaTMB] = useState('harris-benedict');
    const [gorduraCorporal, setGorduraCorporal] = useState(20);
    const [TMB, setTMB] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoTaxaMetabolicaBasal = async (e) => {
        e.preventDefault();
        const resultado = calcularTaxaMetabolicaBasal(parseInt(idade), parseFloat(peso),
            parseInt(altura), genero, formulaTMB, parseInt(gorduraCorporal));

        setTMB(resultado);
        setMostrarResultado(true);
    }

    return (
        <main>
            <article>
                <section className="form-calculadora">
                    <form onSubmit={calculoTaxaMetabolicaBasal}>
                        <h1>Calculadora de Taxa Metabólica Basal</h1>
                        <div className="input-linha">
                            <label htmlFor="idade" className="input-label">Idade:</label>
                            <input type="number"
                                id="idade"
                                value={idade}
                                step={1}
                                min={0}
                                onChange={(e) => setIdade(e.target.value)}
                                className="input-campo" required />

                        </div>
                        <div className="input-linha">
                            <label htmlFor="peso" className="input-label">
                                Peso (kg):
                            </label>
                            <input type="number" value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                required
                                className="input-campo" />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="altura" className="input-label">
                                Altura (cm):
                            </label>
                            <input
                                min={100}
                                step="0.1"
                                id="altura"
                                type="number"
                                value={altura}
                                onChange={(e) => setAltura(e.target.value)}
                                required
                                className="input-campo"
                            />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="genero" className="input-label">Gênero:</label>
                            <select
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                className="input-campo select-formulario">
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                        <h3 className="subtitulo-tmb">Fórmula de estimativa para a Taxa Metabólica Basal:</h3>
                        <div className="formulas-radio">
                            <input type="radio"
                                id="harris-benedict"
                                name="formula"
                                value="harris-benedict"
                                onChange={(e) => setFormulaTMB(e.target.value)}
                                checked={formulaTMB === 'harris-benedict'}
                            />
                            <label htmlFor="harris-benedict">Harris-Benedict</label>
                            <a href="#benedict" className="benedict-question">?</a>
                        </div>
                        <div className="formulas-radio">
                            <input type="radio"
                                id="katch-mcardle"
                                name="formula"
                                value="katch-mcardle"
                                onChange={(e) => setFormulaTMB(e.target.value)}
                                checked={formulaTMB === 'katch-mcardle'}
                            />
                            <label htmlFor="katch-mcardle">Katch-McArdle</label>
                            <a href="#mcardle" className="mcardle-question">?</a>
                            <input type="number"
                                value={gorduraCorporal}
                                min={5} max={80}
                                onChange={(e) => setGorduraCorporal(e.target.value)}
                                className="input-bf"
                            />
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </form>
                </section>
                <Image src={"/images/tmb.png"} width={150} height={150}
                    className="imagem-demo" />
                <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                    {TMB !== 0 &&
                        <div>
                            <h3 className="text-xl">Taxa Metabólica Basal (TMB):</h3>
                            <h2 className="text-2xl"> {TMB} kcal/dia</h2>
                        </div>
                    }
                </div>
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
                    <h2>O que é a taxa metabólica basal?</h2>
                    <p>A taxa metabólica basal (TMB) é a quantidade de energia que o corpo precisa para manter
                        suas funções básicas em repouso, ou seja, em um estado de total relaxamento físico e mental.
                        É a quantidade de calorias que o organismo requer para realizar atividades essenciais, como manter
                        a temperatura corporal, realizar processos metabólicos, respirar, manter o funcionamento do coração,
                        dos órgãos e do sistema nervoso, entre outros.</p>

                    <p>É influenciada por vários fatores, incluindo idade, sexo, altura, peso e composição corporal. Geralmente,
                        a taxa metabólica basal é expressa em calorias por dia (kcal/dia).</p>

                    <p>É importante ressaltar que a essa informação representa apenas uma parte do gasto energético total diário de uma pessoa.
                        Além de que, a atividade física e a termogênese induzida pela dieta (energia gasta durante a digestão dos alimentos)
                        também contribuem para o gasto calórico diário total.</p>

                    <p>Ao determinar as necessidades calóricas de uma pessoa, é comum multiplicar o resultado desse cálculo pelo fator correspondente ao
                        nível de atividade física para obter uma estimativa mais precisa. Essa estimativa leva em consideração o gasto
                        energético adicional devido à prática de exercícios e atividades diárias.</p>

                    <p>A taxa metabólica basal e as necessidades calóricas podem
                        variar entre indivíduos, e a avaliação individualizada feita por um profissional de saúde, como um nutricionista esportivo,
                        é recomendada para obter estimativas mais precisas e adequadas às necessidades específicas de cada pessoa.</p>
                    <hr />
                    <AutoresTMB />
                    <div className="fontes">
                        <small className="text-sm font-semibold">Referências:</small>
                        <a href="https://efdeportes.com/efd166/equacoes-do-protocolo-de-katch-e-mcardle.htm"
                            target="_blank">
                            - Amarildo César de Oliveira,
                            <strong> Adaptação das equações do protocolo de Katch e McArdle para cálculo
                                da estimativa do percentual através da perimetria</strong>,
                            efdesportes,
                            Lecturas: Educación Física y Deportes,
                            2012
                        </a>
                        <a href="https://archive.org/details/exercisephysiolo00mcar"
                            target="_blank">
                            - McArdle, William D, Katch, Frank I, Katch, Victor L,
                            <strong> Exercise physiology : energy, nutrition, and human performance - 2nd Edition</strong>,
                            Philadelphia: Lea & Febiger,
                            1986
                        </a>
                        <a href="https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation"
                            target="_blank">
                            - Wikipédia,
                            <strong> Harris-Benedict equation</strong>,
                            The Free Encyclopedia,
                            2023
                        </a>
                        <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1091498/"
                            target="_blank">
                            - J. Arthur Harris and Francis G. Benedict,
                            <strong> A Biometric Study of Human Basal Metabolism</strong>,
                            Proceedings of National Academy of Sciences of the United States of America,
                            1918
                        </a>
                        <a href="https://en.wikipedia.org/wiki/Basal_metabolic_rate"
                            target="_blank">
                            - Wikipédia,
                            <strong> Basal metabolic rate</strong>,
                            The Free Encyclopedia,
                            2023
                        </a>
                        <a href="https://www.flaticon.com/" title="metabolism icon" target="_blank">
                            - icones criados por freepik - flaticon
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}