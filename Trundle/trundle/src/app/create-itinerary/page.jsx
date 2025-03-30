'use client'
import { useState } from "react";
import '../form.css'
import './CreateItinerary.css'
import Image from 'next/image'
import { IoChevronBack } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";


const CreateItineraryPage = () => {

    const [title, setTitle] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [text5, setText5] = useState('');


    return (
        <>
            <div className="content-container position-relative pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 mx-auto">
                            <div className="itinerary-form-container">
                                <div className="table-form-heading">Create Itinerary</div>
                                <div className="upload-cover-img mb-4"><Image src="/images/upload-cover.jpg" fill alt="upload cover" sizes="100VW" /></div>

                                <div className="table-form-wrapper mb-4">
                                    <div className="table-form-row">
                                        <div className="form-group d-flex align-items-center justify-content-center">
                                            <div className="form-group-left"><label className="form-label type2">Select Country*</label></div>
                                            <div className="form-group-right">
                                                <select className="form-select type2">
                                                    <option>Japan</option>
                                                    <option>South Korea</option>
                                                    <option>Indonesia</option>
                                                    <option>Taiwan</option>
                                                    <option>United States</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-form-row">
                                        <div className="form-group d-flex align-items-center justify-content-center">
                                            <div className="form-group-left pe-5"><label className="form-label type2">Title*</label></div>
                                            <div className="form-group-right d-flex">
                                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Best place to visit in Osaka" className="form-control type2" />
                                                <div className="form-text">28/28</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-form-row">
                                        <div className="form-group d-flex align-items-center justify-content-center">
                                            <div className="form-group-left pe-5"><label className="form-label type2">Description*</label></div>
                                            <div className="form-group-right d-flex">
                                                <textarea className="form-control type2" placeholder='Trip to north japan connecting the famous spots, guided by professional guide lorem ipsum bonaparte, Famous for landscapes and scenic photographs of beautiful places.'></textarea>
                                                <div className="form-text">178/180</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-form-row">
                                        <div className="form-group d-flex align-items-center justify-content-center">
                                            <div className="form-group-left"><label className="form-label type2">Suitable for</label></div>
                                            <div className="form-group-right">
                                                <select className="form-select type2">
                                                    <option>Solo traveller</option>
                                                    <option>Solo female traveller</option>
                                                    <option>Couple</option>
                                                    <option>With Friends</option>
                                                    <option>Traveller with Kid(s)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-form-row">
                                        <div className="form-group d-flex align-items-center justify-content-center">
                                            <div className="form-group-left"><label className="form-label type2">Itineraries has these categories</label></div>
                                            <div className="form-group-right">
                                                <select className="form-select type2">
                                                    <option>Religious</option>
                                                    <option>Achitecture</option>
                                                    <option>Food & Culture</option>
                                                    <option>Nightlife</option>
                                                    <option>Nature</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-form-row">
                                        <div className="form-group d-flex align-items-center justify-content-center">
                                            <div className="form-group-left"><label className="form-label type2">Add your generic discount codes</label></div>
                                            <div className="form-group-right d-flex">
                                                <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="Use my code R10N10 for a 10% discount on your purchase from www.amazon.com" className="form-control type2" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-form-row">
                                        <div className="form-group d-flex align-items-center justify-content-center">
                                            <div className="form-group-left"><label className="form-label type2">Price</label></div>
                                            <div className="form-group-right d-flex">
                                                <div className="form-radio-check-group d-flex flex-wrap align-items-center" id="price">
                                                    <div className="form-check custom-radio d-flex align-items-center">
                                                        <input className="form-check-input" type="radio" name="price" id="price1" />
                                                        <label className="form-check-label" htmlFor="price1">$1</label>
                                                    </div>
                                                    <div className="form-check custom-radio d-flex align-items-center">
                                                        <input className="form-check-input" type="radio" name="price" id="price2" />
                                                        <label className="form-check-label" htmlFor="price2">$2</label>
                                                    </div>
                                                    <div className="form-check custom-radio d-flex align-items-center">
                                                        <input className="form-check-input" type="radio" name="price" id="price3" />
                                                        <label className="form-check-label" htmlFor="price3">$4</label>
                                                    </div>
                                                    <div className="form-check custom-radio d-flex align-items-center">
                                                        <input className="form-check-input" type="radio" name="price" id="price4" />
                                                        <label className="form-check-label" htmlFor="price4">$5</label>
                                                    </div>
                                                    <div className="form-check custom-radio d-flex align-items-center">
                                                        <input className="form-check-input" type="radio" name="price" id="price5" />
                                                        <label className="form-check-label" htmlFor="price5">$10</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="add-item-btn-box" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                                    <button className="add-btn d-flex align-items-center justify-content-center">
                                        <div className="add-btn-icon d-flex align-items-center justify-content-center"><Image src="/images/add-button-icon.svg" alt="add icon" width={20} height={20} /></div>
                                        Add Item
                                    </button>
                                </div>

                                <div className="col-lg-6 mx-auto mt-4">
                                    <button type="button" className="btn btn-default btn-block" disabled>Publish</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>




            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header align-items-center justify-content-start">
                    <button type="button" className="modal-back-btn d-flex align-items-center justify-content-center" data-bs-dismiss="offcanvas" aria-label="Close"><IoChevronBack /></button>
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Add Item</h5>

                </div>
                <div className="offcanvas-body">
                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Name of place</label>
                                <input type="text" placeholder="Eg. Tokyo Disneyland" className="form-control" value={text1} onChange={(e) => setText1(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Type of location</label>
                                <div className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center" id="location">
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="location" id="location1" />
                                        <label className="form-check-label" htmlFor="location1">Places</label>
                                    </div>
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="location" id="location2" />
                                        <label className="form-check-label" htmlFor="location2">Food & Drink</label>
                                    </div>
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="location" id="location3" />
                                        <label className="form-check-label" htmlFor="location3">Event</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Category of location</label>
                                <select className="form-select">
                                    <option>Select Location</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Canada</option>
                                    <option>Australia</option>
                                    <option>Germany</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Address</label>
                                <input type="text" placeholder="Enter Address" className="form-control" value={text2} onChange={(e) => setText2(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Postcode</label>
                                <input type="text" placeholder="Enter Postcode" className="form-control" value={text3} onChange={(e) => setText3(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">City</label>
                                <select className="form-select">
                                    <option>Select</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Canada</option>
                                    <option>Australia</option>
                                    <option>Germany</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">City <span>(Copy paste Google Map link here)</span></label>
                                <input type="text" placeholder="Paste link here" className="form-control" value={text4} onChange={(e) => setText4(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Open timing <span>For eg: Open from 9am till 6pm</span></label>
                                <textarea className="form-control" placeholder="Enter"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Best time to visit <span>For eg: Early morning on weekdays</span></label>
                                <textarea className="form-control" placeholder="Enter"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Discount code <span>Copy paste your own discount code for users to use when they visit</span></label>
                                <input type="text" placeholder="Enter or Paste the copied text here" className="form-control" value={text5} onChange={(e) => setText5(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Upload photos <span>Max 5 images</span></label>
                                <div className="upload-photo-list d-flex flex-wrap">
                                    <div className="upload-photo-item">
                                        <div className="upload-photo-box w-100 h-100">
                                            <div className="uploaded-photo">
                                                <Image src="/images/uploaded-photo-img.jpg" fill alt="uploaded photo" />
                                            </div>
                                            <a href="#!" className="upload-photo d-none d-flex flex-column align-items-center justify-content-center">
                                                <div className="upload-photo-icon d-flex flex-column align-items-center justify-content-center"><FaPlus /></div><span className="d-none d-sm-block">Click to upload</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="upload-photo-item">
                                        <div className="upload-photo-box w-100 h-100">
                                            <div className="uploaded-photo">
                                                <Image src="/images/uploaded-photo-img.jpg" fill alt="uploaded photo" />
                                            </div>
                                            <a href="#!" className="upload-photo d-none d-flex flex-column align-items-center justify-content-center">
                                                <div className="upload-photo-icon d-flex flex-column align-items-center justify-content-center"><FaPlus /></div><span className="d-none d-sm-block">Click to upload</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="upload-photo-item">
                                        <div className="upload-photo-box w-100 h-100">
                                            <div className="uploaded-photo">
                                                <Image src="/images/uploaded-photo-img.jpg" fill alt="uploaded photo" />
                                            </div>
                                            <a href="#!" className="upload-photo d-none d-flex flex-column align-items-center justify-content-center">
                                                <div className="upload-photo-icon d-flex flex-column align-items-center justify-content-center"><FaPlus /></div><span className="d-none d-sm-block">Click to upload</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="upload-photo-item">
                                        <div className="upload-photo-box w-100 h-100">
                                            <div className="uploaded-photo">
                                                <Image src="/images/uploaded-photo-img.jpg" fill alt="uploaded photo" />
                                            </div>
                                            <a href="#!" className="upload-photo d-none d-flex flex-column align-items-center justify-content-center">
                                                <div className="upload-photo-icon d-flex flex-column align-items-center justify-content-center"><FaPlus /></div><span className="d-none d-sm-block">Click to upload</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="upload-photo-item">
                                        <div className="upload-photo-box w-100 h-100">
                                            <div className="uploaded-photo d-none">
                                                <Image src="/images/uploaded-photo-img.jpg" fill alt="uploaded photo" />
                                            </div>
                                            <a href="#!" className="upload-photo d-flex flex-column align-items-center justify-content-center">
                                                <div className="upload-photo-icon d-flex flex-column align-items-center justify-content-center"><FaPlus /></div><span className="d-none d-sm-block">Click to upload</span>
                                            </a>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <input type="submit" value="Submit" className="btn btn-default btn-block" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateItineraryPage