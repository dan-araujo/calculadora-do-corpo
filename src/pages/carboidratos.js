import CalculatorResult from '../components/calculator-result';
import NumericInput from '../components/numeric-input';
import CalculatorForm from '../components/calculator-form';
import CalculatorHeader from '../components/calculator-header';
import { useState } from "react";
import { calcularCarboidratos } from "../lib/calculadoras.mjs";
import AutoresTMB from "../components/autores-tmb";

export default function Carboidratos() {
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [genero, setGenero] = useState('masculino');
    const [nivelAtividade, setNivelAtividade] = useState('sedentario');
    const [formulaTMB, setFormulaTMB] = useState('harris-benedict');
    const [gorduraCorporal, setGorduraCorporal] = useState(20);
    const [carboidratosMinimo, setCarboidratosMinimo] = useState(0);
    const [carboidratosMaximo, setCarboidratosMaximo] = useState(0);
    const [objetivoDieta, setObjetivoDieta] = useState("manutencao-peso");
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoCarboidratos = async (e) => {
        e.preventDefault();
        const valoresCarboidratos = calcularCarboidratos(parseInt(idade), parseFloat(peso), parseFloat(altura),
            genero, nivelAtividade, formulaTMB, parseFloat(gorduraCorporal), objetivoDieta);

        setCarboidratosMinimo(valoresCarboidratos[0]);
        setCarboidratosMaximo(valoresCarboidratos[1]);
        setMostrarResultado(true);
    }

    return (
        <main>
            <article className="area-calculadora">
                <section className="formulario-calculadora formulario-carboidratos">
                    <CalculatorForm onResetResult={() => setMostrarResultado(false)} onSubmit={calculoCarboidratos}>
                        <CalculatorHeader title="Calculadora de Carboidratos" image="/images/carboidratos.png" />
                        <div className="linha-campo">
                            <label htmlFor="idade" className="rotulo-campo">Idade:</label>
                            <NumericInput field="idade"
                                id="idade"
                                value={idade}
                                onChange={(e) => setIdade(e.target.value)}
                                className="campo-formulario" required />

                        </div>
                        <div className="linha-campo">
                            <label htmlFor="peso" className="rotulo-campo">Peso (kg):</label>
                            <NumericInput field="peso" id="peso" value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                className="campo-formulario" required />

                        </div>
                        <div className="linha-campo">
                            <label htmlFor="altura" className="rotulo-campo">Altura (cm):</label>
                            <NumericInput field="altura"
                                id="altura"
                                value={altura}
                                onChange={(e) => setAltura(e.target.value)}
                                className="campo-formulario" required />

                        </div>
                        <div className="linha-campo">
                            <label htmlFor="genero" className="rotulo-campo rotulo-seletor">Gênero:</label>
                            <select
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                className="campo-formulario seletor-formulario">
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                        <div className="linha-campo">
                            <label htmlFor="nivelAtividade" className="rotulo-campo rotulo-seletor">Nível de Atividade:</label>
                            <select id="nivelAtividade" value={nivelAtividade}
                                onChange={(e) => setNivelAtividade(e.target.value)}
                                className="campo-formulario seletor-formulario">
                                <option value="sedentario">
                                    Sedentário
                                </option>
                                <option value="levemente-ativo">
                                    Levemente ativo
                                </option>
                                <option value="moderadamente-ativo">
                                    Moderadamente ativo
                                </option>
                                <option value="muito-ativo">
                                    Muito ativo
                                </option>
                                <option value="extremamente-ativo">
                                    Extremamente ativo
                                </option>
                            </select>
                        </div>
                        <div className="linha-campo">
                            <label htmlFor="objetivoDieta" className="rotulo-campo rotulo-seletor">
                                Objetivo:
                            </label>
                            <select id="objetivoDieta" value={objetivoDieta}
                                onChange={(e) => setObjetivoDieta(e.target.value)}
                                className="campo-formulario seletor-formulario">
                                <option value="perda-peso-gradual">
                                    Reduzir 250 kcal/dia
                                </option>
                                <option value="perda-peso">
                                    Reduzir 500 kcal/dia
                                </option>
                                <option value="manutencao-peso">
                                    Manter peso
                                </option>
                                <option value="ganho-peso-gradual">
                                    Acrescentar 250 kcal/dia
                                </option>
                                <option value="ganho-peso">
                                    Acrescentar 500 kcal/dia
                                </option>
                            </select>
                        </div>
                        <h3 id="titulo-formulas" className="subtitulo-tmb">Fórmula de estimativa para a Taxa Metabólica Basal:</h3>
                        <div className="grupo-formulas" role="radiogroup" aria-labelledby="titulo-formulas">
<div className="opcao-formula">
                            <input type="radio"
                                id="harris-benedict"
                                name="formula"
                                value="harris-benedict"
                                onChange={(e) => setFormulaTMB(e.target.value)}
                                checked={formulaTMB === 'harris-benedict'}
                            />
                            <label htmlFor="harris-benedict">Harris-Benedict</label>
                            <a href="#benedict" className="ajuda-benedict" aria-label="Entenda a fórmula de Harris-Benedict">?</a>
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
                            <a href="#mcardle" className="ajuda-mcardle" aria-label="Entenda a fórmula de Katch-McArdle">?</a>
                            <NumericInput id="gorduraCorporal" field="gorduraCorporal"
                                aria-label="Gordura corporal (%)" value={gorduraCorporal}
                                onChange={(e) => setGorduraCorporal(e.target.value)}
                                className="campo-gordura"
                            />
                        </div>
                        </div>
                        <div className="descricao-nivel-atividade" >
                            <small><strong>Sedentário:</strong> Pouco ou nenhum exercício.</small>
                            <br />
                            <small><strong>Levemente ativo:</strong> Exercício leve de 1-3 dias por semana.</small>
                            <br />
                            <small><strong>Moderadamente ativo:</strong> Exercício moderado de 3-5 dias por semana.</small>
                            <br />
                            <small><strong>Muito ativo:</strong> Exercício intenso de 6-7 dias por semana.</small>
                            <br />
                            <small><strong>Extremamente ativo:</strong> Exercício intenso feito diariamente
                                ou treinamento para competições.</small>
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </CalculatorForm>
                </section>

                <CalculatorResult visible={mostrarResultado}>
                    {carboidratosMinimo !== 0 &&
                        <div>
                            <h2 className="text-xl">
                                A quantidade de carboidratos total por dia recomendada está
                                entre {carboidratosMinimo} g à {carboidratosMaximo} g
                            </h2>
                            <br />
                            <p className="text-lg">☑️ As diretrizes dietéticas gerais recomendam que os carboidratos estejam na faixa
                                de 45% a 65% das calorias totais diárias. </p>
                            <p className="text-lg">☑️ Cada grama de carboidrato fornece aproximadamente 4 calorias</p>
                        </div>
                    }
                </CalculatorResult>
            </article>
            <section className="informacoes">
                <div className="conteiner-informacoes">
                    <h2>Por que carboidratos são tão importantes?</h2>
                    <p>Os carboidratos são macronutrientes essenciais para o bom funcionamento do nosso organismo.
                        Eles desempenham um papel fundamental ao fornecer energia para as atividades diárias, tanto físicas quanto
                        mentais. Aqui estão alguns pontos importantes sobre a importância dos carboidratos em nossa dieta:</p>

                    <h3>Fonte de energia</h3>
                    <p>São a principal fonte de energia para o corpo humano. Quando consumidos, eles são convertidos em
                        glicose, que é transportada para as células e usada para gerar energia. Essa energia é necessária para realizar
                        tarefas diárias, desde as atividades físicas até o funcionamento adequado dos órgãos internos.</p>

                    <h3>Desempenho físico</h3>
                    <p>Desempenham um papel crucial no desempenho físico, especialmente em atividades intensas e de
                        alta intensidade. Durante exercícios de resistência ou treinamento de força, os carboidratos são a principal fonte
                        de combustível para os músculos. A falta de carboidratos na dieta pode resultar em fadiga precoce, falta de energia
                        e queda no desempenho físico.</p>

                    <h3>Função cerebral</h3>
                    <p>O cérebro depende de glicose para funcionar adequadamente. Os carboidratos fornecem essa glicose
                        para o cérebro, permitindo um funcionamento cognitivo adequado. Dietas muito baixas em carboidratos
                        podem levar a uma redução na disponibilidade de glicose para o cérebro, afetando negativamente o humor,
                        a concentração e a capacidade de pensar com clareza.</p>

                    <h3>Regulação do metabolismo</h3>
                    <p>Desempenham um papel importante na regulação do metabolismo.
                        Quando consumimos esse macronutriente, o corpo libera insulina, um hormônio que ajuda a controlar
                        os níveis de glicose no sangue. A insulina auxilia na absorção e utilização da glicose pelas células,
                        evitando picos perigosos nos níveis de açúcar no sangue.</p>

                    <h3>Fibra alimentar</h3>
                    <p>Muitos alimentos ricos em carboidratos, como grãos integrais, frutas e legumes,
                        são também fontes de fibra alimentar. A fibra desempenha um papel importante na saúde digestiva,
                        promovendo a regularidade intestinal, prevenindo constipação e auxiliando
                        na saúde do sistema digestivo como um todo.</p>

                    <br />
                    <p>No entanto, é importante ressaltar que nem todos os carboidratos são iguais. Existem os de tipo simples,
                        como açúcares refinados, que devem ser consumidos com moderação, pois podem causar picos rápidos nos níveis
                        de açúcar no sangue. E também os de tipo complexos, presentes em alimentos
                        como grãos integrais, vegetais e legumes, são preferíveis, pois são digeridos mais lentamente,
                        fornecendo energia de forma mais sustentada ao longo do tempo.</p>

                    <p>Cada grama de carboidrato fornece aproximadamente
                        <span className="text-pentagramBlue"> 4 calorias</span>.
                        Essa é a mesma quantidade de calorias fornecida por cada grama de proteína</p>

                    <p>Deve-se também levar em consideração que as necessidades individuais de carboidratos podem variar de acordo
                        com fatores como idade, sexo, nível de atividade física e objetivos pessoais. Atletas e pessoas envolvidas
                        em atividades físicas intensas, por exemplo, podem precisar de uma ingestão maior de carboidratos para
                        sustentar seu desempenho e recuperação muscular.</p>


                    <p>É fundamental ter moderação no consumo de carboidratos, principalmente
                        aqueles que são altamente processados, refinados e ricos em açúcares adicionados.
                        Esses alimentos podem levar ao ganho de peso indesejado, aumento dos níveis de açúcar
                        no sangue e maior risco de desenvolver condições de saúde, como diabetes tipo 2 e doenças cardiovasculares.</p>

                    <p>Uma abordagem equilibrada e consciente é essencial. Isso envolve escolher carboidratos complexos e
                        naturais, como arroz integral, pão integral, quinoa, aveia, frutas e legumes, em vez de opções processadas
                        e refinadas. Além disso, é importante combinar os carboidratos com outras fontes de nutrientes,
                        como proteínas magras, gorduras saudáveis e uma variedade de vitaminas e minerais encontrados em alimentos diversos.</p>

                    <p>Lembre-se de que o equilíbrio é chave em uma dieta saudável. Os carboidratos têm um papel importante na nossa
                        nutrição e fornecem a energia necessária para enfrentar o dia a dia. Mas, esteja sempre ciente
                        das suas necessidades individuais e faça escolhas conscientes para garantir uma alimentação equilibrada,
                        que atenda às suas necessidades de energia, saúde e bem-estar geral.</p>
                    <hr />
                    <AutoresTMB />
                    <br />

                    <div className="fontes">
                        <small className="referencias">Referências:</small>
                        <a href="http://www.rbne.com.br/index.php/rbne/article/view/67" target="_blank" rel="noopener noreferrer">
                            - Anderson Luiz da Silva, Guilherme Dal Farra Miranda, Rafaela Liberali,
                            <strong> A influência dos carboidratos antes, durante e após-treinos de alta intensidade</strong>,
                            RBNE - Revista Brasileira de Nutrição Esportiva,
                            2008
                        </a>
                        <a href="https://www.scielo.br/j/rbme/a/J4HtDsVWM6GHF6dhHDFGhst/?format=pdf" target="_blank" rel="noopener noreferrer">
                            - Katiuce Borges Sapata, Ana Paula Trussardi Fayh e Alvaro Reischak de Oliveira,
                            <strong> Efeitos do consumo prévio de carboidratos sobre a resposta glicêmica e desempenho</strong>,
                            RBME - Revista Brasileira de Medicina do Esporte, Volume: 12, Número: 4,
                            2006
                        </a>
                        <a href="http://www.rbne.com.br/index.php/rbne/article/view/67" target="_blank" rel="noopener noreferrer">
                            - Cargill Agrícola S.A.,
                            <strong> Dossiê carboidratos</strong>,
                            Revista FIB - Food Ingredients Brasil, Nº 20,
                            2012
                        </a>

                    </div>
                </div>
            </section>
        </main>
    );
}
