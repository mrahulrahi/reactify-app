"use client";

import "./FilterButton.css";
import Image from "next/image";
import FilterIcon from "./filter-icon.svg";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdSearch, IoIosMic } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../../store/slices/countries";
import { convertToTitleCase } from "../../../lib/formatHeading";
import { useSearchParams } from "next/navigation";

const FilterButton = ({
   _handleCountryChange,
   _handleCityChange,
   selectedCities,
   selectedPrice,
   _handlePriceChange,
   countriesList,
   fetchedItinerariesLength
}) => {
   const [searchInput, setSearchInput] = useState("");

   const searchParams = useSearchParams();

   const { citiesList } = useSelector((state) => state.countries);

   const dispatch = useDispatch();

   const prices = [
      { id: 1, range: "$1",value:"1" },
      { id: 2, range: "$2",value:"2" },
      { id: 3, range: "$4",value:"4" },
      { id: 4, range: "$5",value:"5" },
      { id: 5, range: "$10",value:"10" },
   ];

   const _countryParam = countriesList?.find(
      (e) => e.iso3 === searchParams?.get("country")
   );

   const [selectedCountry, setSelectedCountry] = useState({
      label: _countryParam?.name,
      id: _countryParam?.id,
      value: _countryParam?.iso3,
   });

   const handleCountryChange = (country) => {
      _handleCountryChange(country);
   };

   const handleCityChange = (city) => {
      _handleCityChange(city);
   };

   const handlePriceChange = (event) => {
      _handlePriceChange(event);
   };

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
                                    onChange={() => {
                                       handleCountryChange(country);
                                       dispatch(
                                          getCities({ country_id: country?.id })
                                       );
                                    }}
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
               {searchParams?.get("country") && (
                  <div className="row g-3">
                     <div className="col-lg-12">
                        <div className="form-group mb-4">
                           <label className="form-label mb-0">Cities</label>
                           <div className="form-text mt-0">
                              Select a country to filter cities
                           </div>
                           <div className="form-search-box my-2">
                              <div className="input-group">
                                 <span
                                    className="ig-left-icon"
                                    id="search-box-icon"
                                 >
                                    <IoMdSearch />
                                 </span>
                                 <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) =>
                                       setSearchInput(e.target.value)
                                    }
                                    placeholder="Search"
                                    className="form-control px-5"
                                 />
                                 <span className="ig-right-icon">
                                    <IoIosMic />
                                 </span>
                              </div>
                           </div>
                           <div className="custom-checkbox-list d-flex flex-wrap overflow-y-auto">
                              {citiesList?.data?.map((city) => (
                                 <div
                                    key={city.slug}
                                    className="custom-checkbox w-100 form-check d-flex align-items-start border-0"
                                 >
                                    <input
                                       className="form-check-input"
                                       type="checkbox"
                                       id={city.slug}
                                       checked={selectedCities.includes(
                                          city.slug
                                       )}
                                       onChange={() => handleCityChange(city)}
                                    />
                                    <label
                                       className="form-check-label justify-content-start fw-medium"
                                       htmlFor={city.slug}
                                    >
                                       {city.name}
                                    </label>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
               <div className="row g-3">
                  <div className="col-lg-12">
                     <div className="form-group mb-4">
                        <label className="form-label">Price</label>
                        <div
                           className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center"
                           id="price"
                        >
                           {prices.map((price) => (
                              <div
                                 key={price.id}
                                 className="form-check custom-radio d-flex align-items-center"
                              >
                                 <input
                                    className="form-check-input rounded-pill"
                                    type="radio"
                                    name="price"
                                    id={price.id}
                                    checked={
                                       parseInt(selectedPrice) === price.id
                                    }
                                    onChange={()=>handlePriceChange(price)}
                                 />
                                 <label
                                    className="form-check-label"
                                    htmlFor={price.id}
                                 >
                                    {price.range}
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
