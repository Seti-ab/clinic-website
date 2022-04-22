import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/ColleaguesPage.module.scss';
import { colleaguesInfo } from '../../public/data';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { HiOutlineMail } from 'react-icons/hi';
import { scroller } from "react-scroll";
const ColleaguePage = (props) => {
  const router = useRouter(null)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    if (router.asPath === (props.data.Info.Link + '#description')) {
      router.replace(props.data.Info.Link)
      scroller.scrollTo("scroll", {
        duration: 1000,
        delay: 0,
        smooth: true,
      });
    }
  }, [props.data.Info.Link, router])

  return (
    <div className='scroll'>
      <ContentContainer Title={props.data.Info.Name} UnderLine >
        <div className={styles.EachColleaguePage}>
          <div >
            <Image
              src={`/images/Colleagues/${props.data.Info.Picture}`)}
              width={250}
              height={250}
              layout='intrinsic'
            />
          </div>
          <div className={styles.Text}>
            <h3>{props.data.Info.JobTitle}</h3>
            <p>{props.data.Education}</p>
            <p>{props.data.Introduction}</p>
            <p className={styles.Email}><HiOutlineMail />{props.data.Email}</p>
          </div>
        </div>
      </ContentContainer>
    </div>
  )
}


export async function getStaticProps(context) {

  const { params } = context;
  const colleague = colleaguesInfo.find((c) => c.ID === params.colleague);
  return {
    props: {
      data: colleague
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { colleague: "maryam-soleymani" } },
      { params: { colleague: "reza-mirzaee" } },
    ],
    fallback: false,
  }
}

export default ColleaguePage;
