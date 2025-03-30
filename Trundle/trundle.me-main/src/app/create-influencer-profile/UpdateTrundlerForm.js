"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ErrorMessage, SelectField } from "../components";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createTrundlerProfile, setEmail } from "../store/slices/auth";
import { useDispatch } from "react-redux";
import { updateTrundlerDetails } from "../lib/trundler/getTrundlerDetails";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import moment from "moment";

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

const languageSchema = Yup.object().shape({
   languageId: Yup.object().shape({
      value: Yup.string().required("Please select a language"),
      label: Yup.string().required("Please select a language"),
   }),
   proficiency: Yup.object().shape({
      value: Yup.string().required("Please select proficiency"),
      label: Yup.string().required("Please select proficiency"),
   }),
});

const validationSchema = Yup.object().shape({
   first_name: Yup.string().required("First name is required"),
   last_name: Yup.string().required("Last name is required"),
   email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
   phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Phone number is required"),
   phone_code: Yup.object().required("Phone code is required"),
   content_covers: Yup.array()
      .min(1, "At least one content cover must be selected")
      .required("Content cover is required"),
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
      .of(languageSchema)
      .min(1, "Add at least one language"),
   country: Yup.object().required("Your location is required"),
   dob: Yup.string().required("Date of birth is required"),
   covered_country: Yup.array()
      .min(1, "At least one covered country must be selected")
      .required("Covered country is required"),
   generic_discount_codes: Yup.string()
      .required("Generic discount code is required")
      .test("word-count", "Max 500 word limit", (value) => {
         if (!value) return false;
         const wordCount = value.trim().split(/\s+/).length;
         return wordCount <= 500;
      }),
   youtube_link: Yup.string()
      .matches(
         /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
         "Invalid URL. Must be a valid URL."
      )
      .required("Youtube link is required"),
   instagram_link: Yup.string()
      .matches(
         /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
         "Invalid URL. Must be a valid URL."
      )
      .required("Instagram link is required"),
   twitch_link: Yup.string()
      .matches(
         /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
         "Invalid URL. Must be a valid URL."
      )
      .required("Twitch link is required"),
   x_link: Yup.string()
      .matches(
         /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
         "Invalid URL. Must be a valid URL."
      )
      .required("X link is required"),
});

const languages = [
   { id: 1, value: "English", label: "English" },
   { id: 2, value: "Mandarin", label: "Mandarin" },
   { id: 3, value: "Korean", label: "Korean" },
   { id: 4, value: "Japanese", label: "Japanese" },
   { id: 5, value: "French", label: "French" },
   { id: 6, value: "German", label: "German" },
   { id: 7, value: "Spanish", label: "Spanish" },
   { id: 8, value: "Hindi", label: "Hindi" },
   { id: 9, value: "Thai", label: "Thai" },
   { id: 10, value: "Vietnamese", label: "Vietnamese" },
   { id: 11, value: "Malay", label: "Malay" },
   { id: 12, value: "Arabic", label: "Arabic" },
];

export const UpdateTrundlerForm = ({
   trundlerProfile,
   countriesList,
   session,
   formType
}) => {


   const [profileImgErr, setProfileImaErr] = useState(false);

   const access_token = session?.user?.access_token;

   const [imagePreview, setImagePreview] = useState(null);

   const [uploadedProfile, setUploadedProfile] = useState(null);

   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();

   const options = [
      { value: 1, label: "Beginner" },
      { value: 2, label: "Intermediate" },
      { value: 3, label: "Native" },
   ];

   const genderOptions = [
      { id: 1, name: "Male" },
      { id: 2, name: "Female" },
      { id: 3, name: "Others" },
   ];

   const socialMediaLinks = [
      { label: "Youtube", name: "youtube_link" },
      { label: "Instagram", name: "instagram_link" },
      { label: "X", name: "x_link" },
      { label: "Twitch", name: "twitch_link" },
   ];

   const coverCountriesListOptions = [
      { id: 1, value: "Japan", label: "Japan" },
      { id: 2, value: "South Korea", label: "South Korea" },
      { id: 3, value: "Taiwan", label: "Taiwan" },
      { id: 4, value: "Thailand", label: "Thailand" },
      { id: 5, value: "Vietnam", label: "Vietnam" },
      { id: 6, value: "Cambodia", label: "Cambodia" },
      { id: 7, value: "Singapore", label: "Singapore" },
      { id: 8, value: "Malaysia", label: "Malaysia" },
      { id: 9, value: "Sri Lanka", label: "Sri Lanka" },
      { id: 10, value: "India", label: "India" },
      { id: 11, value: "Philippines", label: "Philippines" },
   ];

   const travellingPurposeOptions = [
      { value: 1, label: "Culture" },
      { value: 2, label: "Food" },
      { value: 3, label: "Entertainment" },
      { value: 4, label: "Leisure" },
      { value: 5, label: "Shopping" },
      { value: 6, label: "Religious" },
      { value: 7, label: "Nature" },
      { value: 8, label: "Nightlife" },
   ];

   const countriestOptions = countriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: `+${data?.phone_code}`,
      id: data?.id,
   }));

   function convertToTitleCase(str) {
      return str.charAt(0) + str.slice(1).toLowerCase();
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
         label: name,
      })
   );

   const extractIds = (inputArray) => {
      return inputArray?.map((item) => item.id);
   };

   const defaultGender =
      trundlerProfile?.data?.gender === "Male"
         ? 1
         : trundlerProfile?.data?.gender === "Female"
            ? 2
            : 3;

   const formik = useFormik({
      initialValues: {
         first_name: trundlerProfile?.data?.first_name || "",
         last_name: trundlerProfile?.data?.last_name || "",
         middle_name: trundlerProfile?.data?.middle_name || "",
         phone_code: trundlerProfile?.data?.phone_code || "",
         email: trundlerProfile?.data?.email || "",
         username: trundlerProfile?.data?.username || "",
         gender: defaultGender || "",
         phone: trundlerProfile?.data?.mobile_no || "",
         about_myself: trundlerProfile?.data?.about_myself || "",
         job_role: trundlerProfile?.data?.job_role || "",
         generic_discount_codes: trundlerProfile?.data?.discount_code || "",
         content_covers:
            extractIds(trundlerProfile?.data?.content_covers) || [],
         country:
            fromCountriesOptions?.[trundlerProfile?.data?.country?.id] || null,
         dob: trundlerProfile?.data?.dob || "",
         covered_country: defaultCoveredCountries || "",
         youtube_link: trundlerProfile?.data?.youtube_link || "",
         instagram_link: trundlerProfile?.data?.instagram_link || "",
         x_link: trundlerProfile?.data?.x_link || "",
         twitch_link: trundlerProfile?.data?.twitch_link || "",
         languages: trundlerProfile?.data?.languages || [
            {
               languageId: {
                  id: "",
                  value: "",
                  label: "",
               },
               proficiency: {
                  value: "",
                  label: "",
               },
            },
         ],
      },
      validationSchema,
      onSubmit: async (event) => {
         dispatch(setEmail(null));
         const formData = new FormData();
         if (imagePreview) {
            formData.append("photo", uploadedProfile);
         }
         formData.append("first_name", event?.first_name);
         if (event?.middle_name) {
            formData.append("middle_name", event?.middle_name);
         }
         formData.append("last_name", event?.last_name);
         formData.append("email", event?.email);
         formData.append("username", event?.username);
         formData.append("gender", parseInt(event?.gender));
         formData.append("country", parseInt(event?.country?.id));
         formData.append("mobile_no", parseInt(event?.phone));
         formData.append("phone_code", parseInt(event?.phone_code?.id));
         if (event?.languages) {
            event?.languages?.map((e, i) => {
               formData.append("language", parseInt(e?.languageId?.id));
               formData.append("proficiency", parseInt(e.proficiency?.value));
            });
         }
         formData.append("dob", moment(event?.dob).format("YYYY-MM-DD"));
         if (event?.covered_country) {
            event?.covered_country?.map((item) =>
               formData.append("covered_country", item.id)
            );
         }
         formData.append("about_myself", event?.about_myself);
         formData.append("job_role", event?.job_role);
         if (event?.content_covers) {
            event?.content_covers?.map((data) =>
               formData.append("content_covers", data)
            );
         }
         formData.append("discount_code", event?.generic_discount_codes);
         formData.append("youtube_link", event?.youtube_link);
         formData.append("x_link", event?.x_link);
         formData.append("instagram_link", event?.instagram_link);
         formData.append("twitch_link", event?.twitch_link);

         if (formType === 'create') {
            if (!profileImgErr) {
               setLoading(true);
               const res = await dispatch(createTrundlerProfile(formData));
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
            }
         } else {
            setLoading(true);
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
            setProfileImaErr(false);
         };
         reader.readAsDataURL(file);
      }
   };

   const isLastLanguageEmpty = () => {
      const lastLanguage =
         formik.values.languages[formik.values.languages.length - 1];
      return (
         !lastLanguage ||
         lastLanguage.languageId === "" ||
         lastLanguage.proficiency === ""
      );
   };

   const langaugeErr = () => {
      const lastError =
         formik.errors.languages?.[formik.errors.languages.length - 1];

      if (lastError) {
         const hasError =
            lastError.languageId?.value || lastError.languageId?.label;

         if (hasError) {
            return (
               <div className="error text-danger">
                  {lastError.languageId.value || lastError.languageId.label}
               </div>
            );
         }
      }
      return null;
   };

   const proffiencyErr = () => {
      const lastError =
         formik.errors.languages?.[formik.errors.languages.length - 1];

      if (lastError) {
         const hasError =
            lastError.proficiency?.value || lastError.proficiency?.label;

         if (hasError) {
            return (
               <div className="error text-danger">
                  {lastError.proficiency.value || lastError.proficiency.label}
               </div>
            );
         }
      }
      return null;
   };

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
                        Profile image*
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
                     {profileImgErr && (
                        <p
                           className="text-danger text-center"
                           style={{
                              fontSize: "13px",
                           }}
                        >
                           Profile image is required
                        </p>
                     )}
                  </div>
               ) : (
                  <div className="upload-profile-box mb-4 d-flex flex-column align-items-center justify-content-center">
                     <label className="upload-profile-label">
                        Profile image*
                     </label>
                     <label
                        htmlFor="upload-profile"
                        className={`upload-profile-img ${formType === `update` && `border-0`} d-flex justify-content-center cursor-pointer`}
                     >
                        {formType === 'update' ?
                           <div className="user-img">
                              <Image src={trundlerProfile?.data?.photo}
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
                     {profileImgErr && (
                        <p
                           className="text-danger text-center"
                           style={{ fontSize: "13px" }}
                        >
                           Profile image is required
                        </p>
                     )}
                  </div>
               )}
            </div>
         </div>
         <div className="row g-sm-3">
            <div className="col-sm-4">
               <div className="form-group mb-4">
                  <label className="form-label">First Name*</label>
                  <input
                     type="text"
                     placeholder="Harry"
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
                     Middle Name <span>(Optional)</span>
                  </label>
                  <input
                     type="text"
                     placeholder="James"
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
                  <label className="form-label">Last Name*</label>
                  <input
                     type="text"
                     name="last_name"
                     id="last_name"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.last_name}
                     placeholder="Potter"
                     className="form-control"
                  />
                  <ErrorMessage
                     touched={formik.touched?.last_name}
                     error={formik.errors?.last_name}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">Email*</label>
                  <input
                     type="text"
                     name="email"
                     id="email"
                     onBlur={formik.handleBlur}
                     value={formik.values.email}
                     placeholder="Please enter your email"
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
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">User name*</label>
                  <input
                     type="text"
                     name="username"
                     id="username"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.username}
                     placeholder="Please enter your username"
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
                  <label className="form-label">Phone No*</label>
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
               <div className="form-group mb-4 position-relative">
                  <label className="form-label">Date of Birth*</label>
                  <Image
                     style={{ position: "absolute", right: "0px", top: "44px", zIndex: 1, opacity: .5 }}
                     src="/images/event.svg"
                     alt=""
                     width={14}
                     height={16}
                  />
                  <div className="row">
                     <DatePicker
                        placeholderText="DD-MM-YYYY"
                        className="form-control w-100"
                        selected={formik.values.dob}
                        onChange={(date) => {
                           formik.setFieldValue('dob', date)
                        }}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                     />
                  </div>
                  <ErrorMessage
                     touched={formik.touched?.dob}
                     error={formik.errors?.dob}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <div className="row">
                     <div className="col-6">
                        <label className="form-label">Languages I speak*</label>
                     </div>
                     <div className="col-6">
                        <label className="form-label">Proficiency*</label>
                     </div>
                  </div>
                  {formik?.values?.languages?.map((_, index) => (
                     <div className="row g-3 mb-2" key={index}>
                        <div className="col-6">
                           <SelectField
                              className="form-select-container"
                              classNamePrefix="form-select"
                              name={`languages.${index}.languageId`}
                              value={formik.values.languages[index].languageId}
                              options={languages}
                              onChange={(value, item) => {
                                 const newLanguages = [
                                    ...formik.values.languages,
                                 ];
                                 newLanguages[index].languageId = item;
                                 formik.setFieldValue(
                                    "languages",
                                    newLanguages
                                 );
                              }}
                              onBlur={formik.handleBlur}
                              error={
                                 index === formik.values.languages.length - 1
                                    ? langaugeErr()
                                    : null
                              }
                              placeholder="Select"
                           />
                        </div>
                        <div className="col-6">
                           <div className="d-flex">
                              <SelectField
                                 className="form-select-container"
                                 classNamePrefix="form-select"
                                 name={`languages.${index}.proficiency`}
                                 value={formik.values.languages[index].proficiency}
                                 options={options}
                                 onChange={(value, item) => {
                                    const newLanguages = [
                                       ...formik.values.languages,
                                    ];
                                    newLanguages[index].proficiency = item;
                                    formik.setFieldValue(
                                       "languages",
                                       newLanguages
                                    );
                                 }}
                                 onBlur={formik.handleBlur}
                                 error={
                                    index === formik.values.languages.length - 1
                                       ? proffiencyErr()
                                       : null
                                 }
                                 placeholder="Select"
                              />
                              {index !== 0 ? (
                                 <div
                                    className="del-lang-icon d-flex align-items-center justify-content-center"
                                    onClick={() => {
                                       const newLanguages = [
                                          ...formik.values.languages,
                                       ];
                                       newLanguages.splice(index, 1);
                                       formik.setFieldValue(
                                          "languages",
                                          newLanguages
                                       );
                                    }}
                                 >
                                    <IoClose />
                                 </div>
                              ) : (
                                 <div className="del-lang-icon"></div>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
                  <div className="mt-3">
                     <button
                        disabled={isLastLanguageEmpty()}
                        className="add-btn d-flex align-items-center justify-content-center"
                        onClick={() =>
                           formik.setFieldValue("languages", [
                              ...formik.values.languages,
                              {
                                 languageId: { value: "", label: "" },
                                 proficiency: { value: "", label: "" },
                              },
                           ])
                        }
                     >
                        <div className="add-btn-icon d-flex align-items-center justify-content-center">
                           <Image
                              src="/images/add-button-icon.svg"
                              alt=""
                              width={20}
                              height={20}
                           />
                        </div>
                        Add another language
                     </button>
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
                     label="Countries I cover"
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
                  <label className="form-label">Little bit about myself*</label>
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
                     Add your generic discount codes*
                     {/* <span>(Optional)</span> */}
                  </label>
                  <textarea
                     className="form-control"
                     placeholder="Use my code R10N10 for a 10% discount on your purchase from www.amazon.com"
                     onChange={formik.handleChange}
                     name="generic_discount_codes"
                     id="generic_discount_codes"
                     onBlur={formik.handleBlur}
                     value={formik.values.generic_discount_codes}
                  ></textarea>
                  <div className="form-text">Max 500 word limit</div>
                  <ErrorMessage
                     touched={formik.touched?.generic_discount_codes}
                     error={formik.errors?.generic_discount_codes}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
                  <label className="form-label">My travel content covers*</label>
                  <div className="custom-checkbox-list d-flex flex-wrap">
                     {travellingPurposeOptions.map((option, index) => (
                        <div
                           key={index}
                           className="custom-checkbox form-check d-flex align-items-start"
                        >
                           <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formik?.values?.content_covers.includes(
                                 option.value
                              )}
                              id={`${option?.label}${index}`}
                              name="content_covers"
                              value={option.value}
                              onChange={(e) => {
                                 const newValue = [
                                    ...formik.values.content_covers,
                                 ];
                                 if (e.target.checked) {
                                    newValue.push(option.value);
                                 } else {
                                    const index = newValue.indexOf(
                                       option.value
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
                              htmlFor={`${option?.label}${index}`}
                           >
                              {option.label}
                           </label>
                        </div>
                     ))}
                  </div>
                  <ErrorMessage
                     touched={formik.touched?.content_covers}
                     error={formik.errors?.content_covers}
                  />
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group mb-4">
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
                     <div className="row g-3 mb-2" key={index}>
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
                  ))}
               </div>
            </div>
         </div>
         <div className="row g-3">
            <div className="col-lg-12">
               <div className="form-group">
                  <button
                     onClick={() => {
                        if (formType === 'create') {
                           if (!imagePreview) {
                              setProfileImaErr(true);
                           } else {
                              setProfileImaErr(false);
                           }
                        }
                        formik.handleSubmit();
                     }}
                     disabled={loading}
                     type="submit"
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
};
