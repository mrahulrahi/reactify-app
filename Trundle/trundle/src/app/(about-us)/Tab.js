'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Tab() {
  const pathname = usePathname();

  return (
    <div className='d-flex align-items-center justify-content-center' style={{ marginTop: "20px", borderBottom: "1px solid", borderColor: "#E3E0EA" }}>
      <div className='d-flex align-content-center tabs gap-lg-5 gap-md-4 gap-3 slider_'>
        <Link href={'/privacypolicy'} className={`tab ${pathname === `/privacypolicy` && 'active'}`}>Privacy Policy</Link>
        <Link href={'/tandc'} className={`tab ${pathname === `/tandc` && 'active'}`}>Terms and Conditions</Link>
        <Link href={'/candrpolicy'} className={`tab ${pathname === `/candrpolicy` && 'active'}`}>Cancellation & Refund Policy</Link>
        <Link href={'/tands'} className={`tab ${pathname === `/tands` && 'active'}`}>Terms of Service</Link>
        <Link href={'/support'} className={`tab ${pathname === `/support` && 'active'}`}>Support</Link>
      </div>
    </div>
  )
}
