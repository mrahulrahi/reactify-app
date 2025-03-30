"use client";

import React, { Suspense, useEffect, useState } from 'react'
import UserAccountSettingsCard from '../components/user-account-settings/UserAccountSettingsCard';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactDatePicker from 'react-datepicker';
import Select from "react-select";
import { fetchCities } from '../lib/country';
import { updateUserDetails } from '../lib/auth';
import moment from 'moment';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';

export default function MyProfile({
  access_token,
  userData,
  states,
  phoneCodes
}) {

  const [citiesList, setCitiesList] = useState([]);

  const [loading, setLoading] = useState(false);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
    }),
  };

  const statesOption = states?.map((data, _) => ({
    value: data?.id,
    label: data?.state_name,
    id: data?.id,
  }));

  const phoneCodeList = phoneCodes?.map((data, _) => ({
    value: data?.id,
    label: `+${data?.phone_code}`,
    id: data?.id,
  }));

  const citiesOptions = citiesList?.map((data, _) => ({
    value: data?.id,
    label: data?.city,
    id: data?.id,
  }));

  const defaultState = {
    id: userData?.state?.id,
    label: userData?.state?.state_name,
    value: userData?.state?.id
  }

  const defaultCity = {
    id: userData?.city?.id,
    label: userData?.city?.city,
    value: userData?.city?.id
  }

  const defaultCountryCode = {
    id: userData?.phone_code?.id,
    label: userData?.phone_code?.phone_code,
    value: userData?.phone_code?.id
  };

  const formik = useFormik({
    initialValues: {
      full_name: userData?.full_name || '',
      dob: userData?.dob || '',
      phone_code: userData?.phone_code && defaultCountryCode || '',
      mobile_no: userData?.mobile_no || '',
      nationality: userData?.nationality || '',
      state: userData?.state && defaultState || '',
      city: userData?.city && defaultCity || '',
      postal_code: userData?.postal_code || ''
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('Full name name is required'),
      dob: Yup.date().required('Date of birth is required'),
      mobile_no: Yup.string().matches(/^[0-9]+$/, 'Mobile number must be digits only').required('Mobile number is required'),
      nationality: Yup.string().required('Nationality is required'),
      state: Yup.object().required('State is required'),
      city: Yup.object().required('City is required'),
      postal_code: Yup.string().matches(/^[0-9]{6}$/, 'Zip code must be 6 digits').required('Zip code is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const data = {
        full_name: values?.full_name || '',
        dob: values?.dob || '',
        phone_code: values?.phone_code?.id || '',
        mobile_no: values?.mobile_no || '',
        nationality: values?.nationality || '',
        state: values?.state?.id || '',
        city: values?.city?.id || '',
        postal_code: values?.postal_code || ''
      }
      const res = await updateUserDetails({ access_token, data });
      if (res?.success) {
        setLoading(false);
        toast.success(res?.message)
      }
    },
  });

  useEffect(() => {
    const getCities = async () => {
      const state_id = defaultState?.id;
      const cities = await fetchCities({ state_id, access_token });
      setCitiesList(cities);
    }
    if (userData?.state) {
      getCities();
    }
  }, [access_token, defaultState?.id]);

  return (
    <>
      <div className="page-top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pth-content-box d-flex flex-column align-items-center justify-content-between">
                <h3>My Profile</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">My Profile</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container profile-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile-inner-box d-flex flex-wrap">
                <Suspense fallback={<Skeleton count={10} />}>
                  <UserAccountSettingsCard
                    access_token={access_token}
                    profilePic={userData?.photo}
                  />
                </Suspense>
                <div className="profile-body-wrapper">
                  <div className="profile-edit-content">
                    <header className="general-detail-text">
                      <h2 className="mb-0">General Details</h2>
                    </header>
                    <form className='row mt-4' onSubmit={formik.handleSubmit}>
                      <div className="col-sm-6 col-12 mb-4">
                        <div className='drive-i-container position-relative'>
                          <label htmlFor="full_name" className="form-label mb-2">Full Name</label>
                          <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            className="form-control"
                            placeholder="Full name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.full_name}
                          />
                          {formik.touched.full_name && formik.errors.full_name ? (
                            <div style={{ fontSize: "13px" }} className='error-message'>{formik.errors.full_name}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-6 col-12 mb-4">
                        <div className="drive-i-container position-relative">
                          <label htmlFor="full_name" className="form-label mb-2">Email</label>
                          <input
                            disabled
                            type="text"
                            className="form-control"
                            value={userData?.email}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-12 mb-4">
                        <div className="date-i-container position-relative d-flex flex-column">
                          <label htmlFor="dob" className="form-label mb-2">Date of Birth</label>
                          <ReactDatePicker
                            className='w-100'
                            placeholderText="MM/DD/YYYY"
                            selected={formik?.values?.dob}
                            onChange={(date) => {
                              formik.setFieldValue(
                                "dob",
                                date instanceof Date ? moment(date).format("YYYY-MM-DD") : null
                              );
                            }}
                          // startDate={new Date()}
                          // minDate={new Date()}
                          />
                          {formik.touched.dob && formik.errors.dob ? (
                            <div className='error-message'>{formik.errors.dob}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-6 col-12 mb-4">
                        <div className="mobile-n-content position-relative">
                          <label htmlFor="FormControlMobile" className="form-label mb-2">Mobile Number</label>
                          <div className="input-group mobile-n-input">
                            <Select
                              placeholder="+1"
                              id="phone_code"
                              name="phone_code"
                              onChange={async (e) => {
                                formik.setFieldValue("phone_code", e);
                              }}
                              options={phoneCodeList}
                              styles={customStyles}
                              value={formik?.values?.phone_code}
                            />
                            <input
                              type="tel"
                              className="form-control"
                              id="FormControlMobile"
                              name="mobile_no"
                              placeholder="Mobile number"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.mobile_no}
                            />
                          </div>
                          {formik.touched.mobile_no && formik.errors.mobile_no ? (
                            <div className='error-message'>{formik.errors.mobile_no}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-6 col-12 mb-4">
                        <div className="drive-i-container position-relative">
                          <label htmlFor="nationality" className="form-label mb-2">Nationality</label>
                          <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            className="form-control"
                            placeholder="Nationality"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.nationality}
                          />
                          {formik.touched.nationality && formik.errors.nationality ? (
                            <div className='error-message'>{formik.errors.nationality}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-6 col-12 mb-4">
                        <div className="state-i-container position-relative">
                          <label htmlFor="state" className="form-label mb-2">State</label>
                          <Select
                            placeholder="Select state"
                            styles={customStyles}
                            id="state"
                            name="state"
                            onChange={async (e) => {
                              formik.setFieldValue("state", e);
                              const state_id = e.id;
                              const cities = await fetchCities({ state_id, access_token });
                              setCitiesList(cities);
                            }}
                            options={statesOption}
                            value={formik?.values?.state}
                          />
                          {formik.touched.state && formik.errors.state ? (
                            <div className='error-message'>{formik.errors.state}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-6 col-12 mb-4">
                        <div className="city-i-container position-relative">
                          <label htmlFor="city" className="form-label mb-2">City</label>
                          <Select
                            placeholder="Select city"
                            styles={customStyles}
                            id="city"
                            name="city"
                            onChange={async (e) => {
                              formik.setFieldValue("city", e);
                            }}
                            options={citiesOptions}
                            value={formik?.values?.city}
                          />
                          {formik.touched.city && formik.errors.city ? (
                            <div className='error-message'>{formik.errors.city}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-6 col-12 mb-4">
                        <div className="n-i-container position-relative">
                          <label htmlFor="postal_code" className="form-label mb-2">Zip Code</label>
                          <input
                            type="text"
                            id="postal_code"
                            name="postal_code"
                            className="form-control"
                            placeholder="Zip code"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.postal_code}
                          />
                          {formik.touched.postal_code && formik.errors.postal_code ? (
                            <div className='error-message'>{formik.errors.postal_code}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-6 col-12">
                        <button
                          disabled={loading}
                          style={{
                            opacity: loading ? .5 : 1,
                            cursor: loading ? "progress" : ""
                          }}
                          className='btn btn-default w-100'
                          type="submit"
                        >
                          Update
                          {loading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
