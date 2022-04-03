import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import ContentContainer from '../components/ContentContainer/ContentContainer'

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <ContentContainer Title='چرا باید به روانشناس مراجعه کنیم؟'>
          <p>
            سلامت روان باید به همان اندازه اهمیت داشته باشد که سلامت جسم مهم است. زیرا بدون روح و روان سالم، سلامت و کارایی جسمی ما نیز کاهش پیدا خواهد کرد. مراجعه به روانشناس می تواند به سلامت روان ما کمک کند. همه ما انسان ها در زندگی خود بحران ها و احساساتی را تجربه می کنیم که به تنهایی قادر به حل کردن آن ها نیستیم. حضور یک مشاور روانشناس در زندگی ما، به بهبود احساس و عملکردمان در تمامی زمینه ها کمک خواهد کرد.
          </p>
        </ContentContainer>
      </div>
    </>
  )
}