/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import FreqAskedQuestions from '../(home)/freq-asked-question/FreqAskedQuestions';
import { getPlans } from '../lib/payment';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import Link from 'next/link';
import { FaDollarSign } from "react-icons/fa";
import { getUserDetails } from '../lib/auth';
import StayConnectedForm from "../components/state-connected-form/StayConnectedForm"
import ItinerarySlider from './ItinerarySlider';

export const metadata = {
  title: 'How It Works | Tripherder',
  description: "Generate as many trip plans for free, save, and share up to three complete itineraries. Pay for only the plans you want after. Sign up today.",
  keywords: {
    focus: 'Trip planning',
    semantic: [
      'Tripherder',
      'trips',
      'plan a trip',
      'take a trip',
      'trip planning tool',
      'automated trip plan',
      'trip planner',
      'adventure'
    ]
  }
};

export default async function HowItsWorkPage() {

  const plansList = await getPlans();

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  let userDetails;

  let haveUnlimittedAccess;

  if (access_token) {

    userDetails = await getUserDetails({ access_token });

    haveUnlimittedAccess = userDetails?.unlimited_access

  }

  return (
    <>
      <div className="hero-container inner-hero-container d-flex align-items-center">
        <div className="hero-bg"><img src="./images/how-it-works-img.jpg" alt="banner" /></div>
        <div className="container">
          <div className="row position-relative z-3">
            <div className="col-lg-7 mx-auto">
              <div className="hero-content-box d-flex flex-column text-center">
                <h1>How It Works</h1>
                <p>
                  Create an account and generate as many trips as possible. New members
                  can view, save, and share as many as three complete itineraries for
                  free. After that, pay for only what you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="content-container never-subscribe-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hiw-content-box d-flex flex-column">
                <div className="heading underline">
                  <h3>Never Subscribe</h3>
                </div>

                <ul className="hiw-list d-flex flex-wrap">
                  <li>
                    <div className="hiw-box w-100 h-100 d-flex flex-column align-items-center justify-content-start text-center">
                      <div className="hiw-icon">
                        <img src="./images/free-sign-up-img.svg" alt="free-sign-up-img" />
                      </div>
                      <h3>Free Sign Up</h3>
                      <p>
                        You can create an account and generate as many trips as possible
                        based on your trip preferences and favorite things to do.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="hiw-box w-100 h-100 d-flex flex-column align-items-center justify-content-start text-center">
                      <div className="hiw-icon">
                        <img src="./images/select-trip-img.svg" alt="select-trip-img" />
                      </div>
                      <h3>Select Your Trip</h3>
                      <p>
                        &nbsp;You can view up to three detailed trip itineraries for free.
                        After that, it’s only $4.99 to view, save, and share your trips with
                        friends.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="hiw-box w-100 h-100 d-flex flex-column align-items-center justify-content-start text-center">
                      <div className="hiw-icon">
                        <img src="./images/img-15.svg" alt="enjoy-ride-img" />
                      </div>
                      <h3>Enjoy the Ride</h3>
                      <p>
                        Updates to your preferences and settings are always free. Purchase
                        individual itineraries when you want or get unlimited access.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-container unlimited-access-container pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading underline">
                <h3>Pay as You Go or Get Unlimited Access</h3>
              </div>
            </div>
          </div>

          {haveUnlimittedAccess &&
            <div className="alert alert-primary mt-4 text-center" role="alert">
              You have unlimited access to start planning your trip right away with the option to <Link href="/itineraries" className="alert-link">generate your itinerary</Link>.
            </div>}
          <div className={`${haveUnlimittedAccess && `opacity-25`} row g-4`}>
            {plansList?.map((data, index_) => {
              return (
                <div className={`col-12 col-md-6 col-lg-4 ${index_ === 1 ? 'text-light' : 'text-dark'}`} key={index_}>
                  <div className={`${index_ === 1 ? `three` : `individual`}-trip-itineraries-box h-100 d-flex flex-column align-items-center justify-content-between g-2`}>
                    <div className="d-flex flex-column align-items-center justify-content-start">
                      <header className="per-trip-plan-text text-center">
                        <h4>{data?.name}</h4>
                      </header>
                      <div className="per-trip-plan-prize d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex align-items-center">
                          <FaDollarSign /><span>{data?.price}</span>
                        </div>
                        {index_ !== 2 &&
                          <>
                            <p>{index_ === 0 ? "Per Trip Plan" : "For Three plans"}</p>
                          </>
                        }
                      </div>
                      <ul className="it-itineraries-check-ul d-flex flex-column align-items-start justify-content-center gap-4">
                        {data?.description?.map((_data, index) => {
                          return (
                            <li keyindex>
                              <span className="d-flex align-items-start gap-3">
                                {index_ === 1 ?
                                  <img src="./images/tick-1.png" alt="tick" /> :
                                  <img src="./images/tick.png" alt="tick" />
                                }
                                {_data}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                      <div className="it-itineraries-hr-line" />
                      <ul className="it-itineraries-dot-ul gap-3 d-flex flex-column align-items-start justify-content-center">
                        {data?.additional_description?.map((data_, index) => {
                          return (
                            <li key={index}>{data_}</li>
                          )
                        })}
                      </ul>
                    </div>
                    {!haveUnlimittedAccess &&
                      <Link href={access_token ? `/checkout/${data?.id}` : `/auth/signin`} className={`btn ${index_ === 1 ? 'btn-white' : 'btn-orange-outline'} rounded-3 text-capitalize`}>Buy</Link>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      <div className="content-container payment-method-container pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <ul className="payment-method-list d-flex flex-wrap justify-content-center">
                <li className="payment-method-item">
                  <div className="payment-method-box d-flex align-items-center justify-content-center">
                    <img src="./images/visa.png" alt="visa" />
                  </div>
                </li>
                <li className="payment-method-item">
                  <div className="payment-method-box d-flex align-items-center justify-content-center">
                    <img src="./images/mastercard.png" alt="mastercard" />
                  </div>
                </li>
                <li className="payment-method-item">
                  <div className="payment-method-box d-flex align-items-center justify-content-center">
                    <img src="./images/american-express.png" alt="american-express" />
                  </div>
                </li>
                <li className="payment-method-item">
                  <div className="payment-method-box d-flex align-items-center justify-content-center">
                    <img src="./images/discover.svg" alt="discover" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="content-container explore-destinations-container">
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="heading underline">
                <h3>Explore Destinations</h3>
              </div>

              <ItinerarySlider />
            </div>
          </div>
        </div>
      </section>

      <FreqAskedQuestions />
      <StayConnectedForm />
    </>
  )
}
