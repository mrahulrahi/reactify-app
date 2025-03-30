"use client";

import "./BuyCard.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Config from "../../store/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveIntent } from "../../store/slices/payment";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useRazorpay from "react-razorpay";
import toast from "react-hot-toast";

const stripePromise = loadStripe('rzp_test_rwwI0xDFigS3Fz');

const BuyCard = ({ itineraryId, access_token, price, isPurchased, travellerDetails }) => {


   // console.log(travellerDetails?.data?.mobile_no);

   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();

   const handleClick = async () => {
      const stripe = await stripePromise;
      // Call your backend to create a Razorpay order
      // const { data } = await axios.post('/api/razorpay/create-order', {
      //    amount: 50000,  // Amount in paisa
      //    currency: 'INR', // Currency
      // });
      // // Redirect to Razorpay checkout page
      // const result = await stripe.redirectToCheckout({
      //    sessionId: data.sessionId,
      // });
      // if (result.error) {
      //    console.error(result.error.message);
      // }
   };

   const buyOnClick = async () => {
      if (access_token) {
         setLoading(true);
         const data = { itinerary_id: `${itineraryId}` };
         try {
            const response = await axios.post(Config.GET_INTERNT_ID, data, {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`,
               },
            });
            const option = {
               clientSecret: response?.data?.client_secret,
               price: price,
               itinerary_id: itineraryId,
               access_token: access_token,
            };
            await dispatch(saveIntent(option));
            setLoading(false);
            router.replace(`/payment/${itineraryId}`);
            // window.open("/payment", "_blank");
         } catch (error) {
            console.error("Error:", error.message); // Log any errors
            throw error; // Re-throw the error to handle it further up the call stack if needed
         }
      } else {
         router.push("/auth/signin");
      }
   };

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
            <h3>${parseInt(price)}</h3>
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
