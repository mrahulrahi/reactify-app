/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from 'react';
import { ErrorMessage, InnerHero, MidContainer, SelectField } from "../components";
import ContactInfoForm from './ContactInfoForm';
import "../globals.css";
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { TiDeleteOutline } from 'react-icons/ti';
import Image from 'next/image';
import * as Yup from "yup";
import { storeBusinessInfo } from '../store/slices/business';

// Helper function for country flag display
const countryIcon = (iconUrl) => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundImage: `url("${iconUrl}")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 100,
    content: '" "',
    display: "flex",
    flexShrink: 0,
    marginRight: 16,
    height: 26,
    width: 26,
    border: "1px solid #E4E4E4",
  },
});

// Yup validation schema
const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required("Business name is required"),
  businessFamousFor: Yup.string()
    .required("Business description is required"),
  country: Yup.object().required("Country is required"),
  content_covers: Yup.array()
    .min(1, "Select at least one category for your business")
    .required("Business category is required"),
  appropriateAges: Yup.array()
    .min(1, "Select at least one appropriate age group")
    .required("Appropriate age group is required"),
  frequentedBy: Yup.array()
    .min(1, "Select at least one frequented category")
    .required("Frequented category is required"),
  isEnterenceFee: Yup.boolean()
    .required("Specify if there is an entrance fee"),
  businessImages: Yup.array()
    .min(1, "You need to upload at least one image.") // Validation for minimum one image
    .max(5, "You can upload up to 5 images."),
});

export default function BusinessInfoContent({
  countriesList,
  frequentedByList,
  aproPriateAgesList,
  businessCategoriesList
}) {
  const [stepper, setStepper] = useState(1);
  const dispatch = useDispatch();
  const [uploadedImages, setUploadedImages] = useState([]); // State to store uploaded image previews

  // Business form

  function convertToTitleCase(str) {
    return str.charAt(0) + str.slice(1).toLowerCase();
  }

  const fromCountriesOptions = countriesList?.data?.map((data, _) => ({
    value: data?.phone_code,
    label: convertToTitleCase(data?.name),
    id: data?.id,
    flag: data?.flag,
  }));

  // Function to handle image upload and preview
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...newImages]); // Add image previews
    formik.setFieldValue("businessImages", [...formik.values.businessImages, ...newImages]); // Store files in formik state
  };

  // Function to handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = uploadedImages.filter((_, imgIndex) => imgIndex !== index); // Remove preview
    setUploadedImages(updatedImages);
    const updatedFiles = formik.values.businessImages.filter((_, fileIndex) => fileIndex !== index); // Remove file from Formik state
    formik.setFieldValue("businessImages", updatedFiles);
  };


  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      businessName: "",
      businessFamousFor: "",
      country: null,
      content_covers: [],
      appropriateAges: [],
      frequentedBy: [],
      isEnterenceFee: null,
      businessImages: [], // Initialize image field as empty array
      enterenceFee: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(storeBusinessInfo(values));
      setStepper(2);
      setIsBusinessFilled(true);
    },
  });

  const [isBusinessFilled, setIsBusinessFilled] = useState(false);

  // Use useEffect to update isBusinessFilled whenever formik.errors or formik.touched changes
  useEffect(() => {
    const hasErrors = Object.keys(formik?.errors || {}).length > 0;
    const isTouched = Object.keys(formik?.touched || {}).length > 0;

    // If no errors and the form has been touched, consider it filled
    setIsBusinessFilled(!hasErrors && isTouched);
  }, [formik?.errors, formik?.touched]);


  return (
    <>
      <InnerHero />
      <MidContainer>
        <div className="d-flex align-items-center justify-content-center pb-5">
          <button onClick={() => setStepper(1)} style={{ borderTop: "0px", borderRight: "0px", borderLeft: "0px", borderBottom: stepper === 1 ? `1px solid #6f27ff` : `0px` }} className="bg-transparent pb-2 px-4 mb-0 d-flex gap-1">
            {!isBusinessFilled ?
              <button disabled className='btn btn-default opacity-100 p-2 d-flex align-items-center justify-content-center' style={{ fontSize: "11px", height: "22px", width: "22px" }}>
                1
              </button> :
              <img src={"/images/count.svg"} style={{ objectFit: "contain", width: "22px", height: "22px" }} alt="add-icon" />
            }
            <span style={{ opacity: isBusinessFilled ? .4 : 1, fontWeight: "500", fontSize: "14px" }}>
              Business Info
            </span>
          </button>
          <button disabled={!isBusinessFilled} onClick={() => setStepper(2)} style={{ borderTop: "0px", borderRight: "0px", borderLeft: "0px", borderBottom: stepper === 2 ? `1px solid #6f27ff` : `0px` }} className="bg-transparent pb-2 px-4 mb-0 d-flex gap-1">
            <button disabled className='btn btn-default border-0 opacity-100 p-2 d-flex align-items-center justify-content-center' style={{ fontSize: "11px", height: "22px", width: "22px", backgroundColor: stepper === 2 ? "#6f27ff" : "#C4BECF" }}>
              2
            </button>
            <span style={{ opacity: stepper === 1 ? .4 : 1, fontWeight: "500", fontSize: "14px" }}>
              Contact Info
            </span>
          </button>
        </div>
        {stepper === 1 ?
          <form onSubmit={formik.handleSubmit} className="profile-form-container">
            {/* Business Name */}
            <div className="form-group mb-4">
              <label className="form-label">Business name*</label>
              <input
                type="text"
                name="businessName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.businessName}
                placeholder="Enter the business name"
                className="form-control"
              />
              <ErrorMessage
                touched={formik.touched.businessName}
                error={formik.errors.businessName}
              />
            </div>

            {/* Business Famous For */}
            <div className="form-group mb-4">
              <label className="form-label">What's your business famous for?*</label>
              <input
                type="text"
                name="businessFamousFor"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.businessFamousFor}
                placeholder="e.g., Famous for sushi"
                className="form-control"
              />
              <ErrorMessage
                touched={formik.touched.businessFamousFor}
                error={formik.errors.businessFamousFor}
              />
            </div>

            {/* Country Selection */}
            <div className="form-group mb-4">
              <SelectField
                isSearchable
                label="Country"
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
                placeholder="Select a country"
                styles={{
                  option: (styles, { data }) => ({
                    ...styles,
                    ...countryIcon(data.flag),
                  }),
                  input: (styles) => ({ ...styles, ...countryIcon() }),
                  placeholder: (styles) => ({
                    ...styles,
                    ...countryIcon("/images/country-icon.png"),
                  }),
                  singleValue: (styles, { data }) => ({
                    ...styles,
                    ...countryIcon(data.flag),
                  }),
                }}
              />
            </div>

            {/* Content Categories */}
            <div className="form-group mb-4">
              <label className="form-label">Category of your business*</label>
              <div className="custom-checkbox-list d-flex flex-wrap">
                {businessCategoriesList?.map((option, index) => (
                  <div key={index} className="custom-checkbox form-check d-flex align-items-start">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formik.values.content_covers.includes(option.id)}
                      id={`${option.name}${index}`}
                      name="content_covers"
                      value={option.id}
                      onChange={(e) => {
                        const newValue = [...formik.values.content_covers];
                        if (e.target.checked) {
                          newValue.push(option.id);
                        } else {
                          const idx = newValue.indexOf(option.id);
                          if (idx !== -1) {
                            newValue.splice(idx, 1);
                          }
                        }
                        formik.setFieldValue("content_covers", newValue);
                      }}
                      onBlur={() => formik.setFieldValue("content_covers", formik.values.content_covers)}
                    />
                    <label className="form-check-label fw-medium" htmlFor={`${option.name}${index}`}>
                      {option.name}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage touched={formik.touched.content_covers} error={formik.errors.content_covers} />
            </div>

            {/* Appropriate Ages */}
            <div className="form-group mb-4">
              <label className="form-label">Appropriate ages*</label>
              <div className="custom-checkbox-list d-flex flex-wrap">
                {aproPriateAgesList?.map((option, index) => (
                  <div key={index} className="custom-checkbox form-check d-flex align-items-start">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formik.values.appropriateAges.includes(option.id)}
                      id={`${option.name}${index}`}
                      name="appropriateAges"
                      value={option.id}
                      onChange={(e) => {
                        const newValue = [...formik.values.appropriateAges];
                        if (e.target.checked) {
                          newValue.push(option.id);
                        } else {
                          const idx = newValue.indexOf(option.id);
                          if (idx !== -1) {
                            newValue.splice(idx, 1);
                          }
                        }
                        formik.setFieldValue("appropriateAges", newValue);
                      }}
                    />
                    <label className="form-check-label fw-medium" htmlFor={`${option.name}${index}`}>
                      {option.name}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage touched={formik.touched.appropriateAges} error={formik.errors.appropriateAges} />
            </div>

            {/* Frequented By */}
            <div className="form-group mb-4">
              <label className="form-label">Frequented by*</label>
              <div className="custom-checkbox-list d-flex flex-wrap">
                {frequentedByList?.map((option, index) => (
                  <div key={index} className="custom-checkbox form-check d-flex align-items-start">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formik.values.frequentedBy.includes(option.id)}
                      id={`${option.name}${index}`}
                      name="frequentedBy"
                      value={option.id}
                      onChange={(e) => {
                        const newValue = [...formik.values.frequentedBy];
                        if (e.target.checked) {
                          newValue.push(option.id);
                        } else {
                          const idx = newValue.indexOf(option.id);
                          if (idx !== -1) {
                            newValue.splice(idx, 1);
                          }
                        }
                        formik.setFieldValue("frequentedBy", newValue);
                      }}
                    />
                    <label className="form-check-label fw-medium" htmlFor={`${option.name}${index}`}>
                      {option.name}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage touched={formik.touched.frequentedBy} error={formik.errors.frequentedBy} />
            </div>

            {/* Entrance Fee */}
            <div className="form-group mb-4">
              <label className="form-label">Is there an entrance fee?*</label>
              <div className="border d-flex" style={{ width: "100px", borderRadius: "8px" }}>
                <div style={{ width: "50px", height: "40px", backgroundColor: formik.values.isEnterenceFee === true ? "#6F27FF" : "", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }} className="form-check d-flex align-items-center justify-content-center form-check-inline m-0 p-0">
                  <input
                    type="radio"
                    id="isEnterenceFeeYes"
                    name="isEnterenceFee"
                    className="form-check-input d-none"
                    checked={formik.values.isEnterenceFee === true}
                    value="yes"
                    onChange={() => formik.setFieldValue("isEnterenceFee", true)}
                  />
                  <label style={{ fontWeight: "400", fontSize: "14px", color: formik.values.isEnterenceFee === true ? "white" : "black" }} className={`form-check-label`} htmlFor="isEnterenceFeeYes">
                    Yes
                  </label>
                </div>
                <div style={{ width: "50px", height: "40px", backgroundColor: formik.values.isEnterenceFee === false ? "#6F27FF" : "", borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }} className="form-check d-flex align-items-center justify-content-center form-check-inline m-0 p-0">
                  <input
                    type="radio"
                    id="isEnterenceFeeNo"
                    name="isEnterenceFee"
                    className="form-check-input d-none"
                    checked={formik.values.isEnterenceFee === false}
                    value="no"
                    onChange={() => formik.setFieldValue("isEnterenceFee", false)}
                  />
                  <label style={{ fontWeight: "400", fontSize: "14px", color: formik.values.isEnterenceFee === false ? "white" : "black" }} className="form-check-label" htmlFor="isEnterenceFeeNo">
                    No
                  </label>
                </div>
              </div>
              <ErrorMessage touched={formik.touched.isEnterenceFee} error={formik.errors.isEnterenceFee} />
            </div>

            {formik.values.isEnterenceFee === true &&
              <div className="form-group mb-4">
                <label className="form-label">What's the enterence fee? (in Japanese Yen)*</label>
                <input
                  type="text"
                  name="enterenceFee"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.enterenceFee}
                  placeholder="30 Yen"
                  className="form-control"
                />
                <ErrorMessage
                  touched={formik.touched.enterenceFee}
                  error={formik.errors.enterenceFee}
                />
              </div>
            }
            <div className="form-group mb-4">
              <label className="form-label">Upload images of your business</label>
              <p className="mb-1" style={{ fontSize: "13px" }}>
                Upload up to 5 supported files: image. Max 10 MB per file.
              </p>

            </div>

            {/* Display Uploaded Images */}
            <div className="uploaded-images-preview">
              <div className="uploaded-image-container row mt-2 mb-3">
                {uploadedImages?.length >= 5 ? null :
                  <div className="col-3">
                    <label
                      className="d-flex align-items-center justify-content-center cursor-pointer"
                      style={{ height: "120px", width: "120px", border: "1px dotted #D8D0E9", borderRadius: "10px" }}
                      htmlFor="businessImages">
                      <Image src={"/images/add_photo.svg"} height={18} width={18} alt="add-icon" />
                    </label>
                    <input
                      multiple
                      onChange={handleImageUpload}
                      id="businessImages" className="d-none" type="file" />
                  </div>
                }
                <ErrorMessage
                  touched={formik.touched.businessImages}
                  error={formik.errors.businessImages}
                />
                {uploadedImages.length > 0 &&
                  uploadedImages.map((imageSrc, index) => (
                    <div key={index} className="position-relative col-3">
                      <img style={{ height: "120px", width: "120px", objectFit: "contain", borderRadius: "10px" }} src={imageSrc} alt={`Uploaded Preview ${index + 1}`} className="uploaded-image" />
                      <button
                        style={{ top: 0 }}
                        type="button"
                        className="border-0 p-0 bg-transparent position-absolute"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <TiDeleteOutline color="red" size={27} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-group pb-3">
              <button type="submit" className="btn btn-primary float-end">
                Save & Proceed
              </button>
            </div>
          </form>
          : <ContactInfoForm
            setStepper={setStepper}
            countriesList={countriesList}
          />
        }
      </MidContainer>
    </>
  )
}
