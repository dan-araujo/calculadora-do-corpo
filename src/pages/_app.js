
import Head from 'next/head';
import '../app/globals.css'
import MenuNavegacao from './menu-navegacao';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600&family=Jost&family=Montserrat:wght@200;300&display=swap" rel="stylesheet" />
            </Head>
            <MenuNavegacao />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;