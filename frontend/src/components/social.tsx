import React from "react";
import Link from "next/link";

interface Links {
    url: string;
    type: string;
}

interface SocialProps {
    data: {
        data: {
            attributes: {
                links: Links[];
            }
        }
    };
}

const Social: React.FC<SocialProps> = ({ data }) => {
    if (data.data === null) return;
    const socialData = data.data.attributes.links;
    return (
        <div className="social">
            {socialData.map((item: any, index: number) => (
                <Link key={index} href={item.url} target="_blank">
                    <div className="icon">
                        <span className={`icon-${item.type}`}></span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Social;