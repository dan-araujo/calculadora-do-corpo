import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile, stat } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import sharp from 'sharp';
import { calculators } from '../src/lib/site.mjs';

// Derivados de publicação: os PNGs originais permanecem intactos.
const destino = resolve('public/images/otimizadas');
await mkdir(destino, { recursive: true });
const manifestoPath = resolve(destino, 'manifesto.json');
const largurasAlvo = [240, 320, 480, 640, 960];
const compressao = { quality: 78, alphaQuality: 100, effort: 4 };
const versao = JSON.stringify({ pipeline: 'webp-v2', largurasAlvo, compressao });
let anterior = {};
try { anterior = JSON.parse(await readFile(manifestoPath, 'utf8')); } catch { /* Primeiro build. */ }
const fontes = new Set(calculators.map(item => `/images/${item.image}`));
for (const pagina of await readdir('src/pages')) {
  if (!pagina.endsWith('.js')) continue;
  const codigo = await readFile(resolve('src/pages', pagina), 'utf8');
  for (const match of codigo.matchAll(/image=["'](\/images\/[^"']+\.png)["']/g)) fontes.add(match[1]);
}
const manifesto = {};
const manifestoCliente = {};
let bytesOriginais = 0;
let bytes640 = 0;
sharp.concurrency(1);
for (const src of [...fontes].sort()) {
  const original = await readFile(resolve('public', `.${src}`));
  const hash = createHash('sha256').update(original).update(versao).digest('hex');
  const metadados = await sharp(original).metadata();
  const larguras = [...new Set([...largurasAlvo.filter(width => width <= metadados.width), Math.min(960, metadados.width)])].sort((a, b) => a - b);
  const variantes = [];
  for (const width of larguras) {
    const nome = `${basename(src, '.png')}-${width}.webp`;
    const arquivo = resolve(destino, nome);
    let existente;
    try { existente = await stat(arquivo); } catch { /* Nova variante. */ }
    const varianteAnterior = anterior[src]?.variantes.find(item => item.width === width);
    if (anterior[src]?.hash !== hash || !existente || existente.size !== varianteAnterior?.bytes) {
      const referencia = await sharp(original).resize({ width, withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const { width: largura, height, channels } = referencia.info;
      const webp = await sharp(referencia.data, { raw: { width: largura, height, channels } }).webp(compressao).toBuffer();
      const decodificado = await sharp(webp).ensureAlpha().raw().toBuffer();
      for (let i = 3; i < referencia.data.length; i += 4) {
        if (decodificado[i] !== referencia.data[i]) {
          throw new Error(`Compressão alterou a transparência: ${nome}`);
        }
      }
      await writeFile(arquivo, webp);
    }
    variantes.push({ src: `/images/otimizadas/${nome}`, width, bytes: (await stat(arquivo)).size });
  }
  manifesto[src] = { hash, width: metadados.width, height: metadados.height, bytes: original.length, variantes };
  manifestoCliente[src] = { width: metadados.width, height: metadados.height, base: `/images/otimizadas/${basename(src, '.png')}`, larguras };
  bytesOriginais += original.length;
  bytes640 += variantes.find(item => item.width === 640)?.bytes || variantes.at(-1).bytes;
}
await writeFile(manifestoPath, JSON.stringify(manifesto, null, 2) + '\n');
await writeFile(resolve(destino, 'manifesto-cliente.json'), JSON.stringify(manifestoCliente) + '\n');
console.log(`Imagens: ${fontes.size} originais preservados; WebP com transparência verificada. Total PNG ${(bytesOriginais / 1e6).toFixed(2)} MB → versões 640 px ${(bytes640 / 1e6).toFixed(2)} MB.`);
