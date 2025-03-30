/* eslint-disable react/no-unescaped-entities */
import FreqAskedQuestions from './freq-asked-question/FreqAskedQuestions';
import Link from 'next/link';
import PreferencesContent from "./PreferencesContent";
import StayConnectedForm from "../components/state-connected-form/StayConnectedForm";
import NavExistItinerariresBtn from "./NavExistItinerariresBtn";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';

export const metadata = {
  title: 'Automated Trip Planning | Tripherder',
  description: "Tripherder automates trip planning based on your lifestyle interests. Save hours planning travel for concerts, sports, and festivals. Try it for free."
};

export default async function Home() {

  const session = await getServerSession(authOptions);

  const data = [
    { number: '1', text: 'It takes too long to find things to do?' },
    { number: '2', text: 'There’s too much information to sort?' },
    { number: '3', text: 'Events occur when you can’t go?' },
    { number: '4', text: 'You learn of festivals after they happen?' },
    { number: '5', text: 'You’re too busy to plan an itinerary?' },
    { number: '6', text: 'You just don’t know what’s happening?' }
  ];

  return (
    <>
      <div className="hero-container d-flex align-items-center">
        <div className="hero-bg"><img src="./images/home-hero-bg.jpg" alt="" /></div>
        <div className="container">
          <div className="row position-relative z-3">
            <div className="col-lg-7 mx-auto">
              <div className="hero-content-box d-flex flex-column text-center">
                <h1>Automated Trip Planning</h1>
                <p>
                  Tripherder generates trip plans based on your life’s pursuits. Live
                  music, endurance sports, local festivals, and more. Try it for free!
                </p>
                <div className='d-flex gap-4 justify-content-center'>
                  <PreferencesContent />
                  <NavExistItinerariresBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container pro-s-header">
        <section className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="heading underline">
                <h3>Are Your Travel Plans Boring Because</h3>
              </div>
              <ul className="pro-content-list d-flex flex-wrap">
                {data.map((item, index) => (
                  <li key={index}>
                    <div key={index} className={`pro-content-box pro-content-${item.number} w-100 h-100 d-flex align-items-center justify-content-center`}>
                      <span className="pro-content-no d-flex align-items-center justify-content-center">{item.number}</span>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <section className="content-container st-s-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="st-s-content-box d-flex flex-column">
                <div className="heading underline">
                  <h3>
                    Tripherder Generates Trip Itineraries in Seconds, Not Hours.
                  </h3>
                </div>
                <ul className="st-s-list d-flex flex-wrap">
                  <li>
                    <div className="st-s-box w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                      <div className="st-s-icon icon-1 d-flex align-items-center justify-content-center">
                        <img src="./images/img-9.svg" alt="statements-section-img-1" />
                      </div>
                      <h3>Save Time</h3>
                      <p>
                        Eliminate hours and hours of searching for things to do around
                        your lifestyle interests. We bring them all together in seconds
                        with a click of a button.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="st-s-box w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                      <div className="st-s-icon icon-2 d-flex align-items-center justify-content-center">
                        <img src="./images/img-10.svg" alt="statements-section-img-1" />
                      </div>
                      <h3>No Subscription Needed</h3>
                      <p>
                        We’re tired of subscriptions too! Save up to three trip
                        itineraries for free, and pay for only the wants you want later.{" "}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="st-s-box w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                      <div className="st-s-icon icon-3 d-flex align-items-center justify-content-center">
                        <img src="./images/img-11.svg" alt="statements-section-img-1" />
                      </div>
                      <h3>Inbox Friendly </h3>
                      <p>
                        We generate trips only when you want them. You only hear from us
                        when you want to, and we don’t share your information.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content-container e-container">
        <div className="container ">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex flex-wrap align-items-center">
                <div className="e-content-box pe-lg-4">
                  <div className="heading underline text-start">
                    <h3>Why Tripherder?</h3>
                  </div>
                  <div className="e-content">
                    <p>
                      Time off is a big deal. Planning to play hard takes time too - a TON
                      of it. There’s just too much information to search through to
                      maximize your experiences.
                    </p>
                    <p>We get it.</p>
                    <p>
                      We’re avid roadtrippers who have spent countless hours touring the
                      back roads with a bike on our car in search of local music and a
                      good food festival. Tripherder creates itineraries in seconds full
                      of things to do based on your interests.
                    </p>
                  </div>
                </div>
                <div className="e-photo-grid d-flex flex-column gap-3 gap-sm-4">
                  <div className="d-flex align-items-end justify-content-center gap-2 gap-sm-3">
                    <div className="e-pg-image e-activity-1">
                      <img src="./images/ai-generated-boat-picture.jpg" alt="activity" />
                    </div>
                    <div className="e-pg-image e-activity-2">
                      <img src="./images/men-women-conquer-mountain-terrain-cycling-generated-by-ai.jpg" alt="activity" />
                    </div>
                    <div className="e-pg-image e-activity-3">
                      <img src="./images/Rafting-Centar-Drina-Tara-Rafting-Tara.jpeg" alt="activity" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-2 gap-sm-3">
                    <div className="e-pg-image e-artists-1">
                      <img src="./images/dark-stage-inside-old-theater-illuminated-by-equipment-generated-by-ai.jpg" alt="artists" />
                    </div>
                    <div className="e-pg-image e-artists-2">
                      <img src="./images/concert.jpeg" alt="artists" />
                    </div>
                    <div className="epg-image-box d-flex flex-column justify-content-between">
                      <div className="e-pg-image e-artists-3">
                        <img src="./images/concert-1.jpeg" alt="artists" />
                      </div>
                      <div className="e-pg-image e-artists-4">
                        <img src="./images/people-celebrating-new-year-s-eve-city.jpg" alt="artists" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-container hiw-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hiw-content-box d-flex flex-column">
                <div className="heading underline">
                  <h3>How Tripherder Works</h3>
                </div>

                <ul className="hiw-list d-flex flex-wrap">
                  <li>
                    <div className="hiw-box w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                      <div className="hiw-icon">
                        <img src="./images/img-14.svg" alt="How it works img-1" />
                      </div>
                      <h3>Set your preferences</h3>
                      <p>
                        Tell us your favorite things to do, your starting point, and when
                        you want to travel.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="hiw-box w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                      <div className="hiw-icon">
                        <img src="./images/img-13.svg" alt="How it works img-2" />
                      </div>
                      <h3>Get your trips</h3>
                      <p>
                        In seconds, browse your trip plans, save them, and share them with
                        your friends.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="hiw-box w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                      <div className="hiw-icon">
                        <img src="./images/img-15.svg" alt="How it works img-3" />
                      </div>
                      <h3>Enjoy the ride </h3>
                      <p>
                        Book your trip and secure your tickets. Mark your calendar to make
                        memories. Repeat.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="hiw-cta-wrap mx-auto">
                  <PreferencesContent />
                  {/* <Link href={`${session ? '/select-favorite-artist' : '/auth/signin'}`} className="btn btn-default text-capitalize">
                    Try It for Free
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-container about-us-section pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 mx-auto">
              <div className="heading underline">
                <h3>About Us</h3>
              </div>

              <div className="about-header">
                <div className="d-flex gap-md-5 gap-4 flex-lg-row flex-column-reverse">
                  <div className="about-container pe-lg-3">
                    <div className="ab-img"><img className="w-100 h-100 object-fit-contain" src="./images/img-12.png" alt="about section" /></div>
                    <p>
                      We love to pack as much live music into a trip as possible. Then, we
                      throw our bikes on our 4Runner to ride a trail or scenic roads. Our
                      lives are too busy to sort through the near-infinite sources of
                      information to maximize our travel. That’s why we came up with
                      Tripherder.
                    </p>
                  </div>
                  <div className="about-image">
                    <div className="tom-image">
                      <img src="./images/tom.png" alt="Tom image" />
                    </div>
                    <p>
                      "Tripherder Founder, Tom Feary, gearing up for a show at Red Rocks
                      in 2021."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FreqAskedQuestions />
      <StayConnectedForm />
    </>
  )
}
