"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { convertToTitleCase } from "../../lib/formatHeading";
import { getCitiesByCountryId } from "../../lib/countries/countries";

export default function FilteredQueries({ countriesList }) {
   const router = useRouter();

   const searchParams = useSearchParams();

   const searchParamsArray = Array.from(searchParams.entries()).map(([key, value]) => ({ key, value }));

   const lengthWithoutPageAndType = searchParamsArray.filter(param => param.key !== "page" && param.key !== "type").length;

   const _countryParam = countriesList?.data?.find(
      (e) => e.iso3 === searchParams?.get("country")
   );

   const pathname = usePathname();

   const [citiesList, setCitiesList] = useState([]);

   const cityString = searchParams?.get("cities");

   // Step 1: Parse the string into an array of city names
   const cityNames = cityString?.split(",");

   // Step 2: Filter the city objects based on matching slugs
   const filteredCities = citiesList.filter((city) =>
      cityNames?.includes(city.name.toLowerCase())
   );

   const createQueryString = useCallback(
      (name, value) => {
         const params = new URLSearchParams(searchParams);
         if (name === "country") {
            params.delete("country");
            params.delete("cities");
            router.push(`${pathname}/?${params?.toString()}`);
         }
         if (name === "cities") {
            params.delete("cities");
            router.push(`${pathname}/?${params?.toString()}`);
         }
         if (name === "sort") {
            params.delete("sort");
            router.push(`${pathname}/?${params?.toString()}`);
         }
         if (name === "price") {
            params.delete("price");
            router.push(`${pathname}/?${params?.toString()}`);
         }
      },
      [pathname, router, searchParams]
   );

   useEffect(() => {
      const fetchCitiesList = async () => {
         const res = await getCitiesByCountryId({
            countryId: _countryParam?.id,
         });
         setCitiesList(res?.data);
      };
      if (_countryParam) {
         fetchCitiesList();
      }
   }, [_countryParam, searchParams]);

   return (
      <div className="col-xl-10 mx-auto">
         <div className="filter-row d-flex flex-wrap align-items-center">
            {_countryParam && (
               <div className="filter-box d-flex align-items-center rounded-pill">
                  {convertToTitleCase(_countryParam?.name)}
                  <div className="fb-close-icon ms-1">
                     <IoClose
                        onClick={() => createQueryString("country", null)}
                     />
                  </div>{" "}
               </div>
            )}
            {filteredCities?.length > 0 && (
               <div className="filter-box d-flex align-items-center rounded-pill">
                  {filteredCities?.map((data, index) => (
                     <div key={index}>
                        <p className="mb-0">
                           {data?.name}
                           {index !== filteredCities?.length - 1 ? "," : ""}
                        </p>
                     </div>
                  ))}
                  <div className="fb-close-icon ms-1">
                     <IoClose
                        onClick={() => createQueryString("cities", null)}
                     />
                  </div>{" "}
               </div>
            )}
            {searchParams?.get("sort") && (
               <div className="filter-box d-flex align-items-center rounded-pill">
                  {searchParams?.get("sort") === "ascending"
                     ? "Sort by ascending"
                     : "Sort by descending"}
                  <div className="fb-close-icon ms-1">
                     <IoClose onClick={() => createQueryString("sort", null)} />
                  </div>{" "}
               </div>
            )}
            {searchParams?.get("price") && (
               <div className="filter-box d-flex align-items-center rounded-pill">
                  {searchParams?.get("price") === 'free' ? searchParams?.get("price") : `$${searchParams?.get("price")}`}
                  <div className="fb-close-icon ms-1">
                     <IoClose
                        onClick={() => createQueryString("price", null)}
                     />
                  </div>{" "}
               </div>
            )}
            {lengthWithoutPageAndType > 1 && (
               <div className="filter-box d-flex align-items-center rounded-pill">
                  {'Clear all'}
                  <div className="fb-close-icon ms-1">
                     <IoClose
                        onClick={() => router.push(pathname)}
                     />
                  </div>{" "}
               </div>
            )}
         </div>
      </div>
   );
}
