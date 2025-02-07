'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Users', href: '/users' },
        { label: 'Blog', href: '/blog' }
    ]

    return (
        <header>
            <div className="container-fluid">
                <div className="navbar d-flex align-items-center justify-content-between">
                    <a className="navbar-title" href="#">OLMS APP</a>
                    <ul className="nav-menu d-flex gap-4">
                        {links.map(link =>
                            <li key={link.href} className="nav-item">
                                <Link 
                                    className={`${link.href === currentPath ? 'active' : ''} nav-link`} 
                                    href={link.href} 
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="navbar-logo"><Image src="/logo.png" alt="logo" width={300} height={100} quality={100} /></div>
                </div>
            </div>
        </header>
    )
}

export default NavBar