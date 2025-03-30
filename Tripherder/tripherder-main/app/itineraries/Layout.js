"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events?.on('routeChangeStart', handleStart);
    router.events?.on('routeChangeComplete', handleComplete);
    router.events?.on('routeChangeError', handleComplete);

    return () => {
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleComplete);
      router.events?.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading &&
        <div
          className="spinner-border text-danger spinner-border-sm ms-2"
          role="status"
        />
      }
      {children}
    </>
  );
};

export default Layout;
