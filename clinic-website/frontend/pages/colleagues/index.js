import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/ColleaguesPage.module.scss';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Colleague from '../../components/Colleague/Colleague';

const ColleaguesPage = () => {
  const [psychologists, setPsychologists] = useState();

  useEffect(() => {
    axios.get('http://localhost:4500/Psychologist/getlist')
      .then(response => {
        console.log("response", response);
        setPsychologists(response.data.list)
      }).catch(error => {
        console.log("error", error);
      })
      axios.get('http://localhost:4500/')
  }, [])

  return <ContentContainer Title='رزومه‌ی همکاران' UnderLine>

    <div className={styles.ColleaguesPage}>
      {psychologists?.map((colleague,index) => {
        return <Colleague
          key={index}
          Picture={colleague.Picture}
          Name={colleague.Name}
          JobTitle={colleague.JobTitle}
          Link={colleague.Link}
          Education={colleague.Education}
          Introduction={colleague.Introduction}
          Email={colleague.Email}
        />
      })}
    </div>

  </ContentContainer >
    ;
};

export default ColleaguesPage;
