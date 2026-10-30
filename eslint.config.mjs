import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  { rules: { 'react/no-unescaped-entities': 'off' } },
  {
    files: ['src/components/imagem-otimizada.js', 'src/components/menu-navegacao.js'],
    rules: { '@next/next/no-img-element': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'node_modules/**']),
]);
