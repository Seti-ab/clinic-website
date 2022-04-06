import React, { useEffect, useRef } from 'react';
import styles from '../../styles/ColleaguesPage.module.scss';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Colleague from '../../components/Colleague/Colleague';

import { colleaguesInfo } from '../../public/text';

const ColleaguesPage = () => {

  return <ContentContainer Title='رزومه‌ی همکاران' UnderLine>

    <div className={styles.ColleaguesPage}>
      {colleaguesInfo?.map(colleague => {
        return <Colleague
          key={colleague.ID}
          Info={colleague.Info}
        />
      })}
    </div>

  </ContentContainer >
    ;
};

export default ColleaguesPage;
