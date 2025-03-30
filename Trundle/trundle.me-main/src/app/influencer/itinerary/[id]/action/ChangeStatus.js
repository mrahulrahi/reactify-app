"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Config from "../../../../store/api";
import { useRouter } from "next/navigation";
import { HiDotsHorizontal } from "react-icons/hi";

export default function ChangeStatus({ status, access_token, itinerary_id }) {

   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const changeStatus = async (id) => {
      const statusId = id === 0 ? 1 : 0;
      const data = { status: `${statusId}` };
      setLoading(true);
      const res = await axios.post(
         `${Config.CHANGE_STATUS}/${itinerary_id}`,
         data,
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${access_token}`,
            },
         }
      );

      if (res?.status === 200) {
         toast.success(res?.data?.message);
         setLoading(false);
         router.push("/influencer/my-profile");
         router.refresh();
      } else {
         setLoading(false);
      }
   };

   return (
      <>
         {loading ? (
            <span
               className="spinner-border spinner-border-sm ms-3"
               role="status"
               aria-hidden="true"
            />
         ) : (
            <div className="dropdown ms-auto ms-md-0">
               <a
                  href="#"
                  className="id-options"
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
                  <li
                     className="cursor-pointer"
                     onClick={() => changeStatus(status)}
                  >
                     <a className="dropdown-item">
                        {status === 0 ? "Active" : "Inactive"}
                     </a>
                  </li>
               </ul>
            </div>
         )}
      </>
   );
}
