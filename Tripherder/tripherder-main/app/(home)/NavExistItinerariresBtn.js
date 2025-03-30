"use client";

import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';

export default function NavExistItinerariresBtn() {

  const { recommendedTrips } = useSelector((state) => state.home);

  return (
    <>
      {recommendedTrips &&
        <div className="row justify-content-center">
          <Link href={"/itineraries"}
            type="button" className="btn btn-default text-capitalize rounded-2">
            Itineraries
          </Link>
        </div>
      }
    </>
  )
}
