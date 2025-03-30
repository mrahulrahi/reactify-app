import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../../api/auth/authOptions';
import { getPlanById, getPlans } from '../../lib/payment';
import StripElement from './StripeElements'

export default async function TripPlanPurchasePage({ params }) {

  console.log(params?.id);

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  const id = params?.id

  const planDetails = await getPlanById({ id });

  return (
    <div className='container my-lg-5'>
      <h4>{planDetails?.name}</h4>
      <StripElement access_token={access_token} planId={id} />
    </div>
  )
}
