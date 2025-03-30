import React from 'react'
import ItinerariyItemContent from '../../components/ItinerariyItemContent';
import { getSharedItinerary } from '../../lib/itineraries';

export const metadata = {
  title: 'Shared Itineraries | Tripherder',
};

export default async function SharedItineraryPage({ params }) {

  const sessionId = params?.id;

  const favItinerary = await getSharedItinerary({ sessionId });

  return (
    <ItinerariyItemContent
      favItinerary={favItinerary}
      type="shared"
    />
  )
}
