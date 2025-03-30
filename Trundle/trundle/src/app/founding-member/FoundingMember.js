"use client";

import './FoundingMember.css';
import PaymentForm from './PaymentForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FoundingMember = () => {

  // Formik setup for validation
  const formik = useFormik({
    initialValues: {
      price: '5',
    },
    validationSchema: Yup.object({
      price: Yup.number()
        .min(5, 'The price must be at least $5')

    }),
    onSubmit: (values) => {
      // Handle form submission if needed
      console.log('Submitted price:', values.price);
    }
  });

  return (
    <div className='content-container'>
      <div className="container">
        <div className='row'>
          <div
            style={{

            }}
            className="col-md-6 col-12 mb-5 position-sticky-md">
            <h1 className="fs-4">Trundle - Founding Member</h1>
            <p className="fw-medium h5 text-secondary mb-5">$5.00+</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="price" className="me-2 suggest w-100">Suggest a price:</label>
                <div className="input-lgroup-text text-start inputl-container position-relative">
                  <span className='text-secondary position-absolute' style={{ left: "15px", top: "13px" }}>$</span>
                  <input
                    style={{ paddingLeft: "25px" }}
                    id="price"
                    name="price"
                    type='number'
                    className={`form-control w-75 mb-0`}
                    value={formik.values.price}
                    onChange={(e) => {
                      formik.setFieldTouched('price', true, false);
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              {formik.touched.price && formik.errors.price ? (
                <div style={{ left: "0px" }} className="invalid-feedback mt-1">{formik.errors.price}</div>
              ) : null}
            </form>
            <p className="mt-3 fw-bold mb-2">Benefits of becoming a founder</p>
            <ul className="list-styled">
              <li className="custom-list-item">- Priority access to all new releases.</li>
              <li className="custom-list-item">- 2% annual cashback on total purchases.</li>
              <li className="custom-list-item">- Guaranteed free meal or drink on one of your trips every year.</li>
            </ul>
            <p className="mt-2">A bigggggg thank you <span role="img" aria-label="heart">❤️</span></p>
            {/* <p className="text-muted mt-3">(Limited to <span className="fw-bold text-decoration-line-through">
              <del>5</del>{" "}
              <del>4</del>{" "}
              <del>3</del>{" "}
              <del>2</del>{" "}
              <del>1</del>
            </span> member only)</p> */}
          </div>
          <div className="col-md-6 col-12">
            <PaymentForm suggestedAmount={formik.values.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoundingMember;
