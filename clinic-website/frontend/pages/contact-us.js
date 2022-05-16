import React, { useState, useEffect, useRef } from 'react';
import style from '../styles/ContactUsPage.module.scss'

import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import Modal from '../components/Modal/Modal';
import emailjs, { init } from '@emailjs/browser';
import lottie from "lottie-web";
import contactUs from '../assets/animations/contact-us.json';

const ContactUsPage = () => {
    const initialValues={
        name: '',
        email: '',
        message: ''
    }
    const [error, setError] = useState({});
    const [values, setValues] = useState(initialValues);
    
    const animation = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: animation.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: contactUs,
        });
        return () => lottie.stop();
    }, []);

    const [showModal, setShowModal] = useState(false)

    const inputChangeHandler = (event) => {

        let temp = { ...values };
        temp[event.target.name] = event.target.value;
        setValues(temp);
    }

    const inputBlurHandler = (event) => {
        let temp = { ...error }
        let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

        if (event.target.value === '') {
            temp[event.target.name] = 'تکمیل این فیلد الزامی است!'
            setError(temp)
        }
        else if (event.target.name === 'message' && event.target.value.length <= 20) {
            temp.message = 'حداقل تعداد کاراکتر مجاز، ۲۰ کاراکتر است.'
            setError(temp)
        }
        else if (event.target.name === 'email' && !emailRegex.test(event.target.value)) {
            temp.email = 'ایمیل وارد شده صحیح نمی باشد!'
            setError(temp)
        }
        else {
            delete temp[event.target.name];
            setError(temp)
        }
    }

    const formValidationHandler = () => {
        let nameError, emailError, messageError;
        let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

        if (!values.name || values.name === '') {
            nameError = 'تکمیل این فیلد الزامی است!'
        }

        if (!values.email || values.email === '') {
            emailError = 'تکمیل این فیلد الزامی است!'
        } else if (!emailRegex.test(values.email)) {
            emailError = 'ایمیل وارد شده صحیح نمی باشد!'
        }

        if (!values.message || values.message === '') {
            messageError = 'تکمیل این فیلد الزامی است!'
        } else if (values.message.length <= 20) {
            messageError = 'حداقل تعداد کاراکتر مجاز، ۲۰ کاراکتر است.'
        }


        if (nameError || emailError || messageError) {
            let temp = { ...error };
            temp.name = nameError;
            temp.email = emailError;
            temp.message = messageError;
            setError(temp);
            return false;
        } else {
            return true;
        }
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const isValid = formValidationHandler();
        const serviceId = "clinic-service"
        const templateId = "template_contactus";
        const userId = "user_LU6KxV6VK6JDFuv3id0sS";

        if (isValid) {
            init(userId);
            emailjs.sendForm(serviceId, templateId, SuggestionsForm)
                .then((response) => {
                    if (response.status == 200) {
                        setShowModal(true);
                        setValues(initialValues);
                    }
                })
                .catch((error) => console.log(error));

        } else {
            console.log("Failed");
        }
    }

    const closeModal = () => {
        setShowModal(false);
    }
    const inputProperties = {
        name: {
            config: {
                type: 'text',
                placeholder: 'نام و نام‌خانوادگی',
                name: 'name',
                value: values.name
            },

            Label: 'نام و نام خانوادگی *'
        },
        email: {
            config: {
                type: 'email',
                placeholder: 'example@example.com',
                name: 'email',
                value: values.email
            },

            Label: 'ایمیل *'
        },

        message: {
            config: {
                type: 'textarea',
                placeholder: 'متن پیام',
                name: 'message',
                value: values.message
            },
            Label: 'متن پیام *'
        },
        handlers: {
            blurHandler: inputBlurHandler,
            changeHandler: inputChangeHandler,
        }
    }
    
    return <div className={style.ContactUsPage}>
        {showModal && <Modal Subject='پیام' closeModal={closeModal} />}

        <div className={style.Suggestions}>
            <form id="SuggestionsForm" onSubmit={(event) => formSubmitHandler(event)} noValidate>
                <h3>ارسال پیشنهاد و انتقاد</h3>

                <Input
                    inputProperties={inputProperties.name}
                    handlers={inputProperties.handlers}
                    Error={error.name}
                />

                <Input
                    inputProperties={inputProperties.email}
                    handlers={inputProperties.handlers}
                    Error={error.email}
                />

                <Input
                    inputProperties={inputProperties.message}
                    handlers={inputProperties.handlers}
                    Error={error.message}
                />

                <div>
                    <Button Type='submit'>ارسال</Button>
                </div>
            </form>
            <div className={style.Lottie} ref={animation} ></div>
        </div>
    </div >;
};

export default ContactUsPage;
