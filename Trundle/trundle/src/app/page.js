'use client'
import Image from 'next/image';
import Link from 'next/link';
import HeroSearch from './components/hero-search/HeroSearch';
import ItineraryCard from "./components/itineraryCard/ItineraryCard"
import InfluencerCard from "./components/influencerCard/InfluencerCard"
import Pagination from "./components/pagination/Pagination"
import FilterButton from './components/filter-button/FilterButton';
import SortButton from './components/sort-button/SortButton';
import { IoClose } from "react-icons/io5";



const Home = () => {


  return (
    <>

      <div className="hero-container">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="hero-content-box w-100 h-100 position-relative">
                <div className="hero-bg position-relative">
                  <Image src="/images/hero-bg.png" alt="hero" fill priority style={{ objectFit: 'cover' }} />
                </div>
                <div className="hero-text d-flex align-items-center">
                  <h1>Get a personalized itinerary <br className='d-none d-md-block' /> for your next trip</h1>
                </div>
              </div>
              <div className='hero-search-wrapper d-flex justify-content-center'><HeroSearch /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="heading d-flex align-items-center justify-content-between">
                <h5>Itineraries</h5>
                <div className="heading-right ps-3 flex-shrink-0">
                  <div className="filter-sort-btn-box d-flex">
                    <div className="fs-btn"><FilterButton /></div>
                    <div className="fs-btn"><SortButton /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-10 mx-auto">
              <div className="filter-row d-flex flex-wrap align-items-center">
                <div className="filter-box d-flex align-items-center rounded-pill">South Korea <div className="fb-close-icon ms-1"><IoClose /></div> </div>
                <div className="filter-box d-flex align-items-center rounded-pill">$20 to $40 <div className="fb-close-icon ms-1"><IoClose /></div> </div>
                <div className="filter-box d-flex align-items-center rounded-pill">2 and more <div className="fb-close-icon ms-1"><IoClose /></div> </div>
              </div>
            </div>
            <div className="col-xl-10 mx-auto">
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <ItineraryCard />

                </div>
                <div className="col-lg-4 col-md-6">
                  <ItineraryCard />

                </div>
                <div className="col-lg-4 col-md-6">
                  <ItineraryCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container p-0">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="heading d-flex justify-content-between">
                <h5>Popular Influencers</h5>
                <div className="heading-right ps-3 flex-shrink-0">
                  <Link href="/trundlers" className="link">View All</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="user-card-wrapper">
                <div className="user-card-list d-flex">
                  <div className="user-card-item">
                    <InfluencerCard />
                  </div>
                  <div className="user-card-item">
                    <InfluencerCard />
                  </div>
                  <div className="user-card-item">
                    <InfluencerCard />
                  </div>
                  <div className="user-card-item">
                    <InfluencerCard />
                  </div>
                  <div className="user-card-item">
                    <InfluencerCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <ItineraryCard />

                </div>
                <div className="col-lg-4 col-md-6">
                  <ItineraryCard />

                </div>
                <div className="col-lg-4 col-md-6">
                  <ItineraryCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container pt-0">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="d-flex align-items-center justify-content-center w-100">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
