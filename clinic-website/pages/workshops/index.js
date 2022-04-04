import React from 'react';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshops from '../../components/Workshops/Workshops';
import { workshopsInfo } from '../../public/text';
const WorkshopsPage = () => {
  return <div className='container'>
    <ContentContainer Title='کـارگاه‌های آموزشـی'>
      {workshopsInfo.map(workshop => {
        return <Workshops
        key={workshop.id}
        Info={workshop.Info}
        Link={workshop.Link + '#description'}>
          {workshop.Introduction}
        </Workshops>
      })}
    </ContentContainer>
  </div>
}
export default WorkshopsPage;