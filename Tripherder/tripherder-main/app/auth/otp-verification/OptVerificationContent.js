"use client";

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from "react-otp-input";
import { resendOTP, verifyOTP } from '../../store/slices/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaArrowLeft } from "react-icons/fa6";
import Link from 'next/link';

export default function OtpVerificationPage() {

  const router = useRouter();

  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const { name } = useSelector((state) => state?.authData);

  const [resendOtpLoading, setResendOtpLoading] = useState(false);

  const handleResendOtp = async () => {
    setResendOtpLoading(true);
    const res = await dispatch(resendOTP({ email: name?.email }));
    if (res?.payload?.status === 200) {
      setResendOtpLoading(false);
      toast.success(res?.payload?.data?.message);
    } else {
      setResendOtpLoading(false);
    }
  };

  const otpSubmitOnClick = async () => {
    setLoading(true);
    const data = {
      email: name?.email,
      otp: otp,
    };
    const res = await dispatch(verifyOTP(data));
    if (res?.payload?.status === 400) {
      setLoading(false);
      setResendOtpLoading(false);
      toast.error(res?.payload?.data?.message);
    } else if (res?.payload?.status === 200) {
      // setLoading(false);
      if (name?.for === "password-change") {
        const data = res?.payload?.data;
        await signIn("credentials", {
          ...data,
          redirect: false,
        });
        router.push("/auth/update-password");
        router.refresh();
      } else {
        const data = res?.payload?.data;
        await signIn("credentials", {
          ...data,
          redirect: false,
        });
        router.replace("/select-favorite-artist");
        router.refresh();
        toast.success(res?.payload?.data?.message);
        // setLoading(false);
        setResendOtpLoading(false);
      }
    }
  };

  return (
    <div className='sign-in-wrapper-container position-relative justify-content-center'>
      <div className="sign-in-background-img position-absolute top-0 start-0" style={{ backgroundImage: 'url("/images/log In.png")' }}></div>
      <div className="back-content d-flex">
        <Link href="/" className="d-flex align-items-center justify-content-center gap-3">
          {" "}
          <FaArrowLeft /> Back{" "}
        </Link>
      </div>
      <div className="container position-relative z-3">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="sign-in-otp-section-container d-flex flex-column align-items-center justify-content-center text-center">
              <header className="sign-up-otp-header">
                <h3>Check your email</h3>
                <p>Code sent to {name?.email}</p>
              </header>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                id="otpForm"
              >
                <div className="otp-inputs">
                  <OtpInput
                    inputType="number"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props, index) => {
                      return (
                        <input
                          autoFocus={index === 0 ? true : false}
                          type="number"
                          className="form-control otp-input"
                          {...props}
                          placeholder="0"
                          onFocus={(e) => {
                            e.target.style.border = "solid 1px var(--black)"; // Example border color on focus
                            e.target.style.opacity = 1; // Example opacity on focus
                          }}
                          onBlur={(e) => {
                            e.target.style.border = "solid 1px #C9C9C9"; // Example border color on blur
                          }}
                        />
                      )
                    }}
                    containerStyle={{ display: "flex", gap: 6 }}
                    inputStyle={{
                      width: "64px",
                      height: "61px",
                      borderRadius: "15px",
                      textAlign: "center",
                      fontSize: "15px",
                      fontWeight: "400",
                      padding: "6px 11px",
                      border: "solid 1px #C9C9C9",
                    }}
                  />
                </div>
                <button
                  onClick={otpSubmitOnClick}
                  disabled={loading || otp.length < 6}
                  className='btn btn-default' type="submit">SUBMIT
                  {loading && (
                    <div
                      className="spinner-border spinner-border-sm ms-2"
                      role="status"
                    />
                  )}
                </button>
                <span className="resend-content">
                  Didn’t receive Code?<button disabled={resendOtpLoading} className='border-0 bg-transparent ms-1' onClick={handleResendOtp}>Resend
                    {resendOtpLoading && (
                      <div
                        className="spinner-border spinner-border-sm ms-2"
                        role="status"
                      />
                    )}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
