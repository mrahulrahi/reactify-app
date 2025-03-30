'use client';

import Link from 'next/link';
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import LogoutButton from "./logout-btn/LogoutButton";
import { FaRegUserCircle, FaSortDown } from 'react-icons/fa';
import "./drop-down.css"

export default function DropDown() {

  return (
    <Dropdown>
      <Dropdown.Toggle className='bg-transparent border-0 p-0'>
        <div className="header-profile-img d-flex align-items-start">
          <span className="hp-img">
            <FaRegUserCircle />
          </span>
          <span className="hp-arrow d-xl-flex">
            <FaSortDown />
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className='border-0 shadow-none'>
        <Dropdown.Item>
          <Link href="/influencer/update-influencer-profile">
            Edit
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <LogoutButton />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
