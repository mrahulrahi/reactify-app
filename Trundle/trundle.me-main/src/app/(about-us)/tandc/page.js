import React from 'react'
import '../privacy.css';
import { termsAndConditions } from "../data"
import AboutUs from '../AboutUs';
import { _metadata } from '../../lib/metadata';

export async function generateMetadata({ params }, parent) {

  return {
    title: _metadata?.terms_and_conditions?.title,
    description: _metadata?.terms_and_conditions?.description,
    openGraph: {
      images: [
        {
          url: "https://api.trundle.me/static/assets/logo_.jpg",
          width: 1200,  // common recommended width
          height: 630   // common recommended height
        },
      ],
    },
  }
}

export default function Page() {
  return (
    <AboutUs dataList={termsAndConditions} />
  )
}
