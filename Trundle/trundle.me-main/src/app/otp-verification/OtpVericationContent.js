"use client";

import { useState } from "react";
import "../form.css";
import InnerHero from "../components/inner-hero/InnerHero";
import MidContainer from "../components/mid-container/MidContainer";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../store/slices/auth";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export const OPTverificationPage = () => {
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [resendOtpLoading, setResendOtpLoading] = useState(false);

  const { email } = useSelector((state) => state?.authData);

  const dispatch = useDispatch();

  const handleVerifyOtp = async () => {
    setLoading(true);
    const data = { email: email, otp: otp };
    const res = await dispatch(verifyOtp(data));
    if (res?.payload?.status === 200) {
      const data = res?.payload?.data;
      await signIn("credentials", {
        ...data,
        redirect: false,
      });
      toast.success(res?.payload?.data?.message);
      const role = parseInt(res?.payload?.data?.user_role);
      if (role === 1) {
        router.push("/influencer/my-profile");
        router.refresh();
      } else {
        const isLoginThroughItinerary = localStorage?.getItem("login_through_itinerary");
        if (isLoginThroughItinerary) {
          router.push(`/itineraries/${isLoginThroughItinerary}`);
          router.refresh();
        } else {
          localStorage?.removeItem("login_through_itinerary");
          router.push("/");
          router.refresh();
        }
      }
    } else if (res?.payload?.status === 400) {
      localStorage?.removeItem("login_through_itinerary");
      toast.error(res?.payload?.data?.message);
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendOtpLoading(true);
    const res = await dispatch(resendOtp({ email: email }));
    if (res?.payload?.status === 200) {
      setResendOtpLoading(false);
      toast.success(res?.payload?.data?.message);
    } else {
      setResendOtpLoading(false);
    }
  };
  return (
    <>
      <InnerHero heading={"OTP Verification"} subHeading={email} />
      <MidContainer>
        <div className="otp-form-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="otp-group form-group mb-4 d-flex justify-content-center gap-2">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props) => (
                    <input
                      type="number"
                      className="form-control otp-input"
                      {...props}
                      placeholder="0"
                      onFocus={(e) => {
                        e.target.style.border = "solid 1px #8a55ff"; // Example border color on focus
                        e.target.style.opacity = 1; // Example opacity on focus
                      }}
                      onBlur={(e) => {
                        e.target.style.border = "solid 1px #f0e9ff"; // Example border color on blur
                      }}
                    />
                  )}
                  containerStyle={{ display: "flex", gap: 2 }}
                  inputStyle={{
                    width: "52px",
                    height: "69px",
                    borderRadius: "15px",
                    textAlign: "center",
                    fontSize: "15px",
                    fontWeight: "400",
                    padding: "6px 11px",
                    border: "solid 1px #f0e9ff",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group mb-4 text-center">
                <a
                  onClick={handleResendOtp}
                  className="link cursor-pointer text-decoration-none"
                >
                  Resend code
                </a>
                {resendOtpLoading && (
                  <div
                    className="spinner-border spinner-border-sm mx-3"
                    role="status"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <button
                  onClick={handleVerifyOtp}
                  type="submit"
                  className="btn btn-default btn-block"
                  disabled={loading || otp.length < 6}
                >
                  Submit
                  {loading && (
                    <div
                      className="spinner-border spinner-border-sm mx-3"
                      role="status"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </MidContainer>
    </>
  )
}



