import { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
    title: '404 error - Page not found',
    description: '404 meta description',
}

export default function NotFound() {
    return (
        <div className='not-found'>
            <h1 className='h1'>Error 404</h1>
            <p>Cette page est introuvable</p>
            <Link className="bouton" href={'/'}>
                Retour à l&apos;accueil
            </Link>
        </div>
    )
}