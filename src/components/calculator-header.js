import Image from 'next/image';

export default function CalculatorHeader({ title, image }) {
  return <div className="cabecalho-calculadora">
    <h1>{title}</h1>
    <Image src={image} alt="" width={320} height={200} loading="eager"
      sizes="(max-width: 480px) 220px, 280px" className="ilustracao-calculadora" />
  </div>;
}
