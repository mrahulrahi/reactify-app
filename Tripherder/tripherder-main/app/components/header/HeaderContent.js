"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { excludeHeaderPathNamesList } from '../../lib/data';
import { FaUser } from "react-icons/fa";
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { IoLogOutSharp } from 'react-icons/io5';
import { LuFolderHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
import { authedPages } from '../../lib/data';

export default function HeaderContent({ session }) {

  const pathname = usePathname();

  const router = useRouter();

  const isAuthedPage = authedPages.includes(pathname);

  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrollHeight(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {(!isAuthedPage || (isAuthedPage && session)) &&
        <div style={{ transition: `background-color 0.5s ease`, background: scrollHeight > 70 ? `#F04722` : `white` }} className={`navbar-header container-fluid shadow position-fixed`}>
          {!excludeHeaderPathNamesList.includes(pathname) &&
            <Navbar expand="lg" className="container d-flex justify-content-between px-sm-0 px-2">
              <Link href="/">
                <Navbar.Brand>
                  <Image src="/images/img-2.png" width={50} objectFit='contain' height={50} alt="Tripherder" />
                </Navbar.Brand>
              </Link>
              {!session ?
                <>
                  <Navbar.Toggle
                    aria-controls="navbarTogglerDemo02"
                    className="btn-nav border-0 shadow-none" />
                  <Navbar.Collapse
                    style={{ background: scrollHeight > 70 ? `#F04722` : `white` }}
                    id="navbarTogglerDemo02"
                  >
                    <Nav
                      className="ms-auto d-flex gap-2 btn-content align-items-center"
                    >
                      <p className={`mb-0 ${scrollHeight > 70 ? `text-light` : `text-dark`}`} style={{ transition: `background-color 0.5s ease`, fontSize: "14px" }}>Don't have an account? <Link style={{ fontSize: "14px" }} className={scrollHeight > 70 ? `btn-link text-light fw-bold` : `btn-link`} href={'/auth/signin'}>Sign in</Link></p>
                    </Nav>
                  </Navbar.Collapse>
                </> :
                <Dropdown>
                  <Dropdown.Toggle style={{ backgroundColor: "rgb(251 232 224)", color: "#F04722" }} variant="link" id="dropdown-basic" className="text-decoration-none fw-bold ms-1">
                    <FaUser color='#F04722' /> <span className='p-1'>Hey user</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='border-0 shadow header-dropdown-menu'>
                    <Dropdown.Item
                      className='drop-down-item-header gap-1 d-flex align-items-center justify-content-start'
                      onClick={() => router.push("/my-profile")}
                    >
                      <FaUser className='text-muted' />
                      <p className='mb-0 text-muted'>My Profile</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className='drop-down-item-header gap-1 d-flex align-items-center justify-content-start'
                      onClick={() => router.push("/saved-itineraries")}
                    >
                      <LuFolderHeart className='text-muted' />
                      <p className='mb-0 text-muted'>Saved Itinerary</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className='drop-down-item-header gap-1 d-flex align-items-center justify-content-start'
                      onClick={() => router.push("/favorite-itineraries")}
                    >
                      <FaHeart className='text-muted' />
                      <p className='mb-0 text-muted'>Favorite Itinerary</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className='drop-down-item-header gap-1 d-flex align-items-center justify-content-start text-muted'
                      onClick={async () => {
                        await signOut({
                          redirect: false,
                        });
                        localStorage?.clear();
                        router.push("/auth/signin");
                        router.refresh();
                      }}
                    >
                      <IoLogOutSharp />
                      <p className='mb-0 text-muted'>Logout</p>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              }
            </Navbar>
          }
        </div>
      }
    </>
  )
}
