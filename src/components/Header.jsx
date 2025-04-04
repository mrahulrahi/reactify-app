import { NavLink } from 'react-router'

const Header = () => {

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Users', href: '/users' },
        { label: 'Blog', href: '/blog' }
    ]

    return (
        <header className="w-full fixed font-oswald bg-first z-[99]">
            <div className="container w-full">
                <div className="navbar flex items-center justify-between h-[80px]">
                    <a href="/" className="navbar-logo w-40">
                        <img className="w-full h-full object-contain" src="/vercel.svg" alt="logo" />
                    </a>
                    <ul className="nav-menu flex gap-4">
                        {links.map(link =>
                            <li key={link.href} className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link font-varelaRound text-[22px] font-extrabold  hover:text-[yellowgreen] ${isActive ? 'text-[yellowgreen]' : 'text-second'}`}
                                    to={link.href}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className="flex gap-4">
                        <span className="h-8"><img className="w-auto h-full object-contain" src="/react.svg" alt="" /></span>
                        <span className="h-8"><img className="w-auto h-full object-contain" src="/vite.svg" alt="" /></span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header