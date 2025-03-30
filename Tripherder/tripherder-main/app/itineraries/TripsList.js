/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSelector } from "react-redux";
import { _setEndDate, _setStartDate } from "../store/slices/preferenes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ViewItineraryBtn from "./ViewItineraryBtn";

const TripsList = ({ access_token }) => {

  const {
    priority,
  } = useSelector((state) => state.preferences) || {};

  const [limitLoading, setLimitreduceLoading] = useState(false);

  const router = useRouter();

  const { recommendedTrips } = useSelector((state) => state.home);

  const completedTripCount = recommendedTrips?.merged_data?.complete_itineraries_count;

  const scheduledEvents = recommendedTrips?.merged_data?.scheduled_events;

  // Filter out arrays with all null values
  const filteredEvents = scheduledEvents?.filter((eventsArray) => {
    return eventsArray.some(
      (eventObj) => eventObj[Object.keys(eventObj)[0]] !== null
    );
  });

  // Sort the filteredEvents array by the number of non-null elements in each sub-array
  const sortedEvents = filteredEvents?.sort((a, b) => {
    const countA = a.filter(
      (item) => item[Object.keys(item)[0]] !== null
    ).length;
    const countB = b.filter(
      (item) => item[Object.keys(item)[0]] !== null
    ).length;
    return countB - countA;
  });


  return (
    <div className="content-container trip-itinerary-container" >
      <div className="container">
        <div className="row">
          <div className="col-xl-11 mx-auto">
            {sortedEvents?.length > 0 ?
              <>
                {/* <div className="trip-itinerary-head">
                  <h3><b>You have {completedTripCount}/{sortedEvents?.length} Completed Trip Details Views with Remaining</b></h3>
                </div> */}
                {sortedEvents?.map((eventsArray, arrayIndex) => {

                  let matching;
                  let artists_names = [];
                  let categories = [];
                  let images = [];
                  let tripNightCount = 0;

                  eventsArray.flatMap(day => {
                    return day ? Object.values(day)[0] : [];
                  }).filter(event => {

                    if (event) {
                      tripNightCount++; // Increment trip count for each non-null data trip
                    }

                    if (event?.active_event && event?.active_event?.assetTopics) {
                      categories = event?.active_event?.assetTopics?.map(data => `${data?.topic?.topicName} - ${data.topic.topicTaxonomy}`);
                    }

                    return event && event.jambase_event && event.jambase_event.performer && event.jambase_event.performer.length > 0;
                  }).map(event => {
                    matching = event.jambase_event ? true : false; // Set matching based on the presence of jambase_event

                    // Extract artist names
                    artists_names = event.jambase_event.performer.map(performer => performer.name);
                    images = event.jambase_event.performer.map(performer => performer.image);
                  }).flat();

                  return (
                    <div className="trip-itinerary-row" key={arrayIndex}>
                      <h4>Trip {arrayIndex + 1}</h4>
                      <div className="trip-itinerary-card flex-column d-flex align-items-center align-items-sm-start justify-content-center justify-content-sm-between">
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
                              <ViewItineraryBtn
                                access_token={access_token}
                                arrayIndex={arrayIndex + 1}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-md-flex">
                          <i className="fa-regular fa-heart heart-icon" />
                        </div>
                        <div className="fs-heart-icon d-block">
                          <i className="fa-regular fa-heart " />
                        </div>
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
        </div>

      </div>
    </div >
  );
};

export default TripsList;


