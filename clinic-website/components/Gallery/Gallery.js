import Image from 'next/image';
import React, { useState } from 'react';
import style from './Gallery.module.scss';
import { galleryData } from '../../public/text';
import GalleryArrow from './GalleryArrow/GalleryArrow';

const Gallery = () => {
    const [slideIndex, setSlideIndex] = useState(4);

    const nextSlide = () => {
        if (slideIndex !== (galleryData.length -3)) {
            setSlideIndex(slideIndex + 1);
        }
        else if (slideIndex === galleryData.length -3) {
            setSlideIndex(2);
        }
        
    }
    const previousSlide = () => {
        if (slideIndex !== 2) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 2) {
            setSlideIndex(galleryData.length- 3)
        }
        
    }

    const chooseSlideHandler = (index) => {
        switch (index) {
            case slideIndex - 3 :
                return style.ThirdRight;

            case slideIndex - 2:
                return style.SecondRight;

            case slideIndex - 1 :
                return style.FirstRight;

            case slideIndex :
                return style.Active;

            case slideIndex + 1:
                return style.FirstLeft;

            case slideIndex + 2:
                return style.SecondLeft;

            case slideIndex + 3:
                return style.ThirdLeft;
                
            default:
                return style.Hidden;

        }
    }

    return (
        <div className={style.SliderContainer}>
            <div>
                <div className={style.Gallery} >

                    {galleryData.map((slide, index) => {

                        return (
                            <div key={index} className={chooseSlideHandler(index)}>
                                <Image
                                    src={require(`../../assets/images/Gallery/${slide}`)}
                                    width={200}
                                    height={180}
                                    alt={'Gallery'}
                                />
                            </div>
                        )
                    })}
                    

                </div>
                <GalleryArrow direction={'next'} moveSlide={previousSlide} />
                <GalleryArrow direction={'prev'} moveSlide={nextSlide} />
            </div>

        </div>
    )
}

export default Gallery;
