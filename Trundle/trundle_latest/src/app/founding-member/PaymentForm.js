"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './PaymentForm.css';
import SelectField from '../components/select-field/SelectField';
import { convertToTitleCase } from '../lib/formatHeading';
import toast from 'react-hot-toast';
import Config from '../store/api';
import { useRouter } from 'next/navigation';

const PaymentForm = ({ suggestedAmount }) => {

  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [amount, setAmount] = useState(0);
  const [states, setStates] = useState([]);

  function convertToTitleCaseTwo(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(Config.GET_ALL_COUNTRIES_API);
        const { data } = response.data;
        const countriesArray = Array.isArray(data) ? data : data;
        if (Array.isArray(countriesArray)) {
          const coverCountriesListOptions = countriesArray?.map((data, _) => ({
            value: convertToTitleCase(data?.name),
            label: convertToTitleCaseTwo(data?.name),
            id: data?.id,
          }));
          setCountries(coverCountriesListOptions);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const suggestedValue = parseFloat(suggestedAmount) || 0;
    setAmount(suggestedValue);
  }, [suggestedAmount]);

  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(`${Config.BASE_API_URL}/account/states/${countryId}/`);
      const { data } = response.data;
      const statesListOptions = data?.map((data, _) => ({
        value: convertToTitleCase(data?.name),
        label: convertToTitleCaseTwo(data?.name),
        id: data?.id,
      }));
      setStates(statesListOptions);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      name: '',
      country: '',
      state: '',
      city: '',
      zip: '',
      addressLine1: '',
      discountCode: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      name: Yup.string()
        .required('Full name is required')
        .matches(/^[A-Za-z\s]+$/, 'Full name should contain letters only'),
      country: Yup.object().required('Country is required'),
      state: Yup.object().required("State is required"),
      city: Yup.string().required('City is required')
        .matches(/^[A-Za-z\s]+$/, 'City should contain letters only'),
      zip: Yup.string()
        .required('ZIP code is required')
        .max(10, 'ZIP code must be at most 10 characters'),
      addressLine1: Yup.string().required('Address line 1 is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          amount: amount,
          email: values.email
        };

        const response = await axios.post(Config.TAI_PAY_API, payload);
        const { order_id } = response.data;

        if (response.status === 200) {
          if (window.Razorpay) {
            const options = {
              key: Config.RAZOR_PAY_PUBLICK_KEY,
              amount: payload.amount,
              currency: Config?.CURRENCY,
              name: "trundle.me",
              // description: "Test Transaction",
              order_id,
              handler: async function (response) {
                try {
                  const confirmationPayload = {
                    email: values.email,
                    card_holder: values.name,
                    phone_number: values.phone,
                    postcode: values.zip,
                    country: values.country?.value,
                    city: values.city,
                    state: values.state?.value,
                    address_line1: values.addressLine1,
                    address_line2: values.addressLine2,
                    order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  };
                  const confirmationResponse = await axios.post(
                    Config.PAYEMENT_CONFIRMATION_API,
                    confirmationPayload
                  );
                  if (confirmationResponse.status === 200) {
                    toast.success(confirmationResponse?.data?.message);
                    router.replace("/payement-success");
                    resetForm();
                  } else {
                    alert(`Payment confirmation failed: ${confirmationResponse.data.error || 'Unknown error'}`);
                    console.error('Payment confirmation failed:', confirmationResponse.data);
                  }
                } catch (error) {
                  console.error('Error during payment confirmation:', error);
                  alert('Payment confirmation failed. Please try again.');
                }
              },
              notes: {
                email: values.email,
                card_holder: values.name,
                phone_number: values.phone,
                postcode: values.zip,
                country: values.country?.value,
                city: values.city,
                state: values.state?.value,
                address_line1: values.addressLine1,
                address_line2: values.addressLine2,
              },
              theme: {
                color: "#421699",
              },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
          } else {
            console.error('Razorpay script not loaded.');
          }
        } else {
          alert(`Payment initiation failed: ${response.data.error || 'Unknown error'}`);
          console.error('Payment initiation failed:', response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.error('Server error:', error.response.data);
          alert(`Server error: ${error.response.data.error}`);
        } else {
          console.error('Error during payment submission:', error);
          alert('Payment failed. Please try again.');
        }
      }
    },
  });

  const handleCountryChange = async (data) => {
    formik.setFieldValue('country', data);
    await fetchStates(data?.id);
  };

  return (
    <div className="payment-form p-4">
      <p className='fw-bold fs-5 mb-4'>Billing Address</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label className='form-label'>Email address*</label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger m-2" style={{ fontSize: "13px" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='form-label'>Phone number*</label>
          <input
            type="number"
            name="phone"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-danger m-2" style={{ fontSize: "13px" }}>{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='form-label'>Full name*</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name='name'
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger m-2" style={{ fontSize: "13px" }}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='form-label'>Address line 1*</label>
          <input
            type="text"
            className="form-control"
            id="addressLine1"
            name='addressLine1'
            {...formik.getFieldProps('addressLine1')}
          />
          {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
            <div className="text-danger m-2" style={{ fontSize: "13px" }}>{formik.errors.addressLine1}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='form-label'>Address line 2 (Optional)</label>
          <input
            type="text"
            className="form-control"
            id="addressLine2"
            name="addressLine2"
            {...formik.getFieldProps('addressLine2')}
          />
        </div>
        <div className="form-group">
          <SelectField
            isSearchable
            className="form-select-container multi-select"
            classNamePrefix="form-select"
            label="Country"
            name="country"
            options={countries}
            value={formik.values.country}
            onChange={(_, data) => {
              handleCountryChange(data)
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.country &&
              formik.errors.country
            }
            placeholder="Select"
          />
        </div>
        <div className="form-group">
          <SelectField
            isSearchable
            className="form-select-container multi-select"
            classNamePrefix="form-select"
            label="State"
            name="state"
            options={states}
            value={formik.values.state}
            onChange={(_, data) => {
              formik.setFieldValue('state', data)
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.state &&
              formik.errors.state
            }
            placeholder="Select"
          />
        </div>
        <div className="form-group">
          <label className='form-label'>City*</label>
          <input
            type="text"
            name="city"
            id="city"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-danger m-2" style={{ fontSize: "13px" }}>{formik.errors.city}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='form-label'>ZIP code*</label>
          <input
            type="number"
            name="zip"
            id="zip"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zip}
          />
          {formik.touched.zip && formik.errors.zip ? (
            <div className="text-danger m-2" style={{ fontSize: "13px" }}>{formik.errors.zip}</div>
          ) : null}
        </div>
        <div className="summary">
          <p>Total: ${amount}</p>
        </div>
        <button type="submit" className="btn btn-default w-100   d-flex align-items-center justify-content-center"
          disabled={formik.isSubmitting || amount < 5}>
          {formik.isSubmitting ? 'Processing...' : `Pay $${amount}`}
        </button>
        <div className="secure-info">
          <p>Payments are secure and encrypted</p>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
