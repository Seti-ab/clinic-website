import React, { useState, useEffect } from 'react';


import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshop from '../../components/Workshop/Workshop';
import { workshopsInfo } from '../../public/data';
import Cookies from 'js-cookie';
import Input from '../../components/UI/Input/Input';

const WorkshopsPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLogged(true);
    }
  }, [isLogged]);
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
    introduction:{
      config:{
        type:'textarea',
        placeholder:'توضیحات',
        name:'introduction'
      }
    },
    handlers: {
      changeHandler: inputChangeHandler,
    }

  }
  //blurHandler: inputBlurHandler,
  const info = {
    Lecturer: <Input inputProperties={inputProperties.lecturer} handlers={inputProperties.handlers} />,
    Price: <Input inputProperties={inputProperties.price} handlers={inputProperties.handlers} />,
    Date: <Input inputProperties={inputProperties.date} handlers={inputProperties.handlers} />,
    Time: <Input inputProperties={inputProperties.time} handlers={inputProperties.handlers} />,
    Image: 'fileUpload'
  }
  console.log("newWorkshop", newWorkshop);
  return <div className='container'>
    <ContentContainer Title='کـارگاه‌های آموزشـی'>
      {workshopsInfo.map(workshop => {
        return <Workshop
          key={workshop.ID}
          Info={workshop.Info}
          Title={workshop.Title}
          Link={workshop.Link + '#description'}
          Border>
        </Workshop>
      })}
      {isLogged &&
        <ContentContainer Title='افزودن کارگاه جدید'>
          <form>
            <Workshop
              Info={info}
              Title={<Input inputProperties={inputProperties.title} handlers={inputProperties.handlers} />}
              Border>
                <Input inputProperties={inputProperties.introduction} handlers={inputProperties.handlers}/>
            </Workshop>
          </form>
        </ContentContainer>
      }
    </ContentContainer>
  </div>
}
export default WorkshopsPage;