import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.scss'
import ContentContainer from '../components/ContentContainer/ContentContainer'
import Workshop from '../components/Workshop/Workshop'
import Button from '../components/UI/Button/Button';
import Gallery from '../components/Gallery/Gallery'
import axios from 'axios';

export default function Home() {
  const [workshop, setWorkshop] = useState();
  useEffect(() => {
    axios.get('http://localhost:4500/workshop/getall')
    .then(response=>{
      console.log("response",response.data.workshops[0]);
      setWorkshop(response.data.workshops[0])
    }).catch(error=>{
      console.log("error",error);
    })
  }, [])
  
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
            Title={workshop?.Title}
            Lecturer={workshop?.Lecturer.Name}
            Price={workshop?.Price}
            Date={workshop?.Date}
            Time={workshop?.Time}
            Link={workshop?.Link + '#description'}
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