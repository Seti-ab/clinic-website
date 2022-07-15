import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
  return (
    <div className={styles.Button}>
        <button type={props.Type} onClick={props.Clicked} className={props.Cancel && styles.Cancel}>{props.children}</button>
    </div>
  )
}

export default Button;