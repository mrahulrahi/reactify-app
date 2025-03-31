'use client';

import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import '../(home)/LPJapan.css'
import './TravellingToJapan.css'
import localFont from 'next/font/local'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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



const HelpPlanMyTrip = ({ travellMonths, travellingWithList }) => {

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

  const whatsAppNavUrl = "https://calendly.com/trundlecare/30min";

  // Dynamic data arrays
  const travellingWithOptions = [
    { id: 1, label: "Solo", value: "Solo" },
    { id: 2, label: "With friends", value: "With friends" },
    { id: 3, label: "As a couple", value: "As a couple" },
    { id: 4, label: "With kids", value: "With kids" },
  ];

  const travelMonthOptions = [
    { id: 1, label: "Jan - Mar", value: "Jan - Mar" },
    { id: 2, label: "Apr - Jun", value: "Apr - Jun" },
    { id: 3, label: "Jul - Sept", value: "Jul - Sept" },
    { id: 4, label: "Oct - Dec", value: "Oct - Dec" },
  ];

  // Validation schema using Yup
  const validationSchema = Yup.object({
    travellingWith: Yup.string().required("Select how you are travelling"),
    travelMonth: Yup.string().required("Select your travel month"),
    fullName: Yup.string()
      .min(2, "Full Name must be at least 2 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // const formik = useFormik({
  //   initialValues: {
  //     travellingWith: "",
  //     travelMonth: "",
  //     fullName: "",
  //     email: "",
  //   },
  //   validationSchema,
  //   onSubmit: (values) => {
  //     console.log("Form Data: ", values);
  //   },
  // });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues:
    {
      travellingWith: "",
      travelMonth: "",
      fullName: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      const values = {
        full_name: data?.fullName,
        email: data?.email,
        how_are_you_traveling: parseInt(data?.travellingWith),
        travel_month: parseInt(data?.travelMonth),
      };
      setLoading(true);
      await axios
        .post("https://api.trundle.me/account/create-travel-plans", values)
        .then((response) => {
          if (response?.data) {
            setLoading(false);
            toast.success(response?.data?.message);
          }
          router.push("/successful-submission");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
        });
    },
  });

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
                  <form onSubmit={formik.handleSubmit} className="ttj-form-container">
                    {/* Travelling With */}
                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="form-label">How are you travelling?</label>
                          <div className="form-radio-check-group d-flex flex-wrap align-items-center" id="travellingWith">
                            {travellingWithList?.map((option) => (
                              <div className="form-check custom-radio-2 d-flex align-items-center" key={option.id}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="travellingWith"
                                  id={`travellingWith${option?.id}`}
                                  value={option?.id}
                                  onChange={formik.handleChange}
                                />
                                <label className="form-check-label" htmlFor={`travellingWith${option.id}`}>
                                  {option?.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          {formik.touched.travellingWith && formik.errors.travellingWith && (
                            <div style={{ fontSize: "13px" }} className="error m-1 text-danger">{formik.errors.travellingWith}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Travel Month */}
                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="form-label">Month of travel</label>
                          <div className="form-radio-check-group d-flex flex-wrap align-items-center" id="travelMonth">
                            {travellMonths?.map((option, index) => (
                              <div className="form-check custom-radio-2 d-flex align-items-center" key={index}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="travelMonth"
                                  id={`travelMonth${option?.id}`}
                                  value={option?.id}
                                  onChange={formik.handleChange}
                                />
                                <label className="form-check-label" htmlFor={`travelMonth${option?.id}`}>
                                  {option?.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          {formik.touched.travelMonth && formik.errors.travelMonth && (
                            <div style={{ fontSize: "13px" }} className="error m-1 text-danger">{formik.errors.travelMonth}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your full name"
                            className="form-control"
                          />
                          {formik.touched.fullName && formik.errors.fullName && (
                            <div style={{ fontSize: "13px" }} className="error m-1 text-danger">{formik.errors.fullName}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your email address"
                            className="form-control"
                          />
                          {formik.touched.email && formik.errors.email && (
                            <div style={{ fontSize: "13px" }} className="error m-1 text-danger">{formik.errors.email}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <button
                            disabled={loading}
                            type="button"
                            onClick={formik.handleSubmit}
                            className="btn btn-default btn-block"
                          >
                            Submit
                            {loading && (
                              <div
                                className="spinner-border spinner-border-sm mx-3"
                                role="status"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default HelpPlanMyTrip;