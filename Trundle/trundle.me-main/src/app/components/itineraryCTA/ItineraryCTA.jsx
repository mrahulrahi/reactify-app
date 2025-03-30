import "./ItineraryCTA.css";
import Image from "next/image";
import itineraryCTAImage from "./itinerary-cta-bg.jpg";
import Link from "next/link";

const ItineraryCTA = () => {
   return (
      <>
         <div className="itinerary-cta-box w-100 position-relative">
            <div className="itinerary-cta-bg"><Image src={itineraryCTAImage} alt="inner hero" fill priority style={{ objectFit: "cover" }} /></div>
            <div className="itinerary-cta-content text-center mx-auto">
               <h4>Get personalised itinerary for your next trip from travel experts</h4>
               <Link href="/help-plan-my-trip" className="btn btn-default">I’m interested</Link>
            </div>
         </div>
      </>
   );
};

export default ItineraryCTA;
