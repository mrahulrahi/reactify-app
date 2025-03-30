import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/authOptions';
import { getUserDetails } from '../lib/auth';
import TransactionHistoryContent from './TransactionHistoryContent';

export const metadata = {
  title: 'Transaction History | Tripherder',
};

export default async function TransactionHistoryPage() {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  const userDetails = await getUserDetails({ access_token });

  if (!access_token) {
    redirect("/");
  }

  return <TransactionHistoryContent
    access_token={access_token}
    profilePic={userDetails?.data?.photo}
  />
}
