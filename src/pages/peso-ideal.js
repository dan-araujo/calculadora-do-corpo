import { useState } from "react";
import {
    calcularPesoIdealPorLorentz,
    calcularPesoIdealPorMiller,
    calcularPesoIdealPorRobinson,
    calcularPesoIdealPorDevine,
    calcularPesoIdealPorPeterson
} from "./api/calculadoras";
import Image from "next/image";
import AutoresPesoIdeal from "./autores-peso-ideal";

export default function PesoIdeal() {
    const [altura, setAltura] = useState("");
    const [genero, setGenero] = useState('masculino');
    const [pesoIdealPorPeterson, setPesoIdealPorPeterson] = useState("");
    const [pesoIdealPorLorentz, setPesoIdealPorLorentz] = useState("");
    const [pesoIdealPorRobinson, setPesoIdealPorRobinson] = useState("");
    const [pesoIdealPorMiller, setPesoIdealPorMiller] = useState("");
    const [pesoIdealPorDevine, setPesoIdealPorDevine] = useState("");
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoPesoIdeal = async (e) => {
        e.preventDefault();

        const pesoFormulaPeterson = calcularPesoIdealPorPeterson(parseInt(altura), genero);
        const pesoFormulaLorentz = calcularPesoIdealPorLorentz(parseInt(altura), genero);
        const pesoFormulaRobinson = calcularPesoIdealPorRobinson(parseInt(altura), genero);
        const pesoFormulaMiller = calcularPesoIdealPorMiller(parseInt(altura), genero);
        const pesoFormulaDevine = calcularPesoIdealPorDevine(parseInt(altura), genero);

        setPesoIdealPorPeterson(pesoFormulaPeterson);
        setPesoIdealPorLorentz(pesoFormulaLorentz);
        setPesoIdealPorRobinson(pesoFormulaRobinson);
        setPesoIdealPorMiller(pesoFormulaMiller);
        setPesoIdealPorDevine(pesoFormulaDevine);
        setMostrarResultado(true);
    }

    const definirAltura = (e) => {
        setAltura(e.target.value);
    }


    return (
        <main>
            <article>
                <section className="form-calculadora">
                    <form onSubmit={calculoPesoIdeal}>
                        <h1>Calculadora de Peso Ideal</h1>
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
                <Image src={"/images/escala-de-peso.png"} width={130} height={130} className="imagem-demo" />          
                    {pesoIdealPorLorentz !== "" && (
                        <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                            <h3 className="text-xl">O seu peso ideal está entre:</h3>          
                            <div className="flex flex-row justify-center">
                                <h2 className="text-2xl mr-1">Peterson: {pesoIdealPorPeterson} kgs</h2>
                                <a href="#peterson"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                            </div>
                            <div className="flex flex-row justify-center">
                            <h2 className="text-2xl mr-1">Robinson: {pesoIdealPorRobinson} kgs</h2>
                            <a href="#robinson"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                            </div>
                            <div className="flex flex-row justify-center">
                            <h2 className="text-2xl mr-1">Miller: {pesoIdealPorMiller} kgs</h2>
                            <a href="#miller"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                            </div>
                            <div className="flex flex-row justify-center">
                            <h2 className="text-2xl mr-1">Devine: {pesoIdealPorDevine} kgs</h2>
                            <a href="#devine"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                            </div>
                            <div className="flex flex-row justify-center">
                            <h2 className="text-2xl mr-1">Lorentz: {pesoIdealPorLorentz} kgs</h2>
                            <a href="#lorentz"><Image src={"/images/interrogacao.png"} width={16} height={16} /></a>
                            </div>
                        </div>
                    )
                    }
            </article>
            <section className="informacoes">
                <div className="container-informacoes">
                    <h2>Por que é bom estar no peso ideal?</h2>
                    <p>É importante para a saúde e o bem-estar geral.
                        Aqui estão algumas razões pelas quais é recomendado manter um peso saudável:</p>
                    <h3>Saúde cardiovascular</h3>
                    <p> O excesso de peso está associado a um maior risco de doenças cardiovasculares,
                        como hipertensão arterial, doença arterial coronariana, acidente vascular cerebral e
                        insuficiência cardíaca. Manter um peso saudável pode reduzir esses riscos e promover a saúde do coração.</p>
                    <h3>Saúde metabólica</h3>
                    <p>O peso ideal está ligado a um melhor controle dos níveis de açúcar no sangue,
                        pressão arterial e perfil lipídico. Isso significa um menor risco de desenvolver diabetes tipo 2,
                        resistência à insulina e síndrome metabólica.</p>
                    <h3>Prevenção de doenças crônicas</h3>
                    <p>O excesso de peso tem sido associado a um maior risco de desenvolver várias doenças crônicas,
                        incluindo certos tipos de câncer (como câncer de mama, cólon e próstata), doenças articulares (como osteoartrite),
                        distúrbios respiratórios (como apneia do sono) e doenças hepáticas.</p>
                    <h3>Qualidade de vida</h3>
                    <p>Manter um peso saudável pode melhorar significativamente a qualidade de vida.
                        O peso excessivo pode levar a dificuldades físicas, falta de energia, limitações nas atividades diárias
                        e menor mobilidade. Manter um peso adequado pode aumentar a energia, melhorar a autoestima e permitir
                        que você participe plenamente das atividades que gosta.
                    </p>
                    <h3>Saúde mental</h3>
                    <p>Existe uma conexão entre o peso e a saúde mental.
                        O excesso de peso pode afetar a saúde mental de uma pessoa, contribuindo para a depressão,
                        baixa autoestima, ansiedade social e isolamento social. Além disso, a manutenção de um peso saudável
                        geralmente envolve hábitos saudáveis, como uma alimentação equilibrada e a prática regular de exercícios,
                        que podem ter um impacto positivo na saúde mental.</p>
                </div>
                <hr />
                <AutoresPesoIdeal />
            </section>
        </main >
    );
}
