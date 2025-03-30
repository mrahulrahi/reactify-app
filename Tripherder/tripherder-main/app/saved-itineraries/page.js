import React from 'react';
import SavedItineraries from "./SavedItineraries"
import Link from 'next/link';

export const metadata = {
  title: 'Saved Itineraries | Tripherder',
};

export default async function Page() {

  return (
    <>
      <div className="hero-container inner-hero-container d-flex align-items-center">
        <div className="hero-bg"><img src="./images/saved-itinerary-banner.jpg" alt="banner" /></div>
        <div className="container">
          <div className="row position-relative z-3">
            <div className="col-lg-7 pe-lg-5">
              <div className="hero-content-box d-flex flex-column">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb align-items-center">
                    <li class="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Your Saved Trips</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SavedItineraries />
    </>
  )
}
