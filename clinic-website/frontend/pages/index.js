
import Link from 'next/link';
import styles from '../styles/Home.module.scss'
import ContentContainer from '../components/ContentContainer/ContentContainer'
import Workshop from '../components/Workshop/Workshop'
import { workshopsInfo } from '../public/data';
import Button from '../components/UI/Button/Button';
import Gallery from '../components/Gallery/Gallery'
export default function Home() {
  return (
    <>
      <div className='container'>
        <ContentContainer Title='چرا باید به روانشناس مراجعه کنیم؟' UnderLine>
          <p className={styles.Description}>
            سلامت روان باید به همان اندازه اهمیت داشته باشد که سلامت جسم مهم است. زیرا بدون روح و روان سالم، سلامت و کارایی جسمی ما نیز کاهش پیدا خواهد کرد. مراجعه به روانشناس می تواند به سلامت روان ما کمک کند. همه ما انسان ها در زندگی خود بحران ها و احساساتی را تجربه می کنیم که به تنهایی قادر به حل کردن آن ها نیستیم. حضور یک مشاور روانشناس در زندگی ما، به بهبود احساس و عملکردمان در تمامی زمینه ها کمک خواهد کرد.
          </p>
        </ContentContainer>
        <ContentContainer Title='کارگاه آموزشی پرطرفدار '>
          <Workshop
            Title={workshopsInfo[0].Title}
            Lecturer={workshopsInfo[0].Lecturer}
            Price={workshopsInfo[0].Price}
            Date={workshopsInfo[0].Date}
            Time={workshopsInfo[0].Time}
            Link={workshopsInfo[0].Link + '#description'}
            Border>
          </Workshop>
        </ContentContainer>
        <Link href='/workshops'>
          <a className={styles.MoreWorkshops}>
            <Button Type='button'>همه‌ی کارگاه‌ها</Button>
          </a>
        </Link>

        <ContentContainer Title="انواع اختلال‌ شخصیت" UnderLine>
          <Gallery />
        </ContentContainer>

      </div>
    </>
  )
}