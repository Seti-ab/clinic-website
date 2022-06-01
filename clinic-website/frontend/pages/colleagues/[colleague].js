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
    if (router.asPath === ('/colleagues/'+props.data.link + '#description')) {
      router.replace(props.data.link)
      scroller.scrollTo("scroll", {
        duration: 1000,
        delay: 0,
        smooth: true,
      });
    }
  }, [props.data.Link, router])

  return (
    <div className='scroll'>
      <ContentContainer Title={props.data.name} UnderLine >
        <div className={styles.EachColleaguePage}>
          
          <div className={styles.Text}>
            <h3>{props.data.jobTitle}</h3>
            <p>{props.data.education}</p>
            <p>{props.data.introduction}</p>
            <p className={styles.Email}><HiOutlineMail />{props.data.email}</p>
          </div>
        </div>
      </ContentContainer>
    </div>
  )
}


export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch('http://localhost:4500/colleague/getlist')
  const colleagues = await res.json();
  const colleague = colleagues.list.find((colleague) => colleague.link === params.colleague);
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
