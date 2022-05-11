import React from 'react';
import style from '../styles/AboutUsPage.module.scss'
import { Information } from '../public/data';
import { BsTelegram, BsInstagram, BsWhatsapp } from 'react-icons/bs';

const AboutUsPage = () => {
  return (
    <div className={style.AboutUsPage}>
      <div className={style.Information}>
      <div>
        <pre className={style.InfoTitle}>آدرس: </pre>
        <p>{Information.Address}</p>
      </div>
      <div>
        <pre className={style.InfoTitle}>تلفن تماس: </pre>
        <p>{Information.PhoneNumber}</p>
      </div>
      <div>
        <pre className={style.InfoTitle}>ایمیل: </pre>
        <p>{Information.Email}</p>
      </div>

      <div className={style.Icons}>
        {/* todo use next link  */}
        <a href='https://www.instagram.com/seti_ab/' target='_blank' rel="noreferrer"><BsInstagram /></a>
        <a href='https://t.me/seti_ab' target='_blank' rel="noreferrer"><BsTelegram /></a>
        <a href='https://wa.me/+989908833012' target='_blank' rel="noreferrer"><BsWhatsapp /></a>
      </div>
    </div>

      <div>
        <iframe
          className={style.Map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1619.0278316801089!2d51.33307952753807!3d35.74943659231106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dfd70e34cfb0f%3A0xbf9b4885b821ee4f!2sUniversity%20of%20Science%20and%20Culture!5e0!3m2!1sen!2s!4v1650021325020!5m2!1sen!2s"
          frameBorder="0"
          scrolling="no"
          allowFullScreen="">
        </iframe>
      </div>
    </div>
  )
}

export default AboutUsPage