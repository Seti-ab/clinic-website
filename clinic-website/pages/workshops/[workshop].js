import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { scroller } from "react-scroll";

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshop from '../../components/Workshop/Workshop';

import { workshopsInfo } from '../../public/text';

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
      <Workshop Info={props.data.Info} >
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
  return {
    paths: [
      { params: { workshop: "couple-eft" } },
      { params: { workshop: "couple-eft2" } },
    ],
    fallback: false,
  }
}

export default WorkShop;
