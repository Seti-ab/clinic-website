import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from './Footer.module.scss';
import Logo from '../../assets/icons/ClinicVertical.svg';
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
                        <Link href='/our-team'>
                            <a>تیم ما</a>
                        </Link>

                    </li>
                    <li>
                        <Link href='/our-projects'>
                            <a>پروژه‌های ما</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/contact-us'>
                            <a>تماس با ما</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/job-opportunities'>
                            <a>فرصت‌های شغلی</a>
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
                    <a href='https://instagram.com/bamdadtech?igshid=p5t5hajmnrk5' target='_blank' rel="noreferrer"><div className={style.instagram}></div></a>
                    <a href='https://www.linkedin.com/company/bamdad-tech' target='_blank' rel="noreferrer"><div className={style.linkedin}></div></a>
                    <a href='https://twitter.com/BamdadTech?s=08' target='_blank' rel="noreferrer"><div className={style.twitter}></div></a>
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
