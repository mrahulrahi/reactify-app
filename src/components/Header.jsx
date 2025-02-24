import { useLocation } from 'react-router-dom'

const Header = () => {
    const { pathname } = useLocation();

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Users', href: '/users' },
        { label: 'Blog', href: '/blog' }
    ]

    return (
        <header>
            <div className="container w-full">
                <div className="navbar flex items-center justify-between">
                    <a className="navbar-title" href="/">OLMS APP</a>
                    <ul className="nav-menu flex gap-4">
                        {links.map(link =>
                            <li key={link.href} className="nav-item">
                                <a
                                    className={`${link.href === pathname ? 'active' : ''} nav-link`}
                                    href={link.href}
                                >
                                    {link.label}
                                </a>
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