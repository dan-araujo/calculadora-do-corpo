import CalculatorResult from '../components/calculator-result';
import NumericInput from '../components/numeric-input';
import CalculatorForm from '../components/calculator-form';
import CalculatorHeader from '../components/calculator-header';
import { useState } from "react";
import { calcularMassaCorporalMagraPorBoer, calcularMassaCorporalMagraPorHume, calcularMassaCorporalMagraPorJames } from "../lib/calculadoras.mjs";
import Image from "next/image";
import AutoresMassaCorporalMagra from "../components/autores-massa-corporal";

export default function MassaCorporalMagra() {
    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('');
    const [genero, setGenero] = useState('masculino');
    const [massaCorporalMagraPorBoer, setMassaMagraCorporalPorBoer] = useState(0);
    const [massaCorporalMagraPorHume, setMassaCorporalMagraPorHume] = useState(0);
    const [massaCorporalMagraPorJames, setMassaCorporalMagraPorJames] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoMassaCorporalMagra = async (e) => {
        e.preventDefault();
        const formulaBoer = calcularMassaCorporalMagraPorBoer(parseFloat(peso), parseFloat(altura), genero);
        const formulaHume = calcularMassaCorporalMagraPorHume(parseFloat(peso), parseFloat(altura), genero);
        const formulaJames = calcularMassaCorporalMagraPorJames(parseFloat(peso), parseFloat(altura), genero);

        setMostrarResultado(true);
        setMassaMagraCorporalPorBoer(formulaBoer);
        setMassaCorporalMagraPorHume(formulaHume);
        setMassaCorporalMagraPorJames(formulaJames);
    }

    return (
        <main>
            <article className="area-calculadora">
                <section className="formulario-calculadora">
                    <CalculatorForm onResetResult={() => setMostrarResultado(false)} onSubmit={calculoMassaCorporalMagra}>
                        <CalculatorHeader title="Calculadora de Massa Corporal Magra" image="/images/massa-corporal-halter.png" />
                        <div className="linha-campo">
                            <label htmlFor="peso" className="rotulo-campo">
                                Peso (kg):
                            </label>
                            <NumericInput field="peso" id="peso" value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                className="campo-formulario" required />
                        </div>
                        <div className="linha-campo">
                            <label htmlFor="altura" className="rotulo-campo">
                                Altura (cm):
                            </label>
                            <NumericInput field="altura"
                                id="altura"
                                value={altura}
                                onChange={(e) => setAltura(e.target.value)}
                                className="campo-formulario" required />
                        </div>
                        <div className="linha-campo">
                            <label htmlFor="genero" className="rotulo-campo">Gênero:</label>
                            <select
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                className="campo-formulario seletor-formulario"
                            >
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </CalculatorForm>
                </section>

                <CalculatorResult visible={mostrarResultado}>
                    {massaCorporalMagraPorBoer !== 0 &&
                        (
                            <div>
                                <h3 className="text-xl">Sua Massa Corporal Magra está entre:</h3>
                                <div className="flex flex-row justify-center">
                                    <h2 className="text-2xl">Boer: {massaCorporalMagraPorBoer} kgs</h2>
                                    <a aria-label="Entenda a fórmula de Boer" href="#boer"><Image src={"/images/interrogacao.png"} width={16} height={16}  alt="" /></a>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <h2 className="text-2xl">James: {massaCorporalMagraPorJames} kgs</h2>
                                    <a aria-label="Entenda a fórmula de James" href="#james"><Image src={"/images/interrogacao.png"} width={16} height={16}  alt="" /></a>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <h2 className="text-2xl">Hume: {massaCorporalMagraPorHume} kgs</h2>
                                    <a aria-label="Entenda a fórmula de Hume" href="#hume"><Image src={"/images/interrogacao.png"} width={16} height={16}  alt="" /></a>
                                </div>
                            </div>
                        )
                    }
                </CalculatorResult>
            </article>
            <section className="informacoes">
                <div className="conteiner-informacoes">
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
