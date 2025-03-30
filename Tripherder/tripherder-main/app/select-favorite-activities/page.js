import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/authOptions';
import FavouriteActivitiesContent from '../components/fav-activity-content/FavoritActivityContent';
import { getArtists, getFavouiriteActivities, getSavedPreferences } from '../lib/preferences';

export const metadata = {
  title: 'Select Favorite Itineraries | Tripherder',
};

export default async function FavouriteActivitiesPage() {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  let artistsList;

  let selectedArtists;

  let activitiesList;

  if (access_token) {
    activitiesList = await getFavouiriteActivities(access_token);
    selectedArtists = await getSavedPreferences(access_token);
    artistsList = await getArtists();
  }

  return (
    <>
      <div className="hero-container inner-hero-container d-flex align-items-center">
        <div className="hero-bg"><img src="./images/Activity-banner.png" alt="banner" /></div>
        <div className="container">
          <div className="row position-relative z-3">
            <div className="col-lg-6 pe-lg-4">
              <div className="hero-content-box d-flex flex-column">
                <h1>Why do you travel?</h1>
                <p className="fw-normal">
                  Share your interests and we'll curate a tailored itinerary filled with engaging activities just for you.                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <FavouriteActivitiesContent
                access_token={access_token}
                activitiesList={activitiesList}
                selectedArtists={selectedArtists}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
