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
                    {props.Lecturer&&<li><p><IoMdPerson />مدرس: </p><span>{props.Lecturer}</span></li>}
                    {props.Time && <li><p><IoIosTime />مدت زمان: </p><span>{props.Time}</span></li>}
                    <li><p><IoMdCalendar />تاریخ: </p><span>{props.Date}</span></li>
                    {props.Price && <li><p><IoIosPricetags />قیمت: </p><span>{props.Price} <sub>تومان</sub> </span></li>}
                    {props.Special && <li className={styles.Special}>*{props.Special}</li>}
                </ul>
            </div>
            {props.Link &&
                <Link href={'/workshops/'+ props.Link}>
                    <a>توضیحات بیشتر
                        <div>
                            <BsArrowLeft />
                        </div>
                    </a>
                </Link>
            }
        </div>
        <div className={styles.Image}>
            {props.Image !== 'fileUpload' &&
                <Image
                    src={`/images/workshops/${props.Image ? props.Image : 'default.jpg'}`}
                    alt={props.Title}
                    width={450}
                    height={330}
                />}
        </div>
    </div>;
};

export default Workshop;
