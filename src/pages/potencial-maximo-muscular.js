import { useState } from "react";
import { calcularPotencialMaximoMuscularPorBerkhan, calcularPotencialMaximoMuscularPorCaseyButt } from "./api/calculadoras";
import Image from "next/image";
import AutoresPotencialMaximoMuscular from "./autores-potencial-muscular";

export default function PotencialMaximoMuscular() {
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [pulso, setPulso] = useState(0);
    const [tornozelo, setTornozelo] = useState(0);
    const [gorduraCorporal, setGorduraCorporal] = useState(10);
    const [potencialMuscularPorBerkhan, setPotencialMuscularPorBerkhan] = useState(0);
    const [potencialMuscularPorCaseyButt, setPotencialMuscularPorCaseyButt] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoPotencialMaximoMuscular = async (e) => {
        e.preventDefault();

        const formulaBerkhan = calcularPotencialMaximoMuscularPorBerkhan(parseFloat(altura), parseFloat(gorduraCorporal));
        const formulaCaseyButt = calcularPotencialMaximoMuscularPorCaseyButt(parseFloat(altura), parseFloat(pulso),
            parseFloat(tornozelo), parseFloat(gorduraCorporal));

        setPotencialMuscularPorBerkhan(formulaBerkhan);
        setPotencialMuscularPorCaseyButt(formulaCaseyButt);
        setMostrarResultado(true);
    }

    return (
        <main>
            <article>
                <section className="form-calculadora">
                    <form onSubmit={calculoPotencialMaximoMuscular}>
                        <h1>Calculadora de Potencial Máximo Muscular</h1>
                        <div className="input-linha">
                            <label htmlFor="peso" className="input-label">
                                Peso (kg):
                            </label>
                            <input
                                type="number"
                                value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                required
                                className="input-campo"
                            />
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
                            <label htmlFor="pulso" className="input-label">
                                Pulso (cm):
                            </label>
                            <input
                                step="0.1"
                                id="pulso"
                                type="number"
                                value={pulso}
                                onChange={(e) => setPulso(e.target.value)}
                                required
                                className="input-campo"
                            />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="tornozelo" className="input-label">
                                Tornozelo (cm):
                            </label>
                            <input
                                step="0.1"
                                id="tornozelo"
                                type="number"
                                value={tornozelo}
                                onChange={(e) => setTornozelo(e.target.value)}
                                required
                                className="input-campo"
                            />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="gorduraCorporal" className="input-label">
                                Gordura Corporal (%):
                            </label>
                            <input
                                type="number"
                                value={gorduraCorporal}
                                className="input-campo gorduraCorporal"
                                min={5}
                                max={80}
                                onChange={(e) => setGorduraCorporal(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </form>
                </section>
                <Image src={"/images/musculos.png"} alt="Icone imc" width={150} height={150}
                    className="imagem-demo" />
                <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                    {potencialMuscularPorBerkhan !== 0 && (
                        <div>
                            <h3 className="text-xl">O seu Potencial Muscular Máximo com {gorduraCorporal}% de gordura é:</h3>
                            <div className="flex flex-row justify-center">
                                <h2 className="text-2xl"><strong>Martin Berkhan:</strong> {potencialMuscularPorBerkhan} kgs.</h2>
                                <a href="#martin-berkhan"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                            </div>
                            <div className="flex flex-row justify-center">
                                <h2 className="text-2xl"><strong>Casey Butt:</strong> {potencialMuscularPorCaseyButt} kgs</h2>
                                <a href="#casey-butt"><Image src={"/images/interrogacao.png"} width={16} height={16}  /></a>
                            </div>
                        </div>)}
                </div>
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
                    <h2>Por que pode ser útil você saber o seu Potencial Máximo Muscular?</h2>
                    <h3>Estabelecimento de metas realistas</h3>
                    <p>Compreender o seu potencial máximo muscular pode ajudá-lo a estabelecer
                        metas realistas e alcançáveis em relação ao ganho de massa muscular. Isso evita expectativas irrealistas e
                        frustrações desnecessárias ao longo do caminho.</p>

                    <h3>Planejamento de treinamento e nutrição</h3>
                    <p>Você pode ter uma idéia de como se adaptar a um programa de
                        treinamento e nutrição para alcançar seu objetivo. Isso permite que você personalize seu plano de acordo com
                        suas necessidades
                        individuais e trabalhe de maneira eficiente para atingir seus objetivos.</p>

                    <h3>Motivação e monitoramento do progresso</h3>
                    <p>Serve como uma fonte
                        de motivação para continuar trabalhando em direção a esse objetivo. Além disso, ao monitorar seu progresso
                        ao longo do tempo,
                        você pode avaliar se está se aproximando de seu potencial máximo e fazer ajustes
                        necessários em seu programa de treinamento e dieta.</p>

                    <h3>Ajuste de estratégias de treinamento</h3>
                    <p> Com base nesse conhecimento,
                        você pode ajustar suas estratégias de treinamento para maximizar os ganhos musculares. Isso pode envolver
                        a escolha de exercícios adequados, a manipulação de volume e intensidade de treinamento, a implementação de técnicas
                        avançadas de treinamento, entre outros fatores.</p>

                    <h3>Melhor compreensão do corpo</h3>
                    <p>Obter uma compreensão mais profunda de como seu corpo funciona em relação ao crescimento muscular.
                        Isso pode ajudá-lo a tomar decisões
                        informadas sobre sua abordagem de treinamento e nutrição, e também a desenvolver uma relação
                        mais saudável e realista com seu corpo.</p>

                    <br />
                    <p>Saiba que o potencial máximo muscular é influenciado por vários fatores, incluindo genética, idade,
                        sexo, nível de treinamento e outros. Portanto, é apenas uma estimativa e cada pessoa pode ter um potencial individual
                        diferente. O mais importante é focar em seu próprio progresso e trabalhar de maneira consistente e sustentável
                        para alcançar seus objetivos pessoais.</p>

                    <p>As abordagens de treinamento e nutrição também
                        podem variar dependendo das preferências e necessidades individuais.
                        É sempre recomendado consultar um profissional de saúde ou nutricionista
                        antes de adotar qualquer método específico de treinos,
                        a fim de garantir que seja adequado às suas necessidades e metas pessoais.</p>
                    <hr />
                    <AutoresPotencialMaximoMuscular />
                </div>
            </section>
        </main>
    );
}