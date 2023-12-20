import Text from "@/components/blocks/text";
import Etapes from "@/components/blocks/etapes";
import Header from "@/components/blocks/header";
import Cta from "@/components/blocks/cta";
import ImageText from "@/components/blocks/imageText";
import RailText from "@/components/blocks/railText";
import Valeurs from "@/components/blocks/valeurs";
import Estimateur from "@/components/blocks/estimateur";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.header":
      return <Header key={index} data={section} />;
    case "sections.etapes":
      return <Etapes key={index} data={section} />;
    case "sections.text":
      return <Text key={index} data={section} />;
    case "sections.cta":
      return <Cta key={index} data={section} />;
    case "sections.image-text":
      return <ImageText key={index} data={section} />;
    case "sections.rail-text":
      return <RailText key={index} data={section} />;
    case "sections.valeurs":
      return <Valeurs key={index} data={section} />;
    case "sections.estimateur":
      return <Estimateur key={index} data={section} />;
    default:
      return null;
  }
}
