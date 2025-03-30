"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ErrorMessage, SelectField } from "../../components";
import { convertToTitleCase } from "../../lib/formatHeading";
import axios from "axios";

const travelWithList = [
   { id: 1, label: "Solo" },
   { id: 2, label: "With Friends" },
   { id: 3, label: "As A Couple" },
   { id: 4, label: "With kids under 18 years old" },
];

const months = [
   { id: 1, label: "Jan-Feb" },
   { id: 2, label: "Mar-April" },
   { id: 3, label: "May-June" },
   { id: 4, label: "July-Aug" },
   { id: 5, label: "Sep-Oct" },
   { id: 6, label: "Nov-Dec" },
];

export default function HelpPlanTripForm({
   allCountriesList,
   purposeOfTravelList,
   probableMonthTravel
}) {
   const [loading, setLoading] = useState(false);

   const router = useRouter();

   const countriestOptions = allCountriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: `+${data?.phone_code}`,
      id: data?.id,
   }));

   const fromCountriesOptions = allCountriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: convertToTitleCase(data?.name),
      id: data?.id,
   }));

   const validationSchemaSignin = Yup.object().shape({
      full_name: Yup.string().required("First name is required"),
      email: Yup.string()
         .email("Email must be a valid email")
         .required("Email is required"),
      mobile_no: Yup.string()
         .matches(/^[0-9]{10}$/, "Invalid mobile_no number")
         .required("Phone number is required"),
      phone_code: Yup.string().required("Phone code is required"),
      travelling_from: Yup.object().required("Your location is required"),
      purpose_of_travel: Yup.array()
         .min(1, "At least one purpose must be selected")
         .required("Purpose of travel is required"),
      how_are_you_traveling: Yup.string().required(
         "How are you travelling is required"
      ),
      travel_year: Yup.string().required("Probable year of travel is required"),
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
      travel_year: "",
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
            travel_year: data?.travel_year,
            travel_month: `${data?.travel_year}`,
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
      <div className="profile-form-container">
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
                  />
               </div>
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
            <div className="col-lg-12 mb-4 help-plan-country-dropdown">
               <SelectField
                  isSearchable
                  label="Travelling from"
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
         <div className="row g-3 mb-4">
            <div className="col-lg-12">
               <div className="form-group">
                  <label className="form-label">How are you travelling?*</label>
                  <div
                     className="form-radio-check-group d-flex flex-wrap align-items-center"
                     id="travellingWith"
                  >
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
                  </div>
                  <ErrorMessage
                     touched={formik.touched?.how_are_you_traveling}
                     error={formik.errors?.how_are_you_traveling}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4 d-flex flex-column align-items-start">
                  <label className="form-label">Probable year of travel*</label>
                  <div
                     className="form-switch-group d-flex align-items-center justify-content-start"
                     id="travellingYear"
                  >
                     <div className="form-check custom-radio-3 d-flex align-items-center">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="travel_year"
                           id="travellingYear1"
                           onChange={() =>
                              formik.setFieldValue("travel_year", 1)
                           }
                           onBlur={formik.handleBlur}
                        />
                        <label
                           className="form-check-label"
                           htmlFor="travellingYear1"
                        >
                           Current Year
                        </label>
                     </div>
                     <div className="form-check custom-radio-3 d-flex align-items-center">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="travel_year"
                           id="travellingYear2"
                           onChange={() =>
                              formik.setFieldValue("travel_year", 2)
                           }
                           onBlur={formik.handleBlur}
                        />
                        <label
                           className="form-check-label"
                           htmlFor="travellingYear2"
                        >
                           Next Year
                        </label>
                     </div>
                  </div>
                  <ErrorMessage
                     touched={formik.touched?.travel_year}
                     error={formik.errors?.travel_year}
                  />
               </div>
            </div>
         </div>

         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">Probable month of travel*</label>
                  <div
                     className="form-radio-check-group d-flex flex-wrap align-items-center"
                     id="travellingMonth"
                  >
                     {probableMonthTravel?.map((month) => (
                        <div
                           key={month.id}
                           className="form-check custom-radio-2 d-flex align-items-center"
                        >
                           <input
                              className="form-check-input"
                              type="radio"
                              name="travel_month"
                              id={`travellingMonth${month.id}`}
                              checked={
                                 parseInt(formik?.values?.travel_month) ===
                                 parseInt(month.id)
                              }
                              value={month.id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                           />
                           <label
                              className="form-check-label"
                              htmlFor={`travellingMonth${month.id}`}
                           >
                              {month.name}
                           </label>
                        </div>
                     ))}
                  </div>
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
   );
}
