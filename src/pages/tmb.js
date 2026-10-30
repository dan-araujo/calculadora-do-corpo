import NumericInput from '../components/numeric-input';
import CalculatorForm from '../components/calculator-form';
import CalculatorHeader from '../components/calculator-header';
import { useState } from "react";
import { calcularTaxaMetabolicaBasal } from "../lib/calculadoras.mjs";
import AutoresTMB from "../components/autores-tmb";

export default function TaxaMetabolicaBasal() {
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [genero, setGenero] = useState('masculino');
    const [formulaTMB, setFormulaTMB] = useState('harris-benedict');
    const [gorduraCorporal, setGorduraCorporal] = useState(20);
    const [TMB, setTMB] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoTaxaMetabolicaBasal = async (e) => {
        e.preventDefault();
        const resultado = calcularTaxaMetabolicaBasal(parseInt(idade), parseFloat(peso),
            parseFloat(altura), genero, formulaTMB, parseFloat(gorduraCorporal));

        setTMB(resultado);
        setMostrarResultado(true);
    }

    return (
        <main>
            <article className="area-calculadora">
                <section className="formulario-calculadora">
                    <CalculatorForm onResetResult={() => setMostrarResultado(false)} onSubmit={calculoTaxaMetabolicaBasal}>
                        <CalculatorHeader title="Calculadora de Taxa Metabólica Basal" image="/images/tmb.png" />
                        <div className="linha-campo">
                            <label htmlFor="idade" className="rotulo-campo">Idade:</label>
                            <NumericInput field="idade"
                                id="idade"
                                value={idade}
                                onChange={(e) => setIdade(e.target.value)}
                                className="campo-formulario" required />

                        </div>
                        <div className="linha-campo">
                            <label htmlFor="peso" className="rotulo-campo">
                                Peso (kg):
                            </label>
                            <NumericInput field="peso" id="peso" value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                required
                                className="campo-formulario" />
                        </div>
                        <div className="linha-campo">
                            <label htmlFor="altura" className="rotulo-campo">
                                Altura (cm):
                            </label>
                            <NumericInput field="altura"
                                id="altura"
                                value={altura}
                                onChange={(e) => setAltura(e.target.value)}
                                required
                                className="campo-formulario"
                            />
                        </div>
                        <div className="linha-campo">
                            <label htmlFor="genero" className="rotulo-campo">Gênero:</label>
                            <select
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                className="campo-formulario seletor-formulario">
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                        <h3 className="subtitulo-tmb">Fórmula de estimativa para a Taxa Metabólica Basal:</h3>
                        <div className="grupo-formulas">
<div className="opcao-formula">
                            <input type="radio"
                                id="harris-benedict"
                                name="formula"
                                value="harris-benedict"
                                onChange={(e) => setFormulaTMB(e.target.value)}
                                checked={formulaTMB === 'harris-benedict'}
                            />
                            <label htmlFor="harris-benedict">Harris-Benedict</label>
                            <a href="#benedict" className="ajuda-benedict">?</a>
                        </div>
                        <div className="opcao-formula">
                            <input type="radio"
                                id="katch-mcardle"
                                name="formula"
                                value="katch-mcardle"
                                onChange={(e) => setFormulaTMB(e.target.value)}
                                checked={formulaTMB === 'katch-mcardle'}
                            />
                            <label htmlFor="katch-mcardle">Katch-McArdle</label>
                            <a href="#mcardle" className="ajuda-mcardle">?</a>
                            <NumericInput id="gorduraCorporal" field="gorduraCorporal"
                                aria-label="Gordura corporal (%)" value={gorduraCorporal}
                                onChange={(e) => setGorduraCorporal(e.target.value)}
                                className="campo-gordura"
                            />
                        </div>
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </CalculatorForm>
                </section>

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
                <div className="conteiner-informacoes">
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
                            target="_blank" rel="noopener noreferrer">
                            - Amarildo César de Oliveira,
                            <strong> Adaptação das equações do protocolo de Katch e McArdle para cálculo
                                da estimativa do percentual através da perimetria</strong>,
                            efdesportes,
                            Lecturas: Educación Física y Deportes,
                            2012
                        </a>
                        <a href="https://archive.org/details/exercisephysiolo00mcar"
                            target="_blank" rel="noopener noreferrer">
                            - McArdle, William D, Katch, Frank I, Katch, Victor L,
                            <strong> Exercise physiology : energy, nutrition, and human performance - 2nd Edition</strong>,
                            Philadelphia: Lea & Febiger,
                            1986
                        </a>
                        <a href="https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation"
                            target="_blank" rel="noopener noreferrer">
                            - Wikipédia,
                            <strong> Harris-Benedict equation</strong>,
                            The Free Encyclopedia,
                            2023
                        </a>
                        <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1091498/"
                            target="_blank" rel="noopener noreferrer">
                            - J. Arthur Harris and Francis G. Benedict,
                            <strong> A Biometric Study of Human Basal Metabolism</strong>,
                            Proceedings of National Academy of Sciences of the United States of America,
                            1918
                        </a>
                        <a href="https://en.wikipedia.org/wiki/Basal_metabolic_rate"
                            target="_blank" rel="noopener noreferrer">
                            - Wikipédia,
                            <strong> Basal metabolic rate</strong>,
                            The Free Encyclopedia,
                            2023
                        </a>

                    </div>
                </div>
            </section>
        </main>
    );
}
