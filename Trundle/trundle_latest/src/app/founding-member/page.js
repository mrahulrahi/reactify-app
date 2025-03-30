import React from 'react';
import FoundingMember from "./FoundingMember";
import { OG_IMAGE, SITE_NAME } from '../lib/metadata';

export async function generateMetadata(parent) {

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Founding Member | Trundle",
    openGraph: {
      siteName: SITE_NAME, // Add your site name here
      url: 'https://trundle.me', // Add your website URL here
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630
        },
        ...previousImages
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Founding Member | Trundle",
      image: {
        url: OG_IMAGE,
        width: 1200,
        height: 630
      },
    }
  }
}

export default function page() {
  return (
    <FoundingMember />
  )
}
