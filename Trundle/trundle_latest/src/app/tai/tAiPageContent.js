"use client";

import axios from "axios";
import Image from "next/image";
import "./style.css";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const TAiPageContent = () => {
  const API_KEY = "https://api.trundle.me/account/early-access";

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(API_KEY, { email: values?.email });
        toast.success(response?.data?.message);
      } catch (error) {
        toast.error(`There was an error. Please try again.`);
        console.error("Error submitting email:", error);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
  });

  return (
    <div className="page-container">
      <div className="left-half">
        <div className="LandingPage">
          <h5>Introducing</h5>
          <Image
            width={1000}
            height={1000}
            src={`/images/tai-logo-new.svg`}
            alt="logoAI"
            className="logo"
          />
          <h3>A Smart Travel Companion AI</h3>
          <span>a product by Trundle</span>
          <form onSubmit={formik.handleSubmit} className="input-container">
            <input
              type="text"
              placeholder="Email here"
              className={`input-email text-dark ${formik.touched.email && formik.errors.email ? "is-invalid" : ""
                }`}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="submit"
              className="btn-landing"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Get early access"}
            </button>
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message mt-2 text-danger text-center">
                {formik.errors.email}
              </div>
            ) : null}
          </form>
          <p className="mt-3 mb-0">
            or become a <Link className="text-decoration-underline" href={"/founding-member"}>Founding Member</Link>
          </p>
          <div className="footer">
            <p className="line1">
              Trundle.me is a part of Trundle Technology LTD.
            </p>
          </div>
        </div>
      </div>
      <div className="right-half">
        <div>
          <video
            src="/images/tai-video.mov"
            className="iphone"
            autoPlay
            muted
          />
          <Image
            width={50}
            height={50}
            src="/images/arrow.svg"
            alt="arrow"
            className="arrow-image"
          />
          <p className="line2">
            &copy; {new Date().getFullYear()} Trundle.me. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TAiPageContent;