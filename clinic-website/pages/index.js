import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'

export default function Home() {
  return (
    <>
      <Header />
      <Hero/>
      <div className={styles.container}>

        <main className={styles.main}>
          Setayesh Abouei
        </main>

      </div>
    </>
  )
}