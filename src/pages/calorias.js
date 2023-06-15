import { useState } from "react";
import { calcularCalorias, calcularTotalCaloriasPorDieta } from "./api/calculadoras";
import Image from "next/image";
import AutoresTMB from "./autores-tmb";

export default function Calorias() {
    const [idade, setIdade] = useState(0);
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [genero, setGenero] = useState('masculino');
    const [nivelAtividade, setNivelAtividade] = useState('sedentario');
    const [formulaCalorias, setFormulaCalorias] = useState('harris-benedict');
    const [objetivoDieta, setObjetivoDieta] = useState("manutencao-peso");
    const [gorduraCorporal, setGorduraCorporal] = useState(20);
    const [kcal, setKcal] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoCalorias = async (e) => {
        e.preventDefault();
        const calorias = calcularCalorias(parseInt(idade), parseFloat(peso), parseInt(altura),
            genero, nivelAtividade, formulaCalorias, parseInt(gorduraCorporal));
        const quantidadeCalorias = calcularTotalCaloriasPorDieta(calorias, objetivoDieta);

        setKcal(quantidadeCalorias);
        setMostrarResultado(true);
    }

    return (
        <main>
            <article>
                <section className="form-calculadora form-calorias">
                    <form onSubmit={calculoCalorias}>
                        <h1>Calculadora de Calorias</h1>
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
                            <label htmlFor="genero" className="input-label labels-select ">Gênero:</label>
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
                            <label htmlFor="nivelAtividade" className="input-label labels-select ">Nível de Atividade:</label>
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
                                onChange={(e) => setFormulaCalorias(e.target.value)}
                                checked={formulaCalorias === 'harris-benedict'}
                            />
                            <label htmlFor="harris-benedict">Harris-Benedict</label>
                            <a href="#benedict" className="benedict-question">?</a>
                        </div>
                        <div className="formulas-radio">
                            <input type="radio"
                                id="katch-mcardle"
                                name="formula"
                                value="katch-mcardle"
                                onChange={(e) => setFormulaCalorias(e.target.value)}
                                checked={formulaCalorias === 'katch-mcardle'}
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
                <Image src={"/images/calorias2.png"} alt="Icone imc" width={150} height={150}
                    className="imagem-demo" />
                <div className="resultado" id="mostrar-resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                    {kcal !== 0 &&
                        <div>
                            <h2 className="text-2xl">Você precisa de {kcal} calorias diárias.</h2>
                        </div>
                    }
                </div>
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
                    <h2>Calcular as calorias que você precisa funciona?</h2>
                    <p>Contar calorias pode ser uma estratégia útil para algumas pessoas que desejam
                        gerenciar seu peso ou adotar um estilo de vida mais saudável. No entanto, sua eficácia
                        pode variar de pessoa para pessoa, e existem alguns pontos importantes a serem considerados:
                    </p>
                    <h3>Balanço energético</h3>
                    <p>O princípio básico por trás de contar calorias é manter um equilíbrio energético, ou seja, consumir
                        uma quantidade de calorias que esteja de acordo com as necessidades do corpo. Se o objetivo é perder peso,
                        é necessário criar um déficit calórico, consumindo menos calorias do que se gasta. Se o objetivo é ganhar peso,
                        crie um superávit calórico, consumindo mais calorias do que você gasta.
                    </p>
                    <h3>Precisão das estimativas</h3>
                    <p>Contar calorias envolve estimar a quantidade de calorias presentes nos alimentos consumidos.
                        No entanto, essas estimativas podem ter margens de erro, pois podem variar com base em fatores como a
                        forma de preparação dos alimentos, marcas específicas, entre outros. Portanto, é importante reconhecer
                        que as contagens calóricas são apenas estimativas e podem não ser 100% precisas.
                    </p>
                    <h3>Qualidade dos alimentos</h3>
                    <p>Embora contar calorias possa ajudar no controle do peso, é igualmente importante
                        considerar a qualidade dos alimentos consumidos. As calorias provenientes de alimentos nutritivos,
                        como frutas, vegetais, proteínas magras e grãos integrais, têm um impacto mais positivo na saúde em
                        comparação com calorias provenientes de alimentos processados e ricos em açúcares adicionados. Portanto,
                        é essencial adotar uma abordagem equilibrada, priorizando a escolha de alimentos nutritivos.
                    </p>
                    <h3>Individualidade</h3>
                    <p>Cada pessoa é única, e diferentes fatores, como metabolismo, composição corporal,
                        nível de atividade física e saúde geral, podem influenciar a resposta individual à contagem de calorias.
                        O que funciona para uma pessoa pode não funcionar para outra. Portanto, é importante considerar a individualidade
                        e adaptar as estratégias de acordo com as necessidades e preferências pessoais.
                    </p>
                    <p>Além de contar calorias, é fundamental adotar um estilo de vida saudável de forma geral, incluindo
                        uma alimentação equilibrada, prática regular de atividades físicas, sono adequado e gerenciamento do estresse.
                        Consultar um profissional de saúde, como um nutricionista, pode ajudar na elaboração de um plano alimentar adequado
                        às suas necessidades individuais e auxiliar no alcance dos seus objetivos de saúde.
                    </p>
                    <hr />
                    <h2>Porque calcular a quantidade calorias é uma prática tão comum?</h2>
                    <p>Muitas pessoas costumam fazer dietas e programas de perda ou ganho de peso,
                        e isso envolve acompanhar a quantidade de calorias consumidas em cada alimento e bebida ao longo do dia.
                        A importância da contagem de calorias na dieta está relacionada a alguns aspectos-chave:</p>

                    <h3>Controle de ingestão calórica</h3>
                    <p>Permite um controle mais preciso da quantidade de energia que está sendo
                        consumida. Isso é importante porque o equilíbrio energético é fundamental para o gerenciamento do peso corporal.
                        Se você consome
                        mais calorias do que gasta, pode ocorrer ganho de peso, enquanto um déficit calórico pode levar à perda de peso.</p>

                    <h3>Consciência alimentar</h3>
                    <p>Promove uma maior consciência sobre o valor calórico dos alimentos e bebidas que você
                        consome. Isso pode ajudá-lo a fazer escolhas mais informadas e saudáveis em relação à sua alimentação,
                        favorecendo a seleção de
                        alimentos mais nutritivos e balanceados.</p>

                    <h3>Estabelecimento de metas</h3>
                    <p>Torna-se possível estabelecer metas específicas de ingestão calórica diária, com base
                        nas necessidades individuais e nos objetivos de saúde ou perda de peso. Ao definir um alvo calórico
                        adequado, é possível
                        monitorar o progresso e ajustar a dieta conforme necessário.</p>

                    <h3>Identificação de padrões</h3>
                    <p>Você consegue identificar padrões em sua alimentação e identificar quais alimentos
                        contribuem significativamente para sua ingestão calórica total. Isso pode ajudá-lo a fazer modificações em sua dieta,
                        substituindo alimentos com alto teor calórico por opções mais saudáveis e equilibradas.</p>

                    <h3>Educação alimentar</h3>
                    <p>Proporciona oportunidades de aprender mais sobre o valor nutricional dos
                        alimentos, sua composição calórica e as porções adequadas. Isso auxilia na educação alimentar, permitindo
                        que você faça
                        escolhas conscientes e sustentáveis a longo prazo.</p>

                    <p>É válido ressaltar que a contagem de calorias não deve ser o único foco de uma dieta saudável. Ela
                        deve ser combinada com uma abordagem equilibrada, considerando também a qualidade dos alimentos, a
                        variedade nutricional,
                        a hidratação adequada, a prática regular de atividade física e outros fatores individuais.
                        Busque
                        orientação de um profissional de saúde, como um nutricionista,
                        para obter um plano alimentar personalizado e mais detalhado que seja adequado às suas necessidades.</p>

                    <hr />
                    <AutoresTMB />

                    <div className="fontes">
                        <small className="text-sm font-semibold">Referências:</small>

                        <a href="https://academic.oup.com/biomedgerontology/article/60/5/549/561215?login=false"
                            target="_blank">
                            - Matthew D. W. Piper, William Mair, Linda Partridge,
                            <strong> Counting the Calories: The Role of Specific Nutrients in Extension of Life Span by Food Restriction, </strong>
                            The Journal of Gerontology,
                            2005
                        </a>
                        <a href="https://jamanetwork.com/journals/jama/article-abstract/2669738"
                            target="_blank">
                            - Eve Guth, MD,
                            Jesse Brown Veterans Affairs Medical Center, Chicago, Illinois,
                            <strong> Counting Calories as an Approach to Achieve Weight Control </strong>,
                            Jama Network,
                            2018
                        </a>
                        <a href="https://www.tuasaude.com/o-que-sao-calorias/"
                            target="_blank">
                            - Karla Leal, Tatiana Zanin, Manuel Reis,
                            <strong> Como calcular as calorias dos alimentos </strong>,
                            Tua Saúde,
                            2023
                        </a>
                        <a href="https://www.flaticon.com" title="calorias ícones" target="_blank">
                            - ícones criados por mhor phai e freepik - flaticon
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}