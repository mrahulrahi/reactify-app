"use client";

import "./HeroSearch.css";
import Image from "next/image";
import locationIcon from "./location-icon.svg";
import { SelectField } from "../../components";
import { useDispatch } from "react-redux";
import { getCities, _setSelectedCountry } from "../../store/slices/countries";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import Select, { components, DropdownIndicatorProps } from 'react-select';
import { FaSortDown } from "react-icons/fa6";

const DropdownIndicator = (
   props
) => {
   return (
      <components.DropdownIndicator {...props}>
         <span className='hs-arrow'><FaSortDown /></span>
      </components.DropdownIndicator>
   );
};



const HeroSearch = ({ countriesList }) => {
   const dispatch = useDispatch();

   const router = useRouter();

   const searchParams = useSearchParams();

   const _countryParam = countriesList?.find(
      (e) => e.iso3 === searchParams?.get("country")
   );

   const [selectedCountry, setSelectedCountry] = useState({
      label: _countryParam?.name,
      id: _countryParam?.id,
      value: _countryParam?.iso3,
      iso3: _countryParam?.iso3,
   });

   const createQueryString = useCallback(
      (name, value) => {
         const params = new URLSearchParams(searchParams);
         params.set(name, value);
         router.push(`/?${params?.toString()}`);
         return params.toString();
      },
      [router, searchParams]
   );

   return (
      <div className="hero-search-container d-flex align-items-center justify-content-between">
         {/* <div className="hero-search-box w-100 d-flex align-items-center position-relative">
            <div className="hero-search-icon d-flex align-items-center justify-content-center">
               <Image
                  src={locationIcon}
                  alt="search icon"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
               />
            </div>
            <div className="w-100 hero-search-dropdown">
               <SelectField
                  isSearchable
                  name="country"
                  options={countriesList}
                  borderNone={true}
                  onChange={(_, data) => {
                     dispatch(getCities({ country_id: data?.id }));
                     setSelectedCountry(data);
                  }}
                  placeholder="Select"
                  value={_countryParam}
               />
            </div>
         </div> */}
         <div className="hero-search-box w-100 d-flex align-items-center position-relative">
            <div className="hero-search-icon d-flex align-items-center justify-content-center"><Image src={locationIcon} alt="search icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <SelectField
               className="form-select-container select-2"
               classNamePrefix="form-select"
               isSearchable
               name="country"
               options={countriesList}
               borderNone={true}
               onChange={(_, data) => {
                  dispatch(getCities({ country_id: data?.id }));
                  setSelectedCountry(data);
               }}
               placeholder="Select"
               value={_countryParam}
               components={{ DropdownIndicator }}
            />
         </div>
         <div className="hero-search-btn">
            <button
               className="btn btn-default"
               onClick={() => {
                  createQueryString("country", selectedCountry?.iso3);
                  router.push(`/itineraries?country=${selectedCountry?.iso3}`);
               }}
            >
               Search
            </button>
         </div>
      </div>
   );
};

export default HeroSearch;
