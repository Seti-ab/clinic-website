import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Colleague.module.scss';
import { FiMoreHorizontal } from 'react-icons/fi';
import user from '../../assets/icons/user.png'
function Colleague(props) {
    return (
        <div className={styles.Colleague} key={props.ID}>
            <div className={styles.Picture}>
                <Image
                    src={user.src}
                    width={200}
                    height={200}
                    alt='CVPicture'
                />
            </div>
            <div className={styles.Name}>
                <p>{props.Name}</p>
            </div>
            <div className={styles.JobTitle}>
                <p>{props.JobTitle}</p>
            </div>
            <div className={styles.Link}>
                <Link href={'/colleagues/' + props.Link + '#description'}>
                    <a>بیشتر</a>
                </Link>
                <span><FiMoreHorizontal /></span>
            </div>
        </div>
    )
}

export default Colleague