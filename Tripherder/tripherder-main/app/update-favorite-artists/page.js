import React from 'react';
import UserAccountSettingsCard from '../components/user-account-settings/UserAccountSettingsCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import { redirect } from 'next/navigation';
import { getUserDetails } from '../lib/auth';
import { getArtists, getSavedPreferences } from '../lib/preferences';
import Artists from "../(home)/Artists"
import Link from 'next/link';

export const metadata = {
  title: 'Update Favorite Artists | Tripherder',
};

export default async function UpdateFavouriteAritist({ searchParams }) {

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

  const userDetails = await getUserDetails({ access_token });

  if (!access_token) {
    redirect("/");
  }

  let artistsList;

  let selectedArtists;

  if (access_token) {
    artistsList = await getArtists(queryString);
    selectedArtists = await getSavedPreferences(access_token);
  }

  return (
    <>
      <div className="page-top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pth-content-box d-flex flex-column align-items-center justify-content-between">
                <h3>Favorite Artist</h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><Link href="/my-profile">Profile</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Favorite Artist</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container profile-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile-inner-box d-flex flex-wrap">
                <UserAccountSettingsCard
                  access_token={access_token}
                  profilePic={userDetails?.data?.photo}
                />
                <div className="profile-body-wrapper">
                  <div className="profile-edit-content">
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
          </div>
        </div>
      </div>
    </>
  )
}
