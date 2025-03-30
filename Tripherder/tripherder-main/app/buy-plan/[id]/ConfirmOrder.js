"use client";

import React, { useState } from 'react';
import { confirmOrderToPurchase, getIntentIDandSecret } from '../../lib/payment';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function ConfirmOrder({ planId, access_token }) {

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const [payementIntent, setPayementIntent] = useState('');

  const [clientSecret, setClientSecret] = useState('');

  const confirmOrder = async () => {
    await confirmOrderToPurchase({ access_token, clientSecret });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(payementIntent, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'John Doe',
          address: {
            city: 'New York',
            country: 'US',
            line1: '123 Test St',
            postal_code: '10001',
            state: 'NY',
          },
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      // console.log(result?.paymentIntent?.id, 'client secret');
      setClientSecret(result?.paymentIntent?.id);
    }
  };

  const butOnClick = async () => {
    const res = await getIntentIDandSecret({ access_token });
    // console.log(res?.data?.client_secret, 'Payment intent');
    if (res?.data?.client_secret) {
      setPayementIntent(res?.data?.client_secret);
    }
  }

  return (
    <div className='container'>
      <button onClick={butOnClick}>Button 1</button>
      <button
        className='btn btn-warning text-light'
        onClick={confirmOrder}
      >
        Buy plan
      </button>
      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
