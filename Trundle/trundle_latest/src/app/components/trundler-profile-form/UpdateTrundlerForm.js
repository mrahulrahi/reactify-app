"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ErrorMessage from "../error-message/ErrorMessage";
import SelectField from "../select-field/SelectField";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createTrundlerProfile, setEmail } from "../../store/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { updateTrundlerDetails } from "../../lib/trundler/getTrundlerDetails";
import toast from "react-hot-toast";
import moment from "moment";
import { signIn } from "next-auth/react";

const countryIcon = (iconUrl) => ({
   alignItems: 'center',
   display: 'flex',

   ':before': {
      backgroundImage: `url("${iconUrl}")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: 100,
      content: '" "',
      display: 'flex',
      flexShrink: 0,
      marginRight: 16,
      height: 26,
      width: 26,
      border: '1px solid #E4E4E4'
   },
});


const validationSchema = Yup.object().shape({
   first_name: Yup.string().required("First name is required"),
   last_name: Yup.string().required("Last name is required"),
   // email: Yup.string()
   //    .email("Invalid email address")
   //    .required("Email is required"),
   phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Phone number is required"),
   phone_code: Yup.object().required("Phone code is required"),
   // content_covers: Yup.array()
   //    .min(1, "At least one content cover must be selected")
   //    .required("Content cover is required"),
   gender: Yup.string().required("Gender is required"),
   about_myself: Yup.string()
      .required("About yourself is required")
      .test("word-count", "Max 500 word limit", (value) => {
         if (!value) return false;
         const wordCount = value.trim().split(/\s+/).length;
         return wordCount <= 500;
      }),
   job_role: Yup.string()
      .required("Job role is required")
      .test("word-count", "Max 50 word limit", (value) => {
         if (!value) return false;
         const wordCount = value.trim().split(/\s+/).length;
         return wordCount <= 50;
      }),
   username: Yup.string()
      .required("Username is required")
      .matches(
         /^[a-z0-9]*$/,
         "Username must be in lowercase and contain only numbers"
      ),
   languages: Yup.array()
      .min(1, "At least one language must be selected")
      .required("Language is required"),
   country: Yup.object().required("Your location is required"),
   covered_country: Yup.array()
      .min(1, "At least one covered country must be selected")
      .required("Covered country is required"),
   // generic_discount_codes: Yup.string()
   //    .required("Generic discount code is required")
   //    .test("word-count", "Max 500 word limit", (value) => {
   //       if (!value) return false;
   //       const wordCount = value.trim().split(/\s+/).length;
   //       return wordCount <= 500;
   //    }),
   youtube_link: Yup.string()
      .matches(
         /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
         "Invalid URL. Must be a valid URL."
      ),
   instagram_link: Yup.string()
      .matches(
         /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
         "Invalid URL. Must be a valid URL."
      ),
   twitch_link: Yup.string()
      .matches(
         /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
         "Invalid URL. Must be a valid URL."
      ),
   x_link: Yup.string()
      .matches(
         /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
         "Invalid URL. Must be a valid URL."
      )
      .test({
         name: 'atLeastOneLink',
         message: 'At least one link is required',
         test: function (value) {
            const { youtube_link, instagram_link, twitch_link, x_link } = this.parent;
            return youtube_link || instagram_link || twitch_link || x_link;
         },
      }),
})

export const TrundlerProfileForm = ({
   trundlerProfile,
   countriesList,
   session,
   formType,
   languagesList,
   availableCountries,
   contentCoversList
}) => {

   const [imagePreview, setImagePreview] = useState(null);

   const [uploadedProfile, setUploadedProfile] = useState(null);

   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();

   const { profileNotVerfiedToken } = useSelector((state) => state?.authData);

   const access_token = profileNotVerfiedToken;

   const genderOptions = [
      { id: 1, name: "Male" },
      { id: 2, name: "Female" },
      { id: 3, name: "Other" },
   ];

   const socialMediaLinks = [
      { label: "Youtube", name: "youtube_link" },
      { label: "Instagram", name: "instagram_link" },
      { label: "X", name: "x_link" },
      { label: "Twitch", name: "twitch_link" },
   ];

   const coverCountriesListOptions = availableCountries?.map((data, _) => ({
      value: convertToTitleCase(data?.name),
      label: convertToTitleCaseTwo(data?.name),
      id: data?.id,
   }));


   const countriestOptions = countriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: `+${data?.phone_code}`,
      id: data?.id,
   }));

   const languages = languagesList?.map((data, _) => (
      {
         value: data?.name,
         label: data?.name,
         id: data?.id
      }
   ))

   function convertToTitleCase(str) {
      return str.charAt(0) + str.slice(1).toLowerCase();
   }

   function convertToTitleCaseTwo(str) {
      return str
         .toLowerCase()
         .split(' ')
         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
         .join(' ');
   }

   const fromCountriesOptions = countriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: convertToTitleCase(data?.name),
      id: data?.id,
      flag: data?.flag
   }));

   const defaultCountryCodeIndex = countriesList?.data?.findIndex(
      (data) => data?.id == trundlerProfile?.data?.phone_code?.id
   );

   const defaultCoveredCountries = trundlerProfile?.data?.covered_country?.map(
      ({ id, name }) => ({
         id,
         value: name,
         label: convertToTitleCase(name),
      })
   );

   const defaultLanguages = trundlerProfile?.data?.languages?.map(
      ({ id, name }) => ({
         id,
         value: name,
         label: name,
      })
   );

   const months = [
      { id: 1, label: "1", value: 1 },
      { id: 2, label: "2", value: 2 },
      { id: 3, label: "3", value: 3 },
      { id: 4, label: "4", value: 4 },
      { id: 5, label: "5", value: 5 },
      { id: 6, label: "6", value: 6 },
      { id: 7, label: "7", value: 7 },
      { id: 8, label: "8", value: 8 },
      { id: 9, label: "9", value: 9 },
      { id: 10, label: "10", value: 10 },
      { id: 11, label: "11", value: 11 },
      { id: 12, label: "12", value: 12 }
   ];

   const extractIds = (inputArray) => {
      return inputArray?.map((item) => item.id);
   };

   const defaultCountry = fromCountriesOptions?.find((data, index) => data?.id === trundlerProfile?.data?.country?.id)

   const defaultGender =
      trundlerProfile?.data?.gender === "Male"
         ? 1
         : trundlerProfile?.data?.gender === "Female"
            ? 2
            : trundlerProfile?.data?.gender === "Others" ? 3 : null;

   const formik = useFormik({
      initialValues: {
         first_name: trundlerProfile?.data?.first_name || "",
         last_name: trundlerProfile?.data?.last_name || "",
         middle_name: trundlerProfile?.data?.middle_name || "",
         phone_code: trundlerProfile?.data?.phone_code || "",
         // email: trundlerProfile?.data?.email || "",
         username: trundlerProfile?.data?.username || "",
         gender: defaultGender || "",
         phone: trundlerProfile?.data?.mobile_no || "",
         about_myself: trundlerProfile?.data?.about_myself || "",
         job_role: trundlerProfile?.data?.job_role || "",
         generic_discount_codes: trundlerProfile?.data?.discount_code || "",
         content_covers:
            extractIds(trundlerProfile?.data?.content_covers) || [],
         country:
            defaultCountry || null,
         day: trundlerProfile ? { id: moment(trundlerProfile?.data?.dob, "YYYY-MM-DD").date(), label: moment(trundlerProfile?.data?.dob, "YYYY-MM-DD").date() } : "",
         year: trundlerProfile ? { id: moment(trundlerProfile?.data?.dob, "YYYY-MM-DD").year(), label: moment(trundlerProfile?.data?.dob, "YYYY-MM-DD").year() } : "",
         month: trundlerProfile ? { id: moment(trundlerProfile?.data?.dob, "YYYY-MM-DD").month() + 1, label: months[moment(trundlerProfile?.data?.dob, "YYYY-MM-DD").month()]?.label } : "",
         covered_country: defaultCoveredCountries || "",
         youtube_link: trundlerProfile?.data?.youtube_link || "",
         instagram_link: trundlerProfile?.data?.instagram_link || "",
         x_link: trundlerProfile?.data?.x_link || "",
         twitch_link: trundlerProfile?.data?.twitch_link || "",
         languages: defaultLanguages || ""
      },
      validationSchema,
      onSubmit: async (event) => {
         const formData = new FormData();
         if (imagePreview) {
            formData.append("photo", uploadedProfile);
         }
         formData.append("first_name", event?.first_name);
         formData.append("middle_name", event?.middle_name);
         formData.append("last_name", event?.last_name);
         // formData.append("email", event?.email);
         formData.append("username", event?.username);
         formData.append("gender", parseInt(event?.gender));
         formData.append("country", parseInt(event?.country?.id));
         formData.append("mobile_no", parseInt(event?.phone));
         formData.append("phone_code", parseInt(event?.phone_code?.id));

         if (event?.languages) {
            event?.languages?.map((item) =>
               formData.append("language", item.id)
            );
         }

         if (event?.day && event?.month && event?.year) {
            formData.append("dob", `${event?.year?.label}-${event?.month?.id}-${event?.day?.label}`);
         }

         if (event?.covered_country) {
            event?.covered_country?.map((item) =>
               formData.append("covered_country", item.id)
            );
         }
         formData.append("about_myself", event?.about_myself);
         formData.append("job_role", event?.job_role);
         if (event?.content_covers?.length > 0) {
            event?.content_covers?.map((data) =>
               formData.append("content_covers", data)
            );
         }
         formData.append("discount_code", event?.generic_discount_codes);
         formData.append("youtube_link", event?.youtube_link);
         formData.append("x_link", event?.x_link);
         formData.append("instagram_link", event?.instagram_link);
         formData.append("twitch_link", event?.twitch_link);

         const access_token = profileNotVerfiedToken;

         if (formType === 'create' || access_token) {
            dispatch(setEmail({ email: event?.email }));
            setLoading(true);
            try {
               const res = await dispatch(createTrundlerProfile({ formData, access_token }));
               const data = res?.payload?.data;
               await signIn("credentials", {
                  ...data,
                  redirect: false,
               });
               toast.success(res?.payload?.data?.message);
               router.push("/influencer/my-profile");
               router.refresh();
               if (res?.payload?.status === 400) {
                  setLoading(false);
                  if (res?.payload?.data?.errors?.email) {
                     toast.error(res?.payload?.data?.errors?.email?.[0]);
                  }
                  if (res?.payload?.data?.errors?.username?.[0]) {
                     toast.error(res?.payload?.data?.errors?.username?.[0]);
                  }
               } else if (res?.payload?.status === 201) {
                  router.push("/otp-verification");
                  toast.success(res?.payload?.data?.message);
                  setLoading(false);
               } else {
                  setLoading(false);
               }
            } catch (error) {
               setLoading(false);
               toast.error("An unexpected error occurred. Please try again.");
               console.error("Error creating trundler profile:", error);
            }
         } else {
            setLoading(true);
            try {
               const res = await updateTrundlerDetails({
                  access_token,
                  formData,
                  event,
               });
               if (res?.status) {
                  router.push("/influencer/my-profile");
                  router.refresh();
                  toast.success(res?.message);
               } else {
                  setLoading(false);
               }
            } catch (error) {
               setLoading(false);
               toast.error("An unexpected error occurred. Please try again.");
               console.error("Error updating trundler details:", error);
            }
         }
      },
   });

   const handleImageChange = (event) => {
      const file = event.target.files[0];
      setUploadedProfile(file);
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const range = (start, end, step = 1) => {
      const len = Math.floor((end - start) / step) + 1;
      return Array(len).fill().map((_, idx) => {
         const year = end - (idx * step); // Adjust to get descending order
         return { id: idx + 1, label: year.toString(), value: year.toString() };
      });
   };

   const currentYear = new Date().getFullYear();

   const yearsToSubtract = 14;

   const rangeYears = 60;

   const endYear = currentYear - yearsToSubtract; // Calculate the end year

   const startYear = endYear - rangeYears; // Calculate the start year

   const years = range(startYear, endYear);

   console.log(years);

   const [dates, setDates] = useState([]);

   const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
   };

   const getDaysInMonth = (month, year) => {
      switch (month) {
         case 2:
            return isLeapYear(year) ? 29 : 28;
         case 4:
         case 6:
         case 9:
         case 11:
            return 30;
         default:
            return 31;
      }
   };

   const handleMonthChange = (monthId) => {
      const selectedMonth = parseInt(monthId);
      const selectedYear = parseInt(formik.values.year); // Assuming year is selected

      if (selectedMonth) {
         const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
         const datesArray = Array.from({ length: daysInMonth }, (_, i) => ({ id: i + 1, label: (i + 1).toString(), value: (i + 1).toString() }));
         setDates(datesArray);
      } else {
         setDates([]);
      }
   };

   useEffect(() => {
      handleMonthChange(moment(trundlerProfile?.data?.dob, "YYYY-MM-DD").month() + 1);
   }, [])

   return (
      <div className="profile-form-container">
         <div className="row g-3">
            <div className="col-lg-4 mx-auto">
               <input
                  type="file"
                  id="upload-profile"
                  name="upload-profile"
                  accept="image/jpeg"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
               />
               {imagePreview ? (
                  <div className="upload-profile-box mb-4 d-flex flex-column align-items-center justify-content-center">
                     <label className="upload-profile-label">
                        Profile image
                     </label>
                     <label
                        htmlFor="upload-profile"
                        className="upload-profile-img d-flex justify-content-center border-0 cursor-pointer"
                     >
                        <div className="user-img">
                           <Image
                              src={imagePreview}
                              width={120}
                              height={120}
                              alt=""
                           />
                        </div>
                     </label>
                  </div>
               ) : (
                  <div className="upload-profile-box mb-4 d-flex flex-column align-items-center justify-content-center">
                     <label className="upload-profile-label">
                        Profile image
                     </label>
                     <label
                        htmlFor="upload-profile"
                        className={`upload-profile-img ${formType === `update` && trundlerProfile?.data?.photo && `border-0`} d-flex justify-content-center cursor-pointer`}
                     >
                        {formType === 'update' ?
                           <div className={trundlerProfile?.data?.photo ? `user-img` : `user-icon`}>
                              <Image src={trundlerProfile?.data?.photo ? trundlerProfile?.data?.photo : "/images/user-icon.svg"}
                                 width={120}
                                 height={120}
                                 alt=""
                              />
                           </div> :
                           <div className="user-icon">
                              <Image
                                 src="/images/user-icon.svg"
                                 width={120}
                                 height={120}
                                 alt=""
                              />
                           </div>
                        }
                     </label>
                  </div>
               )}
            </div>
         </div>
         <div className="row g-sm-3">
            <div className="col-sm-4">
               <div className="form-group mb-4">
                  <label className="form-label">First name*</label>
                  <input
                     type="text"
                     placeholder="John"
                     className="form-control"
                     name="first_name"
                     id="first_name"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.first_name}
                  />
                  <ErrorMessage
                     touched={formik.touched?.first_name}
                     error={formik.errors?.first_name}
                  />
               </div>
            </div>
            <div className="col-sm-4">
               <div className="form-group mb-4">
                  <label className="form-label">
                     Middle name
                     {/* <span>(Optional)</span> */}
                  </label>
                  <input
                     type="text"
                     placeholder="Michael"
                     className="form-control"
                     name="middle_name"
                     id="middle_name"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.middle_name}
                  />
               </div>
            </div>
            <div className="col-sm-4">
               <div className="form-group mb-4">
                  <label className="form-label">Last name*</label>
                  <input
                     type="text"
                     name="last_name"
                     id="last_name"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.last_name}
                     placeholder="Doe"
                     className="form-control"
                  />
                  <ErrorMessage
                     touched={formik.touched?.last_name}
                     error={formik.errors?.last_name}
                  />
               </div>
            </div>
         </div>
         {/* <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">Email*</label>
                  <input
                     type="text"
                     name="email"
                     id="email"
                     onBlur={formik.handleBlur}
                     value={formik.values.email}
                     placeholder="johndoe@example.com"
                     className="form-control"
                     disabled={formType === 'update'}
                     onChange={formik.handleChange}
                  />
                  <ErrorMessage
                     touched={formik.touched?.email}
                     error={formik.errors?.email}
                  />
               </div>
            </div>
         </div> */}
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">Username*</label>
                  <input
                     type="text"
                     name="username"
                     id="username"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.username}
                     placeholder="johndoe123"
                     className="form-control"
                     disabled={formType === "update"}
                  />
                  <ErrorMessage
                     touched={formik.touched?.username}
                     error={formik.errors?.username}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">Phone no*</label>
                  <div className="phone-select-group">
                     <Select
                        placeholder="+1"
                        onChange={(e) => formik.setFieldValue("phone_code", e)}
                        defaultValue={
                           countriestOptions?.[defaultCountryCodeIndex]
                        }
                        options={countriestOptions}
                        className="phone-select-container"
                        classNamePrefix="phone-select"
                     />
                     <input
                        type="number"
                        name="phone"
                        id="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        placeholder="999 999 1010"
                        className="form-control"
                     />
                  </div>
                  {formik?.touched.phone_code && formik.errors?.phone_code && (
                     <p className="text-danger mt-2">
                        {formik.errors?.phone_code}
                     </p>
                  )}
                  <ErrorMessage
                     touched={formik.touched?.phone}
                     error={formik.errors?.phone}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <SelectField
                  isSearchable
                  label="Where are you from?"
                  name="country"
                  options={fromCountriesOptions}
                  value={formik.values.country}
                  onChange={(fieldName, data) => {
                     formik.setFieldValue(fieldName, data);
                  }}
                  defaultValue={formik?.values?.country}
                  onBlur={formik.handleBlur}
                  className="form-select-container"
                  classNamePrefix="form-select"
                  error={formik.touched.country && formik.errors.country}
                  placeholder="Select"
                  styles={{
                     option: (styles, { data }) => ({
                        ...styles, ...countryIcon(data.flag),
                     }),
                     input: (styles) => ({ ...styles, ...countryIcon() }),
                     placeholder: (styles) => ({ ...styles, ...countryIcon('/images/country-icon.png') }),
                     singleValue: (styles, { data }) => ({ ...styles, ...countryIcon(data.flag) }),
                  }}
               />
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4 mt-4">
                  <label className="form-label">Gender*</label>
                  <div className="mb-4">
                     <div
                        id="gender"
                        className="form-radio-check-group d-flex flex-wrap align-items-center"
                     >
                        {genderOptions.map((option, index) => (
                           <div
                              key={index}
                              style={{ cursor: "pointer" }}
                              className="form-check custom-radio d-flex align-items-center"
                           >
                              <input
                                 className="form-check-input"
                                 type="radio"
                                 name="gender"
                                 id={`${option?.name}${index}`}
                                 value={formik?.values?.gender}
                                 onChange={() => {
                                    formik?.setFieldValue("gender", option?.id);
                                 }}
                                 onBlur={formik.handleBlur}
                                 checked={formType === 'update' ? (formik?.values?.gender === option?.id) : null}
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor={`${option?.name}${index}`}
                              >
                                 {option?.name}
                              </label>
                           </div>
                        ))}
                     </div>
                     <ErrorMessage
                        touched={formik.touched?.gender}
                        error={formik.errors?.gender}
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">

               {/* <div className="form-group mb-4 position-relative">
                  <label className="form-label">Date of birth{" "}
                  </label>
                  <label htmlFor="dob">
                     <Image
                        style={{ position: "absolute", right: "10px", top: "44px", zIndex: 1, opacity: .5 }}
                        src="/images/event.svg"
                        alt=""
                        width={14}
                        height={16}
                     />
                  </label>
                  <div className="row">
                     <div className="col-lg-12">
                        <DatePicker
                           id='dob'
                           renderCustomHeader={({
                              changeYear,
                              changeMonth,
                              decreaseMonth,
                              increaseMonth,
                              prevMonthButtonDisabled,
                              nextMonthButtonDisabled,
                           }) => (
                              <div
                                 style={{
                                    margin: 10,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 3
                                 }}
                              >
                                 <button className="btn btn-primary text-center p-0" style={{ width: "40px", height: "40px" }} onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                    {"<"}
                                 </button>
                                 <select
                                    className="form-control p-0 text-center"
                                    value={selectedYear}  // Use selectedYear state to manage the selected year
                                    onChange={(e) => {
                                       const selectedYearValue = parseInt(e.target.value, 10);
                                       if (selectedYearValue !== selectedYear) {
                                          setSelectedYear(selectedYearValue);
                                          changeYear(selectedYearValue);
                                       }
                                    }}
                                 >
                                    {years.map((option) => (
                                       <option key={option} value={option}>
                                          {option}
                                       </option>
                                    ))}
                                 </select>
                                 <select
                                    className="form-control p-0 text-center"
                                    value={months[selectedMonth]}  // Use selectedMonth state to manage the selected month
                                    onChange={(e) => {
                                       const selectedMonthIndex = months.indexOf(e.target.value);
                                       if (selectedMonthIndex !== selectedMonth) {
                                          setSelectedMonth(selectedMonthIndex);
                                          changeMonth(selectedMonthIndex);
                                       }
                                    }}
                                 >
                                    {months.map((option) => (
                                       <option key={option} value={option}>
                                          {option}
                                       </option>
                                    ))}
                                 </select>
                                 <button className="btn btn-primary text-center p-0" style={{ width: "40px", height: "40px" }} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                    {">"}
                                 </button>
                              </div>
                           )}
                           selected={formik.values.dob}
                           onChange={(date) => {
                              formik.setFieldValue('dob', date)
                           }}
                           placeholderText="DD-MM-YYYY"
                           className="form-control w-100"
                           maxDate={new Date()}
                           dateFormat="dd-MM-yyyy"
                        />
                     </div>
                  </div>
               </div> */}
               <div className="form-group mb-4">
                  <label className="form-label">Date of birth</label>
                  <div className="form-group row ps-2">
                     <div className="col-sm-2 col px-0">
                        <SelectField
                           isSearchable
                           className="form-select-container"
                           classNamePrefix="form-select"
                           name="month"
                           options={months}
                           value={formik.values.month}
                           onChange={(fieldName, data) => {
                              formik.setFieldValue(fieldName, data);
                              handleMonthChange(data?.id)
                           }}
                           onBlur={formik.handleBlur}
                           placeholder="MM"
                           defaultValue={formik?.values?.month}
                        />
                     </div>
                     <div className="col-sm-2 col px-2">
                        <SelectField
                           isSearchable
                           className="form-select-container"
                           classNamePrefix="form-select"
                           name="day"
                           options={dates}
                           value={formik.values.day}
                           onChange={(fieldName, data) => {
                              formik.setFieldValue(fieldName, data);
                           }}
                           onBlur={formik.handleBlur}
                           placeholder="DD"
                           defaultValue={formik?.values?.day}
                        />
                     </div>
                     <div className="col-sm-3 col px-0">
                        <SelectField
                           isSearchable
                           className="form-select-container"
                           classNamePrefix="form-select"
                           name="year"
                           options={years}
                           value={formik.values.year}
                           onChange={(fieldName, data) => {
                              formik.setFieldValue(fieldName, data);
                           }}
                           onBlur={formik.handleBlur}
                           error={
                              formik.touched.year &&
                              formik.errors.year
                           }
                           placeholder="YYYY"
                           defaultValue={formik?.values?.year}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <SelectField
                     closeMenuOnSelect={false}
                     className="form-select-container multi-select"
                     classNamePrefix="form-select"
                     isMulti
                     label="Languages you speak"
                     name="languages"
                     options={languages}
                     value={formik.values.languages}
                     onChange={(fieldName, data) => {
                        formik.setFieldValue(fieldName, data);
                     }}
                     onBlur={formik.handleBlur}
                     error={
                        formik.touched.languages &&
                        formik.errors.languages
                     }
                     placeholder="Select"
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <SelectField
                     closeMenuOnSelect={false}
                     className="form-select-container multi-select"
                     classNamePrefix="form-select"
                     isMulti
                     label="Countries you cover"
                     name="covered_country"
                     options={coverCountriesListOptions}
                     value={formik.values.covered_country}
                     onChange={(fieldName, data) => {
                        formik.setFieldValue(fieldName, data);
                     }}
                     onBlur={formik.handleBlur}
                     error={
                        formik.touched.covered_country &&
                        formik.errors.covered_country
                     }
                     placeholder="Select"
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">Little bit about yourself*</label>
                  <textarea
                     name="about_myself"
                     id="about_myself"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.about_myself}
                     className="form-control"
                     placeholder='For eg., "Born and bread in Osaka, I love to make travel videos and have more than 150000 subscribers on YouTube. I specialize in food and culture of Japan."'
                  ></textarea>
                  <div className="form-text">Max 500 word limit</div>
                  <ErrorMessage
                     touched={formik.touched?.about_myself}
                     error={formik.errors?.about_myself}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">Job role*</label>
                  <input
                     name="job_role"
                     id="job_role"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.job_role}
                     className="form-control"
                     placeholder='For eg., "Photographer.,"'
                  ></input>
                  <div className="form-text">Max 50 word limit</div>
                  <ErrorMessage
                     touched={formik.touched?.job_role}
                     error={formik.errors?.job_role}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">
                     Add your generic discount codes{" "}
                     {/* <span>(Optional)</span> */}
                  </label>
                  <textarea
                     className="form-control"
                     placeholder="For eg., Use my code R10N10 for a 10% discount on your purchase from www.amazon.com"
                     onChange={formik.handleChange}
                     name="generic_discount_codes"
                     id="generic_discount_codes"
                     onBlur={formik.handleBlur}
                     value={formik.values.generic_discount_codes}
                  ></textarea>
                  <div className="form-text">Max 500 word limit</div>
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">My travel content covers{" "}
                     {/* <span>(Optional)</span> */}
                  </label>
                  <div className="custom-checkbox-list d-flex flex-wrap">
                     {contentCoversList?.map((option, index) => (
                        <div
                           key={index}
                           className="custom-checkbox form-check d-flex align-items-start"
                        >
                           <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formik?.values?.content_covers.includes(
                                 option.id
                              )}
                              id={`${option?.name}${index}`}
                              name="content_covers"
                              value={option.id}
                              onChange={(e) => {
                                 const newValue = [
                                    ...formik.values.content_covers,
                                 ];
                                 if (e.target.checked) {
                                    newValue.push(option.id);
                                 } else {
                                    const index = newValue.indexOf(
                                       option.id
                                    );
                                    if (index !== -1) {
                                       newValue.splice(index, 1);
                                    }
                                 }
                                 formik.setFieldValue(
                                    "content_covers",
                                    newValue
                                 );
                              }}
                              onBlur={() =>
                                 formik.setFieldValue(
                                    "content_covers",
                                    formik.values.content_covers
                                 )
                              }
                           />
                           <label
                              className="form-check-label fw-medium"
                              htmlFor={`${option?.name}${index}`}
                           >
                              {option.name}
                           </label>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group social-form-group mb-4">
                  <div className="row g-3">
                     <div className="col-5 col-sm-3">
                        <label className="form-label">
                           Social links
                           {/* <span>(Optional)</span> */}
                        </label>
                     </div>
                     <div className="col-7 col-sm-9">
                        <label className="form-label">Profile Link*</label>
                     </div>
                  </div>
                  {socialMediaLinks.map((socialMedia, index) => (
                     <div key={index}>
                        <div className="row g-3 mb-2">
                           <div className="col-5 col-sm-3">
                              <label
                                 htmlFor={socialMedia.name}
                                 className="form-control"
                              >
                                 {socialMedia.label}
                              </label>
                           </div>
                           <div className="col-7 col-sm-9">
                              <input
                                 type="text"
                                 placeholder="Paste link here"
                                 className="form-control"
                                 name={socialMedia.name}
                                 id={socialMedia.name}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values[socialMedia.name]}
                              />
                              <ErrorMessage
                                 touched={formik.touched[socialMedia.name]}
                                 error={formik.errors[socialMedia.name]}
                              />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className={`row g-3 ${formik?.errors?.x_link && `mt-3`}`}>
            <div className="col-lg-12">
               <div className="form-group">
                  <button
                     onClick={() => {
                        formik.handleSubmit();
                     }}
                     disabled={loading}
                     type="submit"
                     className="btn btn-default btn-block"
                  >
                     {formType === 'create' ? 'Submit' : "Update"}

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
};
