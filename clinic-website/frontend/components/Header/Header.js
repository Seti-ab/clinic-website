import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from './Header.module.scss';
import Logo from '../../assets/icons/clinic-logo.svg';
import { navItems } from '../../public/data';
import Cookies from 'js-cookie';
//icons
import menuIcon from '../../assets/icons/menu.svg';
import cancelIcon from '../../assets/icons/cancel.svg';
import login from '../../assets/icons/login.svg';
import logout from '../../assets/icons/logout.svg';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);
    const [userName, setUserName] = useState();
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setIsLogged(true);
        }
        const userName = Cookies.get("userName");
        setUserName(userName);
    }, [])

    const logoutHandler = () => {
        Cookies.remove("token");
        router.reload();
    }

    return <div className={styles.Header}>
        <div>
            <div className={styles.Logo}>
                <Link href='/'>
                    <a>
                        <Image
                            src={Logo}
                            alt="Logo"
                            width="43px"
                            height="43px"
                        />
                    </a>
                </Link>
            </div>

            <div className={styles.Items}>
                <ul className={showMenu ? styles.ResponsiveMenu : styles.hideResponsiveMenu}>
                    {showMenu && <span className={styles.CopyRight}>
                        کلینیـک روانشـناسی<b>سایه</b>
                    </span>}
                    {navItems.map(item => {
                        return <li className={router.pathname === item.link ? styles.Active : null} onClick={() => setShowMenu(false)} key={item.id}>
                            <Link href={item.link} >
                                <a>
                                    {item.title}
                                    <span></span>
                                </a>
                            </Link>
                        </li>
                    })}
                </ul>

                <div className={styles.Login}>
                    {isLogged ?
                        <div>
                            <span>{userName}</span>
                            <a onClick={() => logoutHandler()}>
                                <span>خروج</span>
                                <i className={styles.LogoutIcon}></i>
                            </a>
                        </div>
                        : <Link href='/login'><a>
                            <span>ورود کارمندان</span>
                            <i className={styles.LoginIcon}></i>
                        </a>
                        </Link>
                    }
                </div>
                {!showMenu ? <div className={styles.MenuIcon} onClick={() => setShowMenu(true)}>
                    <i></i>
                </div> :
                    <div className={styles.CancelIcon} onClick={() => setShowMenu(false)}>
                        <i></i>
                    </div>
                }
            </div>



        </div>

    </div>;
}

export default Header;
