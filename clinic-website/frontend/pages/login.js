import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.scss';
import login from '../assets/animations/login.json';
import lottie from 'lottie-web';
import Input from '../components/UI/Input/Input';
import { AiOutlineCopyright } from 'react-icons/ai';
import Button from '../components/UI/Button/Button';
import Cookies from 'js-cookie';
const Login = () => {
  const [error, setError] = useState({});
  const [values, setValues] = useState();
  const router = useRouter();
  const animation = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: login,
    });
    return () => lottie.stop();
  }, [lottie]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/');
    }
  }, []);

  const changeHandler = (event) => {
    let temp = { ...values };
    temp[event.target.name] = event.target.value;
    setValues(temp);
  }
  const blurHandler = (event) => {
    let temp = { ...error }
    let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    if (event.target.value === '') {
      temp[event.target.name] = 'تکمیل این فیلد الزامی است!'
      setError(temp)
    } else if (event.target.name === 'email' && !emailRegex.test(event.target.value)) {
      temp.email = 'ایمیل وارد شده صحیح نمی باشد!'
      setError(temp)
    }
    else {
      delete temp[event.target.name];
      setError(temp)
    }
  }

  const formValidationHandler = () => {
    let emailError, passwordError;
    let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    if (!values || !values.email || values.email === '') {
      emailError = 'تکمیل این فیلد الزامی است!'
    } else if (!emailRegex.test(values.email)) {
      emailError = 'ایمیل وارد شده صحیح نمی باشد!'
    }

    if (!values || !values.password || values.password === '') {
      passwordError = 'تکمیل این فیلد الزامی است!'
    }

    if (emailError || passwordError) {
      let temp = { ...error };
      temp.email = emailError;
      temp.password = passwordError;
      setError(temp);
      return false;
    } else {
      return true;
    }
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const isValid = formValidationHandler();
    const history = Object.keys(router.components)[(Object.keys(router.components).length) - 2];
    if (isValid) {
      axios.post('http://localhost:4500/Psychologist/login', values)
        .then(response => {
          //console.log("response", response);
          Cookies.set('token', response.data.token);
          Cookies.set("userName", response.data.Psychologist);
          if (history !== '/login' && history !== '/_app') {
            router.push(history);
          } else {
            router.push('/');
          }
        }).catch(error => {
          //console.log("error", error.response.data.error);
          setError({ ...error, server: error.response.data.error });
        })

    }
    else {
      console.log("Something went wrong");
    }
  }

  const inputProperties = {
    email: {
      config: {
        type: 'email',
        placeholder: 'example@example.com',
        name: 'email',
      },
      Label: 'ایمیل',
      blurHandler,
      changeHandler
    },
    password: {
      config: {
        type: 'password',
        placeholder: '******',
        name: 'password'
      },
      Label: 'کلمه‌عبور',
      blurHandler,
      changeHandler
    },

  }

  return (
    <div className={styles.Login}>
      <div className={styles.Right}>
        <div className={styles.LoginBox}>
          <h2>ورود</h2>
          <span className={error.server ? styles.ShowError : styles.HideError}>{error.server}</span>
          <form autoComplete='no' onSubmit={(event) => formSubmitHandler(event)} noValidate>
            <Input
              inputProperties={inputProperties.email}
              Error={error.email}
            />
            <Input
              inputProperties={inputProperties.password}
              Error={error.password}
            />
            <div className={styles.Button}>
              <Button Type='submit'>تـائیـد</Button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.Left}>
        <div ref={animation}></div>
        <p className={styles.CopyRight}>
          ۱۴۰۱<AiOutlineCopyright /> طراحی و توسعه توسط <b>ستایش ابوئی</b>
        </p>
      </div>


    </div>
  )
}

export default Login