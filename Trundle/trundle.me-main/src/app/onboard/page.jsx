"use client";

import { useState } from "react";
import "../form.css";
import InnerHero from "../components/inner-hero/InnerHero";
import MidContainer from "../components/mid-container/MidContainer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { sendTrundlerRequest } from "../store/slices/trundler";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
   email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
});

const initialValues = {
   email: "",
};

const OnboardPage = () => {
   const router = useRouter();

   const dispatch = useDispatch();

   const [loading, setLoading] = useState(false);

   const handleSubmit = async (values) => {
      setLoading(true);
      const res = await dispatch(sendTrundlerRequest(values));
      if (res?.payload?.data?.status === true) {
         setLoading(false);
         toast.success(res?.payload?.data?.message);
         router.push("/request-success");
      } else if (res?.payload?.status === 400) {
         setLoading(false);
         toast.error(res?.payload?.data?.email?.[0]);
      } else {
         setLoading(false);
      }
   };

   return (
      <>
         <InnerHero
            heading="Become a Trundler"
            subHeading="We'll send you an invite to become a member of our community"
         />
         <MidContainer>
            <div className="on-board-form-container">
               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
               >
                  {({ }) => (
                     <Form>
                        <div className="row">
                           <div className="col-lg-12">
                              <div className="form-group mb-4">
                                 <label className="form-label">Email</label>
                                 <Field
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Please enter your email"
                                 />
                                 <ErrorMessage
                                    className="text-danger m-2"
                                    style={{ fontSize: "13px" }}
                                    name="email"
                                    component="div"
                                 />
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-lg-12">
                              <div className="form-group">
                                 <button
                                    type="submit"
                                    className="btn btn-default btn-block"
                                    disabled={loading}
                                 >
                                    Send request
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
                     </Form>
                  )}
               </Formik>
            </div>
         </MidContainer>
      </>
   );
};

export default OnboardPage;
