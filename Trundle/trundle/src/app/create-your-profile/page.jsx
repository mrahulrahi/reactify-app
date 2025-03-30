'use client'
import { useState } from "react";
import '../form.css'
import InnerHero from "../components/inner-hero/InnerHero"
import MidContainer from "../components/mid-container/MidContainer"
import { IoClose } from "react-icons/io5";
import Image from 'next/image'

const CreateYourProfilePage = () => {

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [text5, setText5] = useState('');
    const [text6, setText6] = useState('');
    const [text7, setText7] = useState('');
    const [text8, setText8] = useState('');


    return (
        <>
            <InnerHero heading="Create your profile" subHeading="" />
            <MidContainer>
                <div className="profile-form-container">
                    <div className="row g-3">
                        <div className="col-lg-4 mx-auto">
                            <div className="upload-profile-box mb-4 d-flex flex-column align-items-center justify-content-center">
                                <label className="upload-profile-label">Profile image</label>
                                <div className="upload-profile-img d-flex justify-content-center">
                                    <div className="user-icon"><Image src="/images/user-icon.svg" width={120} height={120} alt="user icon" /></div>
                                </div>
                            </div>
                            <div className="upload-profile-box mb-4 d-flex flex-column align-items-center justify-content-center">
                                <label className="upload-profile-label">Profile image</label>
                                <div className="upload-profile-img d-flex justify-content-center border-0" type="button" data-bs-toggle="modal" data-bs-target="#changeImageModal">
                                    <div className="user-img"><Image src="/images/user-img.jpg" width={120} height={120} alt="user img" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-sm-3">
                        <div className="col-sm-4">
                            <div className="form-group mb-4">
                                <label className="form-label">First Name</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Harry" className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group mb-4">
                                <label className="form-label">Middle Name <span>(Optional)</span></label>
                                <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} placeholder="James" className="form-control" />
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group mb-4">
                                <label className="form-label">Last Name*</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Potter" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your email" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Phone No</label>
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
                                <label className="form-label">Where are you from?</label>
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
                                <label className="form-label">Gender</label>
                                <div className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center" id="gender">
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="gender" id="gender1" />
                                        <label className="form-check-label" htmlFor="gender1">Male</label>
                                    </div>
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="gender" id="gender2" />
                                        <label className="form-check-label" htmlFor="gender2">Female</label>
                                    </div>
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="gender" id="gender3" />
                                        <label className="form-check-label" htmlFor="gender3">Others</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label">Languages I speak</label>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Proficiency</label>
                                    </div>
                                </div>

                                <div className="row g-3 mb-2">
                                    <div className="col-6">
                                        <select className="form-select">
                                            <option>Select Language</option>
                                            <option>English</option>
                                            <option>Mandarin</option>
                                            <option>Korean</option>
                                            <option>Japanese</option>
                                            <option>French</option>
                                            <option>German</option>
                                            <option>Spanish</option>
                                            <option>Hindi</option>
                                            <option>Thai</option>
                                            <option>Vietnamese</option>
                                            <option>Malay</option>
                                            <option>Arabic</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex">
                                            <select className="form-select flex-shrink-1">
                                                <option>Select</option>
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Native</option>
                                            </select>
                                            <div className="del-lang-icon"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <select className="form-select">
                                            <option>Select Language</option>
                                            <option>English</option>
                                            <option>Mandarin</option>
                                            <option>Korean</option>
                                            <option>Japanese</option>
                                            <option>French</option>
                                            <option>German</option>
                                            <option>Spanish</option>
                                            <option>Hindi</option>
                                            <option>Thai</option>
                                            <option>Vietnamese</option>
                                            <option>Malay</option>
                                            <option>Arabic</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex">
                                            <select className="form-select flex-shrink-1">
                                                <option>Select</option>
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Native</option>
                                            </select>
                                            <div className="del-lang-icon d-flex align-items-center justify-content-center"><IoClose /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <button className="add-btn d-flex align-items-center justify-content-center">
                                        <div className="add-btn-icon d-flex align-items-center justify-content-center"><Image src="/images/add-button-icon.svg" alt="add icon" width={20} height={20} /></div>
                                        Add another language
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Countries I cover</label>
                                <select className="form-select">
                                    <option>Select</option>
                                    <option>Japan</option>
                                    <option>South Korea</option>
                                    <option>Singapore</option>
                                    <option>Taiwan</option>
                                    <option>Thailand</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Little bit about myself</label>
                                <textarea className="form-control" placeholder='For eg., "Born and bread in Osaka, I love to make travel videos and have more than 150000 subscribers on YouTube. I specialize in food and culture of Japan."'></textarea>
                                <div className="form-text">Max 500 word limit</div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Add your generic discount codes <span>(Optional)</span></label>
                                <textarea className="form-control" placeholder='Use my code R10N10 for a 10% discount on your purchase from www.amazon.com'></textarea>
                                <div className="form-text">Max 500 word limit</div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">My travel content covers</label>
                                <div className="custom-checkbox-list d-flex flex-wrap">
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck1" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck1">Food & Drink</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck2" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck2">Culture</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck3" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck3">Architecture</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck4" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck4">Conversation</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck5" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck5">Art</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck6" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck6">Education</label>
                                    </div>
                                    <div className="custom-checkbox form-check d-flex align-items-start">
                                        <input className="form-check-input" type="checkbox" id="itemCheck7" />
                                        <label className="form-check-label fw-medium" htmlFor="itemCheck7">Shopping</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <div className="row g-3">
                                    <div className="col-5 col-sm-3">
                                        <label className="form-label">Social links <span>(Optional)</span></label>
                                    </div>
                                    <div className="col-7 col-sm-9">
                                        <label className="form-label">Profile Link</label>
                                    </div>
                                </div>

                                <div className="row g-3 mb-2">
                                    <div className="col-5 col-sm-3">
                                        <input type="text" value={text1 == '' ? "Youtube" : text1} onChange={(e) => setText1(e.target.value)} placeholder="Social link" className="form-control" />
                                    </div>
                                    <div className="col-7 col-sm-9">
                                        <input type="text" value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Paste link here" className="form-control" />
                                    </div>
                                </div>
                                <div className="row g-3 mb-2">
                                    <div className="col-5 col-sm-3">
                                        <input type="text" value={text3 == '' ? "X" : text3} onChange={(e) => setText3(e.target.value)} placeholder="Social link" className="form-control" />
                                    </div>
                                    <div className="col-7 col-sm-9">
                                        <input type="text" value={text4} onChange={(e) => setText4(e.target.value)} placeholder="Paste link here" className="form-control" />
                                    </div>
                                </div>
                                <div className="row g-3 mb-2">
                                    <div className="col-5 col-sm-3">
                                        <input type="text" value={text5 == '' ? "Instagram" : text5} onChange={(e) => setText5(e.target.value)} placeholder="Social link" className="form-control" />
                                    </div>
                                    <div className="col-7 col-sm-9">
                                        <input type="text" value={text6} onChange={(e) => setText6(e.target.value)} placeholder="Paste link here" className="form-control" />
                                    </div>
                                </div>
                                <div className="row g-3 mb-2">
                                    <div className="col-5 col-sm-3">
                                        <input type="text" value={text7 == '' ? "Twitch" : text7} onChange={(e) => setText7(e.target.value)} placeholder="Social link" className="form-control" />
                                    </div>
                                    <div className="col-7 col-sm-9">
                                        <input type="text" value={text8} onChange={(e) => setText8(e.target.value)} placeholder="Paste link here" className="form-control" />
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

            <div className="modal fade change-image-modal" id="changeImageModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content overflow-hidden">
                        <div className="modal-body d-flex flex-column align-items-center">
                            <h5>Profile Photo</h5>
                            <div className="cim-user-img rounded-circle overflow-hidden"><Image src="/images/user-img.jpg" width={120} height={120} alt="user img" /></div>
                            <div className="cim-cta w-100 d-flex gap-3 gap-sm-4">
                                <button type="button" className="btn btn-default d-flex align-items-center justify-content-center flex-grow-1"><span className="btn-icon d-flex align-items-center justify-content-center"><Image src="/images/change-icon.svg" width={14} height={14} alt="change icon" /></span>Change</button>
                                <button type="button" className="btn btn-default d-flex align-items-center justify-content-center flex-grow-1"><span className="btn-icon d-flex align-items-center justify-content-center"><Image src="/images/remove-icon.svg" width={14} height={14} alt="remove icon" /></span>Remove</button>
                            </div>
                            <div className="cim-cta w-100 d-flex flex-column align-items-center justify-content-center">
                                <h6>Are you sure you want to remove profile picture</h6>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-primary">Cancel</button>
                                    <button type="button" className="btn btn-default">Remove</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateYourProfilePage