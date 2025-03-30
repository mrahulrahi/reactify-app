import React from 'react'
import { authOptions } from '../api/auth/authOptions';
import { getServerSession } from 'next-auth';
import {
  getArtists,
  getSavedPreferences
} from '../lib/preferences';
import Artists from "../(home)/Artists";

export default async function FavouriteArtistsPage({ searchParams }) {

  const queryString = Object.keys(searchParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          searchParams[key]
        )}`
    )
    .join("&");

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  let artistsList;

  let selectedArtists;

  if (access_token) {
    artistsList = await getArtists(queryString);
    selectedArtists = await getSavedPreferences(access_token);
  }

  return (
    <>
      <div className="hero-container inner-hero-container d-flex align-items-center">
        <div className="hero-bg"><img src="./images/Artists-banner.png" alt="banner" /></div>
        <div className="container">
          <div className="row position-relative z-3">
            <div className="col-lg-6 pe-lg-4">
              <div className="hero-content-box d-flex flex-column">
                <h1>Why do you&nbsp;travel?</h1>
                <p className="fw-normal">
                  What musicians would you like to see? Based on your music choice, The
                  application will form a suitable journey for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container artists-page-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Artists
                selectedArtists={selectedArtists?.spotify_data}
                _artistsList={artistsList}
                access_token={access_token}
                session={session}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
