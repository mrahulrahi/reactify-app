/* eslint-disable react/no-unescaped-entities */
"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ErrorMessage } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { sendUserInfo } from "../lib/business";
import { useState } from "react";
import toast from "react-hot-toast";
import { storeBusinessInfo } from "../store/slices/business";

export default function ContactInfoForm({ countriesList, setStepper }) {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const countriestOptions = countriesList?.data?.map((data) => ({
    value: data?.phone_code,
    label: `+${data?.phone_code}`,
    id: data?.id,
  }));

  const validationSchema = Yup.object({
    phone: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode is required"),
    googleMapLinkToLocation: Yup.string().url("Must be a valid URL").required("Google Map link is required"),
    contactPersonName: Yup.string().required("Contact person name is required"),
    contactEmail: Yup.string().email("Invalid email address").required("Contact email is required"),
    countryCode: Yup.object().required("Country code is required"),
  });

  const { buisnessInfo } = useSelector((state) => state.business);

  async function objectURLToFile(objectURL, fileName) {
    try {
      const response = await fetch(objectURL);

      if (!response.ok) {
        throw new Error(`Failed to fetch object URL: ${response.statusText}`);
      }

      const blob = await response.blob(); // Convert the response to a Blob
      const file = new File([blob], fileName, { type: blob.type }); // Convert the Blob into a File
      return file;
    } catch (error) {
      console.error("Error converting object URL to file:", error);
      return null; // Return null or handle as needed
    }
  }

  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
      city: "",
      pincode: "",
      googleMapLinkToLocation: "",
      contactPersonName: "",
      contactEmail: "",
      countryCode: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const businessAndPersonelInfo = { ...buisnessInfo, ...values }
      const formData = new FormData();
      formData?.append("business_name", businessAndPersonelInfo?.businessName);
      formData?.append("country", businessAndPersonelInfo?.country?.id);
      formData?.append("business_famous_for", businessAndPersonelInfo?.businessFamousFor);
      if (businessAndPersonelInfo?.content_covers?.length > 0) {
        businessAndPersonelInfo?.content_covers?.map((data) => {
          formData?.append("category_of_business", data);
        })
      }
      if (businessAndPersonelInfo?.appropriateAges?.length > 0) {
        businessAndPersonelInfo?.appropriateAges?.map((data) => {
          formData?.append("appropriate_ages", data);
        })
      }
      if (businessAndPersonelInfo?.frequentedBy?.length > 0) {
        businessAndPersonelInfo?.frequentedBy?.map((data) => {
          formData?.append("frequented_by", data);
        })
      }
      formData?.append("entrance_fees", businessAndPersonelInfo?.isEnterenceFee === true ? 1 : 0);
      // Use for...of to handle asynchronous operations properly
      for (const [index, data] of businessAndPersonelInfo.businessImages.entries()) {
        const file = await objectURLToFile(data, `business_image_${index}.png`); // Provide unique file name for each image
        formData.append(`bussiness_images`, file); // Append the File object to formData
      }
      formData?.append("entrance_fees_in_japanese", businessAndPersonelInfo?.enterenceFee);
      formData?.append("mobile_no", businessAndPersonelInfo?.phone);
      formData?.append("address", businessAndPersonelInfo?.address);
      formData?.append("city", businessAndPersonelInfo?.city);
      formData?.append("pin_code", businessAndPersonelInfo?.pincode);
      formData?.append("map_link", businessAndPersonelInfo?.googleMapLinkToLocation);
      formData?.append("contact_person_name", businessAndPersonelInfo?.contactPersonName);
      formData?.append("contact_email_id", businessAndPersonelInfo?.contactEmail);
      formData?.append("phone_code", businessAndPersonelInfo?.countryCode?.id);

      const res = await sendUserInfo(formData);

      if (res?.status === true) {
        await dispatch(storeBusinessInfo({}));
        setLoading(false);
        toast.success(res?.message);
        setStepper(1);
      } else {
        setLoading(false);
        setStepper(1);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="profile-form-container">
      <div className="row g-3">
        <div className="col-lg-12">
          <div className="form-group mb-4">
            <label className="form-label">Address*</label>
            <input
              type="text"
              name="address"
              placeholder="123 Main St"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            <ErrorMessage
              touched={formik.touched?.address}
              error={formik.errors?.address}
            />
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-12">
          <div className="form-group mb-4">
            <label className="form-label">City*</label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            <ErrorMessage
              touched={formik.touched?.city}
              error={formik.errors?.city}
            />
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-12">
          <div className="form-group mb-4">
            <label className="form-label">Pincode*</label>
            <input
              type="number"
              name="pincode"
              placeholder="123456"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
            />
            <ErrorMessage
              touched={formik.touched?.pincode}
              error={formik.errors?.pincode}
            />
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-12">
          <div className="form-group mb-4">
            <label className="form-label">Google Map link to the location*</label>
            <input
              type="text"
              name="googleMapLinkToLocation"
              placeholder="Google link"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.googleMapLinkToLocation}
            />
            <ErrorMessage
              touched={formik.touched?.googleMapLinkToLocation}
              error={formik.errors?.googleMapLinkToLocation}
            />
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-12">
          <div className="form-group mb-4">
            <label className="form-label">Contact person's name*</label>
            <input
              type="text"
              name="contactPersonName"
              placeholder="Name"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactPersonName}
            />
            <ErrorMessage
              touched={formik.touched?.contactPersonName}
              error={formik.errors?.contactPersonName}
            />
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-12">
          <div className="form-group mb-4">
            <label className="form-label">Contact email ID*</label>
            <input
              type="email"
              name="contactEmail"
              placeholder="youremailid@gmail.com"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactEmail}
            />
            <ErrorMessage
              touched={formik.touched?.contactEmail}
              error={formik.errors?.contactEmail}
            />
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-12">
          <div className="form-group mb-4">
            <label className="form-label">Contact number*</label>
            <div className="phone-select-group">
              <Select
                placeholder="+1"
                name="countryCode"
                options={countriestOptions}
                onChange={(option) => formik.setFieldValue("countryCode", option)}
                className="phone-select-container"
                classNamePrefix="phone-select"
                onBlur={formik.handleBlur}
                value={formik.values.countryCode}
              />
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="999 999 1010"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>
            <div className="d-flex">
              <ErrorMessage
                touched={formik.touched?.countryCode}
                error={formik.errors?.countryCode}
              />
              <ErrorMessage
                touched={formik.touched?.phone}
                error={formik.errors?.phone}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`d-flex justify-content-between`}>
        <div className="form-group">
          <button
            onClick={() => setStepper(1)}
            type="button"
            className="btn btn-primary btn-block"
          >
            Back
          </button>
        </div>
        <div className="form-group">
          <button
            disabled={loading}
            type="submit"
            className="btn btn-default btn-block"
          >
            Submit
            {loading &&
              <span
                className="spinner-border spinner-border-sm ms-2"
                role="status"
                aria-hidden="true"
              />
            }
          </button>
        </div>
      </div>
    </form>
  );
};
