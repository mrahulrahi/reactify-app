import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../../api/auth/authOptions';
import FooterContent from "./FooterContent"

export default async function Footer() {

  const session = await getServerSession(authOptions);

  return <FooterContent session={session} />
}
