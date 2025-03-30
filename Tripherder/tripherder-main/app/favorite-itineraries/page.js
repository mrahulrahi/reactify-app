import React from 'react';
import FavItineraries from "./FavItineraries";
import Link from 'next/link';
import { authOptions } from '../api/auth/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Favorite Itineraries | Tripherder',
};

export default async function Page() {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  if (!access_token) {
    redirect("/auth/signin");
  };

  return (
    <>
      <div className="hero-container inner-hero-container d-flex align-items-center">
        <div className="hero-bg">
          <img
            src="./images/favourite-itinerary-banner.jpg"
            alt="banner"
          />
        </div>
        <div className="container">
          <div className="row position-relative z-3">
            <div className="col-lg-7 pe-lg-5">
              <div className="hero-content-box d-flex flex-column">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb align-items-center">
                    <li className="breadcrumb-item">
                      <Link href="/">
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    >
                      Your Favorite Itinerary
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FavItineraries />
    </>
  )
}
