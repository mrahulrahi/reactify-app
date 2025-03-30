"use client";

import "./FilterButton.css";
import Image from "next/image";
import FilterIcon from "./filter-icon.svg";
import { useCallback, useState } from "react";
import { IoClose } from "react-icons/io5";
import { convertToTitleCase } from "../../../lib/formatHeading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterButton = ({ countriesList }) => {
   const searchParams = useSearchParams();

   const _countryParam = countriesList?.find(
      (e) => e.iso3 === searchParams?.get("country")
   );

   const [selectedCountry, setSelectedCountry] = useState({
      label: _countryParam?.name,
      id: _countryParam?.id,
      value: _countryParam?.iso3,
   });

   const router = useRouter();

   const pathname = usePathname();

   const createQueryString = useCallback(
      (name, value) => {
         const params = new URLSearchParams(searchParams);
         params.set(name, value);
         if (name == "country") {
            params.delete("page");
            router.push(`${pathname}/?${params?.toString()}`);
         } else {
            router.push(`${pathname}/?${params?.toString()}`);
         }
      },
      [pathname, router, searchParams]
   );

   const countryParam = searchParams.get("country");

   return (
      <>
         <button
            className="filter-btn d-flex align-items-center justify-content-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterModal"
            aria-controls="offcanvasScrolling"
         >
            <div className="filter-btn-icon d-flex align-items-center justify-content-center">
               <Image
                  src={FilterIcon}
                  alt="filter icon"
                  width={16}
                  height={16}
               />
            </div>
            Filter
         </button>
         <div
            className="offcanvas offcanvas-end filter-modal-wrapper"
            data-bs-scroll="true"
            tabIndex="-1"
            id="filterModal"
         >
            <div className="filter-modal-head d-flex aliign-items-center justify-content-between">
               <div className="filter-title-box d-flex align-items-center justify-content-center">
                  <div className="ftb-icon d-flex align-items-center justify-content-center me-2">
                     <Image
                        src="/images/filter-icon.svg"
                        alt="filter icon"
                        width={20}
                        height={20}
                     />
                  </div>
                  Filter
               </div>
               <button
                  type="button"
                  className="fmb-close-btn"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
               >
                  <IoClose />
               </button>
            </div>
            <div className="filter-modal-body">
               <div className="row g-3">
                  <div className="col-lg-12">
                     <div className="form-group mb-4">
                        <label className="form-label">Country</label>
                        <div
                           className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center"
                           id="country"
                        >
                           {countriesList?.map((country) => (
                              <div
                                 key={country.id}
                                 className="form-check custom-radio d-flex align-items-center"
                              >
                                 <input
                                    className="form-check-input rounded-pill"
                                    type="radio"
                                    name="country"
                                    id={country.id}
                                    checked={
                                       selectedCountry?.iso3 === country.iso3 ||
                                       countryParam === country.iso3
                                    }
                                    onChange={() =>
                                       createQueryString(
                                          "country",
                                          country?.iso3
                                       )
                                    }
                                 />
                                 <label
                                    className="form-check-label"
                                    htmlFor={country.id}
                                 >
                                    {convertToTitleCase(country?.name)}
                                 </label>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default FilterButton;
