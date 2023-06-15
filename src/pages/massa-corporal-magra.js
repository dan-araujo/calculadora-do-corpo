import { useState } from "react";
import { calcularMassaCorporalMagraPorBoer, calcularMassaCorporalMagraPorHume, calcularMassaCorporalMagraPorJames } from "./api/calculadoras";
import Image from "next/image";
import AutoresMassaCorporalMagra from "./autores-massa-corporal";

export default function MassaCorporalMagra() {
    const [peso, setPeso] = useState(0)
    const [altura, setAltura] = useState(0);
    const [genero, setGenero] = useState('masculino');
    const [massaCorporalMagraPorBoer, setMassaMagraCorporalPorBoer] = useState(0);
    const [massaCorporalMagraPorHume, setMassaCorporalMagraPorHume] = useState(0);
    const [massaCorporalMagraPorJames, setMassaCorporalMagraPorJames] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoMassaCorporalMagra = async (e) => {
        e.preventDefault();
        const formulaBoer = calcularMassaCorporalMagraPorBoer(parseFloat(peso), parseInt(altura), genero);
        const formulaHume = calcularMassaCorporalMagraPorHume(parseFloat(peso), parseInt(altura), genero);
        const formulaJames = calcularMassaCorporalMagraPorJames(parseFloat(peso), parseInt(altura), genero);

        setMostrarResultado(true);
        setMassaMagraCorporalPorBoer(formulaBoer);
        setMassaCorporalMagraPorHume(formulaHume);
        setMassaCorporalMagraPorJames(formulaJames);
    }

    return (
        <main>
            <article>
                <section className="form-calculadora">
                    <form onSubmit={calculoMassaCorporalMagra}>
                        <h1>Calculadora de Massa Corporal Magra</h1>
                        <div className="input-linha">
                            <label htmlFor="peso" className="input-label">
                                Peso (kg):
                            </label>
                            <input type="number" value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                className="input-campo" required />
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
                                className="input-campo" required />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="genero" className="input-label">Gênero:</label>
                            <select
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                className="input-campo select-formulario"
                            >
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </form>
                </section>
                <Image src={"/images/massa-corporal-halter.png"} alt="Icone massa corporal magra"
                    width={180} height={100} className="imagem-demo flex flex-row" />
                <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                    {massaCorporalMagraPorBoer !== 0 &&
                        (
                            <div>
                                <h3 className="text-xl">Sua Massa Corporal Magra está entre:</h3>
                                <div className="flex flex-row justify-center">
                                    <h2 className="text-2xl">Boer: {massaCorporalMagraPorBoer} kgs</h2>
                                    <a href="#boer"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <h2 className="text-2xl">James: {massaCorporalMagraPorJames} kgs</h2>
                                    <a href="#james"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <h2 className="text-2xl">Hume: {massaCorporalMagraPorHume} kgs</h2>
                                    <a href="#hume"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                                </div>
                            </div>
                        )
                    }
                </div>
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
                    <h2>Porque é interessante saber quanto você tem de músculos?</h2>
                    <p>Os músculos ou massa corporal magra desempenham um papel fundamental em nosso corpo e são essenciais
                        para a nossa saúde e bem-estar. Eles não são apenas responsáveis por nos dar força e mobilidade,
                        mas também têm uma série de benefícios importantes.</p>

                    <p>Em primeiro lugar, ser forte fisicamente te ajuda a melhorar o seu desempenho físico. Permitindo
                        realizar tarefas diárias com mais facilidade, como carregar objetos pesados, subir escadas ou praticar esportes.
                        A força muscular adequada contribui para uma postura correta e uma maior estabilidade articular,
                        reduzindo o risco de lesões.</p>

                    <p>Além disso, os músculos têm um impacto positivo no metabolismo do nosso corpo. Eles
                        são tecidos metabolicamente ativos, o que significa que queimam calorias mesmo em repouso.
                        Ter uma maior quantidade de massa muscular pode ajudar a aumentar o metabolismo basal, auxiliando
                        no controle de peso e na redução do acúmulo de gordura.</p>

                    <p>Outra importância está relacionada à saúde óssea. O treinamento de força estimula a
                        densidade óssea, ajudando a prevenir condições como a osteoporose e reduzindo o risco de fraturas.</p>

                    <p>Ter uma quantidade razoável de músculos no corpo vai desempenhar um papel crucial na regulação dos
                        níveis de glicose no sangue. A contração muscular durante a atividade física ajuda a melhorar a
                        sensibilidade à insulina, facilitando a absorção de glicose pelas células e controlando os níveis de
                        açúcar no sangue. Isso é particularmente importante para prevenir ou gerenciar doenças como a diabetes tipo 2.</p>

                    <p>Por fim, a construção muscular tem um impacto significativo na estética e autoconfiança.
                        Ter músculos tonificados e definidos pode melhorar a aparência física e aumentar a autoestima.</p>

                    <p>Para desenvolver e manter músculos saudáveis, é importante seguir um programa de treinamento
                        de força adequado, combinado com uma alimentação balanceada. Consultar um profissional de educação
                        física ou um personal trainer pode ser útil para criar um programa personalizado que atenda às
                        suas necessidades e objetivos individuais.</p>

                    <p>Em resumo, a hipertrofia muscular desempenham um papel fundamental em nossa saúde e qualidade de vida.
                        Ter músculos fortes não apenas melhora o desempenho físico, mas também traz uma série de benefícios
                        metabólicos, ósseos e de saúde geral. Investir em um treinamento de força adequado vai te ajudar a
                        colher esses benefícios e manter uma vida saudável e ativa.</p>

                    <hr />

                    <AutoresMassaCorporalMagra />

                </div>

            </section>
        </main>
    );
}