import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { scroller } from "react-scroll";
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshop from '../../components/Workshop/Workshop';

const WorkShop = (props) => {
  const router = useRouter(null)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    if (router.asPath === ('/workshops/' + props.data.Link + '#description')) {
      router.replace(props.data.Link)
      scroller.scrollTo("scroll", {
        duration: 900,
        delay: 0,
        smooth: true,
      });
    }
  }
    , [props?.data?.Link, router])

  return <div className='scroll'>
    <ContentContainer Title={props.data.Title} UnderLine>
      <Workshop
        Lecturer={props.data.Lecturer.Name}
        Price={props.data.Price}
        Date={props.data.Date}
        Time={props.data.Time}
      >
        <div style={{ whiteSpace: "pre-line" }}>
          {props.data.Introduction}
        </div>
      </Workshop>
    </ContentContainer>
  </div>;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch('http://localhost:4500/workshop/getall')
  const list = await res.json();
  const workshop = list.workshops.find((workshop) => workshop.Link === params.workshop);
  if (workshop) {
    return {
      props: {
        data: workshop
      },
    }
  } else return {
    redirect: {
      destination: '/404',
      permanent: false,
    },

  }
}

export default WorkShop;
