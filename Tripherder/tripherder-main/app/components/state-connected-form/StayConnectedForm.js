"use client"; // Only if you are using Next.js or similar frameworks

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sendStayConnectedMail } from '../../lib/auth';
import toast from 'react-hot-toast';

const StayConnectedForm = () => {

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const res = await sendStayConnectedMail(values);
      if (res?.success === true) {
        setLoading(false);
        toast.success(res?.message);
        resetForm();
      } else {
        setLoading(false);
      }
    },
  });

  return (
    <section className="content-container l-section-header">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-md-auto d-flex flex-column align-items-center justify-content-center l-section-container">
            <div className="heading">
              <h3>Get Updates</h3>
            </div>
            <p>
              Please consider signing up for our updates and news. As a startup, we value your feedback. Rest assured, we will not sell or share your information, and we will not inundate you with emails.
            </p>
            <form
              className="l-section-form d-md-flex flex-md-row flex-column align-items-center justify-content-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-100 d-flex flex-column flex-sm-row align-items-center gap-3 position-relative">
                <input
                  className="l-form-input flex-grow-1"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ fontSize: "14px" }} className="error-message">{formik.errors.email}</div>
                ) : null}
                <button
                  disabled={loading}
                  className="btn btn-default rounded-3 text-capitalize"
                  type="submit"
                  style={{ opacity: loading ? .8 : 1 }}
                >
                  Submit
                  {loading &&
                    <div
                      className="spinner-border spinner-border-sm ms-2 text-light"
                      role="status"
                    />
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StayConnectedForm;
