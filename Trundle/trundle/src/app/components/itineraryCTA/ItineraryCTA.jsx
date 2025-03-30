"use client";

import "./ItineraryCTA.css";
import Image from "next/image";
import itineraryCTAImage from "./itinerary-cta-bg.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ItineraryCTA = () => {

   const pathname = usePathname();

   const hiddenPathNameList = ['/payement-success', '/founding-member', '/help-plan-my-trip'];

   const isHide = hiddenPathNameList?.includes(pathname);

   return (
      <div className={isHide ? 'd-none' : ''}>
         <div className="itinerary-cta-box w-100 position-relative">
            <div className="itinerary-cta-bg"><Image src={itineraryCTAImage} alt="inner hero" fill priority style={{ objectFit: "cover" }} /></div>
            <div className="itinerary-cta-content text-center mx-auto">
               <h4>Get personalised itinerary for your next trip from travel experts</h4>
               <Link href="/help-plan-my-trip" className="btn btn-default">I’m interested</Link>
            </div>
         </div>
      </div>
   );
};

export default ItineraryCTA;
