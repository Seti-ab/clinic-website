import React from 'react';
import Image from 'next/image';
import style from './GalleryArrow.module.scss';

const GalleryArrow = (props) => {
    return (

        <button className={style.GalleryArrow + ' ' + (props.direction === 'next' ? style.next : style.prev)} onClick={props.moveSlide} >
            <i></i>
        </button>

    )
}

export default GalleryArrow