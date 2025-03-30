"use client";

import { HiDotsHorizontal } from "react-icons/hi";
import { deleteItinerary } from "../../../../lib/itinerary/getItinerary";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DeleteItineraryBtn = ({ id, access_token }) => {
   const [deleteLoading, setDeleteLoading] = useState(false);

   const router = useRouter();

   const handleDeleteItinerary = async () => {
      setDeleteLoading(true);
      const res = await deleteItinerary({ id, access_token });
      if (res?.status === true) {
         router.refresh();
         setDeleteLoading(false);
         toast.success(res?.message);
      } else {
         setDeleteLoading(false);
      }
   };

   return (
      <div className="card-cta-right">
         <div className="dropdown">
            <a
               href="#"
               className="card-options"
               role="button"
               id="dropdownMenuLink"
               data-bs-toggle="dropdown"
               aria-expanded="false"
            >
               <HiDotsHorizontal />
            </a>
            <ul
               className="dropdown-menu dropdown-menu-end"
               aria-labelledby="dropdownMenuLink"
            >
               {/* <li>
                  <button className="dropdown-item">Unpublish</button>
               </li> */}
               <li>
                  <a
                     className="dropdown-item text-danger cursor-pointer"
                     onClick={handleDeleteItinerary}
                  >
                     {deleteLoading ? "Deleting" : "Delete"}
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
};
