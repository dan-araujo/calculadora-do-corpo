export const calculators = [
  { slug: 'imc', title: 'Índice de Massa Corporal', short: 'IMC', image: 'imc.png', description: 'Calcule o IMC a partir do peso e da altura e entenda as limitações desse indicador.' },
  { slug: 'peso-ideal', title: 'Peso ideal', image: 'balanca.png', description: 'Compare estimativas de peso por diferentes fórmulas e conheça suas limitações.' },
  { slug: 'calorias', title: 'Calorias', image: 'calorias.png', description: 'Estime o gasto energético diário considerando suas medidas e seu nível de atividade.' },
  { slug: 'tmb', title: 'Taxa Metabólica Basal', short: 'Metabolismo basal', image: 'tmb2.png', description: 'Estime a energia utilizada pelo organismo em repouso e conheça as fórmulas de TMB.' },
  { slug: 'gordura-corporal', title: 'Gordura corporal', image: 'gordura-corporal.png', description: 'Estime o percentual de gordura corporal a partir de medidas antropométricas.' },
  { slug: 'potencial-maximo-muscular', title: 'Potencial muscular', image: 'maximo-potencial-muscular.png', description: 'Explore modelos teóricos de potencial muscular, sem tratar a estimativa como um limite individual.' },
  { slug: 'repeticao-maxima', title: 'Repetição máxima (1RM)', image: '1rm.png', description: 'Estime sua repetição máxima e compare cargas de treino por diferentes fórmulas.' },
  { slug: 'massa-corporal-magra', title: 'Massa corporal magra', image: 'massa-corporal-magra.png', description: 'Compare estimativas de massa corporal magra a partir de peso, altura e sexo.' },
  { slug: 'carboidratos', title: 'Carboidratos', image: 'carboidratos2.png', description: 'Explore uma faixa estimada de carboidratos com base na energia diária.' },
  { slug: 'proteinas', title: 'Proteínas', image: 'proteinas2.png', description: 'Estime a ingestão de proteínas em função do peso e do tipo de atividade física.' },
  { slug: 'gorduras-saudaveis', title: 'Gorduras totais', image: 'gorduras2.png', description: 'Estime uma faixa de gorduras totais e conheça as diferentes fontes alimentares.' },
  { slug: 'consumo-agua', title: 'Consumo de água', image: 'agua.png', description: 'Estime o consumo diário de água com 35 ml por kg e entenda a hidratação no exercício.' },
];

export function getSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL) {
  if (!value) return '';
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('NEXT_PUBLIC_SITE_URL deve conter apenas a origem, como https://seu-site.vercel.app.');
  }
  return url.origin;
}

export const pageMetadata = {
  '/': { title: 'Calculadora do Corpo — saúde e nutrição', description: 'Calculadoras gratuitas de IMC, água, calorias, proteínas e composição corporal. Entenda seus resultados e as limitações de cada estimativa.' },
  ...Object.fromEntries(calculators.map(item => [`/${item.slug}`, { title: `${item.title} | Calculadora do Corpo`, description: item.description }])),
  '/privacidade': { title: 'Privacidade | Calculadora do Corpo', description: 'Entenda como os cálculos e as preferências de medição de visitas funcionam neste site.' },
};
