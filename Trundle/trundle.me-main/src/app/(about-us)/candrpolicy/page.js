import React from 'react';
import { cancellationAndRefundPolicy } from '../data';
import AboutUs from "../AboutUs";
import { _metadata } from '../../lib/metadata';

export async function generateMetadata({ params }, parent) {

  return {
    title: _metadata?.cancellation_refund_policy?.title,
    description: _metadata?.cancellation_refund_policy?.description,
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

export default function TermsAndCondition() {
  return <AboutUs dataList={cancellationAndRefundPolicy} />
}
