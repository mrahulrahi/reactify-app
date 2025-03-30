"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import InnerHero from "../../components/inner-hero/InnerHero";
import MidContainer from "../../components/mid-container/MidContainer";
import Image from "next/image";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Config from "../../store/api";
import toast from "react-hot-toast";
import Link from "next/link";

const PaymentSuccessPage = () => {
   const searchParams = useSearchParams();

   const { intent } = useSelector((state) => state.payment);

   const router = useRouter();

   const pathname = usePathname();

   const isRequestSentRef = useRef(false); // Ref to track if request has been sent

   useEffect(() => {
      const removeParams = async () => {
         const paymentIntentId = searchParams?.get("payment_intent");
         const data = {
            itinerary_id: intent?.itinerary_id,
            payment_intent_id: paymentIntentId,
         };

         // Check if request has already been sent
         if (!isRequestSentRef.current) {
            isRequestSentRef.current = true; // Mark request as sent
            try {
               const response = await axios.post(Config.CREATE_ORDER, data, {
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${intent?.access_token}`,
                  },
               });
               if (response?.status === 200) {
                  toast.success(response?.data?.message);
                  router.replace('/traveller/my-itineraries');
                  router.refresh()
               }
            } catch (error) {
               // Handle errors
               console.error("Error:", error);
            }
         }
      };
      removeParams();
   }, [intent, searchParams, router, pathname]);

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
                  Thank you for purchasing the itinerary.
               </h3>
               <div className="form-group">
                  <Link href={`/traveller/my-itineraries`} className="link">
                     Go to My Itineraries
                  </Link>
               </div>
            </div>
         </MidContainer>
      </>
   );
};

export default PaymentSuccessPage;
