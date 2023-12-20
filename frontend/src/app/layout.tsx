import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../style/app.scss'
import { getData } from "@/utils/get-data";
import Nav from '../components/nav'
import Footer from '../components/footer'

const poppins = Poppins({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Default meta title',
  description: 'Default meta description',
}

// TODO: Config strapi
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [navigationData, footerData, socialData] = await Promise.all([getData(`/navigation`), getData(`/footer`), getData(`/social`)]);

  const links = navigationData.data !== null ? navigationData.data.attributes : [];
  return (
    <html lang="fr">
      <body className={poppins.className}>
        {navigationData.data !== null && <Nav logo={links.logo} links={links.links} />}
        {children}
        {footerData.data !== null && <Footer links={links.links} data={footerData.data.attributes} social={socialData} />}
      </body>
    </html>
  )
}
