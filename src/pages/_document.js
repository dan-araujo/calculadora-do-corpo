import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR" data-scroll-behavior="smooth">
                <Head>
                    <link rel="icon" href="/favicon.png?v=2" type="image/png" sizes="32x32" />
                    <link rel="icon" href="/images/logo.svg?v=2" type="image/svg+xml" sizes="any" />
                    <link rel="shortcut icon" href="/favicon.ico?v=2" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
