import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as calc from '../src/lib/calculadoras.mjs';
import { getSiteUrl, calculators, pageMetadata } from '../src/lib/site.mjs';

describe('Consumo de água', () => {
  it('deve calcular a quantidade com peso decimal e considerar o exercício', () => {
    assert.deepEqual(calc.calcularQuantidadeAguaConsumida(100), { base: 3500, minimo: 3500, maximo: 3500 });
    assert.deepEqual(calc.calcularQuantidadeAguaConsumida('80', 'ativo'), { base: 2800, minimo: 3300, maximo: 3800 });
    assert.equal(calc.calcularQuantidadeAguaConsumida(70.5).base, 2468);
    assert.equal(calc.calcularQuantidadeAguaConsumida(200).base, 7000);
  });

  it('deve rejeitar entradas inválidas', () => {
    for (const peso of [0, -1, '', 'abc', NaN, Infinity]) assert.throws(() => calc.calcularQuantidadeAguaConsumida(peso), RangeError);
    assert.throws(() => calc.calcularQuantidadeAguaConsumida(70, 'invalido'), RangeError);
  });
});

describe('Carboidratos e gorduras', () => {
  it('deve aplicar o objetivo à energia antes de calcular os limites', () => {
    const args = [30, 70.5, 175.5, 'masculino', 'moderadamente-ativo', 'harris-benedict', 20];
    const energiaBase = calc.calcularCalorias(...args);
    for (const [objetivo, ajuste] of [['manutencao-peso', 0], ['perda-peso-gradual', -250], ['perda-peso', -500], ['ganho-peso-gradual', 250], ['ganho-peso', 500]]) {
      const energia = energiaBase + ajuste;
      assert.deepEqual(calc.calcularCarboidratos(...args, objetivo), [Math.round(energia * .45 / 4), Math.round(energia * .65 / 4)]);
      assert.deepEqual(calc.calcularGordurasSaudaveis(...args, objetivo), [Math.round(energia * .20 / 9), Math.round(energia * .35 / 9)]);
    }
  });
});

describe('Peso ideal por Peterson', () => {
  it('deve usar o IMC de referência 22 para ambos os sexos', () => {
    assert.equal(calc.calcularPesoIdealPorPeterson(180, 'masculino'), '71.5');
    assert.equal(calc.calcularPesoIdealPorPeterson(180, 'feminino'), '71.5');
  });
});

describe('Massa corporal magra por Hume', () => {
  it('deve usar os coeficientes publicados para homens', () => {
    assert.equal(calc.calcularMassaCorporalMagraPorHume(80, 180, 'masculino'), '57.8');
  });

  it('deve usar os coeficientes publicados para mulheres', () => {
    assert.equal(calc.calcularMassaCorporalMagraPorHume(70, 175, 'feminino'), '50.6');
  });
});

describe('Repetição máxima', () => {
  it('deve preservar a carga de uma repetição e calcular a manutenção', () => {
    for (const [name, fn] of Object.entries(calc)) {
      if (name.startsWith('calcular1RepeticaoMaximaPor')) assert.equal(fn(82.5, 1), 82.5);
    }
    assert.deepEqual(calc.mostrarCargasRecomendadas1RepeticaoMaxima(100, 'manutencao-muscular'), [0, 50]);
  });
});

describe('Classificação de gordura corporal', () => {
  it('deve classificar percentuais decimais sem lacunas', () => {
    assert.equal(calc.calcularGorduraCorporalIdeal('masculino', 5.95), 'Gordura essencial');
    assert.equal(calc.calcularGorduraCorporalIdeal('feminino', 13.95), 'Gordura essencial');
    assert.equal(calc.calcularGorduraCorporalIdeal('masculino', 13.5), 'Atleta');
    assert.equal(calc.calcularGorduraCorporalIdeal('feminino', 24.5), 'Fitness');
  });
});

describe('Endereço canônico', () => {
  it('deve aceitar origens válidas e rejeitar endereços incompatíveis', () => {
    assert.equal(getSiteUrl('https://exemplo.vercel.app/'), 'https://exemplo.vercel.app');
    assert.equal(getSiteUrl(''), '');
    for (const url of ['https://exemplo.com/caminho', 'ftp://exemplo.com', 'https://user:password@exemplo.com']) assert.throws(() => getSiteUrl(url));
    assert.equal(calculators.length, 12);
    for (const item of calculators) assert.ok(pageMetadata[`/${item.slug}`]);
  });
});

describe('Potencial muscular', () => {
  it('deve ajustar a gordura sem duplicar sua contribuição no peso', () => {
    assert.equal(calc.calcularPotencialMaximoMuscularPorBerkhan(180, 5), '80.0');
    assert.equal(calc.calcularPotencialMaximoMuscularPorBerkhan(180, 20), '95.0');
    const semGordura = Number(calc.calcularPotencialMaximoMuscularPorCaseyButt(180, 17, 23, 5));
    const comGordura = Number(calc.calcularPotencialMaximoMuscularPorCaseyButt(180, 17, 23, 10));
    assert.ok(Math.abs(comGordura / semGordura - (1 + 10 / 224) / (1 + 5 / 224)) < 0.002);
  });
});
