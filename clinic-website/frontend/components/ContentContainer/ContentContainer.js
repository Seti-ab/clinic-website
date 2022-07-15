import React from 'react';
import styles from './ContentContainer.module.scss';

const ContentContainer = (props) => {
    return <div className={styles.ContentContainer} >
        <div className={styles.Title}>
            <div className={props.UnderLine && styles.Line}>
                <p>{props.Title}</p>
            </div>
        </div>
        <div className={styles.Content}>
            {props.children}
        </div>
    </div>;
};

export default ContentContainer;
