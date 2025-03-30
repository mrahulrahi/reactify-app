"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { reduceLimit } from '../lib/itineraries';
import toast from 'react-hot-toast';

export default function ViewItineraryBtn({ access_token, arrayIndex }) {

  const [limitLoading, setLimitreduceLoading] = useState(false);

  const router = useRouter();

  return (
    <button
      disabled={limitLoading}
      onClick={async () => {
        setLimitreduceLoading(true);
        try {
          const res = await reduceLimit({ access_token });
          // setLimitreduceLoading(false);
          if (res?.status === true) {
            router.push(`/itineraries/${arrayIndex}`);
          }
        } catch (error) {
          toast.error(error?.data?.message);
          router.push(`/how-it-works`);
        }
      }} className="ti-details-btn bg-transparent border-0 text-start"
      style={limitLoading ? { cursor: "default" } : {}}
    >
      View Detailed Itinerary
      {limitLoading && (
        <div
          className="spinner-border spinner-border-sm ms-2"
          role="status"
        />
      )}
    </button>
  )
}
