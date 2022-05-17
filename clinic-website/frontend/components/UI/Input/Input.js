import React, { useState } from 'react';
import styles from './Input.module.scss';
import {FaRegEyeSlash,FaRegEye} from 'react-icons/fa';
const Input = (props) => {
    const [isShown, setIsShown] = useState(false);
    const renderSwitchCase = () => {
        switch (props.inputProperties.config.type) {
            case 'password':
                return (
                    <label>
                        <div className={styles.PasswordShowToggler} onClick={()=>setIsShown(!isShown)}>{isShown ? <FaRegEyeSlash /> : <FaRegEye />}</div>
                        {props.inputProperties.Label}
                        <input {...props.inputProperties.config} type={isShown ? 'text' : 'password'} onChange={(event) => props.handlers.changeHandler(event)} onBlur={(event) => (props.handlers?.blurHandler && props.handlers.blurHandler(event))} />
                    </label>
                )
            case 'textarea':
                return (
                    <label>
                        {props.inputProperties.Label}
                        <textarea {...props.inputProperties.config} onChange={(event) => props.handlers.changeHandler(event)} onBlur={(event) => (props.handlers?.blurHandler && props.handlers.blurHandler(event))} />
                    </label>
                )
            default:
                return (
                    <label>
                        {props.inputProperties.Label}
                        <input {...props.inputProperties.config} onChange={(event) => props.handlers.changeHandler(event)} onBlur={(event) => (props.handlers?.blurHandler && props.handlers.blurHandler(event))} />
                    </label>
                )
        }
    }
    return <div className={styles.Input}>
        <div>
            {renderSwitchCase()}
        </div>
        <p>{props.Error}</p>
    </div>;
}

export default Input;
