import { NavLink } from 'react-router'

const Header = () => {

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
                                <NavLink
                                    className={({ isActive }) => `${isActive ? 'active' : ''} nav-link`}
                                    to={link.href}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className="navbar-logo">
                        <img src="/vite.svg" alt="logo" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header