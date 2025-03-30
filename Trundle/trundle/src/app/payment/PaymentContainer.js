"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
   "pk_test_51NuYDMSILOF49mkPMCZgoi7VfJxMNPzDDXO7TqYCUMbo4yROLGlzwy7sabc8MQJtbSYw4EfNu0AKk8sB1KdhKxGX00IIjenRH9"
);

export default function PaymentContainer() {

   const { intent } = useSelector((state) => state.payment);

   return (
      <Elements stripe={stripePromise} options={intent}>
         <CheckoutForm />
      </Elements>
   );
}
