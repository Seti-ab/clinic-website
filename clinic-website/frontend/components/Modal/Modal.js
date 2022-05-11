import React from 'react';
import Image from 'next/image';
import style from './Modal.module.scss';
import Close from '../../assets/icons/cancelUpload.svg';
import Letter from '../../assets/icons/letter.svg';
const Modal = (props) => {
    return (
        <div className={style.Backdrop} onClick={props.closeModal}>
            <div className={style.Modal} onClick={ (event)=>event.stopPropagation()}>
                <div className={style.Close} onClick={props.closeModal}>
                    <Image
                        src={Close.src}
                        width={14}
                        height={14}
                        alt='icon'
                    />
                </div>
                <div className={style.ModalContent}>
                    <div>
                        <Image
                            src={Letter.src}
                            width={92}
                            height={92}
                            alt='Letter'
                        />
                    </div>
                    <div>
                        <p>
                        .{props.Subject} شما با موفقیت ارسال شد
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
