'use client'
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


export default function ItinerarySlider() {
  return (
    <div className="itinerary-slider-wrapper">

      <Swiper
        navigation={{
          nextEl: ".itinerary-arrow-next",
          prevEl: ".itinerary-arrow-prev",
          disabledClass: "swiper-button-disabled"
        }}
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className="itinerary-card-slider"
      >
        <SwiperSlide>
          <div className="trip-itinerary-card flex-column d-flex align-items-center align-items-sm-start justify-content-center justify-content-sm-between">
            <div className="ti-card-inner d-sm-flex">

              <div className="trip-itinerary-image"><img src="/images/itinerary-slider-img.jpg" alt="" /></div>

              <div className="trip-itinerary-content">
                <h5>Trip Priority: Live Music</h5>
                <div className="d-flex flex-column gap-1">
                  <p className="ti-artists-name">Dave Mathews Band | JJ Drey</p>
                  <p className="ti-activity-text">Mountain Biking</p>

                  <p className="ti-day-text">3 Nights | 2 States</p>
                  <p className="ti-miles-text">323 Total Miles to Travel</p>
                  <Link href="#!" className="ti-details-btn bg-transparent border-0 text-start">
                    View Detailed Itinerary
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="trip-itinerary-card flex-column d-flex align-items-center align-items-sm-start justify-content-center justify-content-sm-between">
            <div className="ti-card-inner d-sm-flex">

              <div className="trip-itinerary-image"><img src="/images/itinerary-slider-img.jpg" alt="" /></div>

              <div className="trip-itinerary-content">
                <h5>Trip Priority: Live Music</h5>
                <div className="d-flex flex-column gap-1">
                  <p className="ti-artists-name">Dave Mathews Band | JJ Drey</p>
                  <p className="ti-activity-text">Mountain Biking</p>

                  <p className="ti-day-text">3 Nights | 2 States</p>
                  <p className="ti-miles-text">323 Total Miles to Travel</p>
                  <Link href="#!" className="ti-details-btn bg-transparent border-0 text-start">
                    View Detailed Itinerary
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="trip-itinerary-card flex-column d-flex align-items-center align-items-sm-start justify-content-center justify-content-sm-between">
            <div className="ti-card-inner d-sm-flex">
              <div className="trip-itinerary-image"><img src="/images/itinerary-slider-img.jpg" alt="" /></div>

              <div className="trip-itinerary-content">
                <h5>Trip Priority: Live Music</h5>
                <div className="d-flex flex-column gap-1">
                  <p className="ti-artists-name">Dave Mathews Band | JJ Drey</p>
                  <p className="ti-activity-text">Mountain Biking</p>
                  <p className="ti-day-text">3 Nights | 2 States</p>
                  <p className="ti-miles-text">323 Total Miles to Travel</p>

                  <Link href="#!" className="ti-details-btn bg-transparent border-0 text-start">
                    View Detailed Itinerary
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="trip-itinerary-card flex-column d-flex align-items-center align-items-sm-start justify-content-center justify-content-sm-between">
            <div className="ti-card-inner d-sm-flex">
              <div className="trip-itinerary-image"><img src="/images/itinerary-slider-img.jpg" alt="" /></div>

              <div className="trip-itinerary-content">
                <h5>Trip Priority: Live Music</h5>
                <div className="d-flex flex-column gap-1">
                  <p className="ti-artists-name">Dave Mathews Band | JJ Drey</p>
                  <p className="ti-activity-text">Mountain Biking</p>
                  <p className="ti-day-text">3 Nights | 2 States</p>
                  <p className="ti-miles-text">323 Total Miles to Travel</p>

                  <Link href="#!" className="ti-details-btn bg-transparent border-0 text-start">
                    View Detailed Itinerary
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="itinerary-arrow-container d-flex justify-content-between">
        <button
          className="itinerary-arrow-prev swiper-arrow-prev arrow-button-box d-flex align-items-center justify-content-center rounded-circle">
          <img src="images/arrow-button-icon.svg" alt="arrow icon" />
        </button>
        <button
          className="itinerary-arrow-next swiper-arrow-next arrow-button-box d-flex align-items-center justify-content-center rounded-circle">
          <img src="images/arrow-button-icon.svg" alt="arrow icon" />
        </button>
      </div>

    </div>
  )
}
