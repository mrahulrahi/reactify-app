import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import logo from "../../../public/images/logo_.svg"
export default function Razorpay() {
  const [Razorpay, isLoaded] = useRazorpay();

  const handlePayment = useCallback(async () => {
    const options = {
      key: "rzp_test_rwwI0xDFigS3Fz",
      amount: "3000",
      currency: "INR",
      name: "Trundle.me",
      description: "Test Transaction",
      image: logo,
      // order_id: order.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}