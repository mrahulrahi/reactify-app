"use client";

import React, { useState } from 'react'
import UserAccountSettingsCard from '../components/user-account-settings/UserAccountSettingsCard'
import { useFormik } from 'formik';
import { FaRegEye } from 'react-icons/fa';
import * as Yup from 'yup';
import { IoEyeOff } from 'react-icons/io5';
import { updatePassword } from '../lib/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UpdatePasswordContent({ access_token, profilePic }) {

  const router = useRouter();

  const [currentPasswordType, setCurrentPasswordType] = useState(false);

  const [newPasswordType, setNewPasswordType] = useState(false);

  const [confirmPasswordType, setConfirmPasswordType] = useState(false);

  const [loading, setLoading] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordType(!currentPasswordType);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordType(!newPasswordType);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };

  const validationSchema = Yup.object().shape({
    current_password: Yup.string()
      .required('Current Password is required'),
    new_password: Yup.string()
      .required('New Password is required')
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
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (passwords) => {
      setLoading(true);
      try {
        const res = await updatePassword({ access_token, passwords });
        toast.success(res?.message);
        router.push("/");
        router.refresh();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.data?.message)
      }
    },
  });

  return (
    <>
      <div className="page-top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pth-content-box d-flex flex-column align-items-center justify-content-between">
                <h3>Update Password</h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><Link href="/my-profile">Profile</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Update Password</li>
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
                <UserAccountSettingsCard
                  access_token={access_token}
                  profilePic={profilePic}
                />

                <div className="profile-body-wrapper">
                  <div className="profile-edit-content">
                    <header className="general-detail-text border-0 pb-0">
                      <h2 className="mb-0">Create a new password</h2>
                    </header>
                    <form className="sign-in-form d-flex align-items-center justify-content-start flex-column mt-0">
                      <div className="password-input mw-100">
                        <label className="fw-medium mb-2">Current Password</label>
                        <input
                          className='w-100'
                          type={currentPasswordType ? 'text' : 'password'}
                          name="current_password"
                          autoComplete="current-password"
                          placeholder="Current Password"
                          required
                          id="current_password"
                          value={formik.values.current_password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {currentPasswordType ? (
                          <FaRegEye
                            onClick={toggleCurrentPasswordVisibility}
                            style={{ marginLeft: '-30px', cursor: 'pointer' }}
                          />
                        ) : (
                          <IoEyeOff
                            onClick={toggleCurrentPasswordVisibility}
                            style={{ marginLeft: '-30px', cursor: 'pointer' }}
                          />
                        )}
                        {formik.touched.current_password && formik.errors.current_password ? (
                          <div className="text-danger ps-2 pt-1" style={{ fontSize: "13px" }}>{formik.errors.current_password}</div>
                        ) : null}
                      </div>
                      <div className="password-input mw-100">
                        <label className="fw-medium mb-2">New Password</label>
                        <input
                          className='w-100'
                          type={newPasswordType ? 'text' : 'password'}
                          name="new_password"
                          autoComplete="new-password"
                          placeholder="New Password"
                          required
                          id="new_password"
                          value={formik.values.new_password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {newPasswordType ? (
                          <FaRegEye
                            onClick={toggleNewPasswordVisibility}
                            style={{ marginLeft: '-30px', cursor: 'pointer' }}
                          />
                        ) : (
                          <IoEyeOff
                            onClick={toggleNewPasswordVisibility}
                            style={{ marginLeft: '-30px', cursor: 'pointer' }}
                          />
                        )}
                        {formik.touched.new_password && formik.errors.new_password ? (
                          <div className="text-danger ps-2 pt-1" style={{ fontSize: "13px" }}>{formik.errors.new_password}</div>
                        ) : null}
                      </div>
                      <div className="password-input mw-100">
                        <label className="fw-medium mb-2">Confirm Password</label>
                        <input
                          className='w-100'
                          type={confirmPasswordType ? 'text' : 'password'}
                          name="confirm_password"
                          autoComplete="confirm-password"
                          placeholder="Confirm Password"
                          required
                          id="confirm_password"
                          value={formik.values.confirm_password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {confirmPasswordType ? (
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
                          <div className="text-danger ps-2 pt-1" style={{ fontSize: "13px" }}>{formik.errors.confirm_password}</div>
                        ) : null}
                        <button disabled={loading} onClick={formik.handleSubmit} className="btn btn-default w-100 rounded-3" type='button'>
                          Submit
                          {loading &&
                            <div
                              className="spinner-border spinner-border-sm ms-2"
                              role="status"
                            />
                          }
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
