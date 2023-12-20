import Wow from "../animations/wow"

interface Props {
    data: {
        id: string;
        title: string;
        subtitle: string;
        paragraph: string;
    };
}

export default function Text({ data }: Props) {
    return (
        <section className="blocks-text">
            <div className="simple-container">
                <Wow className="anim-bottom" offset={0}>
                    <h2 className="baseTitle">{data.title}</h2>
                </Wow>
                <Wow className="anim-bottom" offset={0}>
                    <h3 className="baseSubtitle">{data.subtitle}</h3>
                </Wow>
                <Wow className="anim-bottom" offset={0}>
                    <p className="baseParagr">{data.paragraph}</p>
                </Wow>
            </div>
        </section>
    );
}