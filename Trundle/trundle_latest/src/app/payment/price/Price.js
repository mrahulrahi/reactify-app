"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function Price() {
   const { intent } = useSelector((state) => state.payment);

   return (
      <div className="col-lg-4 mt-4 mt-lg-0">
         <div className="itinerary-single-sidebar">
            <div className="iss-box">
               <div className="buy-card-box d-flex flex-column">
                  <div className="buy-card-text">
                     <h6>Itinerary Price</h6>
                     <h3>${parseInt(intent?.price)}</h3>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
