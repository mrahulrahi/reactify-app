"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SelectField from "../select-field/SelectField";
import { IoMdSearch } from "react-icons/io";

const Search = ({ countriesList }) => {

   const searchParams = useSearchParams();

   const _countryParam = countriesList?.find(
      (e) => e.iso3 === searchParams?.get("country")
   );

   const [searchInput, setSearchInput] = useState(searchParams?.get("q") || "");

   const router = useRouter();

   const pathname = usePathname();

   const [selectedCountry, setSelectedCountry] = useState(_countryParam || null);

   const searchOnClick = () => {
      let url;
      if (selectedCountry && searchInput?.length > 0) {
         url = `${pathname}/?country=${selectedCountry?.iso3}&q=${searchInput}`
      } else if (selectedCountry && searchInput?.length === 0) {
         url = `${pathname}/?country=${selectedCountry?.iso3}`
      } else if (!selectedCountry && searchInput?.length > 0) {
         url = `${pathname}/?q=${searchInput}`
      }
      if (pathname === "/") {
         router.push(`/itineraries/${url}`);
      } else {
         router.push(url);
      }
   }

   return (
      <div className="header-search-box">
         <div className="input-group">
            <SelectField
               isSearchable
               name="country"
               options={countriesList}
               borderNone={true}
               onChange={(_, data) => {
                  setSelectedCountry(data);
               }}
               placeholder="Choose your destination"
               value={selectedCountry || _countryParam}
               className="form-select-container select-2 w-100"
               classNamePrefix="form-select"
            />
            <span
               className="input-group-text rounded-circle cursor-pointer"
               onClick={() => searchOnClick()}
               id="search-box-icon">
               <IoMdSearch />
            </span>
            <div type="text"
               className="form-control"
            />
         </div>
      </div>
   );
};

export default Search;
