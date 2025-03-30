'use client'
import { useState } from "react";
import '../form.css'
import InnerHero from "../components/inner-hero/InnerHero"
import MidContainer from "../components/mid-container/MidContainer"

const CreateYourProfilePage = () => {

    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [checked, setChecked] = useState(true);

  



    return (
        <>
            <InnerHero midHeading="Let us know details about your travel plans and our team will prepare a detailed itinerary for you." />
            <MidContainer size="lg">
                <div className="profile-form-container">
                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Full Name</label>
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Harry" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Email Address</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your email" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Contact No</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="inputGroupPrepend">+91</span>
                                    <input type="number" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="999 999 1010" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Travelling from</label>
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
                                <label className="form-label">Purpose of travel</label>
                                <div className="custom-checkbox-list d-flex flex-wrap">
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck1" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck1">For Business Purpose</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck2" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck2">For Tourism Purpose</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck3" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck3">To attend Event</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck4" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck4">For Medical treatment</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck5" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck5">For Education</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck6" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck6">To visit Relatives</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">How are you travelling?</label>
                                <div className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center" id="travellingWith">
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingWith" id="travellingWith1" />
                                        <label className="form-check-label" htmlFor="travellingWith1">Solo</label>
                                    </div>
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingWith" id="travellingWith2" />
                                        <label className="form-check-label" htmlFor="travellingWith2">With Friends</label>
                                    </div>
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingWith" id="travellingWith3" />
                                        <label className="form-check-label" htmlFor="travellingWith3">As A Couple</label>
                                    </div>
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingWith" id="travellingWith4" />
                                        <label className="form-check-label" htmlFor="travellingWith4">With kids under 18 years old</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4 d-flex flex-column align-items-start">
                                <label className="form-label">Probable year of travel</label>
                                <div className="form-switch-group d-flex align-items-center justify-content-start" id="travellingYear">
                                    <div className="form-check custom-radio-3 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingYear" id="travellingYear1" checked={checked}
                                            onChange={(e) => setChecked(!checked)} />
                                        <label className="form-check-label" htmlFor="travellingYear1">Current Year</label>
                                    </div>
                                    <div className="form-check custom-radio-3 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingYear" id="travellingYear2" checked={!checked}
                                            onChange={(e) => setChecked(!checked)} />
                                        <label className="form-check-label" htmlFor="travellingYear2">Next Year</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Probable month of travel</label>
                                <div className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center" id="travellingMonth">
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingMonth" id="travellingMonth1" />
                                        <label className="form-check-label" htmlFor="travellingMonth1">Jan-Feb</label>
                                    </div>
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingMonth" id="travellingMonth2" />
                                        <label className="form-check-label" htmlFor="travellingMonth2">Mar-April</label>
                                    </div>
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingMonth" id="travellingMonth3" />
                                        <label className="form-check-label" htmlFor="travellingMonth3">May-June</label>
                                    </div>
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingMonth" id="travellingMonth4" />
                                        <label className="form-check-label" htmlFor="travellingMonth4">July-Aug</label>
                                    </div>
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingMonth" id="travellingMonth5" />
                                        <label className="form-check-label" htmlFor="travellingMonth5">Sep-Oct</label>
                                    </div>
                                    <div className="form-check custom-radio-2 d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="travellingMonth" id="travellingMonth6" />
                                        <label className="form-check-label" htmlFor="travellingMonth6">Nov-Dec</label>
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
            </MidContainer>
        </>
    )
}

export default CreateYourProfilePage