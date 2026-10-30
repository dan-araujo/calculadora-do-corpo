import manifesto from '../../public/images/otimizadas/manifesto-cliente.json';

export default function ImagemOtimizada({ src, sizes, alt = '', width, height, loading = 'lazy', ...props }) {
  const imagem = manifesto[src];
  const larguraPadrao = imagem?.larguras.find(largura => largura >= 480) ?? imagem?.larguras.at(-1);
  return <img {...props} src={imagem ? `${imagem.base}-${larguraPadrao}.webp` : src}
    srcSet={imagem?.larguras.map(largura => `${imagem.base}-${largura}.webp ${largura}w`).join(', ')}
    sizes={sizes} alt={alt} width={imagem?.width ?? width} height={imagem?.height ?? height}
    loading={loading} decoding="async" />;
}
