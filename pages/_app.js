import "../assets/styles/index.scss";
import { AuthProvider } from "./../contexts/AuthContext"
import Head from 'next/head'
import favicon from "../favicon.ico"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>FarmBot</title>
        <link rel="shortcut icon" href={favicon} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <AuthProvider><Component {...pageProps} /></AuthProvider>
    </>
  );
}
