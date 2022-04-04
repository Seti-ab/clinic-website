import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from './Footer.module.scss';
import Logo from '../../assets/icons/FooterLogo.svg';
import { Information } from '../../public/text';
import { BsTelegram, BsInstagram, BsWhatsapp } from 'react-icons/bs'
import { MdLocationOn, MdPhoneEnabled, MdEmail } from 'react-icons/md'
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
                        width={200}
                        height={200}
                    />
                </div>
                <div className={style.Icons}>
                    <a href='https://www.instagram.com/seti_ab/' target='_blank' rel="noreferrer"><BsInstagram /></a>
                    <a href='https://t.me/seti_ab' target='_blank' rel="noreferrer"><BsTelegram /></a>
                    <a href='https://wa.me/+989908833012' target='_blank' rel="noreferrer"><BsWhatsapp /></a>
                </div>
            </div>
            <div className={style.Left}>
                <div>
                    <div className={style.LocationContainer}>
                        <div className={style.Icon +' '+style.LocationIcon}><MdLocationOn /></div>
                        <p>{Information.Address}</p>
                    </div>
                    <div>
                        <div className={style.Icon}><MdPhoneEnabled /></div>
                        <p>{Information.PhoneNumber}</p>
                    </div>
                    <div>
                        <div className={style.Icon}><MdEmail/></div>
                        <p>{Information.Email}</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>;
};

export default Footer;
