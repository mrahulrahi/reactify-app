'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname()

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Users', href: '/users' },
        { label: 'Blog', href: '/blog' }
    ]

    return (
        <header>
            <div className="container-fluid">
                <div className="navbar flex items-center justify-between">
                    <Link className="navbar-title" href="/">OLMS APP</Link>
                    <ul className="nav-menu flex gap-4">
                        {links.map(link =>
                            <li key={link.href} className="nav-item">
                                <Link
                                    className={`${link.href === pathname ? 'active' : ''} nav-link`}
                                    href={link.href}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="navbar-logo">
                        <img src="/logo.png" alt="logo" width={300} height={100} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header