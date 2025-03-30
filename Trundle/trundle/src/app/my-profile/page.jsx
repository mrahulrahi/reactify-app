'use client'
import './myprofile.css';
import Image from 'next/image';
import Link from 'next/link';
import InnerHero from "../components/inner-hero/InnerHero"
import profileImg from './profile-img.jpg'
import { FaYoutube, FaXTwitter, FaInstagram, FaTwitch } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ItineraryCard from "../components/itineraryCard/ItineraryCard";

const MyProfile = () => {

    return (
        <>
            <InnerHero heading="" subHeading="" />
            <div className="my-profile-container position-relative">
                <div className="content-container p-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-8 mx-auto">
                                <div className="my-profile-head d-flex flex-column align-items-center text-center">
                                    <div className="mp-img">
                                        <div className="mp-img-inner">
                                            <Image src={profileImg} width={160} height={160} alt="username" />
                                        </div>
                                    </div>
                                    <h2 className="mp-name mb-1">Harry James Potter</h2>
                                    <div className="mp-profile mb-2">Travel Blogging, Photographer</div>
                                    <div className="mp-countries-covered mb-3 d-flex align-items-center">Countries I cover <div className="country-list d-flex">
                                        <span className="d-flex ms-1"><Image src="/images/flag1.svg" width={40} height={25} alt="flag" /></span>
                                        <span className="d-flex ms-1"><Image src="/images/flag2.svg" width={40} height={25} alt="flag" /></span>
                                    </div></div>
                                    <div className="mp-tags mb-3">#Food&Drink #Shopping #Culture</div>
                                    <div className="mp-bio mb-2">American photographer and artist, based in the California Central Coast region. Famous for landscapes and scenic photographs of beautiful places</div>
                                    <div className="mp-coupon mb-3">Use my code RION10 for a 10% discount on your purchase from www.amazon.com</div>

                                    <ul className="mp-social-list d-flex align-items-center mb-4">
                                        <li><a href="#" target="_blank"><FaYoutube /></a></li>
                                        <li><a href="#" target="_blank"><FaXTwitter /></a></li>
                                        <li><a href="#" target="_blank"><FaInstagram /></a></li>
                                        <li><a href="#" target="_blank"><FaTwitch /></a></li>
                                    </ul>
                                    <div className="mp-cta">
                                        <a href="#" className="btn btn-default" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">Send Newsletter</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div className="content-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="my-profile-body">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="first-tab" data-bs-toggle="tab" data-bs-target="#first-tab-pane" type="button" role="tab" aria-controls="first-tab-pane" aria-selected="true">My Itineraries</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="second-tab" data-bs-toggle="tab" data-bs-target="#second-tab-pane" type="button" role="tab" aria-controls="second-tab-pane" aria-selected="false">Summary</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane show active" id="first-tab-pane" role="tabpanel" aria-labelledby="first-tab" tabIndex="0">
                                            <div className="heading d-flex align-items-center justify-content-between">
                                                <h5>My Itineraries (3)</h5>
                                                <div className="heading-right ps-3 flex-shrink-0">
                                                    <Link href="/create-itinerary" className="btn btn-primary"><span><Image src="/images/upload-icon.svg" width={20} height={19} alt="Upload Itinerary" /></span> Upload <span className="d-none d-md-inline">Itinerary</span></Link>
                                                </div>
                                            </div>

                                            <div className="card-container">
                                                <div className="row g-4">
                                                    <div className="col-lg-4 col-md-6">
                                                        <ItineraryCard isUser={true} status='inactive' />
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <ItineraryCard isUser={true} status='inactive' />
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <ItineraryCard isUser={true} status='active' />
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <ItineraryCard isUser={true} status='active' />
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <ItineraryCard isUser={true} status='active' />
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <ItineraryCard isUser={true} status='inactive' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="second-tab-pane" role="tabpanel" aria-labelledby="second-tab" tabIndex="0">
                                            <div className="summary-list d-flex flex-wrap">
                                                <div className="summary-item">
                                                    <div className="summary-box">
                                                        <h3 className="summary-heading">04</h3>
                                                        <div className="summary-body">Active <br />Itineraries</div>
                                                    </div>
                                                </div>
                                                <div className="summary-item">
                                                    <div className="summary-box">
                                                        <h3 className="summary-heading">10</h3>
                                                        <div className="summary-body">Itineraries <br />bought</div>
                                                    </div>
                                                </div>
                                                <div className="summary-item">
                                                    <div className="summary-box">
                                                        <h3 className="summary-heading">$30</h3>
                                                        <div className="summary-body">Total amount earned so far</div>
                                                    </div>
                                                </div>
                                                <div className="summary-item">
                                                    <div className="summary-box">
                                                        <h3 className="summary-heading">$70</h3>
                                                        <div className="summary-body">Next invoice payment amount
                                                            <span className="summary-due-date d-block mt-1 text-red">Due date: 8, Nov 2023</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end newsletter-modal" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="newsletter-head d-flex align-items-center justify-content-between">
                    <h5>Newsletter</h5>
                    <button type="button" className="modal-close-btn d-flex align-items-center justify-content-center" data-bs-dismiss="offcanvas" aria-label="Close"><IoClose /></button>
                </div>
                <div className="newsletter-body">
                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="nb-form-group">
                                <label className="nb-form-label"><span>Write your subject of your email here (not more than 6 words)</span></label>
                                <div className="nb-form-control d-flex align-items-center" contentEditable={true} suppressContentEditableWarning={true}>Launch of New Itinerary</div>
                                <div className="nb-textarea" contentEditable={true} suppressContentEditableWarning={true}>
                                    <p><span>Hey ( Name)!</span></p>
                                    <p>I&apos;m thrilled to share some exciting news with you—I&apos;ve just returned from an incredible journey exploring the vibrant culture of Japan. This Monday I am launching a brand new itinerary for you.</p>
                                    <p> Safe travels and endless curiosity! <br /> Hary James Potter</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="newsletter-footer">
                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <input type="submit" value="Submit" className="btn btn-default" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile