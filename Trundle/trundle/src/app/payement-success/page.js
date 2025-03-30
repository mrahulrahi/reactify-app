"use client";

import InnerHero from "../components/inner-hero/InnerHero";
import MidContainer from "../components/mid-container/MidContainer";
import Image from "next/image";
import Link from "next/link";

const PaymentSuccessPage = () => {
   return (
      <>
         <InnerHero />
         <MidContainer>
            <div className="registration-success-box text-center">
               <div className="rsb-icon">
                  <Image
                     src="/images/tick-icon.svg"
                     width={42}
                     height={40}
                     alt="Success"
                  />
               </div>
               <h3>
                  Your transaction has been completed successfully.
               </h3>
               <div className="form-group">
                  <Link href={`/`} className="link">
                     Go to Home
                  </Link>
               </div>
            </div>
         </MidContainer>
      </>
   );
};

export default PaymentSuccessPage;
