"use client";

import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from "react-select";
import StripePaymentGateWay from './StripePaymentGateWay';
import { getIntentIDandSecret } from '../../lib/payment';

export default function CheckoutForm({
  states,
  phoneCodes,
  planId,
  access_token,
  userDetails,
  planDetails
}) {

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

  const [loading, setLoading] = useState(false);

  const [clientSecret, setClientSercret] = useState("")

  const formik = useFormik({
    initialValues: {
      phone_code: {
        "value": 38,
        "label": "+1",
        "id": +1
      },
      name: userDetails?.full_name || '',
      phone: userDetails?.mobile_no || '',
      address_line1: '',
      address_line2: '',
      state: '',
      city: '',
      postal_code: '',
      product_id: planId,
    },
    validationSchema: Yup.object({
      phone_code: Yup.object().required('Required'),
      name: Yup.string().required('Required'),
      phone: Yup.string().matches(/^[0-9]+$/, 'Mobile number must be digits only').required('Mobile number is required'),
      address_line1: Yup.string().required('Required'),
      // address_line2: Yup.string().required('Required'),
      state: Yup.object().required('Required'),
      city: Yup.string().required('Required'),
      postal_code: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const data = {
        phone_code: values?.phone_code?.label,
        name: values?.name,
        phone: values?.phone,
        address_line1: values?.address_line1,
        address_line2: values?.address_line2,
        state: values?.state?.label,
        city: values?.city,
        postal_code: values?.postal_code,
        product_id: planId,
      }
      setLoading(true);
      const res = await getIntentIDandSecret({ access_token, data });
      setClientSercret(res?.data?.client_secret);
      setLoading(false);
    },
  });

  return (
    <div className="content-container billing-address-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="billing-address">
              <div className='row d-flex align-content-center justify-content-center'>
                <header className="billing-header-text mb-0">
                  <h1>Billing Address</h1>
                </header>
                <div className="row d-flex align-content-center justify-content-center">
                  <div className="col-md-12">
                    <div className="payment-content">
                      <p className="mb-2">You have to pay</p>
                      <span>
                        ${planDetails?.price}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="name-input">
                      <label className="form-label" htmlFor="name">
                        Full Name<span>*</span>
                      </label>
                      <input
                        className='form-control'
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div style={{ fontSize: "13px" }} className='text-danger ps-1 pt-1'>{formik.errors.name}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="name-input mt-0">
                      <label className="form-label" htmlFor="address_line1">
                        Address line1<span>*</span>{" "}
                      </label>
                      <input
                        className='form-control'
                        id="address_line1"
                        name="address_line1"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address_line1}
                      />
                      {formik.touched.address_line1 && formik.errors.address_line1 ? (
                        <div style={{ fontSize: "13px" }} className='text-danger ps-1 pt-1'>{formik.errors.address_line1}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="name-input">
                      <label className="form-label" htmlFor="Address-line2">Address line2</label>
                      <input
                        className='form-control'
                        id="address_line2"
                        name="address_line2"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address_line2}
                      />
                      {formik.touched.address_line2 && formik.errors.address_line2 ? (
                        <div style={{ fontSize: "13px" }} className='text-danger ps-1 pt-1'>{formik.errors.address_line2}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="state-checkout-input-content">
                      <label htmlFor="state" className="form-label">
                        State<span>*</span>
                      </label>
                      <Select
                        placeholder="Select state"
                        styles={customStyles}
                        id="state"
                        name="state"
                        onChange={async (e) => {
                          formik.setFieldValue("state", e);
                        }}
                        options={statesOption}
                      />
                      {formik.touched.state && formik.errors.state ? (
                        <div style={{ fontSize: "13px" }} className='text-danger ps-1 pt-1'>{formik.errors.state}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="name-input">
                      <label htmlFor="inputCity" className="form-label">
                        City<span>*</span>
                      </label>
                      <input
                        id="city"
                        className='form-control'
                        name="city"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                      />
                      {formik.touched.city && formik.errors.city ? (
                        <div style={{ fontSize: "13px" }} className='text-danger ps-1 pt-1'>{formik.errors.city}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="postal-input">
                      <label htmlFor="postal" className="form-label">
                        Zip Code<span>*</span>
                      </label>
                      <input
                        id="postal_code"
                        className='form-control'
                        name="postal_code"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.postal_code}
                      />
                      {formik.touched.postal_code && formik.errors.postal_code ? (
                        <div style={{ fontSize: "13px" }} className='text-danger ps-1 pt-1'>{formik.errors.postal_code}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="mobile-n-content position-relative">
                      <label htmlFor="FormControlMobile" className="form-label fw-normal">Mobile Number<span>*</span></label>
                      <div className="input-group mobile-n-input position-relative">
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
                        {formik.touched.phone_code && formik.errors.phone_code ? (
                          <div style={{ fontSize: "13px" }} className='error-message'>{formik.errors.phone_code}</div>
                        ) : null}
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                          <div style={{ fontSize: "13px" }} className='error-message'>{formik.errors.phone}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mt-5 mt-sm-4">
                    <button
                      onClick={formik.handleSubmit}
                      // disabled={loading}
                      className="btn btn-default"
                      type="button"
                    >
                      Continue to pay {loading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
                    </button>
                  </div>
                  {clientSecret &&
                    <div className="col-12 my-4">
                      <StripePaymentGateWay
                        clientSecret={clientSecret}
                        access_token={access_token}
                        userDetails={userDetails}
                        price={planDetails?.price}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
