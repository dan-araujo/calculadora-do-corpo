# Calculadora do Corpo

Ferramentas gratuitas para explorar estimativas de saúde, nutrição e atividade física, com explicações, fórmulas, referências e limitações dos resultados.

**Acesse:** [calculadora-do-corpo.vercel.app](https://calculadora-do-corpo.vercel.app/)

## Calculadoras disponíveis

- Índice de Massa Corporal (IMC) e peso ideal.
- Calorias e taxa metabólica basal.
- Gordura corporal, massa corporal magra e potencial muscular.
- Proteínas, carboidratos e gorduras na alimentação.
- Consumo de água.
- Repetição máxima (1RM).

As ferramentas têm finalidade educativa e são voltadas a adultos. Os resultados são estimativas e não substituem uma avaliação profissional individual.

## Tecnologias e funcionamento

Next.js com Pages Router, React, Tailwind CSS e estilos próprios. O site usa exportação estática, com arquivos de publicação em `out/`. Os cálculos acontecem no navegador, sem API ou banco de dados para os valores preenchidos.

Os testes usam o executor nativo do Node.js, e a análise de código usa ESLint.

## Executar localmente

Use Node.js 24, conforme indicado em `.nvmrc`, e npm. Na raiz do repositório:

```sh
npm ci
npm run dev
```

Abra [localhost:3000](http://localhost:3000).

Para conferir a versão de produção:

```sh
npm run build
npm start
```

O comando `npm start` serve a pasta `out/` apenas em localhost para conferência. A hospedagem publica os arquivos estáticos dessa pasta.

## Configuração de ambiente

O `.env` versionado contém apenas configurações públicas:

| Variável | Valor atual | Finalidade |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://calculadora-do-corpo.vercel.app` | Endereço usado no sitemap, nos links canônicos e nas tags de compartilhamento. |
| `NEXT_PUBLIC_GA_ID` | `G-149FNMZ1PQ` | Identificador público do Google Analytics. Um valor vazio desativa a medição. |

O Next.js lê o `.env` no desenvolvimento e no build. Variáveis do provedor de hospedagem têm prioridade. Para substituições locais, use `.env.local`, ignorado pelo Git. Mudanças nessas configurações exigem um novo build.

## SEO e compartilhamento

- Cada calculadora tem título e descrição próprios.
- O build gera `sitemap.xml` e `robots.txt` a partir do endereço configurado.
- As páginas usam links canônicos e tags Open Graph e de cartão de compartilhamento.
- A imagem de compartilhamento é `public/og-image.png`, com 1200 × 630 pixels. A versão editável está em `public/og-image.svg`.
- A verificação do Search Console usa `public/google44a77c48e159d4e0.html`. Mantenha esse arquivo nas publicações.

Sem `NEXT_PUBLIC_SITE_URL`, o build avisa e não gera sitemap nem links canônicos. Ao mudar de domínio, atualize essa variável, a imagem de compartilhamento e os cadastros nos serviços do Google.

## Privacidade

O Analytics é opcional e carrega após o aceite dos cookies. O visitante pode alterar a escolha em **Preferências de cookies**, no rodapé.

O código do site não envia peso, idade, medidas corporais ou resultados ao Analytics. Não acrescente esses valores a eventos, URLs ou dimensões. A página `/privacidade/` explica o funcionamento dos cálculos e da análise de uso.

## Publicação na Vercel

1. Selecione como pasta raiz aquela que contém este `package.json`.
2. Use Node.js 24, comando de build `npm run build` e diretório de saída `out`.
3. Em Production, confira os dois valores de ambiente listados acima. O `.env` já os fornece quando não há substituições no painel.
4. Em Preview e Development, defina `NEXT_PUBLIC_GA_ID` vazio para não misturar testes com acessos reais.
5. Após publicar, confira as calculadoras, `/sitemap.xml`, `/robots.txt` e o arquivo de verificação do Google. No Search Console, cadastre o site como **Prefixo do URL** e envie `sitemap.xml`.

## Verificações

```sh
npm run lint
npm test
npm run build
npm audit
```

O workflow do GitHub executa as verificações do projeto. O Dependabot acompanha atualizações de dependências.

## Organização do código

| Caminho | Conteúdo |
| --- | --- |
| `src/pages/` | Páginas e calculadoras. |
| `src/components/` | Navegação, rodapé, metadados, Analytics e componentes compartilhados. |
| `src/lib/` | Funções de cálculo e configurações do site. |
| `src/app/globals.css` | Estilos globais. |
| `public/` | Imagens e arquivos públicos. |
| `scripts/` | Geração de SEO e servidor de conferência local. |
| `tests/` | Testes automatizados. |
