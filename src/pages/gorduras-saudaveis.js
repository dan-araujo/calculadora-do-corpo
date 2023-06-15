import { useState } from "react";
import { calcularGodurasSaudaveis, calcularTotalGordurasSaudaveisPorDieta } from "./api/calculadoras";
import Image from "next/image";
import AutoresTMB from "./autores-tmb";

export default function GordurasSaudaveis() {
    const [idade, setIdade] = useState(0);
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [genero, setGenero] = useState('masculino');
    const [nivelAtividade, setNivelAtividade] = useState('sedentario');
    const [formulaTMB, setFormulaTMB] = useState('harris-benedict');
    const [gorduraCorporal, setGorduraCorporal] = useState(20);
    const [gordurasMinimas, setGordurasMinimas] = useState(0);
    const [gordurasMaximas, setGordurasMaximas] = useState(0);
    const [objetivoDieta, setObjetivoDieta] = useState("manutencao-peso");
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoGodurasSaudaveis = async (e) => {
        e.preventDefault();
        const valoresGordurasSaudaveis = calcularGodurasSaudaveis(parseInt(idade), parseFloat(peso), parseInt(altura),
            genero, nivelAtividade, formulaTMB, parseInt(gorduraCorporal));

        setGordurasMinimas(calcularTotalGordurasSaudaveisPorDieta(valoresGordurasSaudaveis[0], objetivoDieta));
        setGordurasMaximas(calcularTotalGordurasSaudaveisPorDieta(valoresGordurasSaudaveis[1], objetivoDieta));
        setMostrarResultado(true);
    }

    return (
        <main>
            <article>
                <section className="form-calculadora form-gorduras">
                    <form onSubmit={calculoGodurasSaudaveis}>
                        <h1>Calculadora de Gorduras Saudáveis</h1>
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
                            <label htmlFor="peso" className="input-label">Peso (kg):</label>
                            <input type="number"
                                value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                className="input-campo" required />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="altura" className="input-label">Altura (cm): </label>
                            <input
                                min={100}
                                step="0.1"
                                id="altura"
                                type="number"
                                value={altura}
                                onChange={(e) => setAltura(e.target.value)}
                                className="input-campo" required />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="genero" className="input-label labels-select">Gênero:</label>
                            <select
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                className="input-campo select-formulario">
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                        <div className="input-linha">
                            <label htmlFor="nivelAtividade" className="input-label labels-select">Nível de Atividade:</label>
                            <select value={nivelAtividade}
                                onChange={(e) => setNivelAtividade(e.target.value)}
                                className="input-campo select-formulario">
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
                        <div className="input-linha">
                            <label htmlFor="objetivoDieta" className="input-label labels-select">
                                Objetivo:
                            </label>
                            <select value={objetivoDieta}
                                onChange={(e) => setObjetivoDieta(e.target.value)}
                                className="input-campo select-formulario">
                                <option value="perda-peso-gradual">
                                    Perder 0.5kg/semana
                                </option>
                                <option value="perda-peso">
                                    Perder 1kg/semana
                                </option>
                                <option value="manutencao-peso">
                                    Manter peso
                                </option>
                                <option value="ganho-peso-gradual">
                                    Ganhar 0.5kg/semana
                                </option>
                                <option value="ganho-peso">
                                    Ganhar 1kg/semana
                                </option>
                            </select>
                        </div>
                        <h3 className="subtitulo-tmb">Formula de estimativa para a Taxa Metabólica Basal:</h3>
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
                        <div className="small-nivel-atividade" >
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
                    </form>
                </section>
                <Image src={"/images/gorduras.png"} width={150} height={150}
                    className="imagem-demo" />
                <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                    {gordurasMinimas !== 0 &&
                        <div>
                            <h2 className="text-2xl">
                            ☑️ A quantidade de total ingestão de gorduras saudáveis recomendada por dia
                                está entre {gordurasMinimas} g à {gordurasMaximas} g
                            </h2>
                            <br />
                            <h3 className="text-xl">☑️ De acordo com a OMS as gorduras totais devem corresponder
                                a cerca de <span className="text-pentagramBlue"> 25-35%</span> das calorias diárias,
                                onde as gorduras saturadas devem representar menos de 7% das calorias diárias, enquanto as gorduras
                                trans devem ser evitadas ao máximo.</h3>
                        </div>
                    }
                </div>
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
                    <h2>Quais os tipos de gorduras encontradas nos alimentos?</h2>
                    <p>Existem diferentes tipos e são classificadas
                        em três categorias principais:</p>

                    <h3>Gorduras saturadas</h3>
                    <p>São encontradas principalmente em fontes animais, como carne vermelha, produtos lácteos
                        integrais (leite integral, queijo, manteiga), pele de aves e óleo de coco. O consumo excessivo de gorduras saturadas
                        tem sido associado a um aumento do risco de doenças cardiovasculares.</p>

                    <h3>Gorduras insaturadas</h3>
                    <p>Essas gorduras são consideradas mais saudáveis e são as mais recomendadas em uma dieta podendo ser divididas
                        em duas subcategorias:</p>

                    <h4 className="text-xl font-semibold">Gorduras monoinsaturadas</h4>
                    <p>São encontradas em alimentos como azeite de oliva, abacate, nozes e amêndoas.
                        O consumo moderado de gorduras monoinsaturadas pode ajudar a reduzir o colesterol LDL (considerado "ruim")
                        e aumentar o colesterol HDL (considerado "bom").</p>

                    <h4 className="text-xl font-semibold">Gorduras poli-insaturadas</h4>
                    <p>Podem ser divididas em duas subcategorias principais:</p>

                    <p><strong>Ácidos graxos ômega-3: </strong>
                        Encontrados em peixes gordurosos, como salmão, sardinha e atum, bem como em
                        sementes de linhaça e chia. Os ômega-3 têm sido associados a benefícios para a saúde cardiovascular,
                        redução da inflamação e melhora da função cerebral.</p>

                    <p><strong>Ácidos graxos ômega-6: </strong> São encontrados em óleos vegetais, como óleo de girassol, milho e soja.
                        Embora sejam necessários para a saúde, o consumo
                        excessivo de ômega-6 em relação aos ômega-3 pode promover inflamação.</p>

                    <h3>Gorduras trans</h3>
                    <p>São produzidas por meio de um processo chamado hidrogenação, no qual óleos
                        vegetais líquidos são transformados em gorduras sólidas. As gorduras trans podem ser encontradas em
                        alimentos processados, como margarinas, alimentos fritos, bolos, biscoitos e salgadinhos. Elas aumentam
                        o colesterol LDL e diminuem o colesterol HDL, aumentando o risco de doenças cardíacas. É recomendado evitar
                        o consumo de gorduras trans o máximo possível.</p>

                    <hr />
                    <h2>Porque as gorduras boas não devem ser negligenciadas na alimentação e dieta?</h2>
                    <p>Auxiliam em diversas funções vitais no
                        organismo além de fornecer energia. Aqui estão alguns motivos pelos quais as gorduras saudáveis são importantes:</p>

                    <h3>Fornecimento de energia</h3>
                    <p>São uma fonte concentrada de energia, fornecendo
                        <span className="text-pentagramBlue"> 9 calorias por grama.
                        </span>Elas ajudam a fornecer combustível para as atividades diárias e são especialmente
                        importantes durante períodos de exercício físico prolongado.</p>

                    <h3>Absorção de vitaminas lipossolúveis</h3>
                    <p>As vitaminas lipossolúveis (vitaminas A, D, E e K) dependem
                        da presença de gorduras para serem absorvidas pelo corpo. Consumir gorduras boas junto com alimentos
                        ricos nessas vitaminas ajuda a garantir sua absorção adequada.</p>

                    <h3>Componente estrutural das células</h3>
                    <p>As gorduras saudáveis são componentes essenciais das membranas celulares,
                        ajudando a manter a integridade e a função adequada das células.</p>

                    <h3>Proteção dos órgãos</h3>
                    <p>Ajudam a proteger e isolar os órgãos vitais do corpo,
                        fornecendo uma camada de proteção.</p>

                    <h3>Regulação hormonal</h3>
                    <p>Algumas gorduras são necessárias para a produção e regulação de
                        hormônios importantes no organismo.</p>

                    <p>Agora, em relação aos alimentos que contêm gorduras saudáveis, aqui estão alguns exemplos:</p>

                    <p><strong>Azeite de oliva extra virgem: </strong>É uma excelente fonte de gorduras monoinsaturadas, que
                        têm sido associadas a benefícios para a saúde cardiovascular.</p>

                    <p><strong>Abacate: </strong>Rico em gorduras monoinsaturadas e uma boa fonte de fibras, vitaminas e minerais.</p>

                    <p><strong>Peixes gordurosos: </strong>Salmão, sardinha, cavala e atum são ricos em ácidos graxos ômega-3,
                        que têm propriedades  anti-inflamatórias e são benéficos para a saúde do coração e do cérebro.</p>

                    <p><strong>Nozes e sementes: </strong>Amêndoas, castanhas, nozes, sementes de chia e linhaça
                        são fontes de gorduras insaturadas, fibras, vitaminas e minerais.</p>

                    <p><strong>Óleos vegetais não refinados: </strong>Óleo de coco, óleo de abacate e óleo de cártamo
                        são exemplos de óleos vegetais saudáveis, que podem ser usados em preparações culinárias.</p>

                    <p>Pequenas quantidades de gorduras saudáveis encontradas em alimentos como ovos, queijos magros,
                        iogurte natural e carnes magras também podem ser incluídas em uma dieta equilibrada.</p>

                    <br />
                    <p>É importante ter um equilíbrio adequado entre esses diferentes tipos de gorduras na dieta,
                        dando preferência às gorduras insaturadas e limitando a ingestão de gorduras saturadas e gorduras trans.
                        Sempre consulte um profissional de saúde ou nutricionista para obter orientações personalizadas sobre sua dieta.</p>
                    <p>Embora as gorduras saudáveis sejam benéficas, elas ainda fornecem calorias, então devem ser
                        consumidas com moderação e dentro das necessidades energéticas individuais, acima você consegue
                        ter uma idéia de quanto consumir.</p>
                    <hr />
                    <AutoresTMB />
                    <hr />
                    <div className="fontes">
                        <small className="text-sm font-semibold">Referências:</small>
                        <a href="https://www.myprotein.pt/thezone/nutricao/quanta-gordura-comer-por-dia/"
                            target="_blank">
                            - Claire Muszalski,
                            <strong> Quanta Gordura Devemos Comer Por Dia?</strong>,
                            MyProtein,
                            2020
                        </a>
                        <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5577766/"
                            target="_blank">
                            - Ann G. Liu, Nikki A. Ford, Frank B. Hu, Kathleen M. Zelman,4 Dariush Mozaffarian,
                            and Penny M. Kris-Etherton,
                            <strong> A healthy approach to dietary fats: understanding the science and taking
                                action to reduce consumer confusion</strong>,
                            Nutrition Journal,
                            2017
                        </a>
                        <a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011834/full"
                            target="_blank">
                            - Lee Hooper, Asmaa Abdelhamid, Diane Bunn, Tracey Brown, Carolyn D Summerbell, C Murray Skeaff,
                            <strong> Effects of total fat intake on body weight</strong>,
                            Cochrane Library,
                            Trusted evidence. Informed decisions. Better health,
                            2015
                        </a>
                        <a href="https://karger.com/anm/article/77/2/65/820721/A-Scoping-Review-of-Current-Guidelines-on-Dietary"
                            target="_blank">
                            - Lukas Schwingshackl; Jasmin Zähringer; Jessica Beyerbach;
                            Sarah S. Werner; Blin Nagavci; Helmut Heseker; Berthold Koletzko; Joerg J. Meerpohl;
                            <strong> A Scoping Review of Current Guidelines on Dietary Fat and Fat Quality</strong>,
                            Cochrane Library,
                            Annals of nutrition & metabolism,
                            2021
                        </a>
                        <a href="https://ric.cps.sp.gov.br/handle/123456789/9546"
                            target="_blank">
                            - Isabela Cristina Vicenzoto S. Cavalaro, Reizon Vieira dos Santos
                            <strong> Gordura trans e os impactos na escolha dos alimentos</strong>,
                            Cochrane Library,
                            Repositório Institucional do Conhecimento - RIC-CPS,
                            2022
                        </a>
                        <a href="https://www.flaticon.com/br/" 
                        title="carboidrato ícone">- ícones criados por justicon</a>
                    </div>
                </div>
            </section>
        </main>
    );
}