import React, { useState } from 'react';
import {
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import {
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import { confirmOrderToPurchase } from '../../lib/payment';
import { setPaidAmount } from '../../store/slices/billing';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function StripeForm({
  access_token,
  userDetails,
  price
}) {

  const stripe = useStripe();

  const elements = useElements();

  const [message, setMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Prevents automatic redirection
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }

    if (paymentIntent) {
      const paymentIntentId = paymentIntent?.id;
      const res = await confirmOrderToPurchase({ access_token, paymentIntentId });
      if (res?.status === true) {
        toast.success(res?.message);
        router.replace("/payement-success");
        dispatch(setPaidAmount(price));
        router.refresh();
      }
    }

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    }

    setIsLoading(false);

  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        options={{ defaultValues: { email: userDetails?.email } }}
      />
      <PaymentElement id="payment-element" />
      <button
        className="btn btn-default mt-3 w-50"
        disabled={isLoading}
        id="submit"
        type='button'
        onClick={handleSubmit}
      >
        Pay now {isLoading &&
          <div className="spinner-border spinner-border-sm ms-2" role="status" />
        }
      </button>
      {message && <div id="payment-message" className='mt-3 text-danger'>{message}</div>}
    </form>
  )
}
