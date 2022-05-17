import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/ColleaguesPage.module.scss';
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
    if (router.asPath === ('/colleagues/'+props.data.Link + '#description')) {
      router.replace(props.data.Link)
      scroller.scrollTo("scroll", {
        duration: 1000,
        delay: 0,
        smooth: true,
      });
    }
  }, [props.data.Link, router])

  return (
    <div className='scroll'>
      <ContentContainer Title={props.data.Name} UnderLine >
        <div className={styles.EachColleaguePage}>
          
          <div className={styles.Text}>
            <h3>{props.data.JobTitle}</h3>
            <p>{props.data.Education}</p>
            <p>{props.data.Introduction}</p>
            <p className={styles.Email}><HiOutlineMail />{props.data.Email}</p>
          </div>
        </div>
      </ContentContainer>
    </div>
  )
}


export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch('http://localhost:4500/Psychologist/getlist')
  const colleagues = await res.json();
  const colleague = colleagues.list.find((colleague) => colleague.Link === params.colleague);
  if (colleague) {
    return {
      props: {
        data: colleague
      },
    }
  } else return {
    redirect: {
      destination: '/404',
      permanent: false,
    },

  }
}
export default ColleaguePage;
