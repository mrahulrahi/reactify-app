"use client";
import "./FilterButton.css";
import Image from "next/image";
import FilterIcon from "./filter-icon.svg";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdSearch, IoIosMic } from "react-icons/io";

const FilterButton = () => {
   const [searchInput, setSearchInput] = useState("");

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
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="country"
                                 id="country1"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="country1"
                              >
                                 Japan
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="country"
                                 id="country2"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="country2"
                              >
                                 Singapore
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="country"
                                 id="country3"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="country3"
                              >
                                 South Korea
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="country"
                                 id="country4"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="country4"
                              >
                                 Taiwan
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="country"
                                 id="country5"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="country5"
                              >
                                 Thailand
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="country"
                                 id="country6"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="country6"
                              >
                                 Vietnam
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
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
                           <div className="custom-checkbox w-100 form-check d-flex align-items-start border-0">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="citiesCheck1"
                              />
                              <label
                                 className="form-check-label justify-content-start fw-medium"
                                 htmlFor="citiesCheck1"
                              >
                                 Au-pinj
                              </label>
                           </div>
                           <div className="custom-checkbox w-100 form-check d-flex align-items-start border-0">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="citiesCheck2"
                              />
                              <label
                                 className="form-check-label justify-content-start fw-medium"
                                 htmlFor="citiesCheck2"
                              >
                                 Bi-yung
                              </label>
                           </div>
                           <div className="custom-checkbox w-100 form-check d-flex align-items-start border-0">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="citiesCheck3"
                              />
                              <label
                                 className="form-check-label justify-content-start fw-medium"
                                 htmlFor="citiesCheck3"
                              >
                                 Cul-jing
                              </label>
                           </div>
                           <div className="custom-checkbox w-100 form-check d-flex align-items-start border-0">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="citiesCheck4"
                              />
                              <label
                                 className="form-check-label justify-content-start fw-medium"
                                 htmlFor="citiesCheck4"
                              >
                                 Do-Yung
                              </label>
                           </div>
                           <div className="custom-checkbox w-100 form-check d-flex align-items-start border-0">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="citiesCheck5"
                              />
                              <label
                                 className="form-check-label justify-content-start fw-medium"
                                 htmlFor="citiesCheck5"
                              >
                                 Eoul
                              </label>
                           </div>
                           <div className="custom-checkbox w-100 form-check d-flex align-items-start border-0">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="citiesCheck6"
                              />
                              <label
                                 className="form-check-label justify-content-start fw-medium"
                                 htmlFor="citiesCheck6"
                              >
                                 Do-Yung
                              </label>
                           </div>
                           <div className="custom-checkbox w-100 form-check d-flex align-items-start border-0">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="citiesCheck7"
                              />
                              <label
                                 className="form-check-label justify-content-start fw-medium"
                                 htmlFor="citiesCheck7"
                              >
                                 Eoul
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row g-3">
                  <div className="col-lg-12">
                     <div className="form-group mb-4">
                        <label className="form-label">Price</label>
                        <div
                           className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center"
                           id="price"
                        >
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="price"
                                 id="price1"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="price1"
                              >
                                 $10
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="price"
                                 id="price2"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="price2"
                              >
                                 $20 to $40
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="price"
                                 id="price3"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="price3"
                              >
                                 $20 to $40
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="price"
                                 id="price4"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="price4"
                              >
                                 $40 to $50
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="price"
                                 id="price5"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="price5"
                              >
                                 $50 to $60
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* <div className="row g-3">
                  <div className="col-lg-12">
                     <div className="form-group">
                        <label className="form-label">
                           Coupon Discount Range
                        </label>
                        <div
                           className="form-radio-check-group d-flex flex-wrap align-items-center"
                           id="discount"
                        >
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="discount"
                                 id="discount1"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="discount1"
                              >
                                 01
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="discount"
                                 id="discount2"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="discount2"
                              >
                                 1 and more
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="discount"
                                 id="discount3"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="discount3"
                              >
                                 2 and more
                              </label>
                           </div>
                           <div className="form-check custom-radio d-flex align-items-center">
                              <input
                                 className="form-check-input rounded-pill"
                                 type="radio"
                                 name="discount"
                                 id="discount4"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="discount4"
                              >
                                 3 and more
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div> */}
            </div>
         </div>
      </>
   );
};

export default FilterButton;
