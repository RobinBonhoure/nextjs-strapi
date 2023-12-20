import Media from "../../components/media"
import Wow from "../animations/wow"

interface ValeursProps {
    title: string;
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
        paragraph: string;
        valeurs: ValeursProps[];
    }
}

const Valeurs: React.FC<Props> = ({ data }) => {
    return (
        <section className="blocks-valeurs">
            <hgroup>
                <h2 className="baseTitle">{data.title}</h2>
                <h3 className="baseSubtitle">{data.subtitle}</h3>
                <p className="baseParagr">{data.paragraph}</p>
            </hgroup>
            <div className="blocks-valeurs__content">
                {data.valeurs.map((valeur, index) => (
                    <Wow key={index} className={`anim-bottom delay--${index % 4}`} offset={0}>
                        <article className="item">
                            <figure className="img">
                                <Media data={valeur.image} />
                            </figure>
                            <h4>{valeur.title}</h4>
                            <p>{valeur.paragraph}</p>
                        </article>
                    </Wow>
                ))}
            </div>
        </section >
    );
}

export default Valeurs;