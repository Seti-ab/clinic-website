import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { scroller } from "react-scroll";

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshop from '../../components/Workshop/Workshop';

import { workshopsInfo } from '../../public/data';

const WorkShop = (props) => {
  const router = useRouter(null)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    if (router.asPath === (props.data.Link + '#description')) {
      router.replace(props.data.Link)
      scroller.scrollTo("scroll", {
        duration: 900,
        delay: 0,
        smooth: true,
      });
    }
  }
    , [props.data.Link,router])

  return <div className='scroll'>
    <ContentContainer Title={props.data.Title} UnderLine>
      <Workshop Lecturer={props.data.Lecturer}
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

export async function getStaticProps(context) {

  const { params } = context;
  const workshop = workshopsInfo.find((w) => w.ID === params.workshop);
  return {
    props: {
      data: workshop
    }
  };
}

export async function getStaticPaths() {
  const paths=workshopsInfo.map(w=>{
    return { params: { workshop: w.ID } }
  })
  return {
    paths,
    fallback: false,
  }
}

export default WorkShop;
