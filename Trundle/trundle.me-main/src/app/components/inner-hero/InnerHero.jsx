"use client";

import "./InnerHero.css";
import Image from "next/image";
import heroImage from "./inner-hero-bg.jpg";

const InnerHero = ({ heading, midHeading, subHeading }) => {
   return (
      <>
         <div className="inner-hero-container position-relative d-flex align-items-center">
            <div className="container add-index">
               <div className="row align-items-center justify-content-center">
                  <div className="col-lg-7 text-center">
                     {heading && <h1>{heading}</h1>}
                     {midHeading && <h4>{midHeading}</h4>}
                     {subHeading && <p>{subHeading}</p>}
                  </div>
               </div>
            </div>
            <div className="inner-hero-bg">
               <Image
                  src={heroImage}
                  alt="inner hero"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
               />
            </div>
         </div>
      </>
   );
};

export default InnerHero;
