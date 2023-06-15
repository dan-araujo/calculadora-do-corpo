import { useState } from "react";
import { calcularQuantidadeAguaConsumida } from "./api/calculadoras";
import Image from "next/image";

export default function ConsumoAgua() {
    const [peso, setPeso] = useState(0);
    const [idade, setIdade] = useState(0);
    const [nivelAtividade, setNivelAtividade] = useState('sedentario');
    const [litros, setLitros] = useState(0);
    const [mililitros, setMililitros] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const calculoConsumoAgua = async (e) => {
        e.preventDefault();
        const agua = calcularQuantidadeAguaConsumida(peso, idade, nivelAtividade);
        const quantidadeAgua = converterAguaEmLitrosEMililitros(agua);

        setLitros(quantidadeAgua[0]);
        setMililitros(quantidadeAgua[1]);
        setMostrarResultado(true);
    }

    const converterAguaEmLitrosEMililitros = (ml) => {
        let litros = Math.floor(ml / 1000);
        let mililitrosRestantes = ml % 1000;
    
        return [Math.round(litros), Math.round(mililitrosRestantes)];
    }
    

    return (
        <main>
            <article>
                <section className="form-calculadora">
                    <form onSubmit={calculoConsumoAgua}>
                        <h1>Calculadora de Consumo Água</h1>
                        <div className="input-linha">
                            <label htmlFor="peso" className="input-label">
                                Peso (kg):
                            </label>
                            <input type="number" value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                required
                                className="input-campo" />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="idade" className="input-label">Idade:</label>
                            <input type="number"
                                id="idade"
                                value={idade}
                                step={1}
                                min={1}
                                onChange={(e) => setIdade(e.target.value)}
                                className="input-campo" required />
                        </div>
                        <div className="input-linha">
                            <label htmlFor="nivelAtividade" className="input-label">Nível de Atividade:</label>
                            <select value={nivelAtividade}
                                onChange={(e) => setNivelAtividade(e.target.value)}
                                className="input-campo select-formulario">
                                <option value="sedentario">
                                    Sedentário
                                </option>
                                <option value="ativo">
                                    Ativo
                                </option>
                            </select>
                        </div>
                        <div className="small-nivel-atividade" >
                            <small><strong>Sedentário: </strong> Pouco ou nenhum exercício.</small>
                            <br />
                            <small><strong>Ativo: </strong>Pratica exercícios físicos</small>
                        </div>
                        <button type="submit" className="botao-calcular">Calcular</button>
                    </form>
                </section>
                <Image src={"/images/agua.png"} alt="agua" width={150} height={150}
                    className="imagem-demo" />
                <div className="resultado" style={{ display: mostrarResultado ? 'block' : 'none' }}>
                    {mililitros !== 0 && (
                        <div>
                            <h3 className="text-2xl">A quantidade de ingestão de água recomendada para você é:</h3>
                            <h2 className="text-3xl">{litros}L e {mililitros}ml</h2>
                        </div>
                    )}
                </div>
            </article>
        </main>
    );
}