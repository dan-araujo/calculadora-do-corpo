import { useEffect, useState } from "react";
import { calcularNivelGorduraCorporal, calcularGorduraCorporalIdeal } from "./api/calculadoras";
import Image from "next/image";

export default function GorduraCorporal() {
    const [altura, setAltura] = useState(0);
    const [pescoco, setPescoco] = useState(0);
    const [cintura, setCintura] = useState(0);
    const [quadril, setQuadril] = useState(0);
    const [genero, setGenero] = useState("masculino");
    const [gorduraCorporal, setGorduraCorporal] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [categoria, setCategoria] = useState("");

    const calcularGorduraCorporal = (altura, pescoco, cintura, quadril, genero) => {

        const nivelGorduraCorporal =
            calcularNivelGorduraCorporal(parseFloat(altura), parseFloat(pescoco),
                parseFloat(cintura), parseFloat(quadril), genero);
        const gorduraCorporalIdeal = calcularGorduraCorporalIdeal(genero, nivelGorduraCorporal);

        setGorduraCorporal(nivelGorduraCorporal);
        setCategoria(gorduraCorporalIdeal)
    };

    const calculoGorduraCorporal = (e) => {
        e.preventDefault();
        calcularGorduraCorporal(altura, pescoco, cintura, quadril, genero);
        setMostrarResultado(true);
    };

    useEffect(() => {
        calcularGorduraCorporal(altura, pescoco, cintura, quadril, genero);
    }, [altura, pescoco, cintura, quadril, genero]);

    return (
        <main>
            <article>
                <section className="form-calculadora">
                    <form onSubmit={calculoGorduraCorporal}>
                        <h1>Calculadora de Percentual de Gordura Corporal</h1>
                        <div className="input-linha">
                            <label htmlFor="altura" className="input-label">Altura (cm):</label>
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
                            <label htmlFor="pescoco" className="input-label">Pescoço (cm):</label>
                            <input
                                step="0.1"
                                id="pescoco"
                                type="number"
                                value={pescoco}
                                onChange={(e) => setPescoco(e.target.value)}
                                className="input-campo" required />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="cintura" className="input-label">Cintura (cm):</label>
                            <input
                                step="0.1"
                                id="cintura"
                                type="number"
                                value={cintura}
                                onChange={(e) => setCintura(e.target.value)}
                                className="input-campo" required />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="quadril" className="input-label">Quadril (cm):</label>
                            <input
                                step="0.1"
                                id="quadril"
                                type="number"
                                value={quadril}
                                onChange={(e) => setQuadril(e.target.value)}
                                className="input-campo" required />
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
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </form>
                </section>
                <Image src={"/images/gordura-corporal2.png"} width={150} height={150} className="imagem-demo" />
                {gorduraCorporal !== 0 &&
                    <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                        <div>
                            <h3 className="text-xl">Estimativa de Nível de Gordura Corporal:</h3>
                            <h2 className="text-2xl">{gorduraCorporal}%</h2>
                            <h2 className="text-2xl">Categoria: {categoria}</h2>
                        </div>
                    </div>
                }
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
                    <h2>Por que pode ser útil saber o nível de gordura corporal?</h2>
                    <h3>Saúde geral</h3>
                    <p>O excesso de gordura corporal está associado a uma série de problemas de saúde,
                        como doenças cardíacas, diabetes tipo 2, hipertensão arterial e certos tipos de câncer.
                        Ao conhecer o seu nível de gordura corporal, você pode ter uma noção melhor do seu estado
                        de saúde geral e tomar medidas para melhorá-lo, se necessário.</p>

                    <h3>Avaliação do peso</h3>
                    <p>O peso na balança nem sempre é um indicador preciso da composição corporal.
                        Duas pessoas com o mesmo peso podem ter níveis de gordura corporal diferentes. Saber o seu nível de gordura corporal
                        pode ajudá-lo a determinar se você está dentro de uma faixa saudável de composição corporal, independentemente
                        do seu peso total.</p>

                    <h3>Monitoramento de mudanças</h3>
                    <p>Se você está tentando perder peso ou ganhar massa muscular,
                        medir regularmente o seu nível de gordura corporal pode ser útil para monitorar o progresso.
                        Enquanto a balança pode não mostrar uma mudança significativa, uma diminuição no nível de gordura corporal
                        pode indicar que você está progredindo em direção aos seus objetivos.</p>

                    <h3>Personalização da dieta e do treinamento</h3>
                    <p>Esse conhecimento pode te ajudar a se orientar quanto as escolhas relacionadas à alimentação e ao exercício físico.
                        Por exemplo,
                        se você tem um alto nível de gordura corporal, pode ser necessário ajustar sua dieta para promover a
                        perda de gordura, ou adaptar seu treinamento para incluir exercícios cardiovasculares e de resistência.</p>

                    <h3>Motivação e metas realistas</h3>
                    <p> Estabelecer metas de perda de peso ou composição corporal com base nessa informação sobre o seu
                        corpo pode ser mais realista e motivador. Em vez de focar apenas em um número na balança, você pode se concentrar
                        em reduzir o percentual de gordura corporal e alcançar uma composição corporal mais saudável.</p>
                    <br />
                    <p>É importante ressaltar que existem várias maneiras de medir o nível de gordura corporal,
                        como a bioimpedância, as dobras cutâneas e a medição por absorção de raios-X de dupla energia (DEXA).
                        Cada método tem suas próprias vantagens e limitações, e é recomendado consultar um profissional de saúde
                        para obter uma avaliação precisa e interpretar corretamente os resultados.</p>

                    <hr />

                    <h2>Quais os métodos utilizados para calcular o nível de gordura corporal?</h2>
                    <p>Além de você ter uma estimativa do seu percentual de gordura na calculadora acima, existem outros métodos
                        de cálculo que também são muito comuns:
                    </p>
                    <h3>Bioimpedância</h3>
                    <p>Envolve o uso de um aparelho de bioimpedância que mede a resistência elétrica do corpo.
                        A gordura tende a ter uma resistência diferente em comparação com outros tecidos corporais. Com base nessa resistência,
                        o aparelho pode estimar a composição corporal, incluindo a gordura corporal.</p>

                    <h3>Dobras cutâneas</h3>
                    <p>Utiliza um instrumento chamado adipômetro para medir a espessura das dobras de pele em
                        várias partes do corpo. As medidas obtidas são inseridas em equações específicas que estimam a porcentagem de
                        gordura corporal
                        com base nessas medidas.</p>

                    <h3>Medição por absorção de raios-X de dupla energia (DEXA) </h3>
                    <p>Essa é uma técnica mais avançada que utiliza raios-X de
                        baixa dose para medir a densidade óssea, a massa magra e a gordura corporal. O DEXA é considerado um dos
                        métodos mais precisos
                        disponíveis, pois pode distinguir entre diferentes componentes corporais.</p>

                    <h3>Impedância de ar</h3>
                    <p>Utiliza câmaras de ar para medir o volume corporal e, em seguida, combina esses dados
                        com a densidade corporal estimada para calcular a gordura corporal.</p>

                    <h3>Circunferência da cintura</h3>
                    <p>Embora não seja um cálculo direto do nível de gordura corporal, a medida
                        da circunferência da cintura pode ser usada como um indicador aproximado da gordura abdominal.
                        A gordura visceral ao redor da cintura está associada a um maior risco de problemas de saúde.</p>
                    <br />
                    <p>Válido dizer que esses métodos de cálculo fornecem estimativas e podem ter alguma margem de erro.
                        Para obter uma avaliação precisa do nível de gordura corporal, sempre procure a orientação
                        de um profissional de saúde como nutricionista esportivo ou de um especialista em fitness,
                        que poderá realizar a medição utilizando as ferramentas apropriadas para interpretar corretamente os resultados.</p>
                </div>
                <div className="fontes">
                    <a href="https://blog.livup.com.br/gordura-corporal-nutri-explica-como-diminuir-o-percentual/" target="_blank">
                        - Júlia Sommer Canabarro,
                        <strong> Gordura corporal: nutri explica como diminuir o percentual</strong>,
                        Blog LivUp,
                        2023
                    </a>
                    <a href="https://www.e-publicacoes.uerj.br/index.php/demetra/article/view/48505" target="_blank">
                        - Victor Nogueira da Cruz Silveira, Saul Campos da Silva, Luana Lopes Padilha,
                        <strong> Fatores associados ao elevado percentual de gordura corporal em indivíduos fisicamente ativos</strong>,
                        Demetra - Alimentação, Nutrição & Saúde,
                        2021
                    </a>
                    <a href="https://journals.physiology.org/doi/abs/10.1152/physrev.1953.33.3.245" target="_blank">
                        - Ancel Keys, and Josef BroŽek,
                        <strong> Body Fat in Adult Man</strong>,
                        Physiological Reviews,
                        american physiological society,
                        1953
                    </a>
                    <a href="https://www.flaticon.com/br/" title="ícone bf" target="_blank">
                        - ícones criados por dDara e freepik - flaticon
                    </a>
                </div>
            </section>
        </main>
    );
}