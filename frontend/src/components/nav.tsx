"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image'
import { usePathname } from "next/navigation";
import Menu from '../components/menu';
import { getStrapiMedia } from "../utils/api-helpers";

interface Links {
    title: string;
    page: {
        data: {
            attributes: {
                slug: string;
            }
        }
    };
}

interface Logo {
    data: {
        id: string;
        attributes: {
            url: string;
            name: string;
            alternativeText: string;
            width: number;
            height: number;
        };
    };
}


interface NavProps {
    links: Links[];
    logo: Logo;
}

const Nav: React.FC<NavProps> = ({ links, logo }) => {
    const [navState, setNavState] = useState<boolean>(false);
    const [navActive, setNavActive] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        window.addEventListener('scroll', updateNavClass);
        return () => {
            window.removeEventListener('scroll', updateNavClass);
        };
    }, []);

    if (logo.data === null) return;
    const imgUrl = getStrapiMedia(logo.data.attributes.url);

    const handleClick = () => {
        setNavState(current => !current);
        document.querySelector('html')?.classList.toggle('noscroll');
    };

    const updateNavClass = () => {
        const navContainer = document.querySelector('.p-nav_container');
        if (navContainer) {
            if (window.scrollY >= window.innerHeight / 2) {
                setNavActive(true)
            } else {
                setNavActive(false)
            }
        }
    };

    return (
        <>
            <nav className={navActive ? 'p-nav_container active' : 'p-nav_container'}>
                <div className="grid-container">
                    <div className="col-md-1-12">
                        <div className={navState ? 'p-nav ouvert' : 'p-nav'}>
                            <Link href="/">
                                <Image
                                    className="logo"
                                    src={imgUrl || ""}
                                    alt={logo.data.attributes.alternativeText || "none provided"}
                                    width={logo.data.attributes.width}
                                    height={logo.data.attributes.height}
                                    priority
                                />
                            </Link>
                            <ul className="p-nav_menu">
                                {links.map((item, index) => {
                                    const href = item.page.data.attributes.slug;
                                    return (
                                        <li key={index} className={pathname == href ? "active" : ""}>
                                            <Link href={href}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                }
                                )}
                            </ul>
                            <button id="bt-menu" className='js-menu' onClick={handleClick}>
                                <span className="barre"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <Menu active={navState} setNavState={setNavState} links={links} />
        </>
    );
}

export default Nav;