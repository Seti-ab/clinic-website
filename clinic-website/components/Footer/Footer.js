import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from './Footer.module.scss';
import Logo from '../../assets/icons/FooterLogo.svg';
import {Information} from '../../public/text';

const Footer = () => {
    return <footer className={style.Footer}>
        <div>
            <div className={style.Right}>
                <ul>
                    <li>
                        <Link href='/'>
                            <a>صفحه‌اصلی</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/workshops'>
                            <a>کارگاه‌های آموزشی</a>
                        </Link>

                    </li>
                    <li>
                        <Link href='/colleagues'>
                            <a>رزومه‌ی همکاران</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/contact-us'>
                            <a>تماس با ما</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/about-us'>
                            <a>درباره ما</a>
                        </Link>
                    </li>
                </ul>

            </div>

            <div className={style.Middle}>
                <div className={style.Image}>
                    <Image
                        src={Logo.src}
                        alt='Clinic'
                        width={150}
                        height={150}
                    />
                </div>
                <div className={style.Icons}>
                    <a href='https://www.instagram.com/seti_ab/' target='_blank' rel="noreferrer"><div className={style.instagram}></div></a>
                    <a href='https://www.linkedin.com/in/setayesh-abouei-57a987226/' target='_blank' rel="noreferrer"><div className={style.linkedin}></div></a>
                    <a href='https://twitter.com/Seti_ab' target='_blank' rel="noreferrer"><div className={style.twitter}></div></a>
                </div>
            </div>
            <div className={style.Left}>
                <div>
                    <div className={style.LocationContainer}>
                        <div className={style.Icon + ' ' + style.location}></div>
                        <p>{Information.Address}</p>
                    </div>
                    <div>
                        <div className={style.Icon + ' '+ style.phone}></div>
                        <p>{Information.PhoneNumber}</p>
                    </div>
                    <div>
                        <div className={ style.Icon + ' ' + style.email}></div>
                        <p>{Information.Email}</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>;
};

export default Footer;
