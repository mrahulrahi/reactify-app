"use client";

import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa6";
import Link from 'next/link';

export default function UpdatePasswordContent({ access_token }) {

  const [passwordType, setPasswordType] = useState(true);

  const [confirmPasswordType, setConfirmPasswordType] = useState(true);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordType(!passwordType);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };

  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      new_password: '',
      confirm_password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (passwords) => {
      setLoading(true);
      try {
        const res = await forgotPassword({ access_token, passwords });
        toast.success(res?.message);
        router.push("/");
        router.refresh();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Password update error:', error);
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
                      <h1> What’s your new password?</h1>
                    </header>
                    <p>
                      The password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="sign-in-container-1 d-flex align-items-center justify-content-center flex-column h-100">
                  <header className="sign-in-text">
                    <h3>Create a new password</h3>
                  </header>
                  <form
                    className="sign-in-form d-flex align-items-center justify-content-center flex-column"
                  >
                    <div className="password-input" style={{ marginTop: 0 }}>
                      <input
                        type={passwordType ? 'password' : 'text'}
                        name="new_password"
                        autoComplete="new-password" // Use "new-password" for password fields
                        placeholder="Password"
                        required
                        id="password1"
                        value={formik.values.new_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {!passwordType ? (
                        <FaRegEye
                          onClick={togglePasswordVisibility}
                          style={{ marginLeft: '-30px', cursor: 'pointer' }}
                        />
                      ) : (
                        <IoEyeOff
                          onClick={togglePasswordVisibility}
                          style={{ marginLeft: '-30px', cursor: 'pointer' }}
                        />
                      )}
                      {formik.touched.new_password && formik.errors.new_password ? (
                        <div className="error-message">{formik.errors.new_password}</div>
                      ) : null}
                    </div>
                    <div className="password-input">
                      <input
                        type={confirmPasswordType ? 'password' : 'text'}
                        name="confirm_password"
                        autoComplete="new-password" // Use "new-password" for password fields
                        placeholder="Confirm Password"
                        required
                        id="password2"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {!confirmPasswordType ? (
                        <FaRegEye
                          onClick={toggleConfirmPasswordVisibility}
                          style={{ marginLeft: '-30px', cursor: 'pointer' }}
                        />
                      ) : (
                        <IoEyeOff
                          onClick={toggleConfirmPasswordVisibility}
                          style={{ marginLeft: '-30px', cursor: 'pointer' }}
                        />
                      )}
                      {formik.touched.confirm_password && formik.errors.confirm_password ? (
                        <div className="error-message">{formik.errors.confirm_password}</div>
                      ) : null}
                    </div>
                    <button
                      onClick={formik.handleSubmit}
                      type="button"
                      className="btn btn-default"
                      disabled={loading}
                    >
                      Submit
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
