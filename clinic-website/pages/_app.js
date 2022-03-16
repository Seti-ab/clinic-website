import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Clinic</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta   http-equiv="content-type"   content="text/html;charset=utf-8"  /> */}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
