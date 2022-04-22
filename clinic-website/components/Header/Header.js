import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from './Header.module.scss';
import Logo from '../../assets/icons/Clinic_Logo.svg';
import Menu from '../../assets/icons/menu.svg';
import Cancel from '../../assets/icons/cancel.svg';
import { navItems } from '../../public/data';
import { FaRegUser } from 'react-icons/fa';
const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
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
            {!showMenu ? <div className={styles.MenuIcon} onClick={() => setShowMenu(true)}>
                <Image
                    src={Menu}
                    alt="Menu"
                    width="40px"
                    height="40px"
                />
            </div> :
                <div className={styles.CancelIcon} onClick={() => setShowMenu(false)}>
                    <Image
                        src={Cancel}
                        alt="icon"
                        width="40px"
                        height="40px"
                    />
                </div>
            }

            <div className={styles.Items}>
                <ul className={showMenu ? styles.ResponsiveMenu : styles.hideResponsiveMenu}>
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
                    <Link href='/'><a>
                        <FaRegUser/>
                        <span>ورود کارمندان</span>
                    </a>
                    </Link>
                </div>
            </div>

        </div>

    </div>;
}

export default Header;
