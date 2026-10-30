import { validateNumber, validateResult, validateChoice } from './validation.mjs';

function converterCmParaPolegadas(cm) {
    const polegadas = cm / 2.54;
    return polegadas;
}

function converterPolegadasParaCm(polegadas) {
    const cm = polegadas * 2.54;
    return cm;
}

function converterLibrasParaKg(lbs) {
    const kg = lbs * 0.45359237;
    return kg;
}

export function calcularIMC(peso, altura) {
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    const alturaEmMetros = altura / 100;
    return validateResult((peso / (alturaEmMetros * alturaEmMetros)).toFixed(2), { min: 5, max: 200 });
}

export function calcularPesoIdealPorLorentz(altura, genero) {
    altura = validateNumber(altura, 'altura');
    validateChoice(genero, ['masculino', 'feminino']);
    let pesoIdeal = 0;
    if (genero === 'masculino') {
        pesoIdeal = (altura - 100) - ((altura - 150) / 4);
    } else if (genero === 'feminino') {
        pesoIdeal = (altura - 100) - ((altura - 150) / 2);
    }
    return validateResult(pesoIdeal.toFixed(1), { max: 635 });
}

export function calcularPesoIdealPorRobinson(altura, genero) {
    altura = validateNumber(altura, 'altura');
    validateChoice(genero, ['masculino', 'feminino']);
    let pesoIdeal = 0;
    const alturaEmPolegadas = converterCmParaPolegadas(altura);
    if (genero === "masculino") {
        pesoIdeal = 52 + 1.9 * (alturaEmPolegadas - 60);
    } else if (genero === "feminino") {
        pesoIdeal = 49 + 1.7 * (alturaEmPolegadas - 60);
    }
    return validateResult(pesoIdeal.toFixed(1), { max: 635 });
}

export function calcularPesoIdealPorMiller(altura, genero) {
    altura = validateNumber(altura, 'altura');
    validateChoice(genero, ['masculino', 'feminino']);
    let pesoIdeal = 0;
    const alturaEmPolegadas = converterCmParaPolegadas(altura);
    if (genero === "masculino") {
        pesoIdeal = 56.2 + 1.41 * (alturaEmPolegadas - 60);
    } else if (genero === "feminino") {
        pesoIdeal = 53.1 + 1.36 * (alturaEmPolegadas - 60);
    }
    return validateResult(pesoIdeal.toFixed(1), { max: 635 });
}

export function calcularPesoIdealPorDevine(altura, genero) {
    altura = validateNumber(altura, 'altura');
    validateChoice(genero, ['masculino', 'feminino']);
    let pesoIdeal = 0;
    const alturaEmPolegadas = converterCmParaPolegadas(altura);
    if (genero === "masculino") {
        pesoIdeal = 50 + 2.3 * (alturaEmPolegadas - 60);
    } else if (genero === "feminino") {
        pesoIdeal = 45.5 + 2.3 * (alturaEmPolegadas - 60);
    }
    return validateResult(pesoIdeal.toFixed(1), { max: 635 });
}

export function calcularPesoIdealPorPeterson(altura) {
    altura = validateNumber(altura, 'altura');
    const imcReferencia = 22;
    return validateResult((2.2 * imcReferencia + 3.5 * imcReferencia * (altura / 100 - 1.5)).toFixed(1), { max: 635 });
}

export function calcularTaxaMetabolicaBasalPorBenedict(idade, peso, altura, genero) {
    idade = validateNumber(idade, 'idade');
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    validateChoice(genero, ['masculino', 'feminino']);
    let tmb;
    if (genero === "masculino") {
        tmb = (88.4 + 13.4 * peso) + (4.8 * altura) - (5.68 * idade);
    } else if (genero === "feminino") {
        tmb = (447.6 + 9.25 * peso) + (3.10 * altura) - (4.33 * idade);
    }
    return validateResult(Math.round(tmb), { max: 20000 });
}

export function calcularTaxaMetabolicaBasalPorMcArdle(peso, gorduraCorporal) {
    peso = validateNumber(peso, 'peso');
    gorduraCorporal = validateNumber(gorduraCorporal, 'gorduraCorporal');
    let massaCorporalMagra = (peso * (100 - (gorduraCorporal))) / 100;
    const tmb = 370 + (21.6 * massaCorporalMagra);
    return validateResult(Math.round(tmb), { max: 20000 });
}

export function calcularTaxaMetabolicaBasal(idade, peso, altura, genero, formulaCalorias, gorduraCorporal) {
    idade = validateNumber(idade, 'idade');
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    gorduraCorporal = validateNumber(gorduraCorporal, 'gorduraCorporal');
    validateChoice(genero, ['masculino', 'feminino']);
    validateChoice(formulaCalorias, ['harris-benedict', 'katch-mcardle']);
    let resultado;
    if (formulaCalorias === 'harris-benedict') {
        resultado = calcularTaxaMetabolicaBasalPorBenedict(idade, peso, altura, genero);
    } else if (formulaCalorias === 'katch-mcardle') {
        resultado = calcularTaxaMetabolicaBasalPorMcArdle(peso, gorduraCorporal);
    }
    return validateResult(resultado, { max: 20000 });
}

export function calcularCalorias(idade, peso, altura, genero,
    nivelAtividade, formulaCalorias, gorduraCorporal) {
    idade = validateNumber(idade, 'idade');
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    gorduraCorporal = validateNumber(gorduraCorporal, 'gorduraCorporal');
    validateChoice(genero, ['masculino', 'feminino']);
    validateChoice(formulaCalorias, ['harris-benedict', 'katch-mcardle']);

    const tmb = calcularTaxaMetabolicaBasal(idade, peso, altura, genero, formulaCalorias, gorduraCorporal);
    let tmbNivelAtividade;

    switch (nivelAtividade) {
        case 'sedentario':
            tmbNivelAtividade = 1.2;
            break;
        case 'levemente-ativo':
            tmbNivelAtividade = 1.375;
            break;
        case 'moderadamente-ativo':
            tmbNivelAtividade = 1.55;
            break;
        case 'muito-ativo':
            tmbNivelAtividade = 1.725;
            break;
        case 'extremamente-ativo':
            tmbNivelAtividade = 1.9;
            break;
        default:
            tmbNivelAtividade = 1.2;
            break;
    }

    const calorias = tmb * tmbNivelAtividade;
    return validateResult(Math.round(calorias), { max: 20000 });
}

export function calcularTotalCaloriasPorDieta(macroNutrientes, objetivoDieta) {
    macroNutrientes = Number(validateResult(macroNutrientes));
    switch (objetivoDieta) {
        case "perda-peso-gradual":
            macroNutrientes -= 250;
            break;
        case "perda-peso":
            macroNutrientes -= 500;
            break;
        case "manutencao-peso":
            macroNutrientes += 0;
            break;
        case "ganho-peso-gradual":
            macroNutrientes += 250;
            break;
        case "ganho-peso":
            macroNutrientes += 500;
            break;
    }

    return validateResult(macroNutrientes, { max: 20000 });
}


export function calcularNivelGorduraCorporal(altura, pescoco, cintura, quadril, genero) {
    altura = validateNumber(altura, 'altura');
    pescoco = validateNumber(pescoco, 'pescoco');
    cintura = validateNumber(cintura, 'cintura');
    if (genero === 'feminino') quadril = validateNumber(quadril, 'quadril');
    validateChoice(genero, ['masculino', 'feminino']);
    if ((genero === 'masculino' ? cintura - pescoco : cintura + quadril - pescoco) <= 0) throw new RangeError('Confira as circunferências: a combinação informada não permite calcular a gordura corporal.');
    let gorduraCorporal;

    if (genero === "masculino") {
        gorduraCorporal =
            495 / (1.0324 - 0.19077 * (Math.log(cintura - pescoco) / Math.log(10)) + 0.15456 * (Math.log(altura) / Math.log(10))) - 450;
    } else if (genero === "feminino") {
        gorduraCorporal =
            495 / (1.29579 - 0.35004 * (Math.log(cintura + quadril - pescoco) / Math.log(10)) + 0.22100 * (Math.log(altura) / Math.log(10))) - 450;
    }

    return validateResult(gorduraCorporal.toFixed(1), { max: 80 });
}

export function calcularGorduraCorporalIdeal(genero, gorduraCoporal) {
    validateChoice(genero, ['masculino', 'feminino']);
    let categoria = " ... ";

    if (genero === "masculino") {
        if (gorduraCoporal >= 2 && gorduraCoporal < 6) {
            categoria = "Gordura essencial";
        } else if (gorduraCoporal >= 6 && gorduraCoporal < 14) {
            categoria = "Atleta";
        } else if (gorduraCoporal >= 14 && gorduraCoporal < 18) {
            categoria = "Fitness";
        } else if (gorduraCoporal >= 18 && gorduraCoporal < 25) {
            categoria = "Média";
        } else if (gorduraCoporal >= 25) {
            categoria = "Obeso";
        }
    }

    if (genero === "feminino") {
        if (gorduraCoporal >= 10 && gorduraCoporal < 14) {
            categoria = "Gordura essencial";
        } else if (gorduraCoporal >= 14 && gorduraCoporal < 21) {
            categoria = "Atleta";
        } else if (gorduraCoporal >= 21 && gorduraCoporal < 25) {
            categoria = "Fitness";
        } else if (gorduraCoporal >= 25 && gorduraCoporal < 32) {
            categoria = "Média";
        } else if (gorduraCoporal >= 32) {
            categoria = "Obeso";
        }
    }

    return categoria;
}

export function calcularMassaCorporalMagraPorBoer(peso, altura, genero) {
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    validateChoice(genero, ['masculino', 'feminino']);
    let massaCorporalMagra;
    if (genero === "masculino") {
        massaCorporalMagra = (0.407 * peso) + (0.267 * altura) - 19.2;
    } else if (genero === "feminino") {
        massaCorporalMagra = (0.252 * peso) + (0.473 * altura) - 48.3;
    }
    return validateResult(massaCorporalMagra.toFixed(1), { max: peso });
}

export function calcularMassaCorporalMagraPorHume(peso, altura, genero) {
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    validateChoice(genero, ['masculino', 'feminino']);
    let massaCorporalMagra = 0;
    if (genero === "masculino") {
        massaCorporalMagra = (0.328 * peso) + (0.339 * altura) - 29.53;
    } else if (genero === "feminino") {
        massaCorporalMagra = (0.295 * peso) + (0.418 * altura) - 43.293;
    }
    return validateResult(massaCorporalMagra.toFixed(1), { max: peso });
}

export function calcularMassaCorporalMagraPorJames(peso, altura, genero) {
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    validateChoice(genero, ['masculino', 'feminino']);
    let massaCorporalMagra = 0;
    if (genero === "masculino") {
        massaCorporalMagra = (1.1 * peso) - 128 * Math.pow(peso / altura, 2);
    } else if (genero === "feminino") {
        massaCorporalMagra = (1.07 * peso) - 148 * Math.pow(peso / altura, 2);
    }
    return validateResult(massaCorporalMagra.toFixed(1), { max: peso });
}

// A Sociedade Brasileira de Medicina do Esporte estabelece a ingestão de 1,6 a 1,7 g/kg
// a cada dia, para atletas com o objetivo de ganho de massa muscular.
export function calcularProteinas(peso, nivelAtividade) {
    peso = validateNumber(peso, 'peso');
    let quantidadeProteinasMinima, quantidadeProteinasMaxima = 0;

    switch (nivelAtividade) {
        case "sedentario":
            quantidadeProteinasMinima = 0.8;
            break;
        case "atividades-leves":
            quantidadeProteinasMinima = 1;
            break;
        case "atividades-resistencia":
            quantidadeProteinasMinima = 1.2;
            quantidadeProteinasMaxima = 1.4;
            break;
        case "treinos-forca":
            quantidadeProteinasMinima = 1.6;
            quantidadeProteinasMaxima = 1.7;
            break;
        case "atividades-extrema-resistencia":
            quantidadeProteinasMinima = 2;
            break;
        default:
            quantidadeProteinasMinima = 0.8;
            break;
    }

    const proteinasMinima = peso * quantidadeProteinasMinima;
    const proteinasMaxima = peso * quantidadeProteinasMaxima;

    return validateResult([Math.round(proteinasMinima), Math.round(proteinasMaxima)], { max: 1500, allowZero: true });
}

export function calcularCarboidratos(idade, peso, altura, genero,
    nivelAtividade, formulaTMB, gorduraCorporal, objetivoDieta = 'manutencao-peso') {
    idade = validateNumber(idade, 'idade');
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    gorduraCorporal = validateNumber(gorduraCorporal, 'gorduraCorporal');
    validateChoice(genero, ['masculino', 'feminino']);

    const caloriasBase = calcularCalorias(idade, peso, altura, genero,
        nivelAtividade, formulaTMB, gorduraCorporal);
    const calorias = calcularTotalCaloriasPorDieta(caloriasBase, objetivoDieta);

    const minimoCarboidratos = calorias * 0.45;
    const maximoCarboidratos = calorias * 0.65;
    const gramasMinimasCarboidratos = minimoCarboidratos / 4;
    const gramasMaximasCarboidratos = maximoCarboidratos / 4;

    return validateResult([Math.round(gramasMinimasCarboidratos), Math.round(gramasMaximasCarboidratos)], { max: 20000 });
}


export function calcularGordurasSaudaveis(idade, peso, altura, genero,
    nivelAtividade, formulaTMB, gorduraCorporal, objetivoDieta = 'manutencao-peso') {
    idade = validateNumber(idade, 'idade');
    peso = validateNumber(peso, 'peso');
    altura = validateNumber(altura, 'altura');
    gorduraCorporal = validateNumber(gorduraCorporal, 'gorduraCorporal');
    validateChoice(genero, ['masculino', 'feminino']);

    const caloriasBase = calcularCalorias(idade, peso, altura, genero,
        nivelAtividade, formulaTMB, gorduraCorporal);
    const calorias = calcularTotalCaloriasPorDieta(caloriasBase, objetivoDieta);

    const gordurasMinimas = calorias * 0.20;
    const gordurasMaximas = calorias * 0.35;
    const menorGramasGorduras = gordurasMinimas / 9;
    const maiorGramasGorduras = gordurasMaximas / 9;

    return validateResult([Math.round(menorGramasGorduras), Math.round(maiorGramasGorduras)], { max: 20000 });
}



export function calcularPotencialMaximoMuscularPorBerkhan(altura, gorduraCorporal) {
    altura = validateNumber(altura, 'altura');
    gorduraCorporal = validateNumber(gorduraCorporal, 'gorduraCorporal');
    // Altura - 100 é peso total a 5% de gordura; conserva-se a massa magra.
    const massaMagra = (altura - 100) * 0.95;
    return validateResult((massaMagra / (1 - gorduraCorporal / 100)).toFixed(1), { max: 635 });
}

export function calcularPotencialMaximoMuscularPorCaseyButt(altura, pulso, tornozelo, gorduraCorporal) {
    altura = validateNumber(altura, 'altura');
    pulso = validateNumber(pulso, 'pulso');
    tornozelo = validateNumber(tornozelo, 'tornozelo');
    gorduraCorporal = validateNumber(gorduraCorporal, 'gorduraCorporal');
    altura = converterCmParaPolegadas(altura);
    pulso = converterCmParaPolegadas(pulso);
    tornozelo = converterCmParaPolegadas(tornozelo);

    const massaCorporalMagra = (Math.pow(altura, 1.5) * (Math.sqrt(pulso) / 22.6670
        + Math.sqrt(tornozelo) / 17.0104) * (gorduraCorporal / 224 + 1));
    // O fator de gordura já está incluído na equação; não somá-lo novamente.
    let pesoTotal = massaCorporalMagra;
    pesoTotal = converterLibrasParaKg(pesoTotal);

    return validateResult(pesoTotal.toFixed(1), { max: 635 });
}

export function calcularMedidasMuscularesPorCaseyButt(altura, pulso, tornozelo) {
    altura = validateNumber(altura, 'altura');
    pulso = validateNumber(pulso, 'pulso');
    tornozelo = validateNumber(tornozelo, 'tornozelo');
    altura = converterCmParaPolegadas(altura);
    pulso = converterCmParaPolegadas(pulso);
    tornozelo = converterCmParaPolegadas(tornozelo);

    let peito = (1.625 * pulso) + (1.3682 * tornozelo) + (0.3562 * altura);
    let braco = (1.1709 * pulso) + (0.1350 * altura);
    let antebraco = (0.950 * pulso) + (0.1041 * altura);
    let pescoco = (1.1875 * pulso) + (0.1301 * altura);
    let coxa = (1.14737 * tornozelo) + (0.1918 * altura);
    let panturrilha = (0.9812 * tornozelo) + (0.1250 * altura);

    peito = converterPolegadasParaCm(peito).toFixed(1);
    braco = converterPolegadasParaCm(braco).toFixed(1);
    antebraco = converterPolegadasParaCm(antebraco).toFixed(1);
    pescoco = converterPolegadasParaCm(pescoco).toFixed(1);
    coxa = converterPolegadasParaCm(coxa).toFixed(1);
    panturrilha = converterPolegadasParaCm(panturrilha).toFixed(1);

    return validateResult([peito, braco, antebraco, pescoco, coxa, panturrilha], { max: 20000 });
}

export function calcular1RepeticaoMaximaPorEpley(pesoLevantado, numeroRepeticoes) {
    pesoLevantado = validateNumber(pesoLevantado, 'pesoLevantado');
    numeroRepeticoes = validateNumber(numeroRepeticoes, 'numeroRepeticoes');
    if (Number(numeroRepeticoes) === 1) return validateResult(Number(pesoLevantado), { max: 20000 });
    const repeticaoMaxima = pesoLevantado * (1 + 0.0333 * numeroRepeticoes);
    return validateResult(Math.round(repeticaoMaxima), { max: 20000 });
}

export function calcular1RepeticaoMaximaPorLander(pesoLevantado, numeroRepeticoes) {
    pesoLevantado = validateNumber(pesoLevantado, 'pesoLevantado');
    numeroRepeticoes = validateNumber(numeroRepeticoes, 'numeroRepeticoes');
    if (Number(numeroRepeticoes) === 1) return validateResult(Number(pesoLevantado), { max: 20000 });
    const repeticaoMaxima = (100 * pesoLevantado) / (101.3 - 2.67123 * numeroRepeticoes);
    return validateResult(Math.round(repeticaoMaxima), { max: 20000 });
}

export function calcular1RepeticaoMaximaPorOConner(pesoLevantado, numeroRepeticoes) {
    pesoLevantado = validateNumber(pesoLevantado, 'pesoLevantado');
    numeroRepeticoes = validateNumber(numeroRepeticoes, 'numeroRepeticoes');
    if (Number(numeroRepeticoes) === 1) return validateResult(Number(pesoLevantado), { max: 20000 });
    const repeticaoMaxima = pesoLevantado * (1 + 0.025 * numeroRepeticoes);
    return validateResult(Math.round(repeticaoMaxima), { max: 20000 });
}

export function calcular1RepeticaoMaximaPorLombardi(pesoLevantado, numeroRepeticoes) {
    pesoLevantado = validateNumber(pesoLevantado, 'pesoLevantado');
    numeroRepeticoes = validateNumber(numeroRepeticoes, 'numeroRepeticoes');
    if (Number(numeroRepeticoes) === 1) return validateResult(Number(pesoLevantado), { max: 20000 });
    const repeticaoMaxima = pesoLevantado * Math.pow(numeroRepeticoes, 0.1);
    return validateResult(Math.round(repeticaoMaxima), { max: 20000 });
}

export function calcular1RepeticaoMaximaPorBrzycki(pesoLevantado, numeroRepeticoes) {
    pesoLevantado = validateNumber(pesoLevantado, 'pesoLevantado');
    numeroRepeticoes = validateNumber(numeroRepeticoes, 'numeroRepeticoes');
    if (Number(numeroRepeticoes) === 1) return validateResult(Number(pesoLevantado), { max: 20000 });
    const repeticaoMaxima = pesoLevantado / (1.0278 - 0.0278 * numeroRepeticoes);
    return validateResult(Math.round(repeticaoMaxima), { max: 20000 });
}

export function calcular1RepeticaoMaximaPorWathen(pesoLevantado, numeroRepeticoes) {
    pesoLevantado = validateNumber(pesoLevantado, 'pesoLevantado');
    numeroRepeticoes = validateNumber(numeroRepeticoes, 'numeroRepeticoes');
    if (Number(numeroRepeticoes) === 1) return validateResult(Number(pesoLevantado), { max: 20000 });
    const repeticaoMaxima = (100 * pesoLevantado) / (48.8 + 53.8 * Math.pow(Math.E, -0.075 * numeroRepeticoes));
    return validateResult(Math.round(repeticaoMaxima), { max: 20000 });
}

export function mostrarCargasRecomendadas1RepeticaoMaxima(peso1RepeticaoMaxima, tipoTreinamento) {
    validateResult(peso1RepeticaoMaxima, { max: 1500 });
    let cargaMinima = 0, cargaMaxima = 0;

    switch (tipoTreinamento) {
        case "treino-forca":
            cargaMinima = 0.90;
            cargaMaxima = 1;
            break;
        case "treino-hipertrofia":
            cargaMinima = 0.70;
            cargaMaxima = 0.90;
            break;
        case "treino-emagrecimento":
            cargaMinima = 0.60;
            cargaMaxima = 0.80;
            break;
        case "manutencao-muscular":
            cargaMaxima = 0.50;
            break;
        default:
            cargaMaxima = 0.70;
            break;
    }


    const cargaMinimaRecomendada = peso1RepeticaoMaxima * cargaMinima;
    const cargaMaximaRecomendada = peso1RepeticaoMaxima * cargaMaxima;

    return validateResult([Math.round(cargaMinimaRecomendada), Math.round(cargaMaximaRecomendada)], { max: 1500, allowZero: true });
}

/** Estimativa educativa para adultos saudáveis; extra do exercício é ilustrativo. */
export function calcularQuantidadeAguaConsumida(peso, nivelAtividade = 'sedentario') {
    peso = validateNumber(peso, 'peso');
    const pesoNumerico = Number(peso);
    if (!Number.isFinite(pesoNumerico) || pesoNumerico <= 0) {
        throw new RangeError('Informe um peso maior que zero.');
    }
    if (!['sedentario', 'ativo'].includes(nivelAtividade)) {
        throw new RangeError('Selecione um nível de atividade válido.');
    }
    const base = Math.round(pesoNumerico * 35);
    return { base, minimo: base + (nivelAtividade === 'ativo' ? 500 : 0), maximo: base + (nivelAtividade === 'ativo' ? 1000 : 0) };
}
