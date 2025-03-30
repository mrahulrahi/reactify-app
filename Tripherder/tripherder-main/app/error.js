"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Error | Tripherder',
};

export default function Error() {
  return (
    <div className=" my-5  py-5 page-not-found-header d-flex align-items-center justify-content-center flex-column">
      <div>
        <Image width={200} height={200} src="/images/404-img.png" alt="404-img" />
      </div>
      <div className="page-not-found-content page-not-found-header d-flex align-items-center justify-content-center flex-column">
        <h1>Oops !</h1>
        {/* <h3>404 - PAGE NOT FOUND</h3>
         */}
        <p>
          {/* The page you are looking for might have been removed had its name
          changed or is temporarily unavailable */}
          Something went wrong
        </p>
        <Link href={"/"} className="btn cta-gs">Go to Home</Link>
      </div>
    </div>
  )
}
