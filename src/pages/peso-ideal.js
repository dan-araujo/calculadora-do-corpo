import CalculatorResult from '../components/calculator-result';
import NumericInput from '../components/numeric-input';
import CalculatorForm from '../components/calculator-form';
import CalculatorHeader from '../components/calculator-header';
import { useState } from "react";
import {
    calcularPesoIdealPorLorentz,
    calcularPesoIdealPorMiller,
    calcularPesoIdealPorRobinson,
    calcularPesoIdealPorDevine,
    calcularPesoIdealPorPeterson
} from "../lib/calculadoras.mjs";
import Image from "next/image";
import AutoresPesoIdeal from "../components/autores-peso-ideal";

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

        const pesoFormulaPeterson = calcularPesoIdealPorPeterson(parseFloat(altura), genero);
        const pesoFormulaLorentz = calcularPesoIdealPorLorentz(parseFloat(altura), genero);
        const pesoFormulaRobinson = calcularPesoIdealPorRobinson(parseFloat(altura), genero);
        const pesoFormulaMiller = calcularPesoIdealPorMiller(parseFloat(altura), genero);
        const pesoFormulaDevine = calcularPesoIdealPorDevine(parseFloat(altura), genero);

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
            <article className="area-calculadora">
                <section className="formulario-calculadora">
                    <CalculatorForm onResetResult={() => setMostrarResultado(false)} onSubmit={calculoPesoIdeal}>
                        <CalculatorHeader title="Calculadora de Peso Ideal" image="/images/escala-de-peso.png" />
                        <div className="linha-campo">
                            <label htmlFor="altura" className="rotulo-campo">Altura (cm):</label>
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
                                className="campo-formulario seletor-formulario">
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </CalculatorForm>
                </section>

                <CalculatorResult visible={mostrarResultado && pesoIdealPorLorentz !== ""}>
                    <h3 className="text-xl">O seu peso ideal está entre:</h3>
                    <div className="flex flex-row justify-center">
                        <h2 className="text-2xl mr-1">Peterson: {pesoIdealPorPeterson} kgs</h2>
                        <a aria-label="Entenda a fórmula de Peterson" href="#peterson"><Image src={"/images/interrogacao.png"} width={16} height={16}  alt="" /></a>
                    </div>
                    <div className="flex flex-row justify-center">
                    <h2 className="text-2xl mr-1">Robinson: {pesoIdealPorRobinson} kgs</h2>
                    <a aria-label="Entenda a fórmula de Robinson" href="#robinson"><Image src={"/images/interrogacao.png"} width={16} height={16}  alt="" /></a>
                    </div>
                    <div className="flex flex-row justify-center">
                    <h2 className="text-2xl mr-1">Miller: {pesoIdealPorMiller} kgs</h2>
                    <a aria-label="Entenda a fórmula de Miller" href="#miller"><Image src={"/images/interrogacao.png"} width={16} height={16}  alt="" /></a>
                    </div>
                    <div className="flex flex-row justify-center">
                    <h2 className="text-2xl mr-1">Devine: {pesoIdealPorDevine} kgs</h2>
                    <a aria-label="Entenda a fórmula de Devine" href="#devine"><Image src={"/images/interrogacao.png"} width={16} height={16}  alt="" /></a>
                    </div>
                    <div className="flex flex-row justify-center">
                    <h2 className="text-2xl mr-1">Lorentz: {pesoIdealPorLorentz} kgs</h2>
                    <a aria-label="Entenda a fórmula de Lorentz" href="#lorentz"><Image src={"/images/interrogacao.png"} width={16} height={16}  alt="" /></a>
                    </div>
                </CalculatorResult>
            </article>
            <section className="informacoes">
                <div className="conteiner-informacoes">
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
