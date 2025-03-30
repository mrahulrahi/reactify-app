'use client'

import { useState } from "react";
import '../../form.css'
import InnerHero from "../../components/inner-hero/InnerHero"
import MidContainer from "../../components/mid-container/MidContainer"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Config from "../../store/api";
import FormField from "../../components/form-field/FormField";

const ResetPassword = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const validationSchemaSignin = Yup.object().shape({
        new_password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirm_password: Yup.string()
            .required("Password is required")
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match') // Added condition for matching new_password
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
    });

    const initialValuesSignin = {
        new_password: "",
        confirm_password: "",
    };

    const formik = useFormik({
        initialValues: initialValuesSignin,
        validationSchema: validationSchemaSignin,
        onSubmit: async (values) => {
            setLoading(true);
            let data = {};

            try {
                const response = await axios.post(Config.RESET_PASSWORD, values, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${'jkguvjl.'}`,
                    },
                });
                data = response?.data;
            } catch (error) {
                data = error?.response?.data;
            }
            if (data?.status === true) {
                toast.success(data?.message);
                router.push("/otp-verification");
            } else if (data?.status === false) {
                toast.error(data?.message);
                setLoading(false);
            }

        },
    });

    return (
        <>
            <InnerHero />
            <MidContainer>
                <div className="signin-form-container">
                    <FormField
                        label="Password"
                        type="password"
                        id="new_password"
                        name="new_password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.new_password}
                        placeholder="Varun@123"
                        touched={formik.touched.new_password}
                        error={formik.errors.new_password}
                    />
                    <FormField
                        label="Password"
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirm_password}
                        placeholder="Varun@123"
                        touched={formik.touched.confirm_password}
                        error={formik.errors.confirm_password}
                    />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <button
                                    onClick={formik.handleSubmit}
                                    disabled={loading}
                                    type="button" className="btn btn-default btn-block" >Reset Password
                                    {loading && (
                                        <span
                                            className="spinner-border spinner-border-sm ms-3"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    )}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MidContainer>
        </>
    )
}

export default ResetPassword