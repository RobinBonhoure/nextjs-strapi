"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Media from "../components/media";
import Social from './social';
import Year from "../utils/get-current-year";

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

interface LinksRs {
    url: string;
    type: string;
}

interface FooterProps {
    links: Links[];
    social: {
        data: {
            attributes: {
                links: LinksRs[];
            }
        };
    }
    data: {
        horaires: string;
        logo: {
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
        };
        address: string;
        mail: string;
        telephone: string;
    };
}


const Footer: React.FC<FooterProps> = ({ links, data, social }) => {
    const pathname = usePathname();

    return (
        <footer className="p-footer">
            <div className="grid-container">
                <div className="col-md-1-12">
                    <Link href="/">
                        <figure className="logo">
                            <Media data={data.logo} />
                        </figure>
                    </Link>
                    <div className="p-footer_flex">
                        <ul className="p-footer_menu">
                            <h3>
                                Navigation
                            </h3>
                            {links.map((item, index) => {
                                const href = item.page.data.attributes.slug;
                                return (
                                    <li key={index} className={pathname == href ? "active" : ""}>
                                        <Link href={href}>
                                            <p>
                                                {item.title}
                                            </p>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="p-footer_horaires">
                            <h3>
                                Horaires
                            </h3>
                            <p>
                                {data.horaires}
                            </p>
                        </div>
                        <div className="p-footer_address">
                            <h3>
                                Contact
                            </h3>
                            <p>
                                {data.address}
                            </p>
                            <p>
                                <Link href={`mailto:${data.mail}`}>
                                    {data.mail}
                                </Link></p>
                            <p>
                                <Link href={`tel:${data.telephone}`}>
                                    {data.telephone}
                                </Link>
                            </p>
                        </div>
                        <Social data={social} />
                    </div>
                    <div className="p-footer_copyright">
                        <p>
                            Copyright <Year></Year> {process.env.NEXT_PUBLIC_CLIENT_NAME} - Tous droits réservés - <Link href="">
                                Mentions légales & politique de confidentialité
                            </Link> - Site par {process.env.NEXT_PUBLIC_SITE_AUTHOR}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;