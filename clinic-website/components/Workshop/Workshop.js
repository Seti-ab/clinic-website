import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Workshop.module.scss';
import { BsArrowLeft } from 'react-icons/bs'
import { IoIosPricetags, IoIosTime, IoMdCalendar, IoMdPerson } from 'react-icons/io';

const Workshop = (props) => {
    return <div className={styles.Workshop + ' ' + (props.Border && styles.Border)}>
        <div className={styles.Text}>
            <h2>{props.Title}</h2>
            <div className={styles.Content}>
                {props.children}
                <ul>
                    <li><p><IoMdPerson />مدرس: </p><span>{props.Info.Lecturer}</span></li>
                    <li><p><IoIosTime />مدت زمان: </p><span>{props.Info.Time}</span></li>
                    <li><p><IoMdCalendar />تاریخ: </p><span>{props.Info.Date}</span></li>
                    <li><p><IoIosPricetags />قیمت: </p><span>{props.Info.Price} تومان </span></li>
                    {props.Info.Special && <li className={styles.Special}>*{props.Info.Special}</li>}
                </ul>
            </div>
            {props.Link &&
                <Link href={props.Link} >
                    <a>توضیحات بیشتر
                        <div>
                            <BsArrowLeft />
                        </div>
                    </a>
                </Link>
            }
        </div>
        <div className={styles.Image}>
            <Image
                src={`/images/workshops/${props.Info.Image}`}
                alt={props.Title}
                width={450}
                height={330}
            />
        </div>
    </div>;
};

export default Workshop;
