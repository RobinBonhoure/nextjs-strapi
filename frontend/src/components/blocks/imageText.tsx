import Media from "../../components/media"
import Wow from '../animations/wow';
import Parallax from '../animations/parallax';

interface Props {
    data: {
        id: number;
        title: string;
        subtitle: string;
        paragraph: string;
        full: boolean;
        reverse: boolean;
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
            };
        };
    }
}

const ImageText: React.FC<Props> = ({ data }) => {
    return (
        <section className="blocks-imageText">
            <div className="grid-container">
                <div className={data.full ? (data.reverse ? 'col-md-1-6 blocks-imageText_image full reverse' : 'col-md-7-12 blocks-imageText_image full') : (data.reverse ? 'col-md-1-6 blocks-imageText_image' : 'col-md-7-12 blocks-imageText_image')}>
                    <Parallax
                        start="translateY(-5vw)"
                        end="translateY(5vw)"
                    >
                        <figure>
                            <Media data={data.image} />
                        </figure>
                    </Parallax>
                </div>
                <div className={data.reverse ? 'col-md-8-11 blocks-imageText_text' : 'col-md-2-5 blocks-imageText_text'}>
                    <Wow className="anim-bottom" offset={100}>
                        <h2 className="baseTitle">
                            {data.title}
                        </h2>
                        <h3 className="baseSubtitle">
                            {data.subtitle}
                        </h3>
                        <p className="baseParagr">
                            {data.paragraph}
                        </p>
                    </Wow>
                </div>
            </div>
        </section>
    );
}

export default ImageText;