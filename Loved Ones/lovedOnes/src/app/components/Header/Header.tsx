'use client';
import './Header.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import NotificationBox from '../NotificationBox/NotificationBox';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);
    const [login, setLogin] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const scrollThreshold = 10;

        if (scrollY > scrollThreshold) {
            document.body.classList.add('fixed');
        } else {
            document.body.classList.remove('fixed');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('open-menu', 'overflow-hidden');
        } else {
            document.body.classList.remove('open-menu', 'overflow-hidden');
        }
    }, [isOpen]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const currentPath = usePathname();
    const links = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/how-it-works', label: 'How it Works' },
        { path: '/sample-videos', label: 'Sample Videos' },
        { path: '/support', label: 'Support' },
    ];

    const profileLinks = [
        { path: '/home2', label: 'Home' },
        { path: '/create-video', label: 'Create a Video' },
        { path: '/how-it-works', label: 'How it Works' },
        { path: '/sample-videos', label: 'Sample Videos' },
        { path: '/my-videos', label: 'My Videos' },
    ];

    return (
        <>
            <header id="header">
                <nav className="navbar navbar-expand-xl">
                    <div className="container-fluid">
                        <div className="nav-inside d-flex align-items-center">
                            <Link className="navbar-logo has-img-contain" href="/">
                                <Image className="d-none d-sm-block" src="/images/logo.png" alt="Logo" width={320} height={320} quality={100} />
                                <Image className="d-sm-none" src="/images/logo-mob.png" alt="Logo" width={100} height={100} quality={100} />
                            </Link>
                            <button
                                id="navbarToggle"
                                className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
                                type="button"
                                aria-controls="collapsable-nav"
                                aria-expanded={isOpen}
                                aria-label="Toggle navigation"
                                onClick={toggleNavbar}
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className={`collapse navbar-collapse flex-grow-0 ms-auto ${isOpen ? 'show' : ''}`}
                                id="collapsable-nav"
                                ref={navbarRef}
                            >
                                <div className="navbar-inside">
                                    <ul className="navbar-nav">
                                        {login ? (
                                            profileLinks.map(link => (
                                                <li key={link.path} className={`nav-item ${link.path === currentPath ? 'active' : ''}`}>
                                                    <Link className="nav-link" href={link.path} onClick={handleLinkClick}>
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))



                                        ) : (
                                            links.map(link => (
                                                <li key={link.path} className={`nav-item ${link.path === currentPath ? 'active' : ''}`}>
                                                    <Link className="nav-link" href={link.path} onClick={handleLinkClick}>
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))
                                        )}

                                        {login && (<li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" href="/support" data-bs-toggle="dropdown" aria-expanded="false"> Help</Link>

                                            <div className="dropdown-menu">
                                                <Link className="dropdown-item d-flex align-items-center" href="/help"> Help</Link>
                                                <Link className="dropdown-item d-flex align-items-center" href="/support"> Support</Link>
                                            </div>
                                        </li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="header-btn d-flex align-items-center ms-auto ms-xl-0">
                                {login ? (
                                    <>
                                        <div className="dropdown">
                                            <Link href="#!" className="notification-btn d-flex align-items-center justify-content-center notification-dot" data-bs-toggle="dropdown" aria-expanded="false">
                                                <Image src="/images/notification-icon.svg" alt="Notification" width={24} height={24} quality={100} />
                                            </Link>
                                            <div className="dropdown-menu">
                                                <div className="notification-head">
                                                    <h5>Notification</h5>
                                                </div>
                                                <div className="notification-body">
                                                    <div className="notification-filter-row d-flex gap-2">
                                                        <div className="notification-badge">This Week</div>

                                                    </div>
                                                    <div className="notification-list">
                                                        <div className="notification-item">
                                                            <NotificationBox unread={true} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                                        </div>
                                                        <div className="notification-item">
                                                            <NotificationBox unread={true} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                                        </div>
                                                        <div className="notification-item">
                                                            <NotificationBox unread={false} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                                        </div>
                                                        <div className="notification-item">
                                                            <NotificationBox unread={false} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                                        </div>
                                                        <div className="notification-item">
                                                            <NotificationBox unread={false} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                                        </div>
                                                    </div>
                                                    <div className="notification-footer text-center mt-2">
                                                        <Link href="/notification" className="btn-link">View all</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="dropdown">
                                            <Link href="#!" className="profile-btn d-flex align-items-center justify-content-center has-img-cover" data-bs-toggle="dropdown" aria-expanded="false">
                                                <Image src="/images/profile-img.jpg" alt="Profile" width={48} height={48} quality={100} />
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item d-flex align-items-center" href="/profile">
                                                        <span className="dropdown-icon d-flex align-items-center justify-content-center has-img-contain">
                                                            <Image src="/images/profile-icon.svg" alt="" width={25} height={25} quality={100} /></span> Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item d-flex align-items-center" href="/transaction-history">
                                                        <span className="dropdown-icon d-flex align-items-center justify-content-center has-img-contain">
                                                            <Image src="/images/dollar-icon.svg" alt="" width={25} height={25} quality={100} /></span> Transaction History
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#signout-modal">
                                                        <span className="dropdown-icon d-flex align-items-center justify-content-center has-img-contain">
                                                            <Image src="/images/signout-icon.svg" alt="" width={25} height={25} quality={100} /></span> Sign out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link href="#!" className="btn-link" onClick={() => setLogin(true)}>Sign In</Link>
                                        <Link href="/signup" className="btn btn-blue">Sign Up</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header >


            <ConfirmationModal modalId="signout-modal" title="Sign Out" message="Are you sure you want to sign out?" cancelText="Cancel" buttonText="Sign Out" setButtonAction={() => setLogin(false)} />
        </>
    );
};

export default Header;