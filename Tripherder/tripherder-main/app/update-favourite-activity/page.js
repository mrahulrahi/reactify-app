import React from 'react';
import UserAccountSettingsCard from '../components/user-account-settings/UserAccountSettingsCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import { redirect } from 'next/navigation';
import FavouriteActivitiesContent from '../components/fav-activity-content/FavoritActivityContent';
import { getUserDetails } from '../lib/auth';
import { getFavouiriteActivities, getSavedPreferences } from '../lib/preferences';
import Link from 'next/link';

export default async function UpdateFavouriteAritist() {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  const userDetails = await getUserDetails({ access_token });

  if (!access_token) {
    redirect("/");
  }

  let activitiesList;

  let selectedArtists;

  if (access_token) {
    activitiesList = await getFavouiriteActivities(access_token);
    selectedArtists = await getSavedPreferences(access_token);
  }

  return (
    <>
      <div className="page-top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pth-content-box d-flex flex-column align-items-center justify-content-between">
                <h3>Favorite Activity</h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><Link href="/my-profile">Profile</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Favorite Activity</li>
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
                    <header className="general-detail-text border-0 pb-0">
                      <h2>Update your favourite Activity</h2>
                    </header>
                    <FavouriteActivitiesContent
                      isSmall
                      access_token={access_token}
                      activitiesList={activitiesList}
                      selectedArtists={selectedArtists}
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
