import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { scroller } from "react-scroll";

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import Workshops from '../../components/Workshops/Workshops';

import { workshopsInfo } from '../../public/text';
import {BsArrowLeft} from 'react-icons/bs';

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
        duration: 1000,
        delay: 10,
        smooth: true,
      });
    }
  }
    , [props.data.Link,router])

  return <div className='scroll'>
    <ContentContainer Title={props.data.Title} UnderLine>
      <Workshops Info={props.data.Info} >
        <div style={{ whiteSpace: "pre-line" }}>
          {props.data.Introduction}
        </div>
      </Workshops>
    </ContentContainer>
    {console.log([props.data.Introduction])}
  </div>;
};

export async function getStaticProps(context) {

  const { params } = context;
  const workshop = workshopsInfo.find((w) => w.id === params.workshop);
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
    ],
    fallback: true,
  }
}

export default WorkShop;
