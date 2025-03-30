import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../../api/auth/authOptions';
import { getAllCountry, getStates } from '../../lib/country';
import { getUserDetails } from '../../lib/auth';
import "../checkout.css";
import { getPlanById } from '../../lib/payment';
import CheckoutForm from "./CheckoutForm";
import Link from 'next/link';

export const metadata = {
  title: 'Checkout | Tripherder',
};

export default async function CheckoutPage({ params }) {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  const states = await getStates({ access_token });

  const phoneCodes = await getAllCountry({ access_token });

  const userDetails = await getUserDetails({ access_token });

  const id = params?.id

  const planDetails = await getPlanById({ id });

  return (
    <>
      <div className="page-top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pth-content-box d-flex flex-column align-items-center justify-content-between">
                <h3>Checkout</h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><Link href="/how-it-works">How It Works</Link></li>
                    <li class="breadcrumb-item active" aria-current="page"> Checkout</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CheckoutForm
        states={states}
        phoneCodes={phoneCodes?.data}
        planId={params?.id}
        access_token={access_token}
        userDetails={userDetails?.data}
        planDetails={planDetails}
      />
    </>
  )
}
