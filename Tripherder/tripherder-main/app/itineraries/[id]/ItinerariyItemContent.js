/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSelector } from "react-redux";
import { _setEndDate, _setStartDate } from "../../store/slices/preferenes";
import moment from "moment";
import Link from "next/link";
import { Dropdown } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { saveItinerary, shareItinerary } from "../../lib/itineraries"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SocialShare } from "../../components/social-share/SocialShare";
import { google, outlook, ics } from "calendar-link";
import { FaSave } from "react-icons/fa";
import { SiGooglecalendar } from "react-icons/si";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { FaApple } from "react-icons/fa";

export default function ItinerariyItemContent({ itineraryId, access_token }) {

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [shareUrl, setShareUrl] = useState("");

  const router = useRouter();

  const { recommendedTrips } = useSelector((state) => state.home);

  const {
    city,
    state,
    _startDate,
    _endDate,
    // numberOfNights,
  } = useSelector((state) => state.preferences) || {};

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

  const [artistsNames, setArtistsNames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [tripNightCount, setTripNightCount] = useState(0);
  const [matching, setMatching] = useState(false);

  useEffect(() => {
    let localArtistsNames = [];
    let localCategories = [];
    let localImages = [];
    let localTripNightCount = 0;
    let localMatching = false;

    sortedEvents?.forEach((eventsArray, arrayIndex) => {
      if (parseInt(itineraryId - 1) === arrayIndex) {
        eventsArray.flatMap(day => day ? Object.values(day)[0] : [])
          .filter(event => {
            if (event) {
              localTripNightCount++; // Increment trip count for each non-null data trip
            }

            if (event?.active_event?.assetTopics) {
              localCategories = localCategories.concat(
                event.active_event.assetTopics.map(data => `${data.topic.topicName} - ${data.topic.topicTaxonomy}`)
              );
            }

            return event?.jambase_event?.performer?.length > 0;
          })
          .forEach(event => {
            localMatching = event.jambase_event ? true : false; // Set matching based on the presence of jambase_event
            localArtistsNames = localArtistsNames.concat(
              event.jambase_event.performer.map(performer => performer.name)
            );
            localImages = localImages.concat(
              event.jambase_event.performer.map(performer => performer.image)
            );
          });
      }
    });

    setArtistsNames(localArtistsNames);
    setCategories(localCategories);
    setImages(localImages);
    setTripNightCount(localTripNightCount);
    setMatching(localMatching);
  }, []);

  const handleSaveMyTrip = async () => {

    const obj = {
      startDate: _startDate,
      endDate: _endDate,
      city: city?.label,
      state: state?.label,
      categories: categories?.join(",")
    }

    const selectedTrip = scheduledEvents[itineraryId - 1];

    const saveData = {
      data: { data: selectedTrip, additionalDetails: obj }
    }

    const res = await saveItinerary({ saveData, access_token });
    if (res?.status === true) {
      toast.success(res?.message);
      router.push("/saved-itineraries");
      router.refresh();
    }
  };

  const shareOnClick = async () => {

    const obj = {
      startDate: _startDate,
      endDate: _endDate,
      city: city?.label,
      state: state?.label,
      categories: categories?.join(",")
    }

    const selectedTrip = scheduledEvents[itineraryId - 1];

    const saveData = {
      data: { data: selectedTrip, additionalDetails: obj }
    }

    setLoading(true);
    setShow(true)
    const res = await shareItinerary({ access_token, saveData });
    setLoading(false);
    setShareUrl(`${window.location.origin}/shared-itinerary/${res?.url_key}`)
  }

  const addToCalendarOnClick = (type) => {
    const event = {
      title: [...new Set(categories)].map((data) => `${data} | `).join(''),
      description: [...new Set(categories)].map((data) => `${data} | `).join(''),
      start: type === "apple" ? moment.utc(_startDate).add(1, "days") : moment.utc(_startDate),
      end: "apple" ? moment.utc(_endDate).add(1, "days") : moment.utc(_endDate),
      duration: [3, "hour"],
    };

    const googleUrl = google(event);
    const outlookUrl = outlook(event);
    const icsUrl = ics(event);

    switch (type) {
      case "google":
        window.open(googleUrl, '_blank');
        break;
      case "outlook":
        window.open(outlookUrl, '_blank');
        break;
      case "apple":
        window.open(icsUrl, '_blank');
        break;
      default:
        console.error('Unknown type:', type);
    }
  }


  return (
    <>
      <div className="content-container trip-itinerary-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="trip-itinerary-head d-flex flex-column-reverse flex-md-row justify-content-between gap-4 gap-lg-5">
                <div className="ti-head-left text-start pe-md-5">
                  <h3>
                    Trip {itineraryId} :
                    {artistsNames?.map((data, index) => (
                      <span key={index}>
                        {data}
                      </span>
                    ))}
                    {[...new Set(categories)].map((data, index) => (
                      <span key={index}>
                        {data} |
                      </span>
                    ))}
                  </h3>
                  <h4>{moment(_startDate).format("MMMM D, YYYY")} - {moment(_endDate).format("MMMM D, YYYY")}</h4>
                  {/* <p>You have {completedTripCount - 1}/{sortedEvents?.length} Completed Trip Details Views Remaining</p> */}
                  {/* <a href="#!">Learn more</a> */}
                </div>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic"
                    className="btn btn-ti-head d-flex align-items-center justify-content-between">
                    <span>Select</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleSaveMyTrip} className="d-flex gap-1 align-items-center">
                      <FaSave className="fw-bold" size={20} />
                      Save to My Trips
                    </Dropdown.Item>
                    <SocialShare
                      show={show}
                      setShow={setShow}
                      loading={loading}
                      shareUrl={shareUrl}
                      shareOnClick={shareOnClick}
                    />
                    <Dropdown.Item onClick={() => addToCalendarOnClick("google")} className="d-flex gap-1 align-items-center">
                      <SiGooglecalendar />
                      Add to google calendar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => addToCalendarOnClick("outlook")} className="d-flex gap-1 align-items-center">
                      <PiMicrosoftOutlookLogoFill />
                      Add to outlook calendar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => addToCalendarOnClick("apple")} className="d-flex gap-1 align-items-center">
                      <FaApple />
                      Add to apple calendar
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* <div className="find-lodging-content d-flex align-items-center justify-content-center">
              <span>
                Overnight Stay <a href="#!">Find Lodging</a>
              </span>
            </div> */}
              <div className="row">
                <div className="col-xl-11 mx-auto">
                  <div className="ti-starting-location-text mb-4">
                    <strong>Starting Location :</strong> {state?.label}, {city?.label}{" "}
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
                        if (parseInt(itineraryId - 1) === arrayIndex) {
                          return (
                            <div
                              key={arrayIndex}
                            >
                              <div className="row">
                                {eventsArray?.map(
                                  (eventObj, objIndex) => {
                                    const date =
                                      Object.keys(eventObj)[0];
                                    const event = eventObj[date];


                                    if (event) {
                                      return (
                                        <div
                                          key={objIndex}
                                          className="col-xl-11 mx-auto mb-5"
                                        >
                                          <div className="trip-itinerary-row">
                                            <h6 className="artists-categ">
                                              <strong>Day{" "}
                                                {objIndex + 1} :</strong>{" "}
                                              <b>{moment(date).format('MMMM D, YYYY')}</b>
                                            </h6>
                                            {event.map(
                                              (
                                                singleEvent,
                                                eventIndex
                                              ) => {
                                                const active =
                                                  singleEvent?.active_event;
                                                const jambase =
                                                  singleEvent?.jambase_event;
                                                return (
                                                  <div index={eventIndex} className="trip-itinerary-card d-flex flex-column align-items-center align-items-sm-start justify-content-center justify-content-sm-between">
                                                    {active && (
                                                      <div className="ti-card-inner d-sm-flex">
                                                        <div className="trip-itinerary-image"><img src="/images/activity_no_image.svg" alt="Itinerary-img" /></div>

                                                        <div className="trip-itinerary-content d-flex flex-column gap-2">
                                                          <h5>{active
                                                            ?.place
                                                            ?.placeName}</h5>
                                                          {active?.assetTopics?.map(
                                                            (
                                                              data,
                                                              i
                                                            ) => (
                                                              <p
                                                                className="d-flex gap-2 align-items-center mb-0"
                                                                key={
                                                                  i
                                                                }
                                                              >
                                                                <span className="ti-artists-name">
                                                                  {
                                                                    data
                                                                      ?.topic
                                                                      ?.topicName
                                                                  }
                                                                </span>:
                                                                <span className="ti-artists-name">
                                                                  {
                                                                    data
                                                                      ?.topic
                                                                      ?.topicTaxonomy
                                                                  }
                                                                </span>
                                                              </p>
                                                            )
                                                          )}
                                                          <p className="ti-activity-text">
                                                            {active
                                                              ?.activityRecurrences?.[0]
                                                              ?.startTime &&
                                                              active
                                                                ?.activityRecurrences?.[0]
                                                                ?.endTime && (
                                                                <p className="ti-miles-text d-flex align-items-center gap-2">
                                                                  {formatTime(
                                                                    active
                                                                      ?.activityRecurrences?.[0]
                                                                      ?.startTime
                                                                  )}
                                                                  {
                                                                    " - "
                                                                  }
                                                                  {formatTime(
                                                                    active
                                                                      ?.activityRecurrences?.[0]
                                                                      ?.endTime
                                                                  )}
                                                                </p>
                                                              )}
                                                          </p>
                                                          <p className="ti-miles-text">
                                                            {active
                                                              ?.place
                                                              ?.addressLine1Txt &&
                                                              `${active?.place?.addressLine1Txt}, `}
                                                            {active
                                                              ?.place
                                                              ?.addressLine2Txt &&
                                                              `${active?.place?.addressLine2Txt}, `}
                                                            {active
                                                              ?.place
                                                              ?.cityName &&
                                                              `${active?.place?.cityName}, `}
                                                            {active
                                                              ?.place
                                                              ?.cityName &&
                                                              `${active?.place?.countryName}`}
                                                            {active
                                                              ?.place
                                                              ?.postalCode &&
                                                              ` - ${active?.place?.postalCode}`
                                                            }
                                                          </p>
                                                          <Link target="blank" className="ti-details-btn" href={`https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${active?.place?.latitude},${active?.place?.longitude}`}>
                                                            Get Directions
                                                          </Link>
                                                        </div>
                                                      </div>
                                                    )}
                                                    {jambase && (
                                                      <>
                                                        {active && (
                                                          <hr />
                                                        )}
                                                        <div className="ti-card-inner d-sm-flex">
                                                          <div className="trip-itinerary-image"><img src={jambase?.performer?.[0]?.image} alt="Itinerary-img" /></div>

                                                          <div className="trip-itinerary-content d-flex flex-column gap-2">
                                                            <h5>{
                                                              jambase
                                                                ?.assetTopics
                                                                ?.name
                                                            }</h5>
                                                            <p className="ti-artists-name">
                                                              {jambase?.performer?.map(
                                                                (
                                                                  data,
                                                                  index
                                                                ) => (
                                                                  <span
                                                                    key={
                                                                      index
                                                                    }
                                                                  >
                                                                    {
                                                                      data?.name
                                                                    }{", "}
                                                                  </span>
                                                                )
                                                              )}
                                                            </p>
                                                            {jambase?.activityRecurrences?.endDate && jambase?.activityRecurrences?.endDate &&
                                                              <p className="ti-activity-text">
                                                                From <span className="fw-bold">
                                                                  {moment(jambase?.activityRecurrences?.startDate).format("MMMM D, YYYY")} {" "}
                                                                </span>
                                                                to <span className="fw-bold">
                                                                  {moment(jambase?.activityRecurrences?.endDate).format(`MMMM D, YYYY`)}
                                                                </span>
                                                              </p>
                                                            }
                                                            <p className="ti-miles-text">
                                                              {jambase
                                                                ?.place
                                                                ?.address
                                                                ?.streetAddress &&
                                                                `${jambase?.place?.address?.streetAddress}, `}
                                                              {jambase
                                                                ?.place
                                                                ?.name &&
                                                                `${jambase?.place?.name}, `}
                                                              {jambase
                                                                ?.place
                                                                ?.address
                                                                ?.addressLocality &&
                                                                `${jambase?.place?.address?.addressLocality}, `}
                                                              {jambase
                                                                ?.place
                                                                ?.address
                                                                ?.addressRegion
                                                                ?.name &&
                                                                `${jambase?.place?.address?.addressRegion?.name} - `}
                                                              {jambase
                                                                ?.place
                                                                ?.address
                                                                ?.postalCode &&
                                                                `${jambase?.place?.address?.postalCode}`}
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
                                                      </>
                                                    )}
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      );
                                    } else {
                                      return null;
                                    }
                                  }
                                )}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};