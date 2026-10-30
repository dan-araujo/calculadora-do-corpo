// Limites operacionais de entrada, não faixas saudáveis nem validação clínica.
// Tetos de peso/altura/idade orientados pelos registros do Guinness:
// https://www.guinnessworldrecords.com/world-records/heaviest-man
// https://www.guinnessworldrecords.com/world-records/tallest-man-living
// https://www.guinnessworldrecords.com/world-records/oldest-person-
// As circunferências e a carga têm limites amplos próprios desta aplicação.
export const FIELD_LIMITS = {
  peso: { label: 'Peso', min: 1, max: 635, decimals: 1 },
  altura: { label: 'Altura', min: 50, max: 272, decimals: 1 },
  idade: { label: 'Idade', min: 18, max: 122, decimals: 0 },
  pescoco: { label: 'Pescoço', min: 10, max: 100, decimals: 1 },
  cintura: { label: 'Cintura', min: 20, max: 350, decimals: 1 },
  quadril: { label: 'Quadril', min: 20, max: 350, decimals: 1 },
  pulso: { label: 'Pulso', min: 5, max: 40, decimals: 1 },
  tornozelo: { label: 'Tornozelo', min: 5, max: 80, decimals: 1 },
  gorduraCorporal: { label: 'Gordura corporal', min: 0.1, max: 80, decimals: 1 },
  pesoLevantado: { label: 'Carga levantada', min: 0.1, max: 700, decimals: 1 },
  numeroRepeticoes: { label: 'Repetições', min: 1, max: 10, decimals: 0 },
};

export function validateNumber(value, field) {
  const rule = FIELD_LIMITS[field];
  if (!rule) throw new Error(`Campo numérico desconhecido: ${field}`);
  const raw = String(value).trim().replace(',', '.');
  const pattern = rule.decimals ? /^\d+(?:\.\d)?$/ : /^\d+$/;
  if ((typeof value !== 'string' && typeof value !== 'number') || !pattern.test(raw)) {
    throw new RangeError(`${rule.label}: informe somente números positivos${rule.decimals ? ', com no máximo uma casa decimal' : ' inteiros'}.`);
  }
  const number = Number(raw);
  if (!Number.isFinite(number) || number < rule.min || number > rule.max) {
    throw new RangeError(`${rule.label}: informe um valor de ${rule.min.toLocaleString('pt-BR')} a ${rule.max.toLocaleString('pt-BR')}.`);
  }
  return number;
}

export function numberError(value, field) {
  try { validateNumber(value, field); return ''; }
  catch (error) { return error.message; }
}

export function validateChoice(value, choices) {
  if (!choices.includes(value)) throw new RangeError('Selecione uma opção válida para o cálculo.');
}

export function validateResult(value, { min = 0, max = 20000, allowZero = false } = {}) {
  const values = Array.isArray(value) ? value : [value];
  for (const item of values) {
    const number = Number(item);
    if (!Number.isFinite(number) || number < min || (!allowZero && number === 0) || number > max) {
      throw new RangeError('As medidas informadas estão fora da faixa de aplicação desta fórmula. Confira os dados ou procure uma avaliação individual.');
    }
  }
  return value;
}
