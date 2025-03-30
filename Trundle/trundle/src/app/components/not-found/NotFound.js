/* eslint-disable react/no-unescaped-entities */

"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import "./not-found.css";

export default function NotFound() {

  const router = useRouter();

  return (
    <div className="container h-100 four-not-page">
      <div className='d-flex flex-column gap-3 align-items-center justify-content-center my-lg-5 my-3 pt-3'>
        <Image
          src={"/images/404-error.svg"}
          alt="hero"
          // fill
          width={362}
          height={287}
          priority
          style={{ objectFit: "cover" }}
        />
        <p className="four-not">404 Error</p>
        <p className="oops">Oops!</p>
        <p className="err-message">Looks like you're in the wrong terminal.</p>
        <button onClick={() => {
          router.push("/travellers");
          router.refresh();
        }} className="btn btn-primary back-button">
          Go back to homepage
        </button>
      </div>
    </div>)
}
