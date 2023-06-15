import { useState } from "react";
import { calcularProteinas, calcularTotalProteinasPorDieta } from "./api/calculadoras";
import Image from "next/image";

export default function Proteinas() {
    const [peso, setPeso] = useState(0);
    const [nivelAtividade, setNivelAtividade] = useState("sedentario");
    const [proteinasMinima, setProteinasMinima] = useState(0);
    const [proteinasMaxima, setProteinasMaxima] = useState(0);

    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoProteinas = async (e) => {
        e.preventDefault();
        const valoresProteinas = calcularProteinas(peso, nivelAtividade);

        setProteinasMinima(valoresProteinas[0]);
        setProteinasMaxima(valoresProteinas[1]);
        setMostrarResultado(true);
    }

    const exibirInformacoesProteinas = (nivelAtividade) => {
        if (nivelAtividade === "sedentario" || nivelAtividade === "atividades-leves"
            || nivelAtividade === "atividades-extrema-resistencia") {
            return (
                <p>
                    A quantidade total de proteínas por dia é {proteinasMinima}g
                </p>
            )
        } else if (nivelAtividade === "atividades-resistencia" || nivelAtividade === "treinos-forca") {
            return (
                <p>
                    A quantidade total de proteínas por dia é {proteinasMinima}g
                    à {proteinasMaxima}g
                </p>
            )
        }
    }

    return (
        <main>
            <article>
                <section className="form-calculadora form-proteinas">
                    <form onSubmit={calculoProteinas}>
                        <h1>Calculadora de Proteínas</h1>
                        <div className="input-linha">
                            <label htmlFor="peso" className="input-label">Peso (kg):</label>
                            <input type="number" value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                className="input-campo" required />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="nivelAtividade" className="input-label labels-select">Nível de Atividade:</label>
                            <select value={nivelAtividade}
                                onChange={(e) => setNivelAtividade(e.target.value)}
                                className="input-campo select-formulario">
                                <option value="sedentario">
                                    Sedentário
                                </option>
                                <option value="atividades-leves">
                                    Atividades Leves
                                </option>
                                <option value="atividades-resistencia">
                                    Resistência
                                </option>
                                <option value="treinos-forca">
                                    Treinos de Força
                                </option>
                                <option value="atividades-extrema-resistencia">
                                    Extrema Resistência
                                </option>
                            </select>
                        </div>
                        <div className="box-informacoes">
                            <small><strong>Atividades Leves: </strong>
                                Atividade fisica leve ou caminhada</small>
                            <br />
                            <small><strong>Atividades de Resistência: </strong>
                                Corridas, ciclismo, natação, pular corda, yoga,
                                treino funcional </small>
                            <br />
                            <small><strong>Treinos de Força: </strong>
                                Treinos de musculação para hipertrofia,
                                bem como calistenia</small>
                            <br />
                            <small><strong>Atividades de Extrema Resistência: </strong>
                                Ultramaratonas, ciclismo, natação
                                e caminhadas de longa distância,
                                treinos de musculação com altas cargas
                            </small>
                            <br />
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </form>
                </section>
                <Image src={"/images/proteinas.png"} width={150} height={150}
                    className="imagem-demo" />
                <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                    <h3>☑️ A Ingestão Diária Recomendada
                        é que as proteínas estejam entre 12% a 15% das necessidades calóricas.</h3>
                    {proteinasMinima !== 0 && (
                        <h2 className="text-xl">
                            {exibirInformacoesProteinas(nivelAtividade)}
                        </h2>
                    )}
                </div>
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
                    <h2>Por que as proteínas são tão importantes?</h2>
                    <p>As proteínas são extremamente importantes para o ganho de massa muscular devido a várias razões:</p>

                    <h3>Função estrutural</h3>
                    <p>São consideradas como blocos de construção do tecido muscular. Elas
                        são compostas por aminoácidos, que são ligados em cadeias para formar proteínas. Essas proteínas são essenciais
                        para a formação, reparação e manutenção dos músculos.</p>

                    <h3>Síntese proteica</h3>
                    <p>Para que os músculos cresçam, é necessário que ocorra a síntese de novas proteínas musculares.
                        As proteínas dietéticas fornecem os aminoácidos necessários para esse processo. Quando você consome quantidades
                        suficientes, o corpo tem os blocos de construção necessários para construir e reparar o tecido muscular.</p>

                    <h3>Estímulo do metabolismo</h3>
                    <p>A digestão e a absorção de proteínas requerem mais energia do corpo em comparação
                        com a digestão de carboidratos ou gorduras. Esse processo, conhecido como efeito térmico dos alimentos, aumenta
                        o gasto energético e contribui para o metabolismo basal. Um metabolismo mais ativo pode facilitar a perda de
                        gordura e favorecer o ganho de massa muscular.</p>

                    <h3>Saciedade</h3>
                    <p>Têm um efeito de saciedade mais duradouro em comparação com os carboidratos e gorduras.
                        Isso significa que esse macronutriente ajuda a controlar o apetite e reduzir a ingestão excessiva de calorias, o que
                        pode ser benéfico para manter um equilíbrio energético adequado durante o processo de ganho de massa muscular.</p>

                    <h3>Recuperação muscular</h3>
                    <p>Durante exercícios físicos intensos, ocorrem danos nas fibras musculares. Consumir proteínas
                        após o treino ajuda na recuperação muscular, reduzindo a inflamação e
                        promovendo a reparação e o crescimento muscular.</p>

                    <hr />

                    <h2>Qual a quantidade recomendada de consumo de proteínas?</h2>
                    <p>As recomendações de ingestão de proteínas podem variar dependendo do nível de atividade física, idade,
                        sexo e objetivos individuais. Aqui estão algumas diretrizes gerais para diferentes níveis de atividade:</p>

                    <p><strong> Nível de atividade sedentário ou baixo: </strong> Para indivíduos com um estilo de vida sedentário ou
                        baixo nível de atividade física, a recomendação geral é de cerca de 0,8 gramas de proteína por
                        quilograma de peso corporal por dia. Isso significa que uma pessoa que pesa 70 quilogramas consumaria
                        aproximadamente 56 gramas de proteína por dia.</p>

                    <p><strong> Nível de atividade moderado: </strong>Para pessoas envolvidas em atividades físicas moderadas, como exercícios
                        leves a moderados de três a cinco dias por semana, a recomendação pode aumentar para cerca de 1,0 a 1,2 gramas de
                        proteína por quilograma de peso corporal por dia. No exemplo anterior, uma pessoa com 70 quilogramas consumiria
                        entre 70 e 84 gramas de proteína por dia.</p>

                    <p><strong> Nível de atividade intenso ou atleta: </strong>Para atletas e pessoas envolvidas em atividades físicas
                        intensas, como treinamento de força regular, exercícios de alta intensidade ou esportes competitivos, as necessidades
                        de consumo podem aumentar ainda mais. Recomenda-se uma ingestão de proteína de cerca de 1,2 a 2,0 gramas
                        por quilograma de peso corporal por dia, dependendo do tipo e intensidade do treinamento.
                        É importante lembrar que essas são diretrizes gerais e as necessidades individuais podem variar.</p>

                    <p>Quanto às calorias, cada grama de proteína fornece aproximadamente 
                        <span className="text-pentagramBlue"> 4 calorias. </span>
                        Isso é igual ao número de calorias fornecidas por cada grama de carboidratos. No entanto,
                        as gorduras fornecem cerca de 9 calorias por grama,
                        o que significa que tanto as proteínas quanto os carboidratos fornecem menos calorias por grama em comparação
                        com as gorduras.</p>

                    <br />
                    <p>No entanto, é importante ressaltar que o ganho de massa muscular não depende exclusivamente do consumo de
                        proteínas. Uma abordagem equilibrada e integrada que envolva também treinamento adequado, descanso, consumo
                        adequado de calorias e outros nutrientes é essencial para alcançar os melhores resultados. Recomenda-se buscar
                        orientação de um profissional de saúde ou nutricionista para elaborar um plano alimentar adequado às suas
                        necessidades individuais.</p>
                    <hr />
                    <div className="fontes">
                        <small className="text-sm font-semibold">Referências:</small>
                        <a href="https://pubmed.ncbi.nlm.nih.gov/24477298/" target="_blank">
                            - Madonna M Mamerow, Joni A Mettler, Kirk L English, Shanon L Casperson,
                            Emily Arentson-Lantz, Melinda Sheffield-Moore, Donald K Layman, Douglas Paddon-Jones,
                            <strong> Dietary protein distribution positively
                                influences 24-h muscle protein synthesis in healthy adults</strong>,
                            Journal of Nutrition,
                            2014
                        </a>
                        <a href="https://www.atletis.com.br/quantidade-proteina-dia" target="_blank">
                            - Redação Atletis,
                            <strong> Descubra a quantidade ideal de proteína por dia</strong>,
                            Atletis Blog,
                            2022
                        </a>
                        <a href="https://www.health.harvard.edu/blog/how-much-protein-do-you-need-every-day-201506188096"
                            target="_blank">
                            - Harvard Health Publishing Staff,
                            <strong> How much protein do you need every day?</strong>,
                            Harvard Medical School,
                            2022
                        </a>
                        <a href="https://efdeportes.com/efd185/proteina-recomendada-para-hipertrofia-muscular.htm"
                            target="_blank">
                            - Jorge Auri Flores Filho, Alexandre Luis da Silva Ritter, Anderson da Silva Garcez,
                            <strong> Quantidade de proteína recomendada para hipertrofia muscular: uma breve revisão</strong>,
                            efdesportes,
                            Lecturas: Educación Física y Deportes,
                            2013
                        </a>
                        <a href="https://www.flaticon.com/free-icons/protein" title="protein icon" target="_blank">
                            -  icones criados por flat icons - flaticon</a>
                    </div>
                </div>
            </section>
        </main >
    );
}