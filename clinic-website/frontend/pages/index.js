import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.scss'
import ContentContainer from '../components/ContentContainer/ContentContainer'
import Workshop from '../components/Workshop/Workshop'
import Button from '../components/UI/Button/Button';
import Gallery from '../components/Gallery/Gallery'
import axios from 'axios';
import { toPersianNumber } from '../helpers/action';
import { IoIosArrowDown } from 'react-icons/io';

export default function Home() {
  const [workshop, setWorkshop] = useState();
  const [contentShow, setContentShow] = useState([false]);

  useEffect(() => {
    axios.get('http://localhost:4500/workshop/getall')
      .then(response => {
        //console.log("response", response.data.workshops[0]);
        setWorkshop(response.data.workshops[0])
      }).catch(error => {
        //console.log("error", error);
      })
  }, [])

  const content = [
    {
      title: 'اختلال‌های روانی و استرس‌های شدید',
      text: 'برای درمان اختلال‌هایی مانند اختلال شخصیت مرزی، اختلال دو قطبی، اختلال شخصیت نمایشی حتما باید به دکتر روانشناس مراجعه شود چراکه اگر این اختلالات به حال خود رها شوند و درمانی برای آنها صورت نگیرد، زندگی فرد را به طور کلی تحت تاثیر قرا می‌دهند و شخص را به شدت آسیب‌پذیر می‌کنند در چنین مواقعی کمک گرفتن از یک روانشناس خوب می‌تواند تغییر زیادی در شرایط روحی و روانی فرد ایجاد کند. مورد دیگری که امروزه افراد زیادی با آن روبه‌رو هستند استرس و فشار‌های روانی است که در مواقعی که شدت آنها افزایش می‌یابد زندگی فرد را مختل می‌کند بنابراین لزوم مراجعه به روانشناس در این مواقع نیز بسیار حس می‌شود.'
    },
    {
      title: 'شناختن خویشتن',
      text: 'یکی دیگر از مواردی که از ما را ملزم به مراجعه به روانشناس می‌کند شناختن خویشتن است. از این جهت که در بسیاری از موارد ریشه‌ی مشکلات ما در عدم شناختمان از خود است. این عدم شناخت گاهی منجر به سردرگمی ما می‌شود و حتی باعث می‌شود زندگی برایمان بی‌معنی شود که این خود زمینه‌ساز بروز افسردگی است.'
    },
    {
      title: 'بهبود روابط زوجین',
      text: 'ازدواج را می‌توان مهم‌ترین تصمیم زندگی هر فردی دانست. آگاهی و دانش کافی در این زمینه می‌تواند کمک بزرگی در جلوگیری از مشکلات زوجین در آینده داشته باشد. به طور مثال مشاوره قبل از ازدواج به زوجین کمک می‌کند تا با آگاهی بیشتر و به دور از احساسات گذرا تصمیم بگیرند و یا مشاوره گرفتن در مورد مسائلی مانند ترس از ازدواج باعث می‌شود افراد بتوانند با درک و آگاهی بیشری اقدام به ازدواج کنند. زوج‌درمانی از دیگر مواری است که روانشناس به کمک زوجین می‌آید و در مسائل مختلفی به آنها مشاوره می‌دهد.'
    },

  ]
  const showContentsHandler = (i) => {
    let temp = [...contentShow];
    temp[i] = !temp[i];
    setContentShow(temp);
    console.log(i);
  }
  return (
    <>
      <div className='container'>
        <ContentContainer Title='چرا باید به روانشناس مراجعه کنیم؟' UnderLine>
          <div className={styles.Description}>
            سلامت روان باید به همان اندازه اهمیت داشته باشد که سلامت جسم مهم است. زیرا بدون روح و روان سالم، سلامت و کارایی جسمی ما نیز کاهش پیدا خواهد کرد. مراجعه به روانشناس می تواند به سلامت روان ما کمک کند. همه ما انسان ها در زندگی خود بحران ها و احساساتی را تجربه می کنیم که به تنهایی قادر به حل کردن آن ها نیستیم. حضور یک مشاور روانشناس در زندگی ما، به بهبود احساس و عملکردمان در تمامی زمینه ها کمک خواهد کرد.
            {content.map((post, index) => {
              return (
                <div key={index} className={styles.Content +' '+ (contentShow[index] ? styles.ShowContent : styles.HideContent)}>
                  <h4 onClick={() => showContentsHandler(index)}>{post.title}<IoIosArrowDown/></h4>
                  <p>{post.text}</p>
                </div>
              )
            })}
          </div>


        </ContentContainer>
        {workshop &&
          <>
            <ContentContainer Title='کارگاه آموزشی پرطرفدار '>
              <Workshop
                Title={workshop?.title}
                Lecturer={workshop?.lecturer.name}
                Price={toPersianNumber(workshop?.price)}
                Date={toPersianNumber(workshop?.date)}
                Time={toPersianNumber(workshop?.time)}
                Link={workshop?.link + '#description'}
                Image={workshop?.image}
                Border>
              </Workshop>
            </ContentContainer>
            <Link href='/workshops'>
              <a className={styles.MoreWorkshops}>
                <Button Type='button'>همه‌ی کارگاه‌ها</Button>
              </a>
            </Link>
          </>
        }
        <ContentContainer Title="انواع اختلال‌ شخصیت" UnderLine>
          <Gallery />
        </ContentContainer>

      </div>
    </>
  )
}