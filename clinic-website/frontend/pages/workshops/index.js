import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../../styles/Workshops.module.scss';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshop from '../../components/Workshop/Workshop';
import Cookies from 'js-cookie';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { toPersianNumber } from '../../helpers/action';

const WorkshopsPage = () => {
  const initialValues = {
    title: '',
    price: '',
    date: '',
    time: '',
    introduction: '',
    image: ''
  }

  const [isLogged, setIsLogged] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState(initialValues);
  const [workshops, setWorkshops] = useState([]);
  const [length, setLength] = useState();
  const [error, setError] = useState('');
  const [token, setToken] = useState();
  const imageRadio = [{ title: 'فردی',value: 'single'},{title: 'زوج درمانی',value: 'couple'},{title: 'کودک و نوجوان',value: 'kids'}];

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
    if (token) {
      setIsLogged(true);
    }
  }, [isLogged]);

  useEffect(() => {
    axios.get('http://localhost:4500/workshop/getall')
      .then(response => {
        //console.log("response", response);
        setWorkshops(response.data.workshops);
      }).catch(error => {
        //console.log("error", error)
      })
  }, [length])


  const changeHandler = (event) => {
    let temp = { ...newWorkshop };
    temp[event.target.name] = event.target.value;
    if (event.target.name === 'time') {
      if (event.target.value.length > 3) {
        return;
      }
    }
    if (event.target.name === 'price') {
      const formattedValue = (Number(event.target.value.replace(/\D/g, '')) || '').toLocaleString();
      temp[event.target.name] = formattedValue;
    }
    setNewWorkshop(temp);
  }

  const inputProperties = {
    title: {
      config: {
        placeholder: 'عنوان',
        name: 'title',
        value: newWorkshop.title,
      },
      changeHandler
    },

    price: {
      config: {
        name: 'price',
        value: newWorkshop.price,
      },
      changeHandler
    },
    date: {
      config: {
        name: 'date',
        placeholder: 'روزها و ساعت برگزاری',
        value: newWorkshop.date,
      },
      changeHandler
    },
    time: {
      config: {
        type: 'number',
        name: 'time',
        value: newWorkshop.time,
      },
      changeHandler
    },
    introduction: {
      config: {
        type: 'textarea',
        placeholder: 'توضیحات',
        name: 'introduction',
        value: newWorkshop.introduction,
      },
      changeHandler
    },

  }

  const validationHandler = () => {
    let TitleError = '', DateError = '';
    if (newWorkshop.title === '') {
      TitleError = "لطفا عنوان کارگاه مورد نظر خود را وارد نمایید."
    }
    else if (newWorkshop.date === '') {
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
      const data = {
        ...newWorkshop,
        time: newWorkshop.time,
        price: newWorkshop.price,
        link: 'workshop' + workshops?.length
      }
      axios.post('http://localhost:4500/workshop/add', data, { headers: { token } })
        .then(response => {
          //console.log("response", response);
          setLength(workshops.length);
          setError('');
          setNewWorkshop(initialValues);
        }).catch(error => {
          //console.log("error", error.response.data?.error);
          setError(error.response.data?.error);

        })
    } else {
      //console.log("something went wrong")
    }
  }

  const deleteWorkshopHandler = (_id) => {
    console.log(_id);
    axios.post('http://localhost:4500/workshop/delete', { _id }, { headers: { token } })
      .then(response => {
        console.log("response", response);
        setLength(workshops.length);
      }).catch(error => {
        console.log("error", error.response.data);
      })
  }

  //console.log("newWorkshop",newWorkshop);
  return <div className={'container ' + style.WorkshopsPage}>
    <ContentContainer Title='کـارگاه‌های آموزشـی'>
      {workshops?.length !== 0 ?

        workshops.map((workshop, index) => {
          return <Workshop
            key={index}
            Lecturer={workshop.lecturer.name}
            Price={toPersianNumber(workshop.price)}
            Date={toPersianNumber(workshop.date)}
            Time={toPersianNumber(workshop.time)}
            Image={workshop.image}
            Title={workshop.title}
            Link={workshop.link + '#description'}
            deleteWorkshopHandler={() => deleteWorkshopHandler(workshop._id)}
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
          <form spellCheck="false" onSubmit={(event) => addWorkshopHandler(event)} autoComplete='no'>
            <Workshop
              Price={<Input inputProperties={inputProperties.price} />}
              Date={<Input inputProperties={inputProperties.date} />}
              Time={<Input inputProperties={inputProperties.time} />}
              Title={<Input inputProperties={inputProperties.title} />}
              Image={<div className={style.ChooseImage}>
                <p><i></i>گروه:</p>
                {imageRadio.map(radio => {
                  return <label key={radio.value} className={style.Radio}>
                    <input
                      type='radio'
                      value={radio.value+'.jpg'}
                      name='image'
                      onChange={(event) => changeHandler(event)}
                    />
                    {radio.title}
                  </label>
                })}

              </div>}
              Border>
              <Input inputProperties={inputProperties.introduction} />
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