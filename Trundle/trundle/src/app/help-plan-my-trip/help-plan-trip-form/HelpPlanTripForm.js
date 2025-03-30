// "use client";

// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Select from "react-select";
// import { ErrorMessage, SelectField } from "../../components";
// import { convertToTitleCase } from "../../lib/formatHeading";
// import axios from "axios";

// const travelWithList = [
//    { id: 1, label: "Solo" },
//    { id: 2, label: "With Friends" },
//    { id: 3, label: "As A Couple" },
//    { id: 4, label: "With kids under 18 years old" },
// ];

// export default function HelpPlanTripForm({
//    allCountriesList,
//    purposeOfTravelList,
//    probableMonthTravel
// }) {
//    const [loading, setLoading] = useState(false);

//    const router = useRouter();

//    const countriestOptions = allCountriesList?.data?.map((data, _) => ({
//       value: data?.phone_code,
//       label: `+${data?.phone_code}`,
//       id: data?.id,
//    }));

//    const fromCountriesOptions = allCountriesList?.data?.map((data, _) => ({
//       value: data?.phone_code,
//       label: convertToTitleCase(data?.name),
//       id: data?.id,
//    }));

//    const validationSchemaSignin = Yup.object().shape({
//       full_name: Yup.string().required("First name is required"),
//       email: Yup.string()
//          .email("Email must be a valid email")
//          .required("Email is required"),
//       mobile_no: Yup.string()
//          .matches(/^[0-9]{10}$/, "Invalid mobile_no number")
//          .required("Phone number is required"),
//       phone_code: Yup.string().required("Phone code is required"),
//       travelling_from: Yup.object().required("Your location is required"),
//       purpose_of_travel: Yup.array()
//          .min(1, "At least one purpose must be selected")
//          .required("Purpose of travel is required"),
//       how_are_you_traveling: Yup.string().required(
//          "How are you travelling is required"
//       ),
//       travel_year: Yup.string().required("Probable year of travel is required"),
//       travel_month: Yup.string().required(
//          "Probable month of travel is required"
//       ),
//    });

//    const initialValuesSignin = {
//       full_name: "",
//       email: "",
//       mobile_no: "",
//       phone_code: "",
//       travelling_from: null,
//       purpose_of_travel: [],
//       how_are_you_traveling: "",
//       travel_year: "",
//       travel_month: "",
//    };

//    const formik = useFormik({
//       initialValues: initialValuesSignin,
//       validationSchema: validationSchemaSignin,
//       onSubmit: async (data) => {
//          const values = {
//             full_name: data?.full_name,
//             email: data?.email,
//             mobile_no: `${data?.mobile_no}`,
//             phone_code: `${data?.phone_code}`,
//             travelling_from: `${data?.travelling_from?.id}`,
//             purpose_of_travel: data?.purpose_of_travel?.join(","),
//             how_are_you_traveling: parseInt(data?.how_are_you_traveling),
//             travel_year: data?.travel_year,
//             travel_month: `${data?.travel_year}`,
//          };
//          setLoading(true);
//          await axios
//             .post("https://api.trundle.me/account/create-travel-plans", values)
//             .then((response) => {
//                if (response?.data) {
//                   setLoading(false);
//                   toast.success(response?.data?.message);
//                }
//                router.push("/successful-submission");
//             })
//             .catch((error) => {
//                setLoading(false);
//                console.error("Error:", error);
//             });
//       },
//    });

//    return (
//       <div className="profile-form-container">
//          <div className="row g-3">
//             <div className="col-lg-12">
//                <div className="form-group mb-4">
//                   <label className="form-label">Full Name*</label>
//                   <input
//                      type="text"
//                      id="full_name"
//                      name="full_name"
//                      onChange={formik.handleChange}
//                      onBlur={formik.handleBlur}
//                      value={formik.values.full_name}
//                      placeholder="John Michael Doe"
//                      className="form-control"
//                      touched={formik.touched.full_name}
//                   />
//                   <ErrorMessage
//                      touched={formik.touched?.full_name}
//                      error={formik.errors?.full_name}
//                   />
//                </div>
//             </div>
//          </div>
//          <div className="row g-3">
//             <div className="col-lg-12">
//                <div className="form-group mb-4">
//                   <label className="form-label">Email Address*</label>
//                   <input
//                      placeholder="johndoe@example.com"
//                      className="form-control"
//                      id="email"
//                      name="email"
//                      onChange={formik.handleChange}
//                      onBlur={formik.handleBlur}
//                      value={formik.values.email}
//                      touched={formik.touched.email}
//                   />
//                   <ErrorMessage
//                      touched={formik.touched?.email}
//                      error={formik.errors?.email}
//                   />
//                </div>
//             </div>
//          </div>
//          <div className="row g-3">
//             <div className="col-lg-12">
//                <div className="form-group mb-4">
//                   <label className="form-label">Contact No*</label>
//                   <div className="phone-select-group">
//                      <input
//                         type="number"
//                         name="mobile_no"
//                         id="mobile_no"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.mobile_no}
//                         placeholder="999 999 1010"
//                         className="form-control"
//                      />
//                      <Select placeholder="+1"
//                         onChange={(e) =>
//                            formik.setFieldValue("phone_code", e.id)
//                         }
//                         options={countriestOptions}
//                         className="phone-select-container"
//                         classNamePrefix="phone-select" />
//                   </div>
//                   {formik?.touched.phone_code && formik.errors?.phone_code && (
//                      <p
//                         style={{ fontSize: "13px" }}
//                         className="text-danger mt-2 mb-0"
//                      >
//                         {formik.errors?.phone_code}
//                      </p>
//                   )}
//                   <ErrorMessage
//                      touched={formik.touched?.mobile_no}
//                      error={formik.errors?.mobile_no}
//                   />
//                </div>
//             </div>
//          </div>
//          <div className="row g-3">
//             <div className="col-lg-12 mb-4 help-plan-country-dropdown">
//                <SelectField
//                   isSearchable
//                   label="Travelling from"
//                   name="travelling_from"
//                   options={fromCountriesOptions}
//                   value={formik.values.travelling_from}
//                   onChange={(fieldName, data) => {
//                      formik.setFieldValue(fieldName, data);
//                   }}
//                   onBlur={formik.handleBlur}
//                   error={
//                      formik.touched.travelling_from &&
//                      formik.errors.travelling_from
//                   }
//                   placeholder="Select"
//                   className="form-select-container"
//                   classNamePrefix="form-select"
//                />
//             </div>
//          </div>
//          <div className="row g-3">
//             <div className="col-lg-12">
//                <div className="form-group mb-4">
//                   <label className="form-label">Purpose of travel*</label>
//                   <div className="custom-checkbox-list d-flex flex-wrap">
//                      {purposeOfTravelList?.map((data, index) => (
//                         <div
//                            key={index}
//                            className="custom-checkbox form-check d-flex align-items-start"
//                         >
//                            <input
//                               className="form-check-input"
//                               type="checkbox"
//                               id={`${data?.name}${data?.id}`}
//                               onChange={(e) => {
//                                  const newValue = [
//                                     ...formik.values.purpose_of_travel,
//                                  ];
//                                  if (e.target.checked) {
//                                     newValue.push(data.id);
//                                  } else {
//                                     const index = newValue.indexOf(data.id);
//                                     if (index !== -1) {
//                                        newValue.splice(index, 1);
//                                     }
//                                  }
//                                  formik.setFieldValue(
//                                     "purpose_of_travel",
//                                     newValue
//                                  );
//                               }}
//                               onBlur={() =>
//                                  formik.setFieldValue(
//                                     "purpose_of_travel",
//                                     formik.values.purpose_of_travel
//                                  )
//                               }
//                            />
//                            <label
//                               className="form-check-label fw-medium"
//                               htmlFor={`${data?.name}${data?.id}`}
//                            >
//                               {data?.name}
//                            </label>
//                         </div>
//                      ))}
//                   </div>
//                   <ErrorMessage
//                      touched={formik.touched?.purpose_of_travel}
//                      error={formik.errors?.purpose_of_travel}
//                   />
//                </div>
//             </div>
//          </div>
//          <div className="row g-3 mb-4">
//             <div className="col-lg-12">
//                <div className="form-group">
//                   <label className="form-label">How are you travelling?*</label>
//                   <div
//                      className="form-radio-check-group d-flex flex-wrap align-items-center"
//                      id="travellingWith"
//                   >
//                      {travelWithList.map((option) => (
//                         <div
//                            key={option.id}
//                            className="form-check custom-radio-2 d-flex align-items-center"
//                         >
//                            <input
//                               className="form-check-input"
//                               type="radio"
//                               name="how_are_you_traveling"
//                               id={`travellingWith${option.id}`}
//                               checked={
//                                  parseInt(
//                                     formik?.values?.how_are_you_traveling
//                                  ) === parseInt(option.id)
//                               }
//                               value={option.id}
//                               onChange={formik.handleChange}
//                               onBlur={formik.handleBlur}
//                            />
//                            <label
//                               className="form-check-label"
//                               htmlFor={`travellingWith${option.id}`}
//                            >
//                               {option.label}
//                            </label>
//                         </div>
//                      ))}
//                   </div>
//                   <ErrorMessage
//                      touched={formik.touched?.how_are_you_traveling}
//                      error={formik.errors?.how_are_you_traveling}
//                   />
//                </div>
//             </div>
//          </div>
//          <div className="row g-3">
//             <div className="col-lg-12">
//                <div className="form-group mb-4 d-flex flex-column align-items-start">
//                   <label className="form-label">Probable year of travel*</label>
//                   <div
//                      className="form-switch-group d-flex align-items-center justify-content-start"
//                      id="travellingYear"
//                   >
//                      <div className="form-check custom-radio-3 d-flex align-items-center">
//                         <input
//                            className="form-check-input"
//                            type="radio"
//                            name="travel_year"
//                            id="travellingYear1"
//                            onChange={() =>
//                               formik.setFieldValue("travel_year", 1)
//                            }
//                            onBlur={formik.handleBlur}
//                         />
//                         <label
//                            className="form-check-label"
//                            htmlFor="travellingYear1"
//                         >
//                            Current Year
//                         </label>
//                      </div>
//                      <div className="form-check custom-radio-3 d-flex align-items-center">
//                         <input
//                            className="form-check-input"
//                            type="radio"
//                            name="travel_year"
//                            id="travellingYear2"
//                            onChange={() =>
//                               formik.setFieldValue("travel_year", 2)
//                            }
//                            onBlur={formik.handleBlur}
//                         />
//                         <label
//                            className="form-check-label"
//                            htmlFor="travellingYear2"
//                         >
//                            Next Year
//                         </label>
//                      </div>
//                   </div>
//                   <ErrorMessage
//                      touched={formik.touched?.travel_year}
//                      error={formik.errors?.travel_year}
//                   />
//                </div>
//             </div>
//          </div>

//          <div className="row g-3">
//             <div className="col-lg-12">
//                <div className="form-group mb-4">
//                   <label className="form-label">Probable month of travel*</label>
//                   <div
//                      className="form-radio-check-group d-flex flex-wrap align-items-center"
//                      id="travellingMonth"
//                   >
//                      {probableMonthTravel?.map((month) => (
//                         <div
//                            key={month.id}
//                            className="form-check custom-radio-2 d-flex align-items-center"
//                         >
//                            <input
//                               className="form-check-input"
//                               type="radio"
//                               name="travel_month"
//                               id={`travellingMonth${month.id}`}
//                               checked={
//                                  parseInt(formik?.values?.travel_month) ===
//                                  parseInt(month.id)
//                               }
//                               value={month.id}
//                               onChange={formik.handleChange}
//                               onBlur={formik.handleBlur}
//                            />
//                            <label
//                               className="form-check-label"
//                               htmlFor={`travellingMonth${month.id}`}
//                            >
//                               {month.name}
//                            </label>
//                         </div>
//                      ))}
//                   </div>
//                   <ErrorMessage
//                      touched={formik.touched?.travel_month}
//                      error={formik.errors?.travel_month}
//                   />
//                </div>
//             </div>
//          </div>
//          <div className="row g-3">
//             <div className="col-lg-12">
//                <div className="form-group">
//                   <button
//                      type="button"
//                      onClick={formik.handleSubmit}
//                      className="btn btn-default btn-block"
//                   >
//                      Submit
//                      {loading && (
//                         <div
//                            className="spinner-border spinner-border-sm mx-3"
//                            role="status"
//                         />
//                      )}
//                   </button>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }


'use client'
import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import '../../(home)/LPJapan.css'
import './LandingForm.css'
import localFont from 'next/font/local'

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ErrorMessage, SelectField } from "../../components";
import { convertToTitleCase } from "../../lib/formatHeading";
import axios from "axios";

const clashDisplay = localFont({
   src: [
      {
         path: '../fonts/ClashDisplay-Semibold.woff2',
         weight: '600',
      },
   ],
   variable: '--font-clashDisplay',
   display: 'swap',
})

const travelWithList = [
   { id: 1, label: "Solo" },
   { id: 2, label: "With Friends" },
   { id: 3, label: "As A Couple" },
   { id: 4, label: "With kids under 18 years old" },
];

const HelpPlanMyTrip = (
   {
      allCountriesList,
      purposeOfTravelList,
      probableMonthTravel
   }
) => {

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

   const whatsAppNavUrl = "/help-plan-my-trip";

   const [loading, setLoading] = useState(false);

   const router = useRouter();

   const countriestOptions = allCountriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: `+${data?.phone_code}`,
      id: data?.id,
   }));

   const monthList = probableMonthTravel?.map((data, _) => ({
      value: data?.id,
      label: data?.name,
      id: data?.id,
   }));

   const specificCountries = ["Japan", "South korea", "Vietnam", "Thailand"];

   const fromCountriesOptions = allCountriesList?.data
      ?.filter((data) => specificCountries.includes(convertToTitleCase(data?.name)))
      .map((data) => ({
         value: data?.phone_code,
         label: convertToTitleCase(data?.name),
         id: data?.id,
      }));

   // const fromCountriesOptions = allCountriesList?.data?.map((data, _) => ({
   //    value: data?.phone_code,
   //    label: convertToTitleCase(data?.name),
   //    id: data?.id,
   // }));

   const validationSchemaSignin = Yup.object().shape({
      full_name: Yup.string().required("First name is required"),
      email: Yup.string()
         .email("Email must be a valid email")
         .required("Email is required"),
      mobile_no: Yup.string()
         .matches(/^[0-9]{10}$/, "Invalid mobile number")
         .required("Phone number is required"),
      phone_code: Yup.string().required("Phone code is required"),
      travelling_from: Yup.object().required("Your location is required"),
      purpose_of_travel: Yup.array()
         .min(1, "At least one purpose must be selected")
         .required("Purpose of travel is required"),
      how_are_you_traveling: Yup.string().required(
         "How are you travelling is required"
      ),
      // travel_year: Yup.string().required("Probable year of travel is required"),
      travel_month: Yup.string().required(
         "Probable month of travel is required"
      ),
   });

   const initialValuesSignin = {
      full_name: "",
      email: "",
      mobile_no: "",
      phone_code: "",
      travelling_from: null,
      purpose_of_travel: [],
      how_are_you_traveling: "",
      travel_month: "",
   };

   const formik = useFormik({
      initialValues: initialValuesSignin,
      validationSchema: validationSchemaSignin,
      onSubmit: async (data) => {
         const values = {
            full_name: data?.full_name,
            email: data?.email,
            mobile_no: `${data?.mobile_no}`,
            phone_code: `${data?.phone_code}`,
            travelling_from: `${data?.travelling_from?.id}`,
            purpose_of_travel: data?.purpose_of_travel?.join(","),
            how_are_you_traveling: parseInt(data?.how_are_you_traveling),
            travel_month: `${data?.travel_month}`,
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
                              <Link href={whatsAppNavUrl} className="btn btn-outline">Talk to us</Link>
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
                        <h1>Please share your trip details and our travel expert will reach out to you in <span className="text-decoration-underline">less than 12 hours.</span></h1>
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
                                       <label className="form-label">Full Name*</label>
                                       <input
                                          type="text"
                                          id="full_name"
                                          name="full_name"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.full_name}
                                          placeholder="John Michael Doe"
                                          className="form-control"
                                          touched={formik.touched.full_name}
                                       />
                                       <ErrorMessage
                                          touched={formik.touched?.full_name}
                                          error={formik.errors?.full_name}
                                       />
                                    </div>
                                 </div>
                              </div>

                              <div className="row g-3">
                                 <div className="col-lg-12">
                                    <div className="form-group mb-4">
                                       <label className="form-label">Email Address*</label>
                                       <input
                                          placeholder="johndoe@example.com"
                                          className="form-control"
                                          id="email"
                                          name="email"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.email}
                                          touched={formik.touched.email}
                                       />
                                       <ErrorMessage
                                          touched={formik.touched?.email}
                                          error={formik.errors?.email}
                                       />                        </div>
                                 </div>
                              </div>

                              <div className="row g-3">
                                 <div className="col-lg-12">
                                    <div className="form-group mb-4">
                                       <label className="form-label">Contact No*</label>
                                       <div className="phone-select-group">
                                          <input
                                             type="number"
                                             name="mobile_no"
                                             id="mobile_no"
                                             onChange={formik.handleChange}
                                             onBlur={formik.handleBlur}
                                             value={formik.values.mobile_no}
                                             placeholder="999 999 1010"
                                             className="form-control"
                                          />
                                          <Select placeholder="+1"
                                             onChange={(e) =>
                                                formik.setFieldValue("phone_code", e.id)
                                             }
                                             options={countriestOptions}
                                             className="phone-select-container"
                                             classNamePrefix="phone-select" />
                                       </div>
                                       {formik?.touched.phone_code && formik.errors?.phone_code && (
                                          <p
                                             style={{ fontSize: "13px" }}
                                             className="text-danger mt-2 mb-0"
                                          >
                                             {formik.errors?.phone_code}
                                          </p>
                                       )}
                                       <ErrorMessage
                                          touched={formik.touched?.mobile_no}
                                          error={formik.errors?.mobile_no}
                                       />
                                    </div>
                                 </div>
                              </div>

                              <div className="row g-3">
                                 <div className="col-lg-12">
                                    <div className="form-group mb-4">
                                       <SelectField
                                          isSearchable
                                          label="Travelling to"
                                          name="travelling_from"
                                          options={fromCountriesOptions}
                                          value={formik.values.travelling_from}
                                          onChange={(fieldName, data) => {
                                             formik.setFieldValue(fieldName, data);
                                          }}
                                          onBlur={formik.handleBlur}
                                          error={
                                             formik.touched.travelling_from &&
                                             formik.errors.travelling_from
                                          }
                                          placeholder="Select"
                                          className="form-select-container"
                                          classNamePrefix="form-select"
                                       />
                                    </div>
                                 </div>
                              </div>

                              <div className="row g-3">
                                 <div className="col-lg-12">
                                    <div className="form-group mb-4">
                                       <label className="form-label">Purpose of travel*</label>
                                       <div className="custom-checkbox-list d-flex flex-wrap">
                                          {purposeOfTravelList?.map((data, index) => (
                                             <div
                                                key={index}
                                                className="custom-checkbox form-check d-flex align-items-start"
                                             >
                                                <input
                                                   className="form-check-input"
                                                   type="checkbox"
                                                   id={`${data?.name}${data?.id}`}
                                                   onChange={(e) => {
                                                      const newValue = [
                                                         ...formik.values.purpose_of_travel,
                                                      ];
                                                      if (e.target.checked) {
                                                         newValue.push(data.id);
                                                      } else {
                                                         const index = newValue.indexOf(data.id);
                                                         if (index !== -1) {
                                                            newValue.splice(index, 1);
                                                         }
                                                      }
                                                      formik.setFieldValue(
                                                         "purpose_of_travel",
                                                         newValue
                                                      );
                                                   }}
                                                   onBlur={() =>
                                                      formik.setFieldValue(
                                                         "purpose_of_travel",
                                                         formik.values.purpose_of_travel
                                                      )
                                                   }
                                                />
                                                <label
                                                   className="form-check-label fw-medium"
                                                   htmlFor={`${data?.name}${data?.id}`}
                                                >
                                                   {data?.name}
                                                </label>
                                             </div>
                                          ))}
                                       </div>
                                       <ErrorMessage
                                          touched={formik.touched?.purpose_of_travel}
                                          error={formik.errors?.purpose_of_travel}
                                       />
                                    </div>
                                 </div>
                              </div>

                              <div className="row g-3">
                                 <div className="col-lg-12">
                                    <div className="form-group mb-4">
                                       <label className="form-label">How are you travelling?*</label>
                                       <div className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center" id="travellingWith">
                                          {travelWithList.map((option) => (
                                             <div
                                                key={option.id}
                                                className="form-check custom-radio-2 d-flex align-items-center"
                                             >
                                                <input
                                                   className="form-check-input"
                                                   type="radio"
                                                   name="how_are_you_traveling"
                                                   id={`travellingWith${option.id}`}
                                                   checked={
                                                      parseInt(
                                                         formik?.values?.how_are_you_traveling
                                                      ) === parseInt(option.id)
                                                   }
                                                   value={option.id}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                />
                                                <label
                                                   className="form-check-label"
                                                   htmlFor={`travellingWith${option.id}`}
                                                >
                                                   {option.label}
                                                </label>
                                             </div>
                                          ))}
                                          <ErrorMessage
                                             touched={formik.touched?.how_are_you_traveling}
                                             error={formik.errors?.how_are_you_traveling}
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="row g-3">
                                 <div className="col-lg-12">
                                    <div className="form-group mb-4">
                                       <label className="form-label">Probable month of travel*</label>
                                       <Select
                                          placeholder="Select"
                                          onChange={(e) =>
                                             formik.setFieldValue("travel_month", e.id)
                                          }
                                          options={monthList}
                                          className="form-select-container"
                                          classNamePrefix="form-select"
                                       />
                                       <ErrorMessage
                                          touched={formik.touched?.travel_month}
                                          error={formik.errors?.travel_month}
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="row g-3">
                                 <div className="col-lg-12">
                                    <div className="form-group">
                                       <button
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

export default HelpPlanMyTrip;