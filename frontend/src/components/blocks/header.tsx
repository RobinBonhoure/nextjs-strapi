'use client'

import Media from "../media";
import Bouton from '../bouton'


interface HeaderProps {
    data: {
        title: string;
        subtitle: string;
        image: {
            data: {
                id: string;
                attributes: {
                    url: string;
                    name: string;
                    alternativeText: string;
                    width: number;
                    height: number;
                };
            }
        }
        button: any;
    }
}

const Header: React.FC<HeaderProps> = ({ data }) => {
    return (
        <header className="p-header">
            <div className="grid-container">
                <div className="col-md-1-6">
                    <div className="p-header_content">
                        <h1 className="title">
                            {data.title}
                        </h1>
                        <h3 className="subtitle">
                            {data.subtitle}
                        </h3>
                        {data.button && <Bouton data={data.button} />}
                    </div>
                </div>
                <div className="col-md-8-12">
                    <figure className="image">
                        {data.image && <Media data={data.image} />}
                    </figure>
                </div>
            </div>
        </header>
    );
}

export default Header;