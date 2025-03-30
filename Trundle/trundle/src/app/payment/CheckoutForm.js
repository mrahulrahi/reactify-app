import {
   useStripe,
   useElements,
   PaymentElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CheckoutForm = () => {
   const stripe = useStripe();

   const elements = useElements();

   const [loading, setLoading] = useState(false);

   const [isDeclined, setIsDeclined] = useState(false);

   const [error, setError] = useState("");

   const router = useRouter()

   const handleSubmit = async (event) => {
      setLoading(true);
      setIsDeclined(false);
      setError("");
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      const return_type_url = "http://trundle.me/payment/success"

      // const return_type_url = "http://localhost:3000/payment/success"

      const result = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: return_type_url,
         },
      });

      if (result.error) {
         if (result?.error?.code === "card_declined") {
            setIsDeclined(true);
            setError(result.error.message);
         }
         setLoading(false);
      } else {
         setIsDeclined(false);
         setError("");
         router.replace(return_type_url);
         setLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <PaymentElement />
         <button disabled={!stripe || loading} className="btn btn-secondary">
            Submit
            {loading && (
               <span
                  className="spinner-border spinner-border-sm ms-3"
                  role="status"
                  aria-hidden="true"
               />
            )}
         </button>
         {isDeclined &&
            <div style={{ paddingTop: "15px", paddingBottom: "15px", paddingLeft: "18px", backgroundColor: "#FAEFED", border: "1px solid #F0C8C0", borderRadius: "15px" }} className="d-flex gap-3 my-4">
               <Image src="/images/warning.svg" width={20} height={20} alt="notification icon" />
               <div className="d-flex flex-column">
                  <p className="mb-0" style={{ color: "rgba(242, 48, 10, 1)", fontWeight: "600", fontSize: "16px" }}>{error}</p>
                  <p className="mb-0" style={{ fontSize: "13px", fontWeight: "400", opacity: "60%", color: "rgba(242, 48, 10, 1)" }}>Please try again after sometime</p>
               </div>
            </div>
         }
      </form>
   );
};

export default CheckoutForm;
