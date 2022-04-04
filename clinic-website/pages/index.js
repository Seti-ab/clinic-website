
import styles from '../styles/Home.module.scss'
import ContentContainer from '../components/ContentContainer/ContentContainer'
import Workshops from '../components/Workshops/Workshops'

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <ContentContainer Title='چرا باید به روانشناس مراجعه کنیم؟' UnderLine>
          <p>
            سلامت روان باید به همان اندازه اهمیت داشته باشد که سلامت جسم مهم است. زیرا بدون روح و روان سالم، سلامت و کارایی جسمی ما نیز کاهش پیدا خواهد کرد. مراجعه به روانشناس می تواند به سلامت روان ما کمک کند. همه ما انسان ها در زندگی خود بحران ها و احساساتی را تجربه می کنیم که به تنهایی قادر به حل کردن آن ها نیستیم. حضور یک مشاور روانشناس در زندگی ما، به بهبود احساس و عملکردمان در تمامی زمینه ها کمک خواهد کرد.
          </p>
        </ContentContainer>
        <ContentContainer Title='کارگاه آموزشی پرطرفدار '>
          <Workshops
            Title='کارگاه زوج درمانی هیجان مدار'
            Image='couple-eft.jpg'
            Link='/workshops/'
            Lecturer='جناب آقای دکتر مهدی ضامنی'
            Time='۲۴ ساعت'
            Date='پنجشنبه ها ساعت ۸ الی ۱۲ از ۱ تیرماه ۱۴۰۱'
            Price='۱,۵۰۰,۰۰۰'
          />
        </ContentContainer>
      </div>
    </>
  )
}