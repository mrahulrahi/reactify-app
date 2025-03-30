import React from 'react';
import ItinerariyItemContent from "./ItinerariyItemContent"
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/authOptions';
import Link from 'next/link';

export const metadata = {
  title: 'Itineraries | Tripherder',
};

export default async function ItinerariyItemPage({ params }) {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  return (
    <>
      <div className="hero-container inner-hero-container d-flex align-items-end">
        <div className="hero-bg"><img src="../images/itinerary-result-banner.jpg" alt="banner" /></div>
        <div className="container">
          <div className="row position-relative z-3">
            <div className="col-lg-7 pe-lg-5">
              <div className="hero-content-box d-flex flex-column h-100">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb align-items-center">
                    <li class="breadcrumb-item"><Link href="/itineraries">Your Trip Results</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Your Trip Itinerary</li>
                  </ol>
                </nav>
                {/* <div className="view-map-cta gap-4 d-flex align-items-center mt-auto">
                  <span className="view-map-icon">
                    <PiMapPinAreaBold />
                  </span>
                  <button type="button" className="btn btn-view-map rounded-1 text-capitalize">View On Map</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ItinerariyItemContent itineraryId={params?.id} access_token={access_token} />
    </>
  )
}
