/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import "../../form.css";
import InnerHero from "../../components/inner-hero/InnerHero";
import MidContainer from "../../components/mid-container/MidContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import FormField from "../../components/form-field/FormField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { resendOtp, setEmail } from "../../store/slices/auth";
import { useDispatch } from "react-redux";

const SignInPage = () => {

  const router = useRouter();

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const validationSchemaSignin = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required"),
  });

  const initialValuesSignin = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValuesSignin,
    validationSchema: validationSchemaSignin,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await dispatch(resendOtp({ email: values?.email }));
      if (res?.payload?.status === 200) {
        await dispatch(setEmail({ email: values?.email }));
        router.push("/otp-verification");
        toast.success(res?.payload?.data?.message);
      } else if (res?.payload?.status === 404) {
        toast.error(res?.payload?.data?.message);
        setLoading(false);
      } else {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <InnerHero />
      <MidContainer size="sm">
        <div className="signin-form-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="signin-form-head mb-4">
                <h3>Sign in</h3>
                <p>
                  Please enter your email address to proceed further
                </p>
              </div>
            </div>
          </div>
          <FormField
            label="Email"
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="johndoe@example.com"
            touched={formik.touched.email}
            error={formik.errors.email}
          />
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group mb-4">
                <button
                  disabled={loading}
                  type="button"
                  value="Log In"
                  className="btn btn-default btn-block"
                  onClick={formik.handleSubmit}
                >
                  Send code
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm ms-3"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
              <div className="link-2 text-decoration-none d-flex gap-2 justify-content-center"
                style={{
                  color: `rgb(0 0 0 / 40%)`
                }}>
                Don't have an account?
                <span>
                  <Link
                    style={{ color: "#6f27ff" }}
                    href="/auth/signup"
                    className="link-2 w-100 text-center"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
              <div className="link-2 text-decoration-none d-flex gap-2 mt-2 justify-content-center"
                style={{
                  color: `rgb(0 0 0 / 40%)`
                }}>
                Are you an influencer?
                <span>
                  <Link
                    style={{ color: "#6f27ff" }}
                    href="/onboard"
                    className="link-2 w-100 text-center"
                  >
                    Create your profile
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </MidContainer>
    </>
  );
};

export default SignInPage;

