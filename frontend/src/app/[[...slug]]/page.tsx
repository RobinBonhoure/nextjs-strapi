import { getPageBySlug } from "@/utils/get-page-by-slug";
import { sectionRenderer } from '../../utils/section-renderer';
import type { Metadata } from 'next';
import { FALLBACK_SEO } from "../../utils/constants";

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug || "home";
  const page = await getPageBySlug(slug);
  if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].attributes.seo

  return {
    title: metadata.metatitle,
    description: metadata.metadescription
  }
}

export default async function PageRoute({ params }: { params: { slug: string } }) {
  const slug = params.slug || "home";
  const page = await getPageBySlug(slug);
  if (page.data === null) return null;
  const data = page.data[0].attributes;
  const contentSections = data.components;
  return (
    <>
      {contentSections.map((section: any, index: number) => sectionRenderer(section, index))}
    </>
  )
}
