import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from './Workshops.module.scss';
import {BsArrowLeft} from 'react-icons/bs'

const Workshops = (props) => {
    return <div className={style.Workshops}>
        <div className={style.Text}>
            {props.Title && <h2>{props.Title}</h2>}
            <div>
                <ul>
                    <li><p>مدرس: </p>{props.Lecturer}</li>
                    <li><p> مدت زمان: </p>{props.Time}</li>
                    <li><p> تاریخ: </p>{props.Date}</li>
                    <li><p> قیمت: </p>{props.Price} تومان </li>
                    {props.Special && <li className={style.Special}>{props.Special}</li>}
                </ul>
                {props.children}
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
        <div className={style.Image}>
            <Image
                src={require(`../../assets/images/workshops/${props.Image}`)}
                alt={props.Title}
                width={510}
                height={310}
            />
        </div>
    </div>;
};

export default Workshops;
