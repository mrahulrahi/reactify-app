"use client";

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ConfirmOrder from './ConfirmOrder';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const StripElement = ({ access_token, planId }) => {

  return (
    <Elements stripe={stripePromise}>
      <ConfirmOrder access_token={access_token} planId={planId} />
    </Elements>
  );
};

export default StripElement;
