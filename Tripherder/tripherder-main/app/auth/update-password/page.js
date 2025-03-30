import React from 'react'
import UpdatePasswordContent from './UpdatePasswordContent'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/authOptions';

export const metadata = {
  title: 'Update Password | Tripherder',
};

export default async function UpdatePasswordPage() {
  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  return <UpdatePasswordContent
    access_token={access_token}
  />
}
