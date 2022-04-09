import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
    return <div className={styles.Input}>
        <div>
            {props.config.type === 'textarea' ?
                <label>
                    {props.inputProperties.Label}
                    <textarea {...props.inputProperties.config} value={props.Value} onChange={(event) => props.changeHandler(event)} onBlur={(event) => props.blurHandler(event)} />
                </label> : <label>
                    {props.inputProperties.Label}
                    <input {...props.inputProperties.config} value={props.Value} onChange={(event) => props.changeHandler(event)} onBlur={(event) => props.blurHandler(event)} />
                </label>
            }
        </div>
        <p>{props.Error}</p>
    </div>;
}

export default Input;
