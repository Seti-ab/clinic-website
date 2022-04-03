import Head from 'next/head'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Clinic</title>
        <link rel="icon" href="/favicon.ico" />
        <meta   http-equiv="content-type"   content="text/html;charset=utf-8"  />
      </Head>
      <Header/>
      <Hero/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}

export default MyApp
