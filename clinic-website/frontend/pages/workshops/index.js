import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../../styles/Workshops.module.scss';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshop from '../../components/Workshop/Workshop';
import Cookies from 'js-cookie';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { IoIosImages } from 'react-icons/io';
import { toPersianNumber } from '../../helpers/action'
const WorkshopsPage = () => {
  const initialValues = {
    Title: '',
    Price: '',
    Date: '',
    Time: '',
    Introduction: '',
    Image: ''
  }

  const [isLogged, setIsLogged] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState(initialValues);
  const [workshops, setWorkshops] = useState([]);
  const [length, setLength] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLogged(true);
    }
  }, [isLogged]);

  useEffect(() => {
    axios.get('http://localhost:4500/workshop/getall')
      .then(response => {
        console.log("response", response);
        setWorkshops(response.data.workshops);
      }).catch(error => {
        console.log("error", error)
      })
  }, [length])


  const inputChangeHandler = (event) => {
    let temp = { ...newWorkshop };
    temp[event.target.name] = event.target.value;
    if (event.target.name === 'Price') {
        const formattedValue = (Number(event.target.value.replace(/\D/g, '')) || '').toLocaleString();
        temp[event.target.name] = formattedValue;
        setNewWorkshop(temp);
    }
    setNewWorkshop(temp);
  }

  const inputProperties = {
    title: {
      config: {
        placeholder: 'عنوان',
        name: 'Title',
        value: newWorkshop.Title,
      }
    },

    price: {
      config: {
        name: 'Price',
        value: newWorkshop.Price,
      }
    },
    date: {
      config: {
        name: 'Date',
        placeholder: 'روزها و ساعت برگزاری',
        value: newWorkshop.Date,
      }
    },
    time: {
      config: {
        name: 'Time',
        placeholder: '__ ساعت',
        value: newWorkshop.Time,
      }
    },
    introduction: {
      config: {
        type: 'textarea',
        placeholder: 'توضیحات',
        name: 'Introduction',
        value: newWorkshop.Introduction,
      }
    },
    handlers: {
      changeHandler: inputChangeHandler,
    }

  }

  const validationHandler = () => {
    let TitleError = '', DateError = '';
    if (newWorkshop.Title === '') {
      TitleError = "لطفا عنوان کارگاه مورد نظر خود را وارد نمایید."
    }
    else if (newWorkshop.Date === '') {
      DateError = 'لطفا تاریخ برگزاری کارگاه مورد نظر خود را وارد نمایید.'
    }
    if (TitleError || DateError) {
      setError(TitleError || DateError)
      return false;
    } else return true;
  }

  const addWorkshopHandler = (event) => {
    event.preventDefault();
    const isValid = validationHandler();
    if (isValid) {
      const token = Cookies.get("token");
      const data = {
        ...newWorkshop,
        Link: 'workshop' + workshops.length
      }
      axios.post('http://localhost:4500/workshop/add', data, { headers: { token } })
        .then(response => {
          console.log("response", response);
          setLength(workshops.length);
          setError('');
          setNewWorkshop(initialValues);
        }).catch(error => {
          console.log("error", error.response.data.error);
          setError(error.response.data.error);

        })
    } else (
      console.log("something went wrong")
    )
  }

  return <div className={'container ' + style.WorkshopsPage}>
    <ContentContainer Title='کـارگاه‌های آموزشـی'>
      {workshops?.length !== 0 ?

        workshops.map((workshop, index) => {
          return <Workshop
            key={index}
            Lecturer={workshop.Lecturer?.Name}
            Price={toPersianNumber(workshop.Price)}
            Date={toPersianNumber(workshop.Date)}
            Time={toPersianNumber(workshop.Time)}
            Image={workshop.Image}
            Title={workshop.Title}
            Link={workshop.Link + '#description'}
            Border>
          </Workshop>
        })
        :
        <p>
          در حال حاضر کارگاهی برگزار نمی شود !
        </p>
      }
      {isLogged &&
        <ContentContainer Title='افزودن کارگاه جدید'>
          <p className={error === '' ? style.HideError : style.ShowError}>{error}</p>
          <form onSubmit={(event) => addWorkshopHandler(event)}>
            <Workshop
              Price={<Input inputProperties={inputProperties.price} handlers={inputProperties.handlers} />}
              Date={<Input inputProperties={inputProperties.date} handlers={inputProperties.handlers} />}
              Time={<Input inputProperties={inputProperties.time} handlers={inputProperties.handlers} />}
              Image={<div className={style.ChooseImage}>
                <p><IoIosImages />گروه:</p>
                <label>
                  <input
                    type='radio'
                    value='couple.jpg'
                    name='Image'
                    onChange={(event) => inputChangeHandler(event)}
                  />
                  زوج درمانی
                </label>
                <label>
                  <input
                    type='radio'
                    value='single.jpg'
                    name='Image'
                    onChange={(event) => inputChangeHandler(event)}
                  />
                  فردی
                </label>
                <label>
                  <input
                    type='radio'
                    value='kids.jpg'
                    name='Image'
                    onChange={(event) => inputChangeHandler(event)}
                  />
                  کودک و نوجوان
                </label>
              </div>}
              Title={<Input inputProperties={inputProperties.title} handlers={inputProperties.handlers} />}
              Border>
              <Input inputProperties={inputProperties.introduction} handlers={inputProperties.handlers} />
            </Workshop>
            <div className={style.SubmitButton}>
              <Button Type='submit'>ثبت</Button>
            </div>
          </form>
        </ContentContainer>
      }
    </ContentContainer>
  </div>
}
export default WorkshopsPage;