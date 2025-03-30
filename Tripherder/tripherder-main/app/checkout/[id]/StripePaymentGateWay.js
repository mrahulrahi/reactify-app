"use client";

import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import StripForm from "./StripeForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripePaymentGateWay({
  clientSecret,
  access_token,
  userDetails,
  price
}) {

  return (
    <Elements stripe={stripePromise}
      options={{
        clientSecret: clientSecret
      }}>
      <StripForm
        userDetails={userDetails}
        access_token={access_token}
        price={price}
      />
    </Elements>
  )
}
