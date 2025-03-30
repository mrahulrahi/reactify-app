import React from 'react';
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Toaster } from "react-hot-toast";
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/authOptions';

export default async function LayoutContent({ children }) {

  const session = await getServerSession(authOptions);

  const role = session?.user?.user_role;

  return (
    <>
      <Header />
      {children}
      <Toaster />
      <Footer role={role} />
    </>
  )
}
