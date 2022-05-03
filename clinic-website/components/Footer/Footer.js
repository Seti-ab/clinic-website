import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import Logo from '../../assets/icons/FooterLogo.svg';
import { Information } from '../../public/data';
import { BsTelegram, BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { MdLocationOn, MdPhoneEnabled, MdEmail } from 'react-icons/md';
import { navItems } from '../../public/data';
import {AiOutlineCopyright} from 'react-icons/ai';

const Footer = () => {
    return <footer className={styles.Footer}>
        <div>
            <div className={styles.Right}>
                <ul>
                    {navItems.map(item => {
                        return <li key={item.id}>
                            <Link href={item.link}>
                                <a>{item.title}</a>
                            </Link>
                        </li>
                    })}
                </ul>

            </div>

            <div className={styles.Middle}>
                <div className={styles.Image}>
                    <Image
                        src={Logo.src}
                        alt='Clinic'
                        width={200}
                        height={200}
                    />
                </div>
                <div className={styles.Icons}>
                    <a href='https://www.instagram.com/seti_ab/' target='_blank' rel="noreferrer"><BsInstagram /></a>
                    <a href='https://t.me/seti_ab' target='_blank' rel="noreferrer"><BsTelegram /></a>
                    <a href='https://wa.me/+989908833012' target='_blank' rel="noreferrer"><BsWhatsapp /></a>
                </div>
            </div>
            <div className={styles.Left}>
                <div>
                    <div className={styles.LocationContainer}>
                        <div className={styles.Icon + ' ' + styles.LocationIcon}><MdLocationOn /></div>
                        <p>{Information.Address}</p>
                    </div>
                    <div>
                        <div className={styles.Icon}><MdPhoneEnabled /></div>
                        <p>{Information.PhoneNumber}</p>
                    </div>
                    <div>
                        <div className={styles.Icon}><MdEmail /></div>
                        <p>{Information.Email}</p>
                    </div>
                </div>
            </div>
        </div>
        <p className={styles.CopyRight}>
          ۱۴۰۱<AiOutlineCopyright /> طراحی و توسعه توسط <b>ستایش ابوئی</b>
        </p>
    </footer>;
};

export default Footer;
