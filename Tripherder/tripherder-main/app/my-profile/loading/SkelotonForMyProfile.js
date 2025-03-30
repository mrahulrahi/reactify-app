"use client";

import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function SkelotonForMyProfile() {
  return (
    <div className='container my-5'>
      <div className="row gap-3">
        <div className="col-lg-4">
          <Skeleton height={600} />
        </div>
        <div className="col-lg-6">
          <Skeleton count={7} height={50} className="mb-3" />
        </div>
      </div>
    </div>
  )
}
