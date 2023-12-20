import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface MediaProps {
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
}

export default function Media({ data }: { data: MediaProps }) {
  if (data.data === null) return;
  const imgUrl = getStrapiMedia(data.data.attributes.url);
  return (
    <Image
      src={imgUrl || ""}
      alt={data.data.attributes.alternativeText || "none provided"}
      width={data.data.attributes.width}
      height={data.data.attributes.height}
    />
  );
}