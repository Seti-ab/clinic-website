import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../../styles/Workshops.module.scss';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshop from '../../components/Workshop/Workshop';
import { workshopsInfo } from '../../public/data';
import Cookies from 'js-cookie';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const WorkshopsPage = () => {
  const initialValue = {
    Title: '',
    Price: '',
    Date: '',
    Time: '',
    Introduction: '',
  }

  const [isLogged, setIsLogged] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState(initialValue);
  const [workshops, setWorkshops] = useState();
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
    setNewWorkshop(temp);
  }

  const inputProperties = {
    title: {
      config: {
        placeholder: 'عنوان',
        name: 'Title',
        //value: newWorkshop.title
      },

    },

    price: {
      config: {
        name: 'Price',
        //value:newWorkshop.price
      }
    },
    date: {
      config: {
        name: 'Date',
        //value:newWorkshop.date
      }
    },
    time: {
      config: {
        name: 'Time',
        placeholder: '__ ساعت'
        //value:newWorkshop.time
      }
    },
    introduction: {
      config: {
        type: 'textarea',
        placeholder: 'توضیحات',
        name: 'Introduction'
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
          setNewWorkshop(initialValue);
        }).catch(error => {
          console.log("error", error.response.data.error);
          setError(error.response.data.error);

        })
    } else (
      console.log("something went wrong")
    )
  }

  console.log("newWorkshop", newWorkshop);
  return <div className={'container ' + style.WorkshopsPage}>
    <ContentContainer Title='کـارگاه‌های آموزشـی'>
      {workshops?.map((workshop, index) => {
        return <Workshop
          key={index}
          Lecturer={workshop.Lecturer?.Name}
          Price={workshop.Price}
          Date={workshop.Date}
          Time={workshop.Time}
          Image={workshop.Image}
          Title={workshop.Title}
          Link={workshop.Link +'#description'}
          Border>
        </Workshop>
      })}
      {isLogged &&
        <ContentContainer Title='افزودن کارگاه جدید'>
          <p className={error === '' ? style.HideError : style.ShowError}>{error}</p>
          <form onSubmit={(event) => addWorkshopHandler(event)}>
            <Workshop
              Price={<Input inputProperties={inputProperties.price} handlers={inputProperties.handlers} />}
              Date={<Input inputProperties={inputProperties.date} handlers={inputProperties.handlers} />}
              Time={<Input inputProperties={inputProperties.time} handlers={inputProperties.handlers} />}
              Image='fileUpload'
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