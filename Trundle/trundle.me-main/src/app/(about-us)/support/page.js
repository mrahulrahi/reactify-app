import React from 'react'
import { support } from "../data"
import AboutUs from '../AboutUs';
import { _metadata } from '../../lib/metadata';

export async function generateMetadata({ params }, parent) {

  return {
    title: _metadata?.support?.title,
    description: _metadata?.support?.description,
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
    <AboutUs dataList={support} textCenter={true} />
  )
}
