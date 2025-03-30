'use client';

import Image from 'next/image'
import React from 'react'
import './PlaceCard.css'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel';

export default function ItineraryItemCard({
  countryName,
  handleUpdateAnItinerary,
  isFromUpdateIitinerary,
  direction,
  categoryOfLocation,
  isSeen,
  nameOfPlace,
  address,
  openTiming,
  entryFee,
  locationImg,
  role,
  postCode,
  city,
  deleteOnClick,
  isFromItinerary
}) {


  function isUrl(str) {
    const urlRegex = /^(?:https?|ftp):\/\/[\w/\-?=%.]+\.[\w/\-?=%.]+$/;
    return urlRegex.test(str);
  }

  return (
    <div className="place-box w-100 h-100 d-flex flex-wrap border flex-column-reverse flex-md-row">
      <div className="place-box-left">
        <div className="place-box-text-inside">
          <div className="d-flex gap-2 align-items-center">
            <div className="place-box-label">
              {categoryOfLocation}
            </div>
            {
              role === 2 &&
              <>
                {
                  !isSeen &&
                  <div className="mb-2" style={{
                    height: "21px",
                    width: "54px",
                    backgroundColor: "#C6710EB2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px"
                  }}>
                    <p style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      color: "#000000",
                      fontFamily: "Inter",
                    }} className="mb-0">Updated</p>
                  </div>
                }
              </>
            }
          </div>
          <div className="place-box-title fw-semibold">
            {nameOfPlace}
          </div>
          <ul className="place-box-desc-list">
            <li className="place-box-desc-item">
              <div className="place-box-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                <div className="place-box-desc-icon d-flex align-items-center justify-content-center">
                  <Image
                    src="/images/location-icon.svg"
                    alt="location"
                    width={15}
                    height={17}
                  />
                </div>
                <div className="place-box-desc-text">
                  <p className='text-wrap'>
                    {address}{address && ","}{city}{city && ","}{countryName}{postCode && "-"}{postCode}
                  </p>
                </div>
              </div>
            </li>
            <li className="place-box-desc-item">
              <div className="place-box-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                <div className="place-box-desc-icon d-flex align-items-center justify-content-center">
                  <Image
                    src="/images/clock-icon.svg"
                    alt="time"
                    width={16}
                    height={16}
                  />
                </div>
                <div className="place-box-desc-text">
                  {openTiming}
                </div>
              </div>
            </li>
            <li className="place-box-desc-item">
              <div className="place-box-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                <div className="place-box-desc-icon d-flex align-items-center justify-content-center">
                  <Image
                    src="/images/money-icon.svg"
                    alt="money"
                    width={17}
                    height={13}
                  />
                </div>
                <div className="place-box-desc-text">
                  Entry fee - {entryFee === 0 ? "Free" : "Paid"}
                </div>
              </div>
            </li>
            {direction &&
              <li className="place-box-desc-item">
                <div className="place-box-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                  <div className="place-box-desc-icon d-flex align-items-center justify-content-center" style={{ opacity: 1 }}>
                    <Image
                      src="/images/directions.svg"
                      alt="money"
                      width={17}
                      height={13}
                    />
                  </div>
                  <div className="place-box-desc-text"
                    style={{ color: "#6F27FF" }}>
                    <Link href={direction} target='_blank'>
                      View direction
                    </Link>
                  </div>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
      <div className="place-box-right position-relative">
        <div className="place-box-img-holder pb-0">
          {locationImg?.length > 0 ?
            <Carousel>
              {locationImg?.map((data, index) => {
                return (
                  <Carousel.Item key={index} style={{ width: "152px", height: "152px" }}>
                    {isUrl(data?.image) ? (
                      <Image
                        src={data?.image}
                        alt="palce img"
                        fill
                        sizes="100VW"
                        objectFit='cover'
                      />
                    ) : (
                      <>
                        {isFromUpdateIitinerary ?
                          <Image
                            src={URL.createObjectURL(data)}
                            alt="palce img"
                            fill
                            sizes="100VW"
                            objectFit='cover'
                          /> : <Image
                            src={data}
                            alt="palce img"
                            fill
                            sizes="100VW"
                            objectFit='cover'
                          />
                        }

                      </>
                    )}
                  </Carousel.Item>
                )
              })}
            </Carousel> :
            <div>
              <Image
                src="/images/placeholder_image.svg"
                alt="palce img"
                // fill
                width={1000}
                height={1000}
                // sizes="100VW"
                objectFit='cover'
              />
            </div>
          }
        </div>
      </div>
      {!isFromItinerary &&
        <>
          {isFromUpdateIitinerary ?
            <div className="place-btn-group d-flex">
              <button onClick={handleUpdateAnItinerary} className="btn btn-primary w-100">Edit details</button>
            </div> :
            <div className="place-btn-group d-flex">
              <button onClick={handleUpdateAnItinerary} className="btn btn-primary w-100">Edit details</button>
              {deleteOnClick &&
                <button className="btn btn-default btn-del" onClick={() => deleteOnClick()}>Delete</button>
              }
            </div>
          }
        </>
      }
    </div>)
}
