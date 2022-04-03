import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import style from './Header.module.scss'
import Logo from '../../assets/icons/Clinic_Logo.svg'
import Menu from '../../assets/icons/menu.svg'
import Cancel from '../../assets/icons/cancel.svg'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
    return <div className={style.Header}>
        <div>
            <div className={style.Logo}>
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
            {!showMenu ? <div className={style.MenuIcon} onClick={() => setShowMenu(true)}>
                <Image
                    src={Menu}
                    alt="Menu"
                    width="40px"
                    height="40px"
                />
            </div> :
                <div className={style.CancelIcon} onClick={() => setShowMenu(false)}>
                    <Image
                        src={Cancel}
                        alt="icon"
                        width="40px"
                        height="40px"
                    />
                </div>
            }

            <ul className={showMenu ? style.ResponsiveMenu : style.hideResponsiveMenu}>
                <li className={router.pathname === "/" ? style.Active : null} onClick={() => setShowMenu(false)}>
                    <Link href="/" >
                        <a >صفحه‌ اصلی
                            <span></span>
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/workshops" ? style.Active : null} onClick={() => setShowMenu(false)}>
                    <Link href="/workshops">
                        <a >کارگاه‌های آموزشی
                            <span></span>
                        </a>

                    </Link>

                </li>
                <li className={router.pathname === "/colleagues" ? style.Active : null} onClick={() => setShowMenu(false)}>
                    <Link href="/colleagues">
                        <a >رزومه همکاران
                           <span></span>
                        </a>

                    </Link>
                </li>
                <li  className={router.pathname === "/contact-us" ? style.Active : null} onClick={() => setShowMenu(false)}>
                    <Link href="/contact-us">
                        <a>تماس با ما
                            <span></span>
                        </a>

                    </Link>
                </li>
                <li className={router.pathname === "/about-us" ? style.Active : null} onClick={() => setShowMenu(false)}>
                    <Link href="/about-us">
                        <a>درباره ما
                            <span></span>
                        </a>

                    </Link>
                </li>
            </ul>


        </div>

    </div>;
}

export default Header;
