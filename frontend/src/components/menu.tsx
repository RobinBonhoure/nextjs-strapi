import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

type MenuProps = {
    active: boolean;
    links: Links[];
    setNavState: (isOpen: boolean) => void;
};

const Menu: React.FC<MenuProps> = ({ active, setNavState, links }) => {
    const pathname = usePathname();
    const closeMenu = () => {
        setNavState(false);
        document.querySelector('html')?.classList.remove('noscroll');
    };

    return (
        <>
            <div className={active ? 'p-menu ouvert' : 'p-menu'}>
                <ul>
                    {links.map((item, index) => {
                        const href = item.page.data.attributes.slug;
                        return (
                            <li key={index} className={pathname == href ? "active anim-link" : "anim-link"}>
                                <Link onClick={closeMenu} href={href}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}

export default Menu;