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
    if (router.asPath === (props.data.Info.More + '#description')) {
      router.replace(props.data.Info.More)
      scroller.scrollTo("scroll", {
        duration: 900,
        delay: 0,
        smooth: true,
      });
    }
  }
    , [props.data.Info.More,router])

  return <div className='scroll'>
    <ContentContainer Title={props.data.Title}>
      <Workshops Image={props.data.Info.Image}  >
        <div style={{ whiteSpace: "pre-line" }}>
          {props.data.Info.Description}
        </div>
        {/* todo use next link */}
        <a target="_blank" href={props.data.Link} rel="noreferrer">
          مشاهده وب‌سایت
          <div>
            <BsArrowLeft/>
          </div>
        </a>

      </Workshops>
    </ContentContainer>
  </div>;
};

export async function getStaticProps(context) {

  //const pdata.Info = workshopsInfo.find(item => item.id === context.params.prj);
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
    fallback: false,
  }
}

export default WorkShop;
