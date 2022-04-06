import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from './Hero.module.scss';

const HeroContent = [
    {
        ID: 'home',
        image: 'HomePage.svg',
        text: 'کلینیـک روانشـناسی سایه',
        subText: 'مجموعه‌ی آموزشی ، پژوهشی ، درمانی'
    },
    {
        ID: 'workshops',
        image: 'workshops.svg',
        text: 'کـارگاه‌های آمـوزشی'
    },
    {
        ID: 'colleagues',
        image: 'colleagues.svg',
        text: 'رزومـه‌ی همـکاران'
    },
    {
        ID: 'contact-us',
        image: 'contactUs.svg',
        text: 'تـمـاس بـا مـا'
    },
    {
        ID: 'about-us',
        image: 'aboutUs.svg',
        text: 'دربـاره‌ی ما'
    }
]


const Hero = () => {
    const router = useRouter(null);

    const heroContentHandler = () => {
        let content = HeroContent.find(content => content.ID.includes(router.pathname));

        if (router.pathname === '/') {
            content = HeroContent.find(content => content.ID === 'home');
        }
        else {
            content = HeroContent.find(content => router.pathname.includes(content.ID));
        }
        return content;
    }

    return <div className={styles.Hero}>

        <div className={styles.HeroOval}></div>
        <div className={styles.HeroContent}>
            <div className={styles.Line}></div>
            <h1>{heroContentHandler()?.text}</h1>
            <h5>{heroContentHandler()?.subText}</h5>
            {/* <div className={styles.Line}></div> */}
        </div>
        <div className={styles.Image}>
            {heroContentHandler() &&
                <Image
                    src={require(`../../assets/images/Hero/${heroContentHandler().image}`)}
                    alt='Setayesh Clinic'
                    layout='fill'
                />
            }
        </div>
    </div>;
};

export default Hero;
