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

    if (router.asPath === ('/workshops/' + props.data.link + '#description')) {
      router.replace(props.data.link)
      scroller.scrollTo("scroll", {
        duration: 900,
        delay: 0,
        smooth: true,
      });
    }
  }
    , [props?.data?.link, router])

  return <div className='scroll'>
    <ContentContainer Title={props.data.title} UnderLine>
      <Workshop
        Lecturer={props.data.lecturer.name}
        Price={props.data.price}
        Date={props.data.date}
        Time={props.data.time}
        Image={props.data.image}
      >
        <div style={{ whiteSpace: "pre-line" }}>
          {props.data.introduction}
        </div>
      </Workshop>
    </ContentContainer>
  </div>;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch('http://localhost:4500/workshop/getall')
  const list = await res.json();
  const workshop = list.workshops.find((workshop) => workshop.link === params.workshop);
  if (workshop) {
    return {
      props: {
        data: workshop
      },
    }
  } 
  else return {
    redirect: {
      destination: '/404',
      permanent: false,
    },

  }
}

export default WorkShop;
