"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

export default function PaddingFixed({ children }) {
  const pathname = usePathname();

  const withoutPaddingTopPages = [
    '/',
    '/how-it-works',
    '/auth/signin',
    '/auth/signup',
    '/select-favorite-activities',
    '/select-favorite-artist',
    '/auth/otp-verification',
    '/auth/forgot-password',
    '/auth/update-password',
  ]

  return (
    <div style={withoutPaddingTopPages.includes(pathname) ? {} : { paddingTop: 70 }}>
      {children}
    </div>
  )
}
