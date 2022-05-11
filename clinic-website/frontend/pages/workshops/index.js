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
  const [isLogged, setIsLogged] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState();
  const [workshops,setWorkshops]=useState();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLogged(true);
    }
  }, [isLogged]);

  useEffect(() => {
    
    axios.get('http://localhost:4500/workshop/get')
    .then(response=>{
      console.log("response",response);
    }).catch(error=>{
      console.log("error",error)
    })
  }, [])
  

  const inputChangeHandler = (event) => {
    let temp = { ...newWorkshop };
    temp[event.target.name] = event.target.value;
    setNewWorkshop(temp);
  }

  const inputProperties = {
    title: {
      config: {
        placeholder: 'عنوان',
        name: 'title',
        //value: newWorkshop.title
      },

    },
    lecturer: {
      config: {
        name: 'lecturer',
        //value:newWorkshop.lecturer
      }
    },
    price: {
      config: {
        name: 'price',
        //value:newWorkshop.price
      }
    },
    date: {
      config: {
        name: 'date',
        //value:newWorkshop.date
      }
    },
    time: {
      config: {
        name: 'time',
        placeholder: '__ ساعت'
        //value:newWorkshop.time
      }
    },
    introduction: {
      config: {
        type: 'textarea',
        placeholder: 'توضیحات',
        name: 'introduction'
      }
    },
    handlers: {
      changeHandler: inputChangeHandler,
    }

  }
  //blurHandler: inputBlurHandler,

  const addWorkshopHandler=()=>{
    let temp={...workshops};
    temp.push(newWorkshop);
    setWorkshops(temp);
  }

  console.log("newWorkshop", newWorkshop);
  return <div className={'container ' + style.WorkshopsPage}>
    <ContentContainer Title='کـارگاه‌های آموزشـی'>
      {workshops?.map(workshop => {
        return <Workshop
          key={workshop.ID}
          Lecturer={workshop.Lecturer}
          Price={workshop.Price}
          Date={workshop.Date}
          Time={workshop.Time}
          Image={workshop.Image}
          Title={workshop.Title}
          Link={workshop.Link + '#description'}
          Border>
        </Workshop>
      })}
      {isLogged &&
        <ContentContainer Title='افزودن کارگاه جدید'>
          <form onSubmit={()=>addWorkshopHandler()}>
            <Workshop
              Lecturer= {<Input inputProperties={inputProperties.lecturer} handlers={inputProperties.handlers} />}
              Price= {<Input inputProperties={inputProperties.price} handlers={inputProperties.handlers} />}
              Date= {<Input inputProperties={inputProperties.date} handlers={inputProperties.handlers} />}
              Time= {<Input inputProperties={inputProperties.time} handlers={inputProperties.handlers} />}
              Image= 'fileUpload'
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