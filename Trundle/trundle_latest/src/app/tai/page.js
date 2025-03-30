import React from "react";
import TAiPageContent from "./tAiPageContent";
import { OG_IMAGE, SITE_NAME, _metadata } from "../lib/metadata";

export async function generateMetadata(parent) {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: _metadata?.tai?.title,
    description: _metadata?.tai?.description,
    openGraph: {
      siteName: SITE_NAME, // Add your site name here
      url: 'https://trundle.me', // Add your website URL here
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: _metadata?.tai?.title,
      description: _metadata?.tai?.description,
      image: {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    },
  };
}

export default function page() {
  return <TAiPageContent />;
}