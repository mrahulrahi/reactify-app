/* eslint-disable react/no-unescaped-entities */
'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import "./about.css";
import './style.css'
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postAboutUsEmail } from '../store/slices/trundler';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

export default function AboutUsPage() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
  });

  const teamMembers = [
    {
      name: 'Prasanna Jeyasankar',
      role: 'Founder',
      imageSrc: '/images/Prasanna.jpg',
      socialIconSrc: '/images/social-icon-1.png',
      linkedIn: "https://www.linkedin.com/in/prasannajeyasankar/",
      desc: "14 years of experience in product development, design, sales and marketing. Founded 2 companies. Took the second company, a design and development studio, from zero to $800K revenue in 3 years."
    },
    {
      name: 'Sharathkumar J',
      role: 'Partner & Design Head',
      imageSrc: '/images/team-img-2.jpg',
      socialIconSrc: '/images/social-icon-1.png',
      linkedIn: "https://www.linkedin.com/in/sharathj7/",
      desc: "9 years of experience in product design and team management. Has led design teams and launched multiple complex SaaS products."
    },
    {
      name: 'Varun Ammaipppan',
      role: 'Partner & Operations Head',
      imageSrc: '/images/Varun_Ammaipppan.jpeg',
      desc: "18 years of experience in building SaaS products and team management. Experienced in operations."
    },
    {
      name: 'Kojiro Honda',
      role: 'Executive Partner',
      imageSrc: '/images/Kojiro_Honda.jpeg',
      desc: "A pioneering entrepreneur with a proven track record of founding successful ventures. He has established a diverse portfolio of businesses, driving innovation and collaboration in international markets."
    }
  ];

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await dispatch(postAboutUsEmail(values));
      if (res?.payload?.data?.status === true) {
        setLoading(false);
        toast.success(res?.payload?.data?.message);
      } else if (res?.payload?.status === 400) {
        setLoading(false);
        toast.error(res?.payload?.data?.email?.[0]);
      } else {
        setLoading(false);
      }
    },
  });


  return (
    <div className="about-page">
      <div className="about-hero-container overflow-hidden position-relative ">
        <div className="about-graphic-1"><Image width={1000} height={1000} className="w-100 h-100 object-fit-contain" src={"/images/about-graphic-1.svg"}
          alt="about graphic img" /></div>
        <div className="container about-container position-relative z-3">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h1>Reimagining your Travel Experience</h1>
            </div>
            <div className="col-lg-12">
              <div className="position-relative">
                <div className="about-hero-img">
                  <Image width={1000} height={1000} className="w-100 h-100 object-fit-cover position-absolute start-0 top-0" src={'/images/about-hero-img.jpg'}
                    alt="about hero img" />
                </div>
                <div className="about-hero-text-bg"><Image width={1000} height={1000} className="w-100 h-100 object-fit-contain"
                  src="/images/trundle-text-bg.png" alt="trundle text bg" /></div>
                <Image width={1000} height={1000} className="about-mobile-img w-auto object-fit-contain"
                  src="/images/about-mobile-img.png" alt="about mobile img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-para-container position-relative">
        <div className="about-para-bg position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: "url('/images/about-para-bg.png')" }}></div>
        <div className="container about-container position-relative z-3">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-11 mx-auto">
              <div className="about-para-box">
                <p>We envision Trundle as a company that will pursue ideas, build products and influence
                  public
                  discourse about the travel industry. Trundle’s ethos are rooted in <span>our intention
                    to
                    provide something different, something more, something we’ve been missing when we
                    travel.</span> Through our products, our communication and from our mere existence,
                  we
                  wish
                  to excite and ease travellers’ experience. The act of travelling / moving, migrating /
                  exploring
                  has been inherent to every species that has ever appeared on earth. We’ve never been a
                  stationary being. Some travel for fun. Some travel for survival. But we all travel
                  nevertheless.We all feel this innate desire to travel. You’re probably feeling it right
                  now.
                  <span>At Trundle, we intend to cater to this desire. The desire to experience the
                    unknown.
                    To go
                    to a place and live amongst strangers who look, speak and eat different.</span> But
                  deep
                  within we know we’d feel just at home.Our target audience are those who have travel on
                  their
                  minds. Which we believe is probably everyone.
                  <br />We’re a team of designers, developers, travel enthusiasts, strategists and operation
                  specialists with deep and wide-ranging knowledge and experience in our fields of
                  expertise,
                  who’ve come together to combine our skills to build products that we believe will open
                  new
                  possibilities and redefine existing ones in the travel industry.
                  <br />In the coming months and years, we will launch path-breaking, industry-defining
                  digital
                  products in the form of web and mobile apps that’ll transform the way people experience
                  travel
                  and all that comes with it.
                </p>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className='d-flex col-lg-7 col-12 flex-md-row flex-column'>
                <div className="signup-box px-0 col-8">
                  <input type="email"
                    style={{ opacity: .8 }}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control h-100 text-box"
                    placeholder="Type your email address"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className='position-absolute'>
                      <p className='text-danger ms-2 mt-2'>
                        {formik.errors.email}
                      </p>
                    </div>
                  ) : null
                  }
                </div>
                <button
                  onClick={formik.handleSubmit}
                  type="button"
                  disabled={loading}
                  className="btn btn-default mx-2 col-4 about-button"
                  style={{
                    height: "63px",
                    padding: "21px 22px",
                    fontSize: "17px"
                  }}
                >
                  Join our journey
                  {loading &&
                    <div className="spinner-border spinner-border-sm text-light ms-2" role="status" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="working-container position-relative">
        <div className="about-graphic-2"><Image width={1000} height={1000} className="w-100 h-100 object-fit-contain" src="/images/about-graphic-2.svg"
          alt="about graphic img" /></div>
        <div className="about-graphic-3"><Image width={1000} height={1000} className="w-100 h-100 object-fit-contain" src="/images/about-graphic-3.svg"
          alt="about graphic img" /></div>
        <div className="container about-container about-container-2 position-relative z-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="working-content-box">
                <h3>What are we working on?</h3>
                <div className="working-list d-flex flex-wrap">
                  <div className="working-item">
                    <div className="working-box w-100 h-100">
                      <div className="working-content">A platform where travellers can find interesting,
                        unexplored itineraries from local travel influencers.
                      </div>
                    </div>
                  </div>
                  <div className="working-item">
                    <div className="working-box w-100 h-100">
                      <div className="working-content">A marketplace where travellers can receive offers
                        and
                        discounts from businesses located in their travel destination.
                      </div>
                    </div>
                  </div>
                  <div className="working-item">
                    <div className="working-box w-100 h-100">
                      <div className="working-content">A payment app that lets travellers make payments
                        without having to spend on transaction and commission fees.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="team-container position-relative overflow-hidden">
        <div className="about-graphic-4"><Image width={1000} height={1000} className="w-100 h-100 object-fit-contain" src="/images/about-graphic-4.svg"
          alt="about graphic img" /></div>
        <div className="about-graphic-5"><Image width={1000} height={1000} className="w-100 h-100 object-fit-contain" src="/images/about-graphic-5.svg"
          alt="about graphic img" /></div>
        <div className="container about-container position-relative z-3 margin-bottom">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="team-list d-flex flex-wrap row">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-item h-100">
                    <div className="team-box w-100 h-100 d-flex flex-column align-items-center px-4 pt-4 pb-5">
                      <div className="team-img ratio ratio-1x1">
                        <img style={{ objectFit: "contain !important" }} className="w-100 h-100 object-fit-cover" src={member.imageSrc} alt="{member.name}" />
                      </div>
                      <div className="team-content text-center">
                        <div className="d-flex align-items-center">
                          <h4 className="">{member.name}</h4>
                          {member.socialIconSrc && (
                            <div className="team-social-list d-flex px-2">
                              <Link target='_blank' href={member?.linkedIn} className="team-social-link">
                                <img className="object-fit-cover" src={member.socialIconSrc} alt="social icon" />
                              </Link>
                            </div>
                          )}
                        </div>
                        <p className="member-role">{member.role}</p>
                      </div>
                      <div className="member-txt px-5">
                        <p>
                          {member?.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
