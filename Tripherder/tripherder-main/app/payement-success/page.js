import React from 'react';
import "./payment-style.css"
import Link from 'next/link';
import PaidPrice from "./PaidPrice";

export const metadata = {
  title: 'Payment Success | Tripherder',
};

export default function PaymentSuccessPage() {
  return (
    <div className='container my-5'>
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="payment-successful-header d-flex align-items-center justify-content-center flex-column">
          <div className="payment-successful-container d-flex flex-column align-items-center justify-content-center">
            <img src="/images/payment-successful.svg" alt="404-img" />
            <PaidPrice />
          </div>
          <div
            className="payment-successful-content page-not-found-header d-flex align-items-center justify-content-center flex-column">
            <h1>Your payment has been received</h1>
            <p> Thank you for choosing us! Enjoy access to trip itineraries, share them with friends, and take advantage of exclusive features.
            </p>
            <Link href="/itineraries" type="button" className="btn btn-default">
              Generate your trip
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
