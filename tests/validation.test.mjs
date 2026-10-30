import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { FIELD_LIMITS, validateNumber } from '../src/lib/validation.mjs';
import * as calc from '../src/lib/calculadoras.mjs';

describe('Campos numéricos positivos', () => {
  it('deve aceitar os limites operacionais de cada campo', () => {
    for (const [field, rule] of Object.entries(FIELD_LIMITS)) {
      assert.equal(validateNumber(rule.min, field), rule.min);
      assert.equal(validateNumber(rule.max, field), rule.max);
    }
  });
  it('deve rejeitar números negativos, zero, letras, expoentes e valores excessivos', () => {
    for (const [field, rule] of Object.entries(FIELD_LIMITS)) {
      for (const value of [-1, 0, '', 'abc', '70kg', '1e2', '+70', '0x10', '1/2', '1.2.3', '999999999999999999999999', NaN, Infinity, true, null, [], rule.max + 1]) {
        assert.throws(() => validateNumber(value, field), RangeError, `${field}: ${String(value)}`);
      }
    }
  });
  it('deve aceitar vírgula decimal sem aceitar casas extras ou decimais na idade', () => {
    assert.equal(validateNumber('70,5', 'peso'), 70.5);
    assert.throws(() => validateNumber('70.55', 'peso'), RangeError);
    assert.throws(() => validateNumber('30.5', 'idade'), RangeError);
    assert.throws(() => validateNumber('8.5', 'numeroRepeticoes'), RangeError);
    assert.throws(() => validateNumber(17, 'idade'), RangeError);
  });
});

describe('Proteção dos cálculos fora do formulário', () => {
  it('deve recusar as entradas enormes exibidas nas capturas e preservar cálculos válidos', () => {
    assert.throws(() => calc.calcularIMC(1234333333333333333, 175), RangeError);
    assert.throws(() => calc.calcularIMC(70, 45524323223333333333), RangeError);
    assert.throws(() => calc.calcularTaxaMetabolicaBasalPorMcArdle(70, 2000), RangeError);
    assert.equal(calc.calcularIMC('70.5', '175.5'), '22.89');
  });
  it('deve proteger as diferentes famílias de calculadoras contra valores fora dos limites', () => {
    const calls = [
      () => calc.calcularPesoIdealPorDevine(300, 'masculino'),
      () => calc.calcularCalorias(200, 70, 175, 'masculino', 'sedentario', 'harris-benedict', 20),
      () => calc.calcularProteinas(1000, 'sedentario'),
      () => calc.calcularQuantidadeAguaConsumida(1000),
      () => calc.calcularMassaCorporalMagraPorBoer(-70, 175, 'masculino'),
      () => calc.calcularPotencialMaximoMuscularPorCaseyButt(175, 400, 23, 10),
      () => calc.calcular1RepeticaoMaximaPorEpley(60, 11),
      () => calc.calcular1RepeticaoMaximaPorEpley(701, 8),
    ];
    for (const call of calls) assert.throws(call, RangeError);
  });
});

describe('Combinações incompatíveis com as fórmulas', () => {
  it('deve rejeitar combinações que gerem massa magra maior que o peso ou negativa', () => {
    assert.throws(() => calc.calcularMassaCorporalMagraPorBoer(10, 200, 'masculino'), RangeError);
    assert.throws(() => calc.calcularMassaCorporalMagraPorJames(635, 150, 'masculino'), RangeError);
  });
  it('deve rejeitar logaritmos inválidos e percentuais de gordura negativos', () => {
    assert.throws(() => calc.calcularNivelGorduraCorporal(175, 40, 30, 90, 'masculino'), RangeError);
    assert.throws(() => calc.calcularNivelGorduraCorporal(272, 40, 45, 90, 'masculino'), RangeError);
    assert.ok(Number(calc.calcularNivelGorduraCorporal(175, 38, 85, '', 'masculino')) > 0);
  });
  it('deve impedir estimativas de energia negativas e resultados desproporcionais', () => {
    assert.throws(() => calc.calcularTaxaMetabolicaBasalPorBenedict(122, 1, 50, 'masculino'), RangeError);
    assert.throws(() => calc.calcularTotalCaloriasPorDieta(400, 'perda-peso'), RangeError);
    assert.throws(() => calc.calcularIMC(635, 50), RangeError);
  });
});
