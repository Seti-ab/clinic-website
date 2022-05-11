import React from 'react';
import style from './GalleryArrow.module.scss';
import {MdOutlineArrowForwardIos} from 'react-icons/md';
const GalleryArrow = (props) => {
    return (

        <button className={style.GalleryArrow + ' ' + (props.direction === 'next' ? style.next : style.prev)} onClick={props.moveSlide} >
            <MdOutlineArrowForwardIos/>
        </button>

    )
}

export default GalleryArrow