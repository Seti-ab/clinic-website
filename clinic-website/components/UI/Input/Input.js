import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
    return <div className={styles.Input}>
        <div>
            {props.inputProperties.config.type === 'textarea' ?
                <label>
                    {props.inputProperties.Label}
                    <textarea {...props.inputProperties.config} onChange={(event) => props.handlers.changeHandler(event)} onBlur={(event) => props.handlers?.blurHandler(event)} />
                </label> : <label>
                    {props.inputProperties.Label}
                    <input {...props.inputProperties.config} onChange={(event) => props.handlers.changeHandler(event)} onBlur={(event) => props.handlers?.blurHandler(event)} />
                </label>
            }
        </div>
        <p>{props.Error}</p>
    </div>;
}

export default Input;
