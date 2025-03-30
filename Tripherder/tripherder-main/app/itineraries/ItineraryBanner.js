"use client";

import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';

export default function ItineraryBanner() {

  const {
    _startDate,
    _endDate,
  } = useSelector((state) => state.preferences);

  const { recommendedTrips } = useSelector((state) => state.home);

  const completedTripCount = recommendedTrips?.merged_data?.total_itineraries_count;

  return (
    <div className="hero-container inner-hero-container d-flex align-items-center">
      <div className="hero-bg"><img src="./images/itinerary-banner.jpg" alt="banner" /></div>
      <div className="container">
        <div className="row position-relative z-3">
          <div className="col-lg-7 pe-lg-5">
            {!completedTripCount > 0 ?
              null :
              <div className="hero-content-box d-flex flex-column">
                <h1>Your Trip Results</h1>
                <h3>
                  We found {completedTripCount} trips for you between {moment(_startDate).format("MMMM D, YYYY")}, and {moment(_endDate).format("MMMM D, YYYY")}.
                </h3>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
