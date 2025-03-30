"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "./not-found.css";

export const metadata = {
  title: '404 | Tripherder',
};

export default function _404Page() {
  return (
    <div className="my-md-5 page-not-found-header d-flex align-items-center justify-content-center flex-column">
      <div>
        <Image width={200} height={200} src="/images/404-img.png" alt="404-img" />
      </div>
      <div className="page-not-found-content page-not-found-header d-flex align-items-center justify-content-center flex-column">
        <h1 className='text-center oops'>Oops !</h1>
        <h3 className='text-center four-not'>404 - Page not found</h3>
        <p className='text-center message px-2'>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable
          Something went wrong
        </p>
        <Link href={"/"} className="btn cta-gs text-center">Go to Home</Link>
      </div>
    </div>
  )
}
