import React from 'react'
import { authOptions } from '../api/auth/authOptions';
import { getServerSession } from 'next-auth';
import TripSetting from './TripSetting';
import TripsList from "./TripsList"
import StayConnectedForm from '../components/state-connected-form/StayConnectedForm';
import ItineraryBanner from "./ItineraryBanner";
import Layout from './Layout';

export const metadata = {
  title: 'Itineraries | Tripherder',
};

export default async function ItinerariesPage() {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  return (
    <Layout>
      <ItineraryBanner />
      <TripSetting token={session?.user?.access_token} />
      <div className="container calendar-header">
        <div id="calendar" className="calendar-container" style={{ display: "none" }} >
          <div className="header">
            <div className="month" />
            <div className="btns">
              <div className="btn today-btn">
                <img className="w-75" src="./images/calendor.png" alt="calendor" />
              </div>
              <div className="btn prev-btn">
                <img
                  className="w-50"
                  src="./images/right-arrow-1.png"
                  alt="left-arrow"
                />
              </div>
              <div className="btn next-btn-button">
                <img
                  className="w-50"
                  src="./images/left-arrow-1.png"
                  alt="right-arrow"
                />
              </div>
            </div>
          </div>
          <div className="weekdays">
            <div className="day">Sun</div>
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thu</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
          </div>
          <div className="days">{/* days will be dynamically generated */}</div >
        </div >
      </div>
      <TripsList access_token={access_token} />
      <StayConnectedForm />
    </Layout>
  )
}
