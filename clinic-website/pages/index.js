import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clinic</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta   http-equiv="content-type"   content="text/html;charset=utf-8"  /> */}
      </Head>

      <main className={styles.main}>
          Setayesh Abouei
      </main>

    </div>
  )
}
