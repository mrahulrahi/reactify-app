'use client'
import { useState , useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import '../(home)/LPJapan.css'
import './LandingForm.css'
import localFont from 'next/font/local'

import Select from 'react-select';

const clashDisplay = localFont({
  src: [
    {
      path: './fonts/ClashDisplay-Semibold.woff2',
      weight: '600',
    },
  ],
  variable: '--font-clashDisplay',
  display: 'swap',
})

const optionsPhoneCode = [
  { value: '+1', label: '+1' },
  { value: '+2', label: '+2' },
  { value: '+3', label: '+3' },
  { value: '+4', label: '+4' },
  { value: '+91', label: '+91' },
  { value: '+92', label: '+92' },
  { value: '+93', label: '+93' },
  { value: '+94', label: '+94' },
]

const optionsCountry = [
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'India', label: 'India' },
  { value: 'Japan', label: 'Japan' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'Vietnam', label: 'Vietnam' },
  { value: 'Spain', label: 'Spain' },
];

const optionsMonth = [
  { value: 'January', label: 'January' },
  { value: 'Febuary', label: 'Febuary' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
]

const LandingFormPage = () => {

  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

    /*========================== Header fix ==========================*/
    const handleScroll = () => {
      var scroll = document.documentElement.scrollTop;
      if (scroll >= 10) {
        document.body.classList.add("fixed");
      } else {
        document.body.classList.remove("fixed");
      }
    };
  
    // Initial check on component mount
    useEffect(() => {
      handleScroll(); // Check scroll position on mount
      window.addEventListener("scroll", handleScroll); // Attach scroll event listener
  
      return () => {
        window.removeEventListener("scroll", handleScroll); // Clean up the event listener on unmount
      };
    }, []);

  const whatsAppNavUrl = "https://calendly.com/trundlecare/30min"

  return (
    <>
      <div className={`lpj-page-wrapper ${clashDisplay.variable}`}>
        <header className="lpj-header d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="lpj-header-inner d-flex align-items-center justify-content-between">
                  <Link className="lpj-header-logo" href="/">
                    <Image src="/images/japan/logo.svg" alt="Trundle" width={132} height={100} quality={100} />
                  </Link>
                  <div className="lpj-header-right">
                    <Link href={whatsAppNavUrl} target='_blank' className="btn btn-outline">Talk to us</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>


        <div className="landing-inner-hero-container position-relative d-flex align-items-center overflow-hidden">
          <div className="container add-index">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-6 col-lg-5 text-center">
                <h1>Please share your trip details and our travel expert will reach out to you in less than 12 hours.</h1>
              </div>
            </div>
          </div>
          <div className="lih-blur-img">
            <Image src="/images/japan/lih-blur-img.png" alt="" width={190} height={248} quality={100} />
          </div>
          <div className="lih-line">
            <Image src="/images/japan/lih-line.svg" alt="" width={226} height={110} quality={100} />
          </div>
          <div className="lih-star">
            <Image src="/images/japan/lih-star.svg" alt="" width={20} height={20} quality={100} />
          </div>
        </div>

        <div className="content-container position-relative pt-0 ">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div
                  className="landing-page-content-box">
                  <div className="landing-form-container">
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
                          <div className="phone-select-group">
                            <input type="number" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="999 999 1010" className="form-control" />
                            <Select defaultValue={selectedOption} placeholder="+1"
                              onChange={setSelectedOption}
                              options={optionsPhoneCode}
                              className="phone-select-container"
                              classNamePrefix="phone-select" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="form-label">Travelling from</label>

                          <Select
                            defaultValue={selectedOption} placeholder="Select"
                            onChange={setSelectedOption}
                            options={optionsCountry}
                            className="form-select-container"
                            classNamePrefix="form-select"
                          />
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
                        <div className="form-group mb-4">
                          <label className="form-label">Probable month of travel</label>

                          <Select
                            defaultValue={selectedOption} placeholder="Select"
                            onChange={setSelectedOption}
                            options={optionsMonth}
                            className="form-select-container"
                            classNamePrefix="form-select"
                          />
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
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default LandingFormPage