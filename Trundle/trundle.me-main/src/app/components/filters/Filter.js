"use client";

import React, { useCallback, useState } from "react";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { _setSelectedCountry } from "../../store/slices/countries";
import { convertToTitleCase } from "../../lib/formatHeading";

export default function Filter({ countriesList, fetchedItinerariesLength }) {
   const router = useRouter();

   const [selectedCities, setSelectedCities] = useState([]);

   const [selectedPrice, setSelectedPrice] = useState("");

   const searchParams = useSearchParams();

   const pathname = usePathname();

   const dispatch = useDispatch();

   const createQueryString = useCallback(
      async (name, value) => {
         const params = new URLSearchParams(searchParams); // Define params first
         if (name === "cities") {
            if (value?.length === 0) {
               params.delete("cities"); // Delete "cities" parameter if "country" is updated
            } else {
               params.set(name, value.join(",")); // Join array elements with comma
            }
         } else {
            if (name === "country") {
               params.delete("page"); // Delete "page" parameter if "country" is updated
               params.delete("cities"); // Delete "cities" parameter if "country" is updated
            }
            params.set(name, value); // Set the new parameter value
         }

         await router.push(`${pathname}/?${params.toString()}`);
         return params.toString();
      },
      [pathname, router, searchParams]
   );

   const handleCityChange = (event) => {
      const citySlug = event?.slug;
      setSelectedCities((prevSelectedCities) => {
         if (prevSelectedCities.includes(citySlug)) {
            createQueryString(
               "cities",
               prevSelectedCities.filter((city) => city !== citySlug)
            );
            return prevSelectedCities.filter((city) => city !== citySlug);
         } else {
            createQueryString("cities", [...prevSelectedCities, citySlug]);
            return [...prevSelectedCities, citySlug];
         }
      });
   };

   const handleCountryChange = (event) => {
      dispatch(_setSelectedCountry(event));
      const country = {
         value: event?.phone_code,
         label: convertToTitleCase(event?.name),
         id: event?.id,
         iso3: event?.iso3,
      };
      dispatch(_setSelectedCountry(country))
      setSelectedCities([]);
      createQueryString("country", event?.iso3);
   };

   const handlePriceChange = (event) => {
      setSelectedPrice(event?.id);
      createQueryString("price", event?.value);
   };

   return (
      <div className="heading-right flex-shrink-0">
         <div className="filter-sort-btn-box d-flex">
            <div className="fs-btn">
               <FilterButton
                  _handleCountryChange={handleCountryChange}
                  _handleCityChange={handleCityChange}
                  selectedCities={selectedCities}
                  selectedPrice={selectedPrice}
                  _handlePriceChange={handlePriceChange}
                  countriesList={countriesList?.data}
                  fetchedItinerariesLength={fetchedItinerariesLength}
               />
            </div>
            <div className="fs-btn">
               <SortButton />
            </div>
         </div>
      </div>
   );
}
