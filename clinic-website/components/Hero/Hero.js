import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import style from './Hero.module.scss';

const HeroContent = [
    {
        id: 'home',
        image: 'HomePage.svg',
        text: 'کلینیـک روانشـناسی ستایش',
        subText: 'مجموعه‌ی آموزشی ، پژوهشی ، درمانی'
    },
    {
        id: 'workshops',
        image: 'workshops.svg',
        text: 'کـارگاه‌های آمـوزشی'
    },
    {
        id: 'colleagues',
        image: 'colleagues.svg',
        text: 'رزومـه‌ی همـکاران'
    },
    {
        id: 'contact-us',
        image: 'contactUs.svg',
        text: 'تـمـاس بـا مـا'
    },
    {
        id: 'about-us',
        image: 'aboutUs.svg',
        text: 'دربـاره‌ی ما'
    }
]


const Hero = () => {
    const router = useRouter(null);

    const heroContentHandler = () => {
        let content = HeroContent.find(content => content.id.includes(router.pathname));

        if (router.pathname === '/') {
            content = HeroContent.find(content => content.id === 'home');
        }
        else {
            content = HeroContent.find(content => router.pathname.includes(content.id));
        }
        return content;
    }

    return <div className={style.Hero}>

        <div className={style.HeroOval}></div>
        <div className={style.HeroContent}>
            <div className={style.Line}></div>
            <h1>{heroContentHandler()?.text}</h1>
            <h5>{heroContentHandler()?.subText}</h5>
            {/* <div className={style.Line}></div> */}
        </div>
        <div className={style.Image}>
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
