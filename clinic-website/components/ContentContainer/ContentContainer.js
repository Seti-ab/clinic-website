import React from 'react';
import style from './ContentContainer.module.scss';

const ContentContainer = (props) => {
    return <div className={style.ContentContainer} >
        <div className={style.Title}>
            <div>
                <p>{props.Title}</p>
            </div>
        </div>
        <div className={style.Content}>
            {props.children}
        </div>
    </div>;
};

export default ContentContainer;
