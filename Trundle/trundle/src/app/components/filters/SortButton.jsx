"use client";

import "./SortButton.css";
import Image from "next/image";
import SortIcon from "./sort-icon.svg";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortButton = () => {
   const searchParams = useSearchParams();

   const router = useRouter();

   const pathname = usePathname()

   const createQueryString = useCallback(
      (name, value) => {
         const params = new URLSearchParams(searchParams);
         params.set(name, value);
         router.push(`${pathname}/?${params?.toString()}`);
         return params.toString();
      },
      [pathname, router, searchParams]
   );

   return (
      <div className="dropdown d-flex">
         <button
            className="sort-btn d-flex align-items-center justify-content-center dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
         >
            <div className="sort-btn-icon d-flex align-items-center justify-content-center">
               <Image src={SortIcon} alt="sort icon" width={16} height={16} />
            </div>
            Sort
         </button>
         {/* {searchParams?.toString()?.length > 0 && (
            <button
               className="sort-btn d-flex align-items-center justify-content-center dropdown-toggle"
               type="button"
               onClick={() => router.push(pathname)}
            >
               <div
                  className="sort-btn-icon d-flex align-items-center justify-content-center"
                  style={{ opacity: 0.3 }}
               >
                  <FaFilterCircleXmark />
               </div>
               Clear
            </button>
         )} */}
         <ul className="dropdown-menu dropdown-menu-end">
            <li onClick={() => createQueryString("sort", "ascending")}>
               <p className="dropdown-item cursor-pointer">Ascending Price</p>
            </li>
            <li onClick={() => createQueryString("sort", "descending")}>
               <p className="dropdown-item cursor-pointer">Descending Price</p>
            </li>
         </ul>
      </div>
   );
};

export default SortButton;
