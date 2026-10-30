import '../app/globals.css';
import MenuNavegacao from '../components/menu-navegacao';
import Seo from '../components/seo';
import Analytics from '../components/analytics';
import Footer from '../components/footer';

export default function MyApp({ Component, pageProps }) {
  return <>
    <Seo />
    <a className="atalho-conteudo" href="#conteudo">Ir para o conteúdo</a>
    <MenuNavegacao />
    <div id="conteudo" tabIndex={-1}><Component {...pageProps} /></div>
    <Footer />
    <Analytics />
  </>;
}
