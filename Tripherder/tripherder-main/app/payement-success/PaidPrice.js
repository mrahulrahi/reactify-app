"use client";

import React from 'react';
import { useSelector } from 'react-redux';

export default function PaidPrice() {

  const { paidPrice } = useSelector(state => state.billing);

  return (
    <span className="d-flex align-items-center justify-content-center">
      <p className='amount mb-0'>${paidPrice}</p>
    </span>
  )
}
