import Media from "../../components/media"
import Wow from "../animations/wow"
import Bouton from '../bouton';

interface CtaProps {
    data: {
        id: number;
        title: string;
        subtitle: string;
        paragraph: string;
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
        button: any;
    }
}

const Cta: React.FC<CtaProps> = ({ data }) => {
    return (
        <Wow className="anim-opacity" offset={0}>
            <section className="blocks-cta">
                <div className='blocks-cta_wrapper'>
                    <div className="blocks-cta__content">
                        <figure>
                            <Media data={data.image} />
                        </figure>
                        <div className="text">
                            <h2 className='title'>{data.title}</h2>
                            <h3 className='subtitle'>{data.subtitle}</h3>
                            <p>{data.paragraph}</p>
                        </div>
                        <Bouton data={data.button} />
                    </div>
                </div>
            </section>
        </Wow>
    );
}

export default Cta;