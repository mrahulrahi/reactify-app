/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

import { Suspense } from "react";
import { getSavedItineraries } from "../lib/itineraries";
import { AddToFavBtn } from "./AddToFavBtn";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";

async function geTripsList(type) {
  try {
    const session = await getServerSession(authOptions);

    const access_token = session?.user?.access_token;

    if (!access_token) {
      return { error: "Access token not found" };
    }

    const savedItinerariesList = await getSavedItineraries({ access_token });

    const savedItineraryIfFav = savedItinerariesList
      .filter(item => item?.is_fav === true)
      .map(item => ({
        id: item?.id,
        data: item?.data?.data,
        additionalDetails: item?.data?.additionalDetails,
        isFav: item?.is_fav
      }));

    const savedItineraryAll = savedItinerariesList.map(item => ({
      id: item?.id,
      data: item?.data?.data,
      additionalDetails: item?.data?.additionalDetails,
      isFav: item?.is_fav
    }));

    const savedItinerary = type === 'favorite' ? savedItineraryIfFav : savedItineraryAll;

    return {
      savedItinerary
    };

  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data" };
  }
}

const TripsListLoader = async ({
  type,
  access_token,

}) => {

  const priority = {
    label: "Ativities"
  }

  const { savedItinerary } = await geTripsList(type);

  return (
    <div className="content-container trip-itinerary-container" >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="trip-itinerary-head">
              <h3>Your {type === "save" ? "saved" : "favorite"} itineraries</h3>
            </div>
            {savedItinerary?.length > 0 ?
              <>
                {savedItinerary?.map((eventsArray, arrayIndex) => {

                  const _eventArray = eventsArray?.data

                  let matching;
                  let artists_names = [];
                  let categories = [];
                  let images = [];
                  let tripNightCount = 0;

                  _eventArray.flatMap(day => {
                    return day ? Object.values(day)[0] : [];
                  }).filter(event => {

                    if (event) {
                      tripNightCount++;
                    }

                    if (event?.active_event && event?.active_event?.assetTopics) {
                      categories = event?.active_event?.assetTopics?.map(data => `${data?.topic?.topicName} - ${data.topic.topicTaxonomy}`);
                    }

                    return event && event.jambase_event && event.jambase_event.performer && event.jambase_event.performer.length > 0;
                  }).map(event => {
                    matching = event.jambase_event ? true : false; // Set matching based on the presence of jambase_event

                    artists_names = event.jambase_event.performer.map(performer => performer.name);
                    images = event.jambase_event.performer.map(performer => performer.image);
                  }).flat();

                  return (
                    <div className="trip-itinerary-row" key={arrayIndex}>
                      <h4>Trip {arrayIndex + 1}</h4>
                      <div className="trip-itinerary-card d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-between">
                        <div className="ti-card-inner d-sm-flex">
                          {
                            matching ?
                              <div className="trip-itinerary-image"><img src={images?.[0]} alt="" /></div>
                              :
                              <div className="trip-itinerary-image"><img src="/images/no_image.svg" alt="" /></div>
                          }
                          <div className="trip-itinerary-content">
                            <h5>Trip Priority: {priority?.label}</h5>
                            <div className="d-flex flex-column gap-1">
                              <div className="d-flex flex-wrap">
                                {artists_names?.map((art, index) => {
                                  return (
                                    <p key={index} className="ti-artists-name">{art},</p>
                                  )
                                })}
                              </div>
                              {[...new Set(categories)].map((cat, index) => (
                                <p key={index} className="ti-activity-text">{cat}</p>
                              ))}
                              <p className="ti-day-text">{tripNightCount} Nights</p>
                              <Link
                                className="ti-details-btn"
                                href={type === `save` ? `/saved-itineraries/${eventsArray?.id}` : `/favorite-itineraries/${eventsArray?.id}`}>
                                View Detailed Itinerary
                              </Link>
                            </div>
                          </div>
                        </div>
                        <AddToFavBtn
                          access_token={access_token}
                          currentId={eventsArray?.id}
                          isFav={eventsArray?.isFav}
                          type={type}
                        />
                      </div>
                    </div>
                  )
                })}
              </>
              :
              <h6 className="text-center mb-0">
                No trips found
              </h6>
            }
          </div>
        </div >
      </div>
    </div>
  );
};

export default function TripList({ type, access_token }) {
  return (
    <Suspense fallback={
      <div className="content-container trip-itinerary-container" >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="trip-itinerary-head">
                <h3>Your {type === "save" ? "saved" : "favorite"} itineraries</h3>
              </div>
              <Skeleton
                count={2}
                height={240}
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    }
    >
      <TripsListLoader
        type={type}
        access_token={access_token}
      />
    </Suspense>
  )
}


