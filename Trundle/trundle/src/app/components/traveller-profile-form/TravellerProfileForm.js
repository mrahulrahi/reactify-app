/* eslint-disable react/no-unescaped-entities */
"use client";

import "../../form.css";
import InnerHero from "../inner-hero/InnerHero";
import MidContainer from "../mid-container/MidContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormField from "../form-field/FormField";
import toast from "react-hot-toast";
import { Suspense, useState } from "react";
import { Loading } from "../loading/Loading";
import { updateTravellerDetails } from "../../lib/traveller/traveller";
import Select from "react-select";
import { setEmail } from "../../store/slices/auth";
import { useDispatch } from "react-redux";
import Config from "../../store/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const validationSchemaSignup = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  mobile_no: Yup.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .required("Phone number is required"),
  phone_code: Yup.object().required("Phone code is required"),
});

const TravellerProfileForm = ({
  travellerDetails,
  access_token,
  countriestOptions,
  formType
}) => {

  const dispatch = useDispatch();

  const router = useRouter();

  const [loading, setLoading] = useState();

  const defaultCountry = countriestOptions?.find((data) => data?.id === travellerDetails?.data?.country_id);

  const formik = useFormik({
    initialValues: {
      first_name: travellerDetails?.data?.first_name || "",
      last_name: travellerDetails?.data?.last_name || "",
      gender: travellerDetails?.data?.gender || "",
      email: travellerDetails?.data?.email || "",
      mobile_no: travellerDetails?.data?.mobile_no || "",
      phone_code: defaultCountry || ""
    },
    validationSchema: validationSchemaSignup,
    onSubmit: async (values) => {

      const travellerDetails = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        gender: values?.gender,
        email: values?.email,
        mobile_no: values?.mobile_no,
        phone_code: parseInt(values?.phone_code?.id)
      }

      if (formType === 'create') {
        setLoading(true);
        dispatch(setEmail({ email: values?.email }));
        const headers = {
          "Content-Type": "application/json",
        };
        try {
          const response = await axios.post(
            Config.TRAVELLER_REGISTER,
            travellerDetails,
            {
              headers,
            }
          );
          setLoading(false);
          if (response?.status === 200) {
            toast.success(response?.data?.message);
            router.push("/otp-verification");
          }
        } catch (error) {
          if (error?.response?.data?.errors?.email) {
            toast.error(error?.response?.data?.errors?.email?.[0]);
            // router.push("/auth/signin");
            setLoading(false);
          }
          setLoading(false);
        }
      } else {
        setLoading(true);
        const res = await updateTravellerDetails({ access_token, travellerDetails });
        if (res?.status === true) {
          setLoading(false);
          toast.success(res?.message);
          router.refresh()
        } else {
          setLoading(false);
        }
      }
    },
  });

  const genderOptions = [
    { id: 1, label: "Male" },
    { id: 2, label: "Female" },
    { id: 3, label: "Other" },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <InnerHero heading={`${formType === 'update' ? 'Update your profile' : ""}`} />
      <MidContainer size="sm">
        <form className="signup-form-container">
          {formType === 'create' &&
            <div className="row">
              <div className="col-lg-12">
                <div className="signin-form-head mb-4">
                  <h3>Sign up</h3>
                </div>
              </div>
            </div>
          }
          <FormField
            label="First name"
            type="text"
            id="first_name"
            name="first_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
            placeholder="John"
            touched={formik.touched.first_name}
            error={formik.errors.first_name}
          />
          <FormField
            label="Last name"
            type="text"
            id="last_name"
            name="last_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
            placeholder="Doe"
            touched={formik.touched.last_name}
            error={formik.errors.last_name}
          />
          <div className="row g-3">
            <div className="col-lg-12">
              <div className="form-group mb-4">
                <label className="form-label">Gender*</label>
                <div
                  className="form-radio-check-group mb-2 d-flex flex-wrap align-items-center"
                  id="gender"
                >
                  {genderOptions.map((option) => (
                    <div
                      key={option.id}
                      className="form-check custom-radio d-flex align-items-center"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id={option.id}
                        onChange={() =>
                          formik.setFieldValue(
                            "gender",
                            option?.id
                          )
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                      />
                      <label
                        className={`form-check-label ${formik.values?.gender === option?.id &&
                          `radio-btn-active`
                          }`}
                        htmlFor={option.id}
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                {formik?.touched.gender && formik.errors?.gender && (
                  <p className="text-danger">
                    {formik.errors?.gender}
                  </p>
                )}
              </div>
            </div>
          </div>
          <FormField
            disabled={formType === 'update'}
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
                <label className="form-label">Phone no*</label>
                <div className="phone-select-group">
                  <Select
                    placeholder="+1"
                    onChange={(e) => formik.setFieldValue("phone_code", e)}
                    options={countriestOptions}
                    defaultValue={formik?.values?.phone_code}
                    className="phone-select-container"
                    classNamePrefix="phone-select"
                  />
                  <input
                    type="number"
                    name="mobile_no"
                    id="mobile_no"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile_no}
                    placeholder="999 999 1010"
                    className="form-control"
                  />
                </div>
                {formik?.touched.mobile_no && formik.errors?.mobile_no && (
                  <p className="text-danger mt-2 mb-0">
                    {formik.errors?.mobile_no}
                  </p>
                )}
                {formik?.touched.phone_code && formik.errors?.phone_code && (
                  <p className="text-danger">
                    {formik.errors?.phone_code}
                  </p>
                )}
              </div>
            </div>
          </div>
          {formType !== "update" &&
            <div className="row">
              <div className="col-lg-12 mb-3">
                <p style={{ fontSize: "13px", color: "#66616c" }}>
                  On submit, you agree to the {" "}
                  <span>
                    <Link style={{ color: "rgb(111, 39, 255)", fontSize: "14px", fontWeight: 600, opacity: 1 }} href={"/tands"}>
                      Terms of Service
                    </Link>
                  </span>
                  {" "}and {" "}
                  <span>
                    <Link style={{ color: "rgb(111, 39, 255)", fontSize: "14px", fontWeight: 600, opacity: 1 }} href={"/privacypolicy"}>
                      Privacy Policy
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          }
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group mb-4">
                <button
                  disabled={loading}
                  onClick={formik.handleSubmit}
                  type="button"
                  className="btn btn-default btn-block"
                >
                  {loading ? `Loading` : formType === 'update' ? `Update` : `Submit`}{" "}
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm ms-2"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>
            {formType === 'create' &&
              <div className="link-2 text-decoration-none d-flex gap-2 justify-content-center"
                style={{
                  color: `rgb(0 0 0 / 40%)`
                }}>
                Already have an account?
                <span>
                  <Link
                    style={{ color: "#6f27ff" }}
                    href="/auth/signin"
                    className="link-2 w-100 text-center"
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            }
          </div>
        </form>
      </MidContainer>
    </Suspense>
  );
};

export default TravellerProfileForm;
