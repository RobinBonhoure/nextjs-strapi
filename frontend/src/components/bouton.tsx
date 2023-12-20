import React from "react";
import Link from "next/link";

type BoutonProps = {
    data: {
        type: string;
        link: {
            href: string;
            label: string;
            isExternal: boolean;
        }
    }
};

const Bouton: React.FC<BoutonProps> = ({ data }) => {
    data.link.href = data.link.href || '/'
    let customClass = `bouton v-${data.type}`
    return (
        <Link className={customClass} href={data.link.href} {...(data.link.isExternal && { target: "_blank" })}>
            {data.link.label}
        </Link>
    );
}

export default Bouton;