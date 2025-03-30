import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import PreferencesModals from './PreferencesModals';
import {
  getArtists,
  getFavouiriteActivities,
  getSavedPreferences
} from '../lib/preferences';

export default async function PreferencesContent() {
  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  let activitiesList;
  let selectedArtists;
  let artistsList;

  if (access_token) {
    activitiesList = await getFavouiriteActivities(access_token);
    selectedArtists = await getSavedPreferences(access_token);
    artistsList = await getArtists();
  }

  return (
    <PreferencesModals
      selectedArtists={selectedArtists}
      artistsList={artistsList}
      access_token={access_token}
      activitiesList={activitiesList}
      session={session}
    />
  )
}
