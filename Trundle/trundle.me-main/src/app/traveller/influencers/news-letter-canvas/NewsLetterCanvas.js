"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { ErrorMessage } from "../../../components";
import { Offcanvas } from "react-bootstrap";
import { sendNewsLetter } from "../../../store/slices/trundler";
import { useFormik } from "formik";
import * as Yup from "yup";

export function NewsLetterCanvas() {
   const [show, setShow] = useState(false);

   const validationSchema = Yup.object().shape({
      subject_of_email: Yup.string()
         .required("Subject of email is required")
         .test("word-count", "Max 6 word limit", (value) => {
            if (!value) return false;
            const wordCount = value.trim().split(/\s+/).length;
            return wordCount <= 6;
         }),
      description_of_email: Yup.string().required(
         "Description of email is required"
      ),
   });

   const formik = useFormik({
      initialValues: {
         subject_of_email: "Launch of New Itinerary",
         description_of_email:
            "I'm thrilled to share some exciting news with you I've just returned from an incredible journey exploring the vibrant culture of Japan. This Monday I am launching a brand new itinerary for you.",
      },
      validationSchema,
      onSubmit: async (data) => {
         // console.log(data);
         const news_letter = {};
         //   const res = await dispatch(sendNewsLetter({ access_token, news_letter }));
         //   console.log(res);
      },
   });

   return (
      <>
         <div className="mp-cta">
            <button className="btn btn-default" onClick={() => setShow(true)}>
               Send Newsletter
            </button>
         </div>
         <Offcanvas
            className="offcanvas offcanvas-end newsletter-modal"
            show={show}
            placement="end"
            onHide={() => setShow(false)}
         >
            <div className="newsletter-head d-flex align-items-center justify-content-between">
               <h5>Newsletter</h5>
               <button
                  onClick={() => setShow(false)}
                  type="button"
                  className="modal-close-btn d-flex align-items-center justify-content-center"
               >
                  <IoClose />
               </button>
            </div>
            <div className="newsletter-body">
               <div className="row g-3">
                  <div className="col-lg-12">
                     <div className="nb-form-group">
                        <label id="subject_of_email" className="nb-form-label">
                           <span>
                              Write your subject of your email here (not more
                              than 6 words)
                           </span>
                        </label>
                        <input
                           className="w-100 nb-form-control d-flex align-items-center"
                           type="text"
                           name="subject_of_email"
                           id="subject_of_email"
                           defaultValue={"Launch of New Itinerary"}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik?.values?.subject_of_email}
                        />
                        <ErrorMessage
                           touched={formik?.touched?.subject_of_email}
                           error={formik?.errors?.subject_of_email}
                        />
                        <textarea
                           className="nb-textarea w-100"
                           name="description_of_email"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           cols="30"
                           rows="5"
                           defaultValue={
                              "I'm thrilled to share some exciting news with you I've just returned from an incredible journey exploring the vibrant culture of Japan. This Monday I am launching a brand new itinerary for you."
                           }
                        ></textarea>
                        <ErrorMessage
                           touched={formik?.touched?.description_of_email}
                           error={formik?.errors?.description_of_email}
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="newsletter-footer">
               <div className="row g-3">
                  <div className="col-lg-12">
                     <div className="form-group">
                        <button
                           type="submit"
                           className="btn btn-default"
                           onClick={formik.handleSubmit}
                        >
                           Submit
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </Offcanvas>
      </>
   );
}
