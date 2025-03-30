import React from 'react'
import ItinerariyItemContent from '../../components/ItinerariyItemContent'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/authOptions';
import { getSavedItineraryById } from '../../lib/itineraries';

export const metadata = {
  title: 'Saved Itineraries | Tripherder',
};

export default async function Page({ params }) {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  const id = params?.id;

  const favItinerary = await getSavedItineraryById({ id, access_token });

  return (
    <ItinerariyItemContent
      itineraryId={params?.id}
      access_token={access_token}
      favItinerary={favItinerary}
      type="save"
    />
  )
}
