import React from 'react'
import { support } from "../data"
import AboutUs from '../AboutUs';
import { OG_IMAGE, SITE_NAME, _metadata } from '../../lib/metadata';

export async function generateMetadata(parent) {

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: _metadata?.support?.title,
    description: _metadata?.support?.description,
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
      title: _metadata?.support?.title,
      description: _metadata?.support?.description,
      image: {
        url: OG_IMAGE,
        width: 1200,  // common recommended width
        height: 630   // common recommended height
      },
    }
  }
}

export default function Page() {
  return (
    <AboutUs dataList={support} textCenter={true} />
  )
}
