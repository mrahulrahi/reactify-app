'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn } from "next-auth/react";
import { loginUser } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { resendOTP, setEmail } from '../../store/slices/auth';
import { useDispatch } from 'react-redux';
import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";


export default function SigninPageContent() {

  const dispatch = useDispatch();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [passwordType, setPasswordType] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordType(!passwordType);
  };

  useEffect(() => {
    router.replace("/auth/signin");
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required("Required")
        .min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await loginUser(values);

        if (res?.status === true) {
          await dispatch(setEmail({ email: values?.email, for: null }));
          await signIn("credentials", {
            ...res,
            redirect: false,
          });
          if (res?.data?.artists_preference) {
            if (res?.data?.activities_preference) {
              router.push("/");
              router.refresh();
              // setLoading(false);
            } else {
              router.push("/select-favorite-activities");
              router.refresh();
              // setLoading(false);
            }
          } else {
            router.push("/select-favorite-artist");
            router.refresh();
            // setLoading(false);
          }
          toast.success(res?.message);
        }
      } catch (error) {
        toast.error(error?.data?.message);
        setLoading(false);
        if (error?.data?.access === false) {
          await dispatch(setEmail({ email: values?.email, for: null }));
          const otpRes = await dispatch(resendOTP({ email: values?.email }));
          if (otpRes?.payload?.status === 200) {
            toast.success(otpRes?.payload?.data?.message);
            router.push("/auth/otp-verification");
            setLoading(false);
          }
        }
      }
    }
  });

  const errorStyle = {
    fontSize: "12px",
    position: "none",
    color: "red",
  }

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
            <div className="row g-0">
              <div className="col-md-6 col-12">
                <div className="sign-in-container-1 d-flex align-items-center justify-content-center flex-column h-100">
                  <header className="sign-in-text">
                    <h3>Sign In</h3>
                  </header>
                  <div className="social-media-icon-header d-flex">
                    <button
                      onClick={
                        async () => {
                          await signIn('spotify')
                        }
                      } className='smi-content d-flex align-items-center justify-content-center bg-light'
                    >
                      <img
                        src="../images/spotify.svg"
                        alt="google"
                      />
                    </button>
                    <button onClick={
                      async () => {
                        await signIn('facebook')
                      }}
                      className='smi-content d-flex align-items-center justify-content-center bg-light'
                    >
                      <img src="../images/facebook.svg" alt="google" />
                    </button>
                    <button
                      onClick={
                        async () => {
                          await signIn('google')
                        }
                      } className='smi-content d-flex align-items-center justify-content-center bg-light'>
                      <img src="../images/google.svg" alt="google" />
                    </button>
                  </div>
                  <p className="or-text">Or use your account</p>
                  <div className="sign-in-form d-flex align-items-center justify-content-center flex-column">
                    <div className="email-input">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className='m-1 mb-0' style={errorStyle}>{formik.errors.email}</div>
                      ) : null}
                    </div>
                    <div className="password-input position-relative">
                      <input
                        type={!passwordType ? 'password' : 'text'}
                        name="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        id="id_password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {passwordType ? (
                        <FaRegEye
                          className='position-absolute'
                          onClick={togglePasswordVisibility}
                          style={{ top: "17px", right: "15px", cursor: 'pointer' }}
                        />
                      ) : (
                        <IoEyeOff
                          className='position-absolute'
                          onClick={togglePasswordVisibility}
                          style={{ top: "17px", right: "15px", cursor: 'pointer' }}
                        />
                      )}
                      {formik.touched.password && formik.errors.password ? (
                        <div className='m-1 mb-0' style={errorStyle}>{formik.errors.password}</div>
                      ) : null}

                    </div>

                    <p className='mb-0 mt-3 d-none' style={{ fontSize: "14px" }}>Don't have an account? <Link className='text-decoration-none' href={"/auth/signup"}>Sign up</Link></p>
                    <Link style={{ fontSize: "14px" }} className="forget-password-link mt-3" href="/auth/forgot-password">Forgot your password?</Link>
                    <button
                      disabled={loading}
                      type="button"
                      onClick={formik.handleSubmit}
                      className='btn btn-default'
                    >
                      SIGN IN {loading &&
                        <div
                          className="spinner-border spinner-border-sm ms-2"
                          role="status"
                        />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="sign-in-container d-flex align-items-center justify-content-center h-100">
                  <div className="sign-in-content d-flex align-items-center justify-content-center flex-column text-center">
                    <header>
                      <h1>Hello, Friend!</h1>
                    </header>
                    <p>
                      Enter your personal details and start your journey with Tripherder.
                    </p>
                    <Link href={"/auth/signup"} className='text-decoration-none'>
                      <button type="button" className="btn btn-outline">
                        SIGN UP
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
