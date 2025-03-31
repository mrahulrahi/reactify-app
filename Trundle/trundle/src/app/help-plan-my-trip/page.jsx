import React from 'react';
import HelpPlanMyTrip from "./HelpPlanMyTrip";
import { OG_IMAGE_HOME, SITE_NAME, _metadata } from '../lib/metadata';
import { getProbableMonthTravel } from "../lib/countries/countries";
import { getTravellingWithList } from '../lib/traveller/traveller';

export async function generateMetadata(parent) {

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: _metadata?.help_me_plan_my_trip?.title,
    description: _metadata?.help_me_plan_my_trip?.description,
    openGraph: {
      siteName: SITE_NAME, // Add your site name here
      url: 'https://trundle.me', // Add your website URL here
      images: [
        {
          url: OG_IMAGE_HOME,
          width: 1200,  // common recommended width
          height: 630   // common recommended height
        },
        ...previousImages
      ],
    },
    twitter: {
      card: 'summary_large_image', // Twitter card type
      title: _metadata?.help_me_plan_my_trip?.title,
      description: _metadata?.help_me_plan_my_trip?.description,
      image: {
        url: OG_IMAGE_HOME,
        width: 1200,  // common recommended width
        height: 630   // common recommended height
      },
    }
  }
}

export default async function HelpPlanMyTripPage() {

  const travellingWithList = await getTravellingWithList();

  const travellMonths = await getProbableMonthTravel();

  return <HelpPlanMyTrip
    travellMonths={travellMonths}
    travellingWithList={travellingWithList?.data}
  />;
}
