"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import React, { useState } from 'react'
import { getOtp } from '../../lib/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../store/slices/auth';
import { FaArrowLeft } from "react-icons/fa6";

export default function UpdatePasswordPage() {

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (email) => {
      setLoading(true);
      try {
        const res = await getOtp({ email });
        toast.success(res?.message);
        await dispatch(setEmail({ email: email?.email, for: "password-change" }));
        router.push("/auth/otp-verification");
        setLoading(false);
      } catch (error) {
        toast.error(error?.data?.message);
        setLoading(false);
      }
    },
  });

  return (
    <div className='sign-in-wrapper-container position-relative'>
      <div className="sign-in-background-img position-absolute top-0 start-0" style={{ backgroundImage: 'url("/images/log In.png")' }}></div>
      <div className="back-content d-flex">
          <Link href="/" className="d-flex align-items-center justify-content-center gap-3">
            {" "}
            <FaArrowLeft /> Back{" "}
          </Link>
        </div>
      <div className="container position-relative z-3">
        <div className="row">
          <div className="col-lg-11 mx-auto">
            <div className="row g-0 forget-p-header">
              <div className="col-md-6 col-12">
                <div className="sign-in-container d-flex align-items-center justify-content-center h-100">
                  <div className="sign-in-content d-flex align-items-center justify-content-center flex-column text-center">
                    <header>
                      <h1>Don’t worry we’ll help you.</h1>
                    </header>
                    <p>Reset your password here.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="sign-in-container-1 d-flex align-items-center justify-content-center flex-column h-100">
                  <header className="sign-in-text">
                    <h3>Forgot Password</h3>
                  </header>
                  <form
                    className="sign-in-form d-flex align-items-center justify-content-center flex-column"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="email-input">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`${formik.touched.email && formik.errors.email && 'border-danger'}`}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="error-message">{formik.errors.email}</div>
                      ) : null}
                    </div>
                    <Link className="back-sign-in" href="/auth/signin">
                      Back to Sign in
                    </Link>
                    <button
                      disabled={loading}
                      className="btn btn-default"
                      type="submit">
                      SUBMIT
                      {loading &&
                        <div
                          className="spinner-border spinner-border-sm ms-2"
                          role="status"
                        />
                      }
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
