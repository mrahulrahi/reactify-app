import { getAllCountriesList } from "../lib/countries/countries";
import { getAppropriateAges, getBusinessCategories, getFrequentedBy } from "../lib/business";
import React from 'react';
import BusinessInfoContent from "./BusinessInfoContent";
import { OG_IMAGE, SITE_NAME, _metadata } from "../lib/metadata";

export async function generateMetadata(parent) {

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Business | Trundle",
    description: _metadata?.homepage?.description,
    openGraph: {
      siteName: SITE_NAME, // Add your site name here
      url: 'https://trundle.me', // Add your website URL here
      images: [
        {
          url: OG_IMAGE,
          width: 1200,  // common recommended width
          height: 630   // common recommended height
        },
        ...previousImages
      ],
    },
    twitter: {
      card: 'summary_large_image', // Twitter card type
      title: "Business | Trundle",
      description: _metadata?.homepage?.description,
      image: {
        url: OG_IMAGE,
        width: 1200,  // common recommended width
        height: 630   // common recommended height
      },
    }
  }
}


export default async function page() {
  const countriesList = await getAllCountriesList();
  const aproPriateAgesList = await getAppropriateAges();
  const businessCategoriesList = await getBusinessCategories();
  const frequentedByList = await getFrequentedBy();

  return <BusinessInfoContent
    aproPriateAgesList={aproPriateAgesList?.data}
    businessCategoriesList={businessCategoriesList?.data}
    frequentedByList={frequentedByList?.data}
    countriesList={countriesList}
  />
}

