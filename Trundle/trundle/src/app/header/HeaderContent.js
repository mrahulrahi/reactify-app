"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import DropDown from "./DropDown";
import { NavList } from "./nav-list/NavList";
import { usePathname } from 'next/navigation';

export default function HeaderContent({
  fromCountriesOptions,
  session,
  notificationList,
  role
}) {

  const pathname = usePathname();

  return (
    <header id="header" className={(pathname === "/" || pathname === "/tai" || pathname === "/help-plan-my-trip") && `d-none`}>
      <nav className="navbar navbar-expand-xl">
        <div className="container">
          <div className="nav-inside d-flex align-items-center justify-content-between">
            <Link
              className="navbar-brand flex-shrink-0"
              href={`${role === 1 ? `/influencer/my-profile` : role === 2 ? `/travellers` : "/"}`}
            >
              <Image
                src="/images/logo.svg"
                width={135}
                height={36}
                alt="Trundle"
                priority
              />
            </Link>
            <>
              {role === 1 ? (
                <DropDown />
              ) : (
                <NavList
                  countriesList={fromCountriesOptions}
                  session={session}
                  notificationList={notificationList}
                />
              )}
            </>
          </div>
        </div>
      </nav>
    </header>)
}
