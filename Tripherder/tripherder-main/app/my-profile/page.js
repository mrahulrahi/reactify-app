import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react';
import { authOptions } from '../api/auth/authOptions';
import MyProfile from './MyProfileForm';
import { getUserDetails } from '../lib/auth';
import { getAllCountry, getStates } from '../lib/country';
import Skeleton from 'react-loading-skeleton';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'My Profile | Tripherder',
};

export default async function MyProfilePage() {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  let userDetails;
  let states;
  let phoneCodes;

  if (!access_token) {
    redirect("/auth/signin");
  }

  if (access_token) {
    userDetails = await getUserDetails({ access_token });
    states = await getStates({ access_token });
    phoneCodes = await getAllCountry({ access_token });
  }

  return (
    <Suspense fallback={
      <div className="container my-5">
        <div className="row">
          <div className="col-4">
            <Skeleton count={1} height={600} />
          </div>
          <div className="col-8">
            <Skeleton count={1} height={600} />
          </div>
        </div>
      </div>
    }>
      <MyProfile
        states={states}
        access_token={access_token}
        userData={userDetails?.data}
        phoneCodes={phoneCodes?.data}
      />
    </Suspense>
  );
}
