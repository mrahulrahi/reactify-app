"use client";

import "./BuyCard.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Config from "../../store/api";
import { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import toast from "react-hot-toast";

const BuyCard = ({ itineraryId, access_token, price, isPurchased, travellerDetails }) => {

   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const [Razorpay, isLoaded] = useRazorpay();

   const buyOnClickRazor = async () => {

      if (access_token) {
         setLoading(true);
         const data = { itinerary_id: `${itineraryId}` };
         const response = await axios.post(Config.RAZOR_PAY, data, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${access_token}`,
            },
         });
         // console.log(response);
         if (response?.status === 200) {
            const options = {
               // key: Config.RAZORPAY_KEY_ID,
               key: Config.RAZORPAY_KEY_ID,
               amount: price * 100,
               currency: Config.CURRENCY,
               name: "Trundle.me",
               description: "Amount transaction for itinerary purchased",
               image: Config.LOGO_URL,
               order_id: response?.data?.order_id,
               handler: async (res) => {
                  const _data = {
                     itinerary_id: itineraryId,
                     order_id: res?.razorpay_order_id,
                     razorpay_payment_id: res?.razorpay_payment_id,
                     razorpay_signature: res?.razorpay_signature,
                  }
                  if (res) {
                     // toast.success("Payment paid successfully");
                  } else {
                     setLoading(false);
                  }
                  const _response = await axios.post(Config.RAZOR_PAY_CONFIRMATION, _data, {
                     headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                     },
                  });
                  if (_response?.status === 200) {
                     toast.success("Itinerary purchased successfully")
                     router.refresh();
                  } else {
                     setLoading(false);
                  }
               },
               prefill: {
                  contact: travellerDetails?.data?.mobile_no,
                  email: travellerDetails?.data?.email,
               },
               notes: {
                  address: "Razorpay Corporate Office",
               },
               theme: {
                  color: "#fffff",
               },
               modal: {
                  ondismiss: () => {
                     setLoading(false); // Update loading state or perform any other actions
                  }
               },
            };

            const rzpay = new Razorpay(options);
            rzpay.open();
         } else {
            setLoading(false);
         }
      } else {
         localStorage?.setItem("login_through_itinerary", itineraryId)
         router.push("/auth/signin");
      }
   };


   useEffect(() => {

      const isLoginThroughItinerary = localStorage?.getItem("login_through_itinerary");
      if (isLoginThroughItinerary && isPurchased === 0) {
         buyOnClickRazor();
         localStorage?.removeItem("login_through_itinerary");
      } else {
         localStorage?.removeItem("login_through_itinerary");
      }
   }, []);

   return (
      <div className="buy-card-box d-flex flex-column"
         style={{ maxWidth: "295px" }}>
         <div className="buy-card-text">
            <h6>Itinerary Price</h6>
            <h3>${price}</h3>
         </div>
         <div className="d-flex mt-auto">
            <button
               disabled={loading}
               className="btn btn-default btn-block"
               onClick={buyOnClickRazor}>
               Buy
               {loading && (
                  <span
                     className="spinner-border spinner-border-sm ms-3"
                     role="status"
                     aria-hidden="true"
                  />
               )}
            </button>
         </div>
      </div>
   );
};

export default BuyCard;
