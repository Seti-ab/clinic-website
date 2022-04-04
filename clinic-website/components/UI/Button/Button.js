import React from 'react';
import style from './Button.module.scss';

const Button = (props) => {
  return (
    <div className={style.Button}>
        <button type={props.Type}>{props.children}</button>
    </div>
  )
}

export default Button;