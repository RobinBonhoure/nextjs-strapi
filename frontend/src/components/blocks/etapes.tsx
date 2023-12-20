import Media from "../../components/media"
import Wow from "../animations/wow"

interface EtapeProps {
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
}

interface Props {
    data: {
        id: number;
        title: string;
        subtitle: string;
        etapes: EtapeProps[];
    }
}

const Etapes: React.FC<Props> = ({ data }) => {
    return (
        <section className="blocks-etapes">
            <div className="simple-container">

                <Wow className="anim-bottom" offset={0}>
                    <hgroup>
                        <h2>{data.title}</h2>
                        <h3>{data.subtitle}</h3>
                    </hgroup>
                </Wow>
                <div className="blocks-etapes__content">
                    {data.etapes.map((etape, index) => (
                        <Wow key={index} className={`anim-bottom delay--${index % 2}`} offset={0}>
                            <article className="item" >
                                <h4>{etape.title}</h4>
                                <p>{etape.paragraph}</p>
                                {etape.image && (
                                    <figure>
                                        <Media data={etape.image} />
                                    </figure>
                                )}
                            </article>
                        </Wow>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Etapes;