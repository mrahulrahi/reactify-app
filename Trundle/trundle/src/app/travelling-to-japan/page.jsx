'use client'
import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import '../(home)/LPJapan.css'
import './TravellingToJapan.css'
import localFont from 'next/font/local'

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



const TravellingToJapanPage = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');


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


        <div className="ttj-inner-hero-container position-relative d-flex align-items-center overflow-hidden">
          <div className="container add-index">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7 col-lg-6 text-center">
                <h1>Travelling to Japan?</h1>
                <p>Please share your trip details and our local travel expert will reach out to you in <span>less than 12 hours.</span></p>
              </div>
            </div>
          </div>

          <div className="ttj-line-1">
            <Image src="/images/japan/ttj-line-1.svg" alt="" width={146} height={100} quality={100} />
          </div>
          <div className="ttj-line-2">
            <Image src="/images/japan/ttj-line-2.svg" alt="" width={132} height={265} quality={100} />
          </div>
          <div className="ttj-ih-img d-none d-md-block">
            <Image src="/images/japan/ttj-ih-img.png" alt="" width={978} height={256} quality={100} />
          </div>
          <div className="ttj-star">
            <Image src="/images/japan/ttj-star.svg" alt="" width={25} height={25} quality={100} />
          </div>
        </div>

        <div className="content-container position-relative pt-0 ">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div
                  className="ttj-form-wrapper">
                  <div className="ttj-form-container">
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
                              <label className="form-check-label" htmlFor="travellingWith2">With friends</label>
                            </div>
                            <div className="form-check custom-radio-2 d-flex align-items-center">
                              <input className="form-check-input" type="radio" name="travellingWith" id="travellingWith3" />
                              <label className="form-check-label" htmlFor="travellingWith3">As a couple</label>
                            </div>
                            <div className="form-check custom-radio-2 d-flex align-items-center">
                              <input className="form-check-input" type="radio" name="travellingWith" id="travellingWith4" />
                              <label className="form-check-label" htmlFor="travellingWith4">With kids</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="form-label">Month of travel</label>
                          <div className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center" id="travelMonth">
                            <div className="form-check custom-radio-2 d-flex align-items-center">
                              <input className="form-check-input" type="radio" name="travelMonth" id="travelMonth1" />
                              <label className="form-check-label" htmlFor="travelMonth1">Jan - Mar</label>
                            </div>
                            <div className="form-check custom-radio-2 d-flex align-items-center">
                              <input className="form-check-input" type="radio" name="travelMonth" id="travelMonth2" />
                              <label className="form-check-label" htmlFor="travelMonth2">Apr - Jun</label>
                            </div>
                            <div className="form-check custom-radio-2 d-flex align-items-center">
                              <input className="form-check-input" type="radio" name="travelMonth" id="travelMonth3" />
                              <label className="form-check-label" htmlFor="travelMonth3">Jul - Sept</label>
                            </div>
                            <div className="form-check custom-radio-2 d-flex align-items-center">
                              <input className="form-check-input" type="radio" name="travelMonth" id="travelMonth4" />
                              <label className="form-check-label" htmlFor="travelMonth4">Oct - Dec</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="form-label">Full Name</label>
                          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="form-label">Email Address</label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="form-control" />
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

export default TravellingToJapanPage;