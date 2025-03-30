/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { _setEndDate, _setStartDate } from "../store/slices/preferenes";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ItinerariyItemContent({
  itineraryId,
  favItinerary,
}) {

  function formatTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    let formattedHours = parseInt(hours, 10);
    let period = "AM";

    if (formattedHours >= 12) {
      formattedHours -= 12;
      period = "PM";
    }

    // Ensure single digit hours are prefixed with a 0
    formattedHours =
      formattedHours < 10 ? `0${formattedHours}` : formattedHours;

    // Create a new time string with AM/PM
    const newTimeString = `${formattedHours}:${minutes} ${period}`;

    return newTimeString;
  }

  const scheduledEvents = favItinerary?.data?.data;

  const additionalDetails = favItinerary?.data?.additionalDetails

  const filteredEvents = scheduledEvents?.filter(eventsArray => {
    return eventsArray !== null && Object.keys(eventsArray).length > 0 && Object.values(eventsArray).some(eventObj => {
      return eventObj !== null && eventObj[Object.keys(eventObj)[0]] !== null;
    });
  });

  const sortedEvents = filteredEvents?.sort((a, b) => {
    const countA = Object.values(a).filter(item => {
      return item !== null && item[Object.keys(item)[0]] !== null;
    }).length;
    const countB = Object.values(b).filter(item => {
      return item !== null && item[Object.keys(item)[0]] !== null;
    }).length;
    return countB - countA;
  });

  const [artistsNames, setArtistsNames] = useState([]);

  useEffect(() => {
    let localArtistsNames = [];

    // Check if sortedEvents is defined and iterate through it
    sortedEvents?.forEach((eventsArray) => {
      // Flatten each eventsArray into a single array of events
      let events = Object.values(eventsArray).flatMap(day => day ? day : []);

      // Filter events where jambase_event.performer exists and has a length > 0
      events.forEach(event => {
        if (event?.jambase_event?.performer?.length > 0) {
          // Push the performer name(s) into localArtistsNames
          event.jambase_event.performer.forEach(performer => {
            localArtistsNames.push(performer.name);
          });
        }
      });
    });

    // Set the state with the collected performer names
    setArtistsNames(localArtistsNames);
  }, []);


  return (
    <>
      <div className="content-container trip-itinerary-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="trip-itinerary-head">
                {artistsNames?.length > 0 &&
                  <h5 className="artists-categ">
                    <span>Artists : </span>
                    {artistsNames?.map((data, index) => (
                      <span key={index}>
                        {data}
                      </span>
                    ))}
                  </h5>
                }
                {additionalDetails?.categories &&
                  <h5 className="mt-0 artists-categ">
                    <span>Categories : </span>
                    {additionalDetails?.categories}</h5>
                }
                <h4 className="mb-0 artists-categ">{moment(additionalDetails?.startDate).format("MMMM D, YYYY")} - {moment(additionalDetails?.endDate).format("MMMM D, YYYY")}</h4>
              </div>
              <div className="row">
                <div className="col-xl-11 mx-auto">
                  <div className="ti-starting-location-text mb-4">
                    <strong>Starting Location :</strong> {favItinerary?.data?.additionalDetails?.state}, {favItinerary?.data?.additionalDetails?.city}{" "}
                  </div>
                </div>
              </div>
              {sortedEvents && (
                <div>
                  {Object.entries(sortedEvents).length === 0 ? (
                    <div>
                      <h5>No data</h5>
                    </div>
                  ) : (
                    <div>
                      {sortedEvents?.map((eventsArray, arrayIndex) => {
                        return (
                          <div key={arrayIndex} className="mb-lg-5 mb-md-4 mb-3">
                            <div className="row">
                              {Object.entries(eventsArray).map(([date, eventObj], objIndex) => {
                                const event = eventObj;
                                if (event) {
                                  return (
                                    <div key={objIndex} className="col-12 mb-3">
                                      <div className="col-xl-11 mx-auto">
                                        <h5 className="artists-categ">
                                          <strong>Day {arrayIndex + 1}</strong>{" "}
                                          <b> {moment(date).format('MMMM D, YYYY')}</b>
                                        </h5>
                                        {event.map((singleEvent, eventIndex) => {
                                          const active = singleEvent?.active_event;
                                          const jambase = singleEvent?.jambase_event;
                                          return (
                                            <div key={eventIndex}>
                                              {active && (
                                                <div className="trip-itinerary-card d-flex align-items-center p-sm-3 p-2 align-items-sm-start justify-content-center justify-content-sm-between shadow rounded-3 mt-0">
                                                  <div className="ti-card-inner d-sm-flex">
                                                    <div className="trip-itinerary-image"><img src="/images/activity_no_image.svg" alt="Itinerary-img" /></div>
                                                    <div className="trip-itinerary-content d-flex flex-column gap-2">
                                                      <h5>{active?.place?.placeName}</h5>
                                                      {active?.assetTopics?.map((data, i) => (
                                                        <p className="d-flex gap-2 align-items-center mb-0" key={i}>
                                                          <span className="ti-artists-name">
                                                            {data?.topic?.topicName}
                                                          </span>
                                                          :
                                                          <span className="ti-artists-name">
                                                            {data?.topic?.topicTaxonomy}
                                                          </span>
                                                        </p>
                                                      ))}
                                                      {active?.activityRecurrences?.[0]?.startTime &&
                                                        active?.activityRecurrences?.[0]?.endTime && (
                                                          <p className="ti-miles-text d-flex align-items-center gap-2">
                                                            {formatTime(active?.activityRecurrences?.[0]?.startTime)} - {formatTime(active?.activityRecurrences?.[0]?.endTime)}
                                                          </p>
                                                        )}
                                                      <p className="ti-miles-text">
                                                        {active?.place?.addressLine1Txt}
                                                        {active?.place?.addressLine2Txt && `, ${active?.place?.addressLine2Txt}`}
                                                        {active?.place?.cityName && `, ${active?.place?.cityName}`}
                                                        {active?.place?.countryName && `, ${active?.place?.countryName}`}
                                                        {active?.place?.postalCode && ` - ${active?.place?.postalCode}`}
                                                      </p>
                                                      <Link target="blank" className="ti-details-btn" href={`https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${active?.place?.latitude},${active?.place?.longitude}`}>
                                                        Get Directions
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                              {jambase && (
                                                <>
                                                  {/* {active && <hr />} */}
                                                  <div className="trip-itinerary-card d-flex align-items-center align-items-sm-start justify-content-center justify-content-sm-between p-sm-3 p-2 rounded-3 mt-0 ps-2">
                                                    <div className="ti-card-inner d-sm-flex">
                                                      <div className="trip-itinerary-image"><img src={jambase?.performer?.[0]?.image} alt="Itinerary-img" /></div>

                                                      <div className="trip-itinerary-content d-flex flex-column gap-2">
                                                        <h5>{jambase?.assetTopics?.name}</h5>
                                                        <p className="ti-artists-name">
                                                          {jambase?.performer?.map((data, index) => (
                                                            <span key={index}>{data?.name}{", "}</span>
                                                          ))}
                                                        </p>
                                                        {jambase?.activityRecurrences?.startDate && jambase?.activityRecurrences?.endDate && (
                                                          <p className="ti-activity-text">
                                                            From <span className="fw-bold">
                                                              {moment(jambase?.activityRecurrences?.startDate).format("MMMM D, YYYY")}
                                                            </span>
                                                            to <span className="fw-bold">
                                                              {moment(jambase?.activityRecurrences?.endDate).format("MMMM D, YYYY")}
                                                            </span>
                                                          </p>
                                                        )}
                                                        <p className="ti-miles-text">
                                                          {jambase?.place?.address?.streetAddress && `${jambase?.place?.address?.streetAddress}, `}
                                                          {jambase?.place?.name && `${jambase?.place?.name}, `}
                                                          {jambase?.place?.address?.addressLocality && `${jambase?.place?.address?.addressLocality}, `}
                                                          {jambase?.place?.address?.addressRegion?.name && `${jambase?.place?.address?.addressRegion?.name} - `}
                                                          {jambase?.place?.address?.postalCode && `${jambase?.place?.address?.postalCode}`}
                                                        </p>
                                                        <p className="ti-details-btn text-decoration-none mb-0">
                                                          Buy Tickets
                                                        </p>
                                                        <div className="d-flex gap-2">
                                                          {jambase?.offers?.map((data, index) => {
                                                            return (
                                                              <a key={index} target="_blank" href={data?.url} className="ti-details-btn mb-0">{data?.seller?.name}</a>
                                                            )
                                                          })}
                                                        </div>
                                                        <Link target="blank" className="ti-details-btn" href={`https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${jambase?.place?.address?.geo?.latitude},${jambase?.place?.address?.geo?.longitude}`}>
                                                          Get Directions
                                                        </Link>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                } else {
                                  return null;
                                }
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};