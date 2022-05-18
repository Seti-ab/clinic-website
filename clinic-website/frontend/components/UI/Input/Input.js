import React, { useState } from 'react';
import styles from './Input.module.scss';
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';
const Input = (props) => {
    const [isShown, setIsShown] = useState(false);
    const renderSwitchCase = () => {
        switch (props.inputProperties.config.type) {
            case 'password':
                return (
                    <label>
                        <div className={styles.PasswordShowToggler} onClick={()=>setIsShown(!isShown)}>{isShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</div>
                        {props.inputProperties.Label}
                        <input {...props.inputProperties.config} type={isShown ? 'text' : 'password'} onChange={(event) => props.inputProperties.changeHandler(event)} onBlur={(event) => (props.inputProperties?.blurHandler && props.inputProperties.blurHandler(event))} />
                    </label>
                )
            case 'textarea':
                return (
                    <label>
                        {props.inputProperties.Label}
                        <textarea {...props.inputProperties.config} onChange={(event) => props.inputProperties.changeHandler(event)} onBlur={(event) => (props.inputProperties?.blurHandler && props.inputProperties.blurHandler(event))} />
                    </label>
                )
            default:
                return (
                    <label>
                        {props.inputProperties.Label}
                        <input {...props.inputProperties.config} onChange={(event) => props.inputProperties.changeHandler(event)} onBlur={(event) => (props.inputProperties?.blurHandler && props.inputProperties.blurHandler(event))} />
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
