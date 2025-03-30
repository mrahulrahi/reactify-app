'use client'
import '../itinerary-single/ItineraryDetails.css'
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import hero from '../itinerary-single/itinerary-hero.jpg'
import { HiDotsHorizontal } from "react-icons/hi";
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs'
import PlaceCard from "../components/placeCard/PlaceCard"
import { IoClose } from "react-icons/io5";
import BuyCard from '../components/buyCard/BuyCard';
import DonateCard from '../components/donateCard/DonateCard';
import ProfileCard from '../components/profileCard/ProfileCard';

const ItinerarySinglePage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <>
            <div className="content-container position-relative py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 mx-auto">
                            <Breadcrumbs />
                            <div className="itenerary-details-hero">
                                <div className="itenerary-details-hero-img">
                                    <Image src={hero} alt="itenerary details hero img" fill sizes="100VW" />
                                </div>
                                <div className="itenerary-details-hero-details">
                                    <div className="id-head">
                                        <div className="id-hero-options d-flex align-items-center gap-2">
                                            <div className="id-options-price d-none d-md-flex">$0</div>
                                            <Link href="/view-itinerary" className="btn btn-primary"><span><Image src="/images/edit-icon.svg" width={15} height={15} alt="Edit Itinerary" /></span> Edit</Link>
                                            <Link href="#" className="btn btn-primary"><span><Image src="/images/share-icon.svg" width={15} height={17} alt="Share Itinerary" /></span> Copy Link</Link>
                                            <div className="dropdown ms-auto ms-md-0">
                                                <a href="#" className="id-options" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <HiDotsHorizontal />
                                                </a>

                                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                                    <li><a className="dropdown-item" href="#">Option 1</a></li>
                                                    <li><a className="dropdown-item" href="#">Option 2</a></li>
                                                    <li><a className="dropdown-item" href="#">Option 3</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h1 className="id-title">Trip to North Japan</h1>
                                        <div className="id-country">Japan</div>
                                        <div className="id-options-price d-md-none">$0</div>
                                    </div>
                                    <div className="id-body">
                                        <div className="id-text"><p>Trip to north japan connecting the famous spots, guided by professional guide lorem ipsum bonaparte, Famous for landscapes and scenic photographs of beautiful places</p>
                                        </div>
                                        <div className="id-info-list d-flex flex-wrap">
                                            <div className="id-info-item d-flex flex-wrap align-items-center">
                                                <div className="id-info-icon me-1"><Image src="./images/food-icon.svg" width={28} height={21} alt="Food" /></div>
                                                <div className="id-info-text"><strong>02</strong> Food & Drink</div>
                                            </div>
                                            <div className="id-info-item d-flex flex-wrap align-items-center">
                                                <div className="id-info-icon me-1"><Image src="./images/flag-icon.svg" width={20} height={21} alt="flag" /></div>
                                                <div className="id-info-text"><strong>10</strong> Places to see </div>
                                            </div>
                                            <div className="id-info-item d-flex flex-wrap align-items-center">
                                                <div className="id-info-icon me-1"><Image src="./images/flag-icon.svg" width={20} height={21} alt="flag" /></div>
                                                <div className="id-info-text"><strong>10</strong> Events</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-container position-relative pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 mx-auto">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card-box overflow-hidden">
                                        <div className="card-box-head">
                                            <h3 className="card-box-title"><span className="d-flex me-2"><Image src="../images/listing-icon.svg" alt="listing icon" width={15} height={13} /> </span>Itinerary</h3>
                                            <div className="card-box-close"><IoClose /></div>
                                        </div>
                                        <div className="card-box-body unlock-login position-relative">
                                            <ul className="place-list position-relative">
                                                <li className="place-item position-relative">
                                                    <PlaceCard />
                                                </li>

                                                <li className="place-item position-relative">
                                                    <PlaceCard />
                                                </li>

                                                <li className="place-item position-relative">
                                                    <PlaceCard />
                                                </li>

                                                <li className="place-item position-relative">
                                                    <PlaceCard />
                                                </li>
                                            </ul>
                                            <div className="unlock-login-container d-flex align-items-center justify-content-center">
                                                <form className="unlock-login-inside w-100 h-auto">
                                                    <div className="unlock-login-head mb-3">
                                                        <h5>Unlock the best of Trundle</h5>
                                                        <p>Create a free account or Sign In to view and <br className="d-none d-sm-block" /> buy this itinerary</p>
                                                    </div>
                                                    <div className="unlock-login-body">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="form-group mb-3">
                                                                    <label className="form-label">Email Address</label>
                                                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="varun@gmail.com" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="form-group mb-3">
                                                                    <label className="form-label">Password</label>
                                                                    <input type="password" autoComplete='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="varun#123" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="form-group">
                                                                    <input type="submit" value="Log In" className="btn btn-default btn-block" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-4 mt-lg-0">
                                    <div className="itinerary-single-sidebar">
                                        <div className="iss-box mb-4">
                                            <BuyCard />
                                        </div>
                                        <div className="iss-box mb-4">
                                            <DonateCard />
                                        </div>
                                        <div className="iss-box">
                                            <ProfileCard />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItinerarySinglePage