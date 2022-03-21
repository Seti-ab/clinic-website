import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import style from './Hero.module.scss';

const HeroContent = [
    {
        id: 'home',
        image: 'HomePage.svg',
        text: 'کلینیک ستایش'
    },
    {
        id: 'our-projects',
        image: 'ourProjects.jpg',
        text: 'پـروژه‌هـای مـا'
    },
    {
        id: 'our-team',
        image: 'ourTeam.jpg',
        text: 'تیــــم مـا'
    },
    {
        id: 'contact-us',
        image: 'contactUs.jpeg',
        text: 'تـمـاس بـا مـا'
    },
    {
        id: 'job-opportunities',
        image: 'jobs.jpg',
        text: 'فـرصت‌هـای شغـلی'
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

        <div className={style.HeroContent}>
            
        </div>
        <div className={style.Image}>
                {heroContentHandler() &&
                    <Image
                        src={require(`../../assets/images/Hero/${heroContentHandler().image}`)}
                        alt='Setayesh Clinic'
                        width={600}
                        height={600}
                    />
                }
            </div>
    </div>;
};

export default Hero;
