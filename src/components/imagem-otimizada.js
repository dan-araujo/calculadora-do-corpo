import Image from 'next/image';
import manifesto from '../../public/images/otimizadas/manifesto.json';

export default function ImagemOtimizada({ src, sizes, alt = '', ...props }) {
  const imagem = manifesto[src];
  return <picture>
    {imagem && <source type="image/webp" sizes={sizes}
      srcSet={imagem.variantes.map(item => `${item.src} ${item.width}w`).join(', ')} />}
    <Image {...props} src={src} sizes={sizes} alt={alt} />
  </picture>;
}
