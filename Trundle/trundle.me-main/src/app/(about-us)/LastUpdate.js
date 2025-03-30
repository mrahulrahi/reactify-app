'use client';

import moment from 'moment'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function LastUpdate() {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/support" &&
        <div className='last-update'>
          <p className='mb-md-4 mb-3' style={{ fontSize: "13px", opacity: "30%" }}>
            Last updated: {moment(new Date()).format(`Do MMMM, YYYY`)}
          </p>
        </div>
      }
    </>
  )
}
