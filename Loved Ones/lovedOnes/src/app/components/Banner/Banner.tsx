'use client'
import Link from 'next/link';
import './Banner.css'
import { usePathname } from 'next/navigation';

const Banner = () => {
    const pathname = usePathname();
    
  
    const pathParts = pathname.split('/');
    const previousPage = (pathParts[pathParts.length - 2] || 'home')
        .replaceAll('-', ' ')
        .replace(/^\w/, c => c.toUpperCase());
    const previousPageLink = pathParts[pathParts.length - 2];


    const currentPage = pathname.split('/').pop()?.replaceAll('-', ' ').replace(/^\w/, c => c.toUpperCase()) || '';
    

    return (
        <div className="banner-container">
            <div className="container" data-aos="fade-up" suppressHydrationWarning>
                <div className="row">
                    <div className="col-md-12">
                        <div className="banner-content d-flex flex-column align-items-center text-center">
                            <h1>{currentPage}</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><Link href={`/${previousPageLink}`}>{previousPage}</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{currentPage}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner