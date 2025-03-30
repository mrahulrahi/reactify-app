"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUpUser } from '../../lib/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setEmail } from '../../store/slices/auth';
import { useDispatch } from 'react-redux';
import { signIn } from 'next-auth/react';
import { FaRegEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { FaArrowLeft } from "react-icons/fa6";

export default function SiginUpPageContent() {

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const [passwordType, setPasswordType] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordType(!passwordType);
  };

  const [passwordType2, setPasswordType2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setPasswordType2(!passwordType2);
  };

  const errorStyle = {
    fontSize: "12px",
    position: "none",
    color: "red",
  }

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .required("Required")
        .min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await dispatch(setEmail({ email: values?.email, for: null }));
      try {
        const res = await signUpUser(values);
        setLoading(false);
        toast.success(res?.message);
        router.push("/auth/otp-verification")
      } catch (error) {
        setLoading(false);
        if (error?.data?.errors?.email) {
          toast.error(error?.data?.errors?.email[0])
        } else {
          toast.error(error?.data?.message)
        }
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
            <div className="row g-0">
              <div className="col-md-6 col-12">
                <div className="sign-in-container d-flex align-items-center justify-content-center h-100">
                  <div className="sign-in-content d-flex align-items-center justify-content-center flex-column text-center">
                    <header>
                      <h1>Welcome Back to Tripherder!</h1>
                    </header>
                    <p>
                      To stay connected with us, please login using your personal
                      information.
                    </p>
                    <Link href={"/auth/signin"} className='text-decoration-none'>
                      <button type="button" className="btn btn-outline">
                        SIGN IN
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="sign-in-container-1 d-flex align-items-center justify-content-center flex-column h-100">
                  <header className="sign-in-text">
                    <h3>Create Account</h3>
                  </header>
                  <div className="social-media-icon-header gap-4 d-flex">
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
                  <p className="or-text">or use your email for registration</p>
                  <form className="sign-in-form d-flex align-items-center justify-content-center flex-column" onSubmit={formik.handleSubmit}>
                    <div className="email-input">
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        placeholder="Full Name"
                        value={formik.values.full_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.full_name && formik.errors.full_name ? (
                        <div className='m-1 mb-0' style={errorStyle}>{formik.errors.full_name}</div>
                      ) : null}
                    </div>
                    <div className="email-input mt-2" style={{ marginTop: 20 }}>
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
                    <div className="password-input mt-2">
                      <input
                        type={!passwordType ? 'password' : 'text'}
                        name="password"
                        id="password1"
                        placeholder="Password"
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
                    <div className="password-input mt-2">
                      <input
                        type={!passwordType2 ? 'password' : 'text'}
                        name="confirm_password"
                        id="password2"
                        placeholder="Confirm Password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {passwordType2 ? (
                        <FaRegEye
                          className='position-absolute'
                          onClick={togglePasswordVisibility2}
                          style={{ top: "17px", right: "15px", cursor: 'pointer' }}
                        />
                      ) : (
                        <IoEyeOff
                          className='position-absolute'
                          onClick={togglePasswordVisibility2}
                          style={{ top: "17px", right: "15px", cursor: 'pointer' }}
                        />
                      )}
                      {formik.touched.confirm_password && formik.errors.confirm_password ? (
                        <div style={errorStyle} className='m-1 mb-0'>{formik.errors.confirm_password}</div>
                      ) : null}

                    </div>
                    <button
                      className='btn btn-default'
                      type="submit" disabled={loading}>
                      SIGN UP
                      {loading &&
                        <div className="ms-2 spinner-border spinner-border-sm" role="status" />
                      }
                    </button>
                    <p className='mb-0 mt-3 d-none' style={{ fontSize: "14px" }}>Already have an account? <Link className='text-decoration-none' href={"/auth/signin"}>Sign in</Link></p>
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
