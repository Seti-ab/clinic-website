import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Workshops.module.scss';
import {BsArrowLeft} from 'react-icons/bs'

const Workshops = (props) => {
    return <div className={styles.Workshops}>
        <div className={styles.Text}>
           <h2>{props.Info.Title}</h2>
            <div className={styles.Content}>
                {props.children}
                <ul>
                    <li><p>مدرس: </p>{props.Info.Lecturer}</li>
                    <li><p> مدت زمان: </p>{props.Info.Time}</li>
                    <li><p> تاریخ: </p>{props.Info.Date}</li>
                    <li><p> قیمت: </p>{props.Info.Price} تومان </li>
                    {props.Info.Special && <li className={styles.Special}>*{props.Info.Special}</li>}
                </ul>
            </div>
            {props.Link &&
                <Link href={props.Link} >
                    <a>توضیحات بیشتر
                        <div>
                            <BsArrowLeft/>
                        </div>
                    </a>
                </Link>
            }
        </div>
        <div className={styles.Image}>
            <Image
                src={require(`../../assets/images/workshops/${props.Info.Image}`)}
                alt={props.Title}
                width={450}
                height={330}
            />
        </div>
    </div>;
};

export default Workshops;
