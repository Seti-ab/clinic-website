import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Sayeh Clinic | کلینیک سایه</title>
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
      </Head>
      {router.pathname !== '/login' ?
        <>

          <Header />
          <Hero />
          <Component {...pageProps} />
          <Footer />
        </>
        : <Component {...pageProps} />
      }
    </>
  )
}

export default MyApp;
