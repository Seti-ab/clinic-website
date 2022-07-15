import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Workshop.module.scss';
import Cookies from 'js-cookie';
import Button from '../UI/Button/Button';

const Workshop = (props) => {
    const [token, setToken] = useState();
    const [confirmationModal, setConfirmationModal] = useState(false);

    useEffect(() => {
        setToken(Cookies.get("token"))
    }, [])

    const confirmedHandler = () => {
        props.deleteWorkshopHandler();
        setConfirmationModal(false);
    }

    return (
        <Fragment>
            {confirmationModal && <div className={styles.DeleteConfirmation}>
                <div className={styles.Backdrop} onClick={() => setConfirmationModal(false)}></div>
                <div className={styles.DeleteBox}>
                    <div className={styles.Close} onClick={() => setConfirmationModal(false)}><i></i></div>
                    <p>آیا از حذف این کارگاه اطمینان دارید؟</p>
                    <div>
                        <Button Clicked={() => setConfirmationModal(false)} Cancel>انصراف</Button>
                        <Button Clicked={() => confirmedHandler()}>تائید</Button>
                    </div>
                </div>
            </div>}
            <div className={styles.Workshop + ' ' + (props.Border && styles.Border)}>
                <div className={styles.Text}>
                    <h2>{props.Title}</h2>
                    <div className={styles.Content}>
                        {props.children}
                        <ul>
                            {props.Lecturer && <li><p><i className={styles.Lecturer}></i>مدرس: </p><span>{props.Lecturer}</span></li>}
                            {props.Time && <li><p><i className={styles.Time}></i>مدت زمان: </p><span>{props.Time}<sub>ساعت</sub></span></li>}
                            <li><p><i className={styles.Calender}></i>تاریخ: </p><span>{props.Date}</span></li>
                            {props.Price && <li><p><i className={styles.Price}></i>هزینه: </p><span>{props.Price}<sub>تومان</sub></span></li>}
                            {props.Special && <li className={styles.Special}>*{props.Special}</li>}
                        </ul>
                    </div>
                    {props.Link &&
                        <Link href={'/workshops/' + props.Link}>
                            <a>توضیحات بیشتر
                                <i className={styles.Arrow}></i>
                            </a>
                        </Link>
                    }
                </div>
                <div className={styles.Image}>
                    {props.Image?.type ?
                        props.Image
                        :
                        <Image
                            src={`/images/workshops/${props.Image ? props.Image : 'default.jpg'}`}
                            alt={props.Title}
                            width={450}
                            height={330}
                        />}
                </div>

                {token && props.deleteWorkshopHandler && <div className={styles.Delete} onClick={() => setConfirmationModal(true)}><i></i></div>}
            </div>
        </Fragment>
    )
};

export default Workshop;
