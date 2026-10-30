import CalculatorResult from '../components/calculator-result';
import NumericInput from '../components/numeric-input';
import CalculatorForm from '../components/calculator-form';
import CalculatorHeader from '../components/calculator-header';
import { useState } from "react";
import { calcularIMC } from "../lib/calculadoras.mjs";

export default function IMC() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setIMC] = useState('');
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoIMC = async (e) => {
        e.preventDefault();
        const imcCalculado = calcularIMC(peso, altura);
        setIMC(imcCalculado);
        setMostrarResultado(true);
    }

    return (
        <main>
            <article className="area-calculadora">
                <section className="formulario-calculadora">
                    <CalculatorForm onResetResult={() => setMostrarResultado(false)} onSubmit={calculoIMC}>
                        <CalculatorHeader title="Calculadora de IMC" image="/images/imc2.png" />
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
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </CalculatorForm>
                </section>

                <CalculatorResult visible={mostrarResultado}>
                    {imc &&
                        <div>
                            <h3 className="text-2xl">Seu IMC é:</h3>
                            <h2 className="text-3xl">{imc}</h2>
                        </div>
                    }
                </CalculatorResult>
            </article>

            <section className="informacoes">
                <div className="conteiner-informacoes">
                    <h2>O que é IMC?</h2>
                    <p>O Índice de Massa Corporal (IMC) é uma medida amplamente utilizada para avaliar
                        se uma pessoa está dentro de faixas consideradas saudáveis em relação ao seu peso e altura.
                        Ele relaciona peso e altura e pode ajudar na triagem de riscos associados ao peso, mas não mede diretamente o percentual de gordura corporal.</p>
                    <p>O cálculo do IMC é baseado na fórmula matemática que relaciona o peso e a altura de uma pessoa.
                        A fórmula é a seguinte:</p>
                    <span className="texto-destaque">IMC = peso (em quilogramas) / altura ao quadrado (em metros)</span>
                    <p>Para adultos, a classificação geral usa os intervalos abaixo. Crianças e adolescentes precisam de avaliação por idade e sexo; gestantes e idosos exigem interpretação específica.</p>
                    <ul className="space-y-1 list-disc list-inside dark:text-gray-400">
                        <li>Abaixo do peso: IMC menor que 18,5</li>
                        <li>Faixa de referência: IMC de 18,5 a menos de 25</li>
                        <li>Sobrepeso: IMC de 25 a menos de 30</li>
                        <li>Obesidade grau I: IMC de 30 a menos de 35</li>
                        <li>Obesidade grau II: IMC de 35 a menos de 40</li>
                        <li>Obesidade grau III: IMC igual ou maior que 40</li>
                    </ul>
                    <p>É importante ressaltar que o IMC é uma medida geral e não leva em
                        consideração a composição corporal individual, como a proporção de
                        gordura, músculos e ossos. Portanto, ele pode não ser totalmente preciso
                        em certos casos, como em atletas com alta massa muscular ou em idosos que
                        podem ter perda de massa muscular.</p>
                    <p>Embora o IMC seja um indicador amplamente utilizado, ele não
                        deve ser a única medida para determinar a saúde de uma pessoa.
                        É fundamental considerar outros fatores, como distribuição de
                        gordura corporal, níveis de atividade física, histórico familiar de
                        doenças e avaliações médicas completas.</p>
                    <p>Ter um IMC dentro da faixa considerada saudável é um indicativo de boa saúde,
                        mas não é o único fator determinante. É recomendado adotar um estilo de vida equilibrado,
                        incluindo uma alimentação balanceada, prática regular de exercícios físicos, controle do estresse
                        e acompanhamento médico adequado. Essas são medidas que contribuem para uma vida saudável e bem-estar geral.</p>
                <hr />
                <h2>Algumas considerações interessantes sobre o que o IMC pode dizer sobre a saúde</h2>
                <h3>Estimativa do peso saudável</h3>
                <p> O IMC é frequentemente utilizado para estimar se uma pessoa
                    está dentro de faixas consideradas saudáveis em relação ao seu peso e altura. Faixas de IMC
                    consideradas como &ldquo;peso normal&ldquo; têm sido associadas a menor risco de várias condições de saúde,
                    como doenças cardíacas, diabetes tipo 2 e certos tipos de câncer.
                </p>
                <h3>Risco de problemas de saúde</h3>
                <p>Valores de IMC fora da faixa considerada saudável podem indicar
                    um risco aumentado de certos problemas de saúde. Por exemplo, um IMC elevado está associado a um
                    maior risco de obesidade, hipertensão, colesterol alto, doenças cardíacas e osteoartrite. No entanto,
                    é importante ressaltar que o IMC não considera outros fatores de risco individuais, como histórico familiar,
                    estilo de vida, composição corporal e condições de saúde pré-existentes.
                </p>
                <h3>Limitações do IMC</h3>
                <p>O IMC é uma medida simplificada e não leva em consideração a composição corporal
                    individual. Ele não diferencia entre a massa muscular e a massa de gordura corporal. Isso significa que
                    indivíduos com maior massa muscular, como atletas, podem ter um IMC mais alto, mesmo que tenham uma baixa
                    porcentagem de gordura corporal. Além disso, o IMC não considera a distribuição de gordura corporal, que pode
                    ser um fator importante para a saúde.
                </p>
                <h3>Avaliação abrangente da saúde</h3>
                <p> É fundamental entender que o IMC não é o único indicador de
                    saúde. Uma avaliação abrangente da saúde deve levar em consideração outros fatores, como níveis
                    de atividade física, alimentação equilibrada, hábitos de sono, histórico familiar de doenças, saúde
                    mental e resultados de exames médicos regulares. Cada pessoa é única, e a saúde é um conceito complexo
                    que não pode ser resumido apenas por um índice.</p>
                <div className="fontes">
                    <small className="referencias">Referências:</small>
                    <a href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noopener noreferrer">Organização Mundial da Saúde — Obesidade e sobrepeso: cálculo do IMC e critérios para adultos.</a>
                    <a href="https://www.scielo.br/j/rbgg/a/zXh86LmYzv8r5LYRNTnwxyM/abstract/?lang=pt" target="_blank" rel="noopener noreferrer">
                      Raphaela Souza, Juliana Schimitt de Fraga, Catarina Bertaso Andreatta Gottschall, Fernanda Michielin Busnello
                        <strong> Avaliação antropométrica em idosos: estimativas de peso e altura e concordância entre classificações de IMC
                        </strong>,
                        scielo.br,
                        2013
                    </a>
                    <a href="https://www.uol.com.br/vivabem/faq/imc-como-calcular-tabela-dicas-como-melhorar-e-mais.htm" target="_blank" rel="noopener noreferrer">
                        Diana Cortez,
                        <strong> IMC é confiável? Entenda o cálculo e como melhorar sua saúde</strong>,
                        uol.com.br,
                        2020
                    </a>

                </div>
                </div>
            </section>
        </main>
    );
}
