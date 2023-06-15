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
    const alturaEmMetros = altura / 100;
    return (peso / (alturaEmMetros * alturaEmMetros)).toFixed(2);
}

export function calcularPesoIdealPorLorentz(altura, genero) {
    let pesoIdeal = 0;
    if (genero === 'masculino') {
        pesoIdeal = (altura - 100) - ((altura - 150) / 4);
    } else if (genero === 'feminino') {
        pesoIdeal = (altura - 100) - ((altura - 150) / 2);
    }
    return pesoIdeal.toFixed(1);
}

export function calcularPesoIdealPorRobinson(altura, genero) {
    let pesoIdeal = 0;
    const alturaEmPolegadas = converterCmParaPolegadas(altura);
    if (genero === "masculino") {
        pesoIdeal = 52 + 1.9 * (alturaEmPolegadas - 60);
    } else if (genero === "feminino") {
        pesoIdeal = 49 + 1.7 * (alturaEmPolegadas - 60);
    }
    return pesoIdeal.toFixed(1);
}

export function calcularPesoIdealPorMiller(altura, genero) {
    let pesoIdeal = 0;
    const alturaEmPolegadas = converterCmParaPolegadas(altura);
    if (genero === "masculino") {
        pesoIdeal = 56.2 + 1.41 * (alturaEmPolegadas - 60);
    } else if (genero === "feminino") {
        pesoIdeal = 53.1 + 1.36 * (alturaEmPolegadas - 60);
    }
    return pesoIdeal.toFixed(1);
}

export function calcularPesoIdealPorDevine(altura, genero) {
    let pesoIdeal = 0;
    const alturaEmPolegadas = converterCmParaPolegadas(altura);
    if (genero === "masculino") {
        pesoIdeal = 50 + 2.3 * (alturaEmPolegadas - 60);
    } else if (genero === "feminino") {
        pesoIdeal = 45.5 + 2.3 * (alturaEmPolegadas - 60);
    }
    return pesoIdeal.toFixed(1);
}

export function calcularPesoIdealPorPeterson(altura, genero) {
    let pesoIdeal = 0;
    const alturaEmMetros = altura / 100;
    if (genero === "masculino") {
        pesoIdeal = 2.2 * 24 + 3.5 * 24 * (alturaEmMetros - 1.5);
    } else if (genero === "feminino") {
        pesoIdeal = 2.2 * 22 + 3.5 * 24 * (alturaEmMetros - 1.5);
    }
    return pesoIdeal.toFixed(1);
}

export function calcularTaxaMetabolicaBasalPorBenedict(idade, peso, altura, genero) {
    let tmb;
    if (genero === "masculino") {
        tmb = (88.4 + 13.4 * peso) + (4.8 * altura) - (5.68 * idade);
    } else if (genero === "feminino") {
        tmb = (447.6 + 9.25 * peso) + (3.10 * altura) - (4.33 * idade);
    }
    return Math.round(tmb);
}

export function calcularTaxaMetabolicaBasalPorMcArdle(peso, gorduraCorporal) {
    let massaCorporalMagra = (peso * (100 - (gorduraCorporal))) / 100;
    const tmb = 370 + (21.6 * massaCorporalMagra);
    return Math.round(tmb);
}

export function calcularTaxaMetabolicaBasal(idade, peso, altura, genero, formulaCalorias, gorduraCorporal) {
    let resultado;
    if (formulaCalorias === 'harris-benedict') {
        resultado = calcularTaxaMetabolicaBasalPorBenedict(idade, peso, altura, genero);
    } else if (formulaCalorias === 'katch-mcardle') {
        resultado = calcularTaxaMetabolicaBasalPorMcArdle(peso, gorduraCorporal);
    }
    return resultado;
}

export function calcularCalorias(idade, peso, altura, genero,
    nivelAtividade, formulaCalorias, gorduraCorporal) {

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
    return Math.round(calorias);
}

export function calcularTotalCaloriasPorDieta(macroNutrientes, objetivoDieta) {
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

    return macroNutrientes;
}


export function calcularNivelGorduraCorporal(altura, pescoco, cintura, quadril, genero) {
    let gorduraCorporal;

    if (genero === "masculino") {
        gorduraCorporal =
            495 / (1.0324 - 0.19077 * (Math.log(cintura - pescoco) / Math.log(10)) + 0.15456 * (Math.log(altura) / Math.log(10))) - 450;
    } else if (genero === "feminino") {
        gorduraCorporal =
            495 / (1.29579 - 0.35004 * (Math.log(cintura + quadril - pescoco) / Math.log(10)) + 0.22100 * (Math.log(altura) / Math.log(10))) - 450;
    }

    return gorduraCorporal.toFixed(1);
}

export function calcularGorduraCorporalIdeal(genero, gorduraCoporal) {
    let categoria = " ... ";

    if (genero === "masculino") {
        if (gorduraCoporal >= 2 && gorduraCoporal <= 5.9) {
            categoria = "Gordura essencial";
        } else if (gorduraCoporal >= 6 && gorduraCoporal <= 13) {
            categoria = "Atleta";
        } else if (gorduraCoporal >= 14 && gorduraCoporal <= 17) {
            categoria = "Fitness";
        } else if (gorduraCoporal >= 18 && gorduraCoporal <= 24) {
            categoria = "Média";
        } else if (gorduraCoporal >= 25) {
            categoria = "Obeso";
        }
    }

    if (genero === "feminino") {
        if (gorduraCoporal >= 10 && gorduraCoporal <= 13.9) {
            categoria = "Gordura essencial";
        } else if (gorduraCoporal >= 14 && gorduraCoporal <= 20) {
            categoria = "Atleta";
        } else if (gorduraCoporal >= 21 && gorduraCoporal <= 24) {
            categoria = "Fitness";
        } else if (gorduraCoporal >= 25 && gorduraCoporal <= 31) {
            categoria = "Média";
        } else if (gorduraCoporal >= 32) {
            categoria = "Obeso";
        }
    }

    return categoria;
}

export function calcularMassaCorporalMagraPorBoer(peso, altura, genero) {
    let massaCorporalMagra;
    if (genero === "masculino") {
        massaCorporalMagra = (0.407 * peso) + (0.267 * altura) - 19.2;
    } else if (genero === "feminino") {
        massaCorporalMagra = (0.252 * peso) + (0.473 * altura) - 48.3;
    }
    return massaCorporalMagra.toFixed(1);
}

export function calcularMassaCorporalMagraPorHume(peso, altura, genero) {
    let massaCorporalMagra = 0;
    if (genero === "masculino") {
        massaCorporalMagra = (0.328 * peso) + (0.339 * altura) - 29.53;
    } else if (genero === "feminino") {
        massaCorporalMagra = (0.295 * peso) + (0.418 * altura) - 43.293;
    }
    return massaCorporalMagra.toFixed(1);
}

export function calcularMassaCorporalMagraPorJames(peso, altura, genero) {
    let massaCorporalMagra = 0;
    if (genero === "masculino") {
        massaCorporalMagra = (1.1 * peso) - 128 * Math.pow(peso / altura, 2);
    } else if (genero === "feminino") {
        massaCorporalMagra = (1.07 * peso) - 148 * Math.pow(peso / altura, 2);
    }
    return massaCorporalMagra.toFixed(1);
}

// A Sociedade Brasileira de Medicina do Esporte estabelece a ingestão de 1,6 a 1,7 g/kg 
// a cada dia, para atletas com o objetivo de ganho de massa muscular.
export function calcularProteinas(peso, nivelAtividade) {
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

    return [Math.round(proteinasMinima), Math.round(proteinasMaxima)];
}

export function calcularCarboidratos(idade, peso, altura, genero,
    nivelAtividade, formulaTMB, gorduraCorporal) {

    const calorias = calcularCalorias(idade, peso, altura, genero,
        nivelAtividade, formulaTMB, gorduraCorporal);

    const minimoCarboidratos = calorias * 0.45;
    const maximoCarboidratos = calorias * 0.65;
    const gramasMinimasCarboidratos = minimoCarboidratos / 4;
    const gramasMaximasCarboidratos = maximoCarboidratos / 4;

    return [Math.round(gramasMinimasCarboidratos), Math.round(gramasMaximasCarboidratos)];
}

export function calcularTotalCarboidratosPorDieta(carboidratosTotais, objetivoDieta) {
    const minimoCarboidratosGradual = 250 * 0.45 / 4;
    const minimoCarboidratos = 500 * 0.45 / 4;
    const maximoCarboidratosGradual = 250 * 0.65 / 4;
    const maximoCarboidratos = 500 * 0.65 / 4;

    switch (objetivoDieta) {
        case "perda-peso-gradual":
            carboidratosTotais -= minimoCarboidratosGradual;
            break;
        case "perda-peso":
            carboidratosTotais -= minimoCarboidratos;
            break;
        case "manutencao-peso":
            carboidratosTotais += 0;
            break;
        case "ganho-peso-gradual":
            carboidratosTotais += maximoCarboidratosGradual;
            break;
        case "ganho-peso":
            carboidratosTotais += maximoCarboidratos;
            break;
    }
    return carboidratosTotais;
}

export function calcularGodurasSaudaveis(idade, peso, altura, genero,
    nivelAtividade, formulaTMB, gorduraCorporal) {

    const calorias = calcularCalorias(idade, peso, altura, genero,
        nivelAtividade, formulaTMB, gorduraCorporal);

    const gordurasMinimas = calorias * 0.20;
    const gordurasMaximas = calorias * 0.35;
    const menorGramasGorduras = gordurasMinimas / 9;
    const maiorGramasGorduras = gordurasMaximas / 9;

    return [Math.round(menorGramasGorduras), Math.round(maiorGramasGorduras)];
}

export function calcularTotalGordurasSaudaveisPorDieta(gordurasTotais, objetivoDieta) {
    const minimoGordurasGradual = 250 * 0.20 / 9;
    const minimoGorduras = 250 * 0.35 / 9;
    const maximoGordurasGradual = 500 * 0.20 / 9;
    const maximoGorduras = 500 * 0.35 / 9;

    switch (objetivoDieta) {
        case "perda-peso-gradual":
            gordurasTotais -= minimoGordurasGradual;
            break;
        case "perda-peso":
            gordurasTotais -= minimoGorduras;
            break;
        case "manutencao-peso":
            gordurasTotais += 0;
            break;
        case "ganho-peso-gradual":
            gordurasTotais += maximoGordurasGradual;
            break;
        case "ganho-peso":
            gordurasTotais += maximoGorduras;
            break;
    }

    return gordurasTotais.toFixed(1);
}


export function calcularPotencialMaximoMuscularPorBerkhan(altura, gorduraCorporal) {
    gorduraCorporal = gorduraCorporal - 5;

    const massaCorporalMagra = altura - 100;
    const pesoGorduraCorporal = ((gorduraCorporal / 100) * massaCorporalMagra);
    const potencialMuscular = massaCorporalMagra + pesoGorduraCorporal;

    return potencialMuscular.toFixed(1);
}

export function calcularPotencialMaximoMuscularPorCaseyButt(altura, pulso, tornozelo, gorduraCorporal) {
    altura = converterCmParaPolegadas(altura);
    pulso = converterCmParaPolegadas(pulso);
    tornozelo = converterCmParaPolegadas(tornozelo);

    const massaCorporalMagra = (Math.pow(altura, 1.5) * (Math.sqrt(pulso) / 22.6670
        + Math.sqrt(tornozelo) / 17.0104) * (gorduraCorporal / 224 + 1));
    const pesoGorduraCorporal = massaCorporalMagra * (gorduraCorporal / 100);

    let pesoTotal = massaCorporalMagra + pesoGorduraCorporal;
    pesoTotal = converterLibrasParaKg(pesoTotal);

    return pesoTotal.toFixed(1);
}

export function calcularMedidasMuscularesPorCaseyButt(altura, pulso, tornozelo) {
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

    return [peito, braco, antebraco, pescoco, coxa, panturrilha];
}

export function calcular1RepeticaoMaximaPorEpley(pesoLevantado, numeroRepeticoes) {
    const repeticaoMaxima = pesoLevantado * (1 + 0.0333 * numeroRepeticoes);
    return Math.round(repeticaoMaxima);
}

export function calcular1RepeticaoMaximaPorLander(pesoLevantado, numeroRepeticoes) {
    const repeticaoMaxima = (100 * pesoLevantado) / (101.3 - 2.67123 * numeroRepeticoes);
    return Math.round(repeticaoMaxima);
}

export function calcular1RepeticaoMaximaPorOConner(pesoLevantado, numeroRepeticoes) {
    const repeticaoMaxima = pesoLevantado * (1 + 0.025 * numeroRepeticoes);
    return Math.round(repeticaoMaxima);
}

export function calcular1RepeticaoMaximaPorLombardi(pesoLevantado, numeroRepeticoes) {
    const repeticaoMaxima = pesoLevantado * Math.pow(numeroRepeticoes, 0.1);
    return Math.round(repeticaoMaxima);
}

export function calcular1RepeticaoMaximaPorBrzycki(pesoLevantado, numeroRepeticoes) {
    const repeticaoMaxima = pesoLevantado / (1.0278 - 0.0278 * numeroRepeticoes);
    return Math.round(repeticaoMaxima);
}

export function calcular1RepeticaoMaximaPorWathen(pesoLevantado, numeroRepeticoes) {
    const repeticaoMaxima = (100 * pesoLevantado) / (48.8 + 53.8 * Math.pow(Math.E, -0.075 * numeroRepeticoes));
    return Math.round(repeticaoMaxima);
}

export function mostrarCargasRecomendadas1RepeticaoMaxima(peso1RepeticaoMaxima, tipoTreinamento) {
    let cargaMinima, cargaMaxima = 0;

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

    return [Math.round(cargaMinimaRecomendada), Math.round(cargaMaximaRecomendada)];
}

export function calcularQuantidadeAguaConsumida(peso, idade, nivelAtividade) {
    let quantidadeMinimaAgua = 0;
    if (idade <= 17) {
        quantidadeMinimaAgua = 40 * peso;
    } else if (idade >= 18 && idade < 55) {
        quantidadeMinimaAgua = 35 * peso;
    } else if (idade >= 55 && idade <= 65) {
        quantidadeMinimaAgua = 30 * peso;
    } else {
        quantidadeMinimaAgua = 25 * peso;
    }

    switch (nivelAtividade) {
        case "sedentario":
            quantidadeMinimaAgua += 0;
            break;
        case "ativo":
            quantidadeMinimaAgua += 750;
            break;
        default:
            "sedentario";
            break;
    }

    return [Math.round(quantidadeMinimaAgua)];
}





