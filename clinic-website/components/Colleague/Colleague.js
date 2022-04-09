import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Colleague.module.scss';
import { FiMoreHorizontal } from 'react-icons/fi';
function Colleague(props) {
    return (
        <div className={styles.Colleague} key={props.Info.ID}>
            <div className={styles.Picture}>
                <Image
                    src={require(`../../assets/images/Colleagues/${props.Info.Picture}`)}
                    width={240}
                    height={240}
                    alt='CVPicture'
                />
            </div>
            <div className={styles.Name}>
                <p>{props.Info.Name}</p>
            </div>
            <div className={styles.JobTitle}>
                <p>{props.Info.JobTitle}</p>
            </div>
            <div className={styles.Link}>
                <Link href={props.Info.Link +'#description'}>
                    <a>بیشتر</a>
                </Link>
                <span><FiMoreHorizontal /></span>
            </div>
        </div>
    )
}

export default Colleague