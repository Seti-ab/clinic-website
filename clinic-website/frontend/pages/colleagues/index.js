import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/ColleaguesPage.module.scss';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Colleague from '../../components/Colleague/Colleague';
import { RiUserAddLine } from 'react-icons/ri';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const ColleaguesPage = () => {
  const [psychologists, setPsychologists] = useState();
  const [formShow, setFormShow] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:4500/Psychologist/getlist')
      .then(response => {
        console.log("response", response);
        setPsychologists(response.data.list);
      }).catch(error => {
        console.log("error", error);
      })
  }, [])
  const inputProperties = {
    name: {
      Label: 'نام و نام خانوادگی:',
      config: {
        placeholder: 'نام و نام خانوادگی',
        name: 'name',
      }
    },
    email: {
      Label: 'ایمیل:',
      config: {
        placeholder: 'example@example.com',
        name: 'email',
      }
    },
    jobTitle: {
      config: {
        placeholder: 'عنوان شغلی',
        name: 'jobTitle',
      }
    },
    education: {
      config: {
        placeholder: 'تحصیلات',
        name: 'education',
      }
    },
    introduction: {
      Label: 'توضیحات:',
      config: {
        type: 'textarea',
        placeholder: 'توضیحات',
        name: 'education',
      }
    },
    password: {
      config: {
        type: 'password',
        placeholder: 'رمزعبور',
        name: 'password'
      }
    },
    repeatPassword: {
      config: {
        type: 'password',
        placeholder: 'تکرار رمز عبور',
        name: 'repeatPassword'
      }
    },
    handlers: {
      //blurHandler,
      //changeHandler
    }
  }
  return (
    <Fragment>
      <ContentContainer Title='رزومه‌ی همکاران' UnderLine>

        <div className={styles.ColleaguesPage}>
          {psychologists?.map((colleague, index) => {
            return <Colleague
              key={index}
              Name={colleague.Name}
              JobTitle={colleague.JobTitle}
              Link={colleague.Link}
              Education={colleague.Education}
              Introduction={colleague.Introduction}
              Email={colleague.Email}
            />
          })}
          <div className={styles.AddColleague}>
            <button onClick={() => setFormShow(true)}><RiUserAddLine /></button>

          </div>
        </div>

      </ContentContainer >
      {formShow &&
        <div className={styles.Modal} onClick={() => setFormShow(false)}>
          <div onClick={(event) => event.stopPropagation()}>
            <h3>افزودن همکار جدید</h3>
            <form>

              <Input inputProperties={inputProperties.name} handlers={inputProperties.handlers} />
              <Input inputProperties={inputProperties.email} handlers={inputProperties.handlers} />
              <div>
                <Input inputProperties={inputProperties.jobTitle} handlers={inputProperties.handlers} />
                <Input inputProperties={inputProperties.education} handlers={inputProperties.handlers} />
              </div>
              <Input inputProperties={inputProperties.introduction} handlers={inputProperties.handlers} />
              <div className={styles.Passwords}>
                <span>رمز عبور:</span>
                <Input inputProperties={inputProperties.password} handlers={inputProperties.handlers} />
                <Input inputProperties={inputProperties.repeatPassword} handlers={inputProperties.handlers} />
              </div>
              <div className={styles.SubmitButton}>
                <Button >تایید</Button>
              </div>
            </form>
          </div>
        </div>
      }
    </Fragment>
  )
    ;
};

export default ColleaguesPage;
