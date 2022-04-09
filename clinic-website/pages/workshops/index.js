import React from 'react';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshop from '../../components/Workshop/Workshop';
import { workshopsInfo } from '../../public/text';
const WorkshopsPage = () => {
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
    </ContentContainer>
  </div>
}
export default WorkshopsPage;