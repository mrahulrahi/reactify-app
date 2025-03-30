"use client";

import React from "react";
import { useEffect, useState } from "react";
import "../../../form.css";
import "../CreateItinerary.css";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage, SelectField } from "../../../components";
import AddItemDrawer from "../AddItemDrawer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCities } from "../../../store/slices/countries";
import { _setAddedItineraryItemList, deleteItineraryItem, updateItinerary } from "../../../store/slices/itinerary";
import ItineraryItemCard from "../../../components/itineraryItemCard.js/itineraryItemCard";

export default function UpdateItineraryForm({
   session,
   coverCountriesList,
   itinerary,
   itinerariesCategories,
   suitableForList,
   priceList
}) {
   const access_token = session?.user?.access_token;

   const dispatch = useDispatch();

   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const [editableItineraryItem, setEditableItineraryItem] = useState({});

   const [addedItineraryList, setAddedItineraryList] = useState(
      itinerary?.itinerary_items
   );

   const [itineraryListErr, setAddedItineraryListErr] = useState(false);

   const [show, setShow] = useState(false);

   const [previewImage, setPreviewImage] = useState(null);

   const validationSchema = Yup.object().shape({
      cover_image: Yup.mixed()
         .required("Cover image is required"),
      // suitable_for_id: Yup.array()
      //    .min(1, "At least one must be selected")
      //    .required("Suitable for is required"),
      title: Yup.string()
         .required("Title is required")
         .min(48, "Title must be at least 48 characters")
         .max(96, "Title must be at most 96 characters"),
      description: Yup.string()
         .required("Description of location is required")
         .min(48, "Description must be at least 48 characters")
         .max(200, "Description must be at most 200 characters"),
      price: Yup.string().required("Price is required"),
   });

   const selected_country = {
      value: itinerary?.itinerary?.selected_country?.id,
      label: convertToTitleCase(itinerary?.itinerary?.selected_country?.name),
   };

   const _suitableForList = suitableForList?.map((data, _) => ({
      value: data?.id,
      label: data?.name,
      id: data?.id
   }));

   const defaultSuitable = itinerary?.itinerary?.suitable_for?.map((data, _) => ({
      value: data?.id, label: data?.name, id: data?.id
   }));

   const [prevItitnerariesItems, setPrevItinerariesItems] = useState(addedItineraryList);

   const formik = useFormik({
      initialValues: {
         cover_image: itinerary?.itinerary?.cover_image || "",
         selected_country_id: selected_country,
         title: itinerary?.itinerary?.title || "",
         description: itinerary?.itinerary?.description || "",
         suitable_for_id: itinerary?.itinerary?.suitable_for || "",
         generic_discount_code:
            itinerary?.itinerary?.generic_discount_code || "",
         price: parseFloat(itinerary?.itinerary?.price) || "",
      },
      validationSchema,
      onSubmit: async (data) => {

         let changedItems = [];

         for (let i = 0; i < addedItineraryList.length; i++) {
            const addedItem = addedItineraryList[i];
            const prevItem = prevItitnerariesItems.find(item => item.id === addedItem.id);

            if (!prevItem) {
               changedItems.push({ ...addedItem, action: 'added' }); // Item is added
            } else {
               // Check if any properties have changed
               const properties = ['name_of_place', 'type_of_location', 'entry_fees', 'category_of_location', 'address', 'post_code', 'city', 'direction', 'open_timing', 'best_time_to_visit', 'discount_code', 'is_seen'];
               let hasChanges = false;

               for (const prop of properties) {
                  if (addedItem[prop] !== prevItem[prop]) {
                     hasChanges = true;
                     break;
                  }
               }

               // Check for changes in location_images
               if (!hasChanges && addedItem.location_images.length !== prevItem.location_images.length) {
                  hasChanges = true;
               }

               if (hasChanges) {
                  changedItems.push({ ...addedItem, action: 'updated' }); // Item is updated
               }
            }
         }

         const formData = new FormData();
         if (previewImage) {
            formData.append("cover_image", data.cover_image);
         }
         formData.append(
            "selected_country_id",
            data.selected_country_id?.value
         );
         formData.append("title", data.title);
         formData.append("description", data.description);

         if (data?.suitable_for_id) {
            data?.suitable_for_id?.map((item) =>
               formData.append("suitable_for_id", item.id)
            );
         }

         formData.append("generic_discount_code", data.generic_discount_code);
         formData.append("price", data.price);
         for (let index = 0; index < changedItems.length; index++) {
            const singleItinerary = changedItems[index];
            const keys = Object.keys(singleItinerary);
            for (let i = 0; i < keys.length; i++) {
               const key = keys[i];
               if (key === "id") {
                  const idToSend =
                     typeof singleItinerary[key] === "number"
                        ? singleItinerary[key]
                        : null;
                  formData.append(`itineraries[${index}][${key}]`, idToSend);
               } else if (key === "location_images") {
                  const images = singleItinerary[key];
                  for (let i = 0; i < images.length; i++) {
                     if (Object.keys(images[i])?.length === 0) {
                        formData.append(
                           `itineraries[${index}][${key}]`,
                           images[i]
                        );
                     } else {
                        formData.append(
                           `itineraries[${index}][${key}]`,
                           parseInt(images[i]?.id)
                        );
                     }
                  }
               } else {
                  formData.append(
                     `itineraries[${index}][${key}]`,
                     singleItinerary[key]
                  );
               }
            }
         }

         formData.append("itinerary_count", changedItems?.length);

         // for (var pair of formData.entries()) {
         //    console.log(pair[0] + ", " + pair[1]);
         // }

         setLoading(true);

         const id = itinerary?.itinerary?.id;
         const res = await dispatch(
            updateItinerary({ access_token, formData, id })
         );

         if (res?.payload?.status === true) {
            // setLoading(false);
            toast.success(res?.payload?.message);
            router.push("/influencer/my-profile");
            router.refresh();
         } else {
            setLoading(false);
         }
      },
   });

   const handleUpdateAnItinerary = (data) => {
      setEditableItineraryItem(data);
      setShow(true);
   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      formik.setFieldValue("cover_image", file);
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreviewImage(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const { citiesList } = useSelector((state) => state.countries);

   function convertToTitleCase(str) {
      return str.charAt(0) + str.slice(1).toLowerCase();
   }

   const fromCountriesOptions = coverCountriesList?.data?.map((data, _) => ({
      value: data?.id,
      label: convertToTitleCase(data?.name),
      id: data?.id,
   }));

   const _citiesList = citiesList?.data?.map((data, _) => ({
      value: data?.id,
      label: data?.name,
   }));

   useEffect(() => {
      if (session?.status !== "loading") {
         const country_id = itinerary?.itinerary?.selected_country?.id;
         dispatch(
            getCities({
               access_token,
               country_id,
            })
         );
      }
   }, [access_token, dispatch, session?.status]);

   useEffect(() => {
      setPrevItinerariesItems(addedItineraryList)
   }, [])

   return (
      <>
         <div className="content-container position-relative pt-0">
            <div className="container">
               <div className="row">
                  <div className="col-lg-10 mx-auto">
                     <div className="itinerary-form-container position-relative">
                        <div className="table-form-heading">
                           Update Itinerary
                        </div>
                        <input
                           type="file"
                           id="upload-btn"
                           name="cover_image"
                           onChange={handleFileChange}
                           onBlur={formik.handleBlur}
                           accept="image/jpeg,image/png"
                           style={{ display: "none" }}
                        />
                        <label className='uplaod-itinerary-img-btn btn btn-primary' style={{ position: 'absolute', right: "43px", top: "87px", zIndex: 1 }} htmlFor="upload-btn">Change/Replace</label>
                        <div className={`upload-cover-img mb-4`}>
                           {previewImage ? (
                              <Image src={previewImage} fill alt="" />
                           ) : (
                              <Image
                                 src={formik?.values?.cover_image}
                                 fill
                                 alt=""
                              />
                           )}
                        </div>
                        <ErrorMessage
                           touched={formik.touched?.cover_image}
                           error={formik.errors?.cover_image}
                        />
                        <div className="table-form-wrapper mb-4">
                           <div className="table-form-row">
                              <div className="form-group d-flex align-items-center justify-content-center">
                                 <div className="form-group-left">
                                    <label className="form-label type2">
                                       Select Country*
                                    </label>
                                 </div>
                                 <div className="form-group-right">
                                    <SelectField
                                       borderNone
                                       className="form-select-container"
                                       classNamePrefix="form-select"
                                       name="selected_country_id"
                                       options={fromCountriesOptions}
                                       onChange={(fieldName, data) => {
                                          formik.setFieldValue(fieldName, data);
                                          const country_id = data?.id
                                          dispatch(getCities({ access_token, country_id }))
                                       }}
                                       placeholder="Select"
                                       onBlur={formik.handleBlur}
                                       error={
                                          formik.touched.selected_country_id &&
                                          formik.errors.selected_country_id
                                       }
                                       defaultValue={selected_country}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="table-form-row">
                              <div className="form-group d-flex align-items-center justify-content-center">
                                 <div className="form-group-left pe-5">
                                    <label className="form-label type2">
                                       Title*
                                    </label>
                                 </div>
                                 <div className="form-group-right d-flex justify-content-between">
                                    <div className="w-100">
                                       <input
                                          type="text"
                                          id="title"
                                          name="title"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.title}
                                          placeholder="Best place to visit in Osaka"
                                          className="form-control type2"
                                       />
                                       <div>
                                          <ErrorMessage
                                             touched={formik.touched?.title}
                                             error={formik.errors?.title}
                                          />
                                       </div>
                                    </div>
                                    <div className="form-text">
                                       {formik?.values?.title?.length}/96
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="table-form-row">
                              <div className="form-group d-flex align-items-center justify-content-center">
                                 <div className="form-group-left pe-5">
                                    <label className="form-label type2">
                                       Description*
                                    </label>
                                 </div>
                                 <div className="form-group-right d-flex justify-content-between">
                                    <div className="w-100">
                                       <textarea
                                          className="form-control type2"
                                          placeholder="Trip to north japan connecting the famous spots, guided by professional guide, Famous for landscapes and scenic photographs of beautiful places."
                                          id="description"
                                          name="description"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.description}
                                       ></textarea>
                                       <div className="pt-3">
                                          <ErrorMessage
                                             touched={
                                                formik.touched?.description
                                             }
                                             error={formik.errors?.description}
                                          />
                                       </div>
                                    </div>
                                    <div className="form-text">
                                       {formik?.values?.description?.length}/200
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="table-form-row">
                              <div className="form-group d-flex align-items-center justify-content-center">
                                 <div className="form-group-left">
                                    <label className="form-label type2">
                                       Suitable for
                                    </label>
                                 </div>
                                 <div className="form-group-right">
                                    <SelectField
                                       isSearchable={false}
                                       closeMenuOnSelect={false}
                                       isMulti
                                       borderNone
                                       className="form-select-container multi-select"
                                       classNamePrefix="form-select"
                                       name="suitable_for_id"
                                       options={_suitableForList}
                                       onChange={(fieldName, data) => {
                                          formik.setFieldValue(fieldName, data);
                                       }}
                                       placeholder="Select"
                                       onBlur={formik.handleBlur}
                                       error={
                                          formik.touched.suitable_for_id &&
                                          formik.errors.suitable_for_id
                                       }
                                       defaultValue={defaultSuitable}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="table-form-row">
                              <div className="form-group d-flex align-items-center justify-content-center">
                                 <div className="form-group-left">
                                    <label className="form-label type2">
                                       Add your generic discount codes
                                    </label>
                                 </div>
                                 <div className="form-group-right d-flex flex-column">
                                    <input
                                       type="text"
                                       id="generic_discount_code"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={
                                          formik.values.generic_discount_code
                                       }
                                       placeholder="Use my code R10N10 for a 10% discount on your purchase from www.amazon.com"
                                       className="form-control type2"
                                       name="generic_discount_code"
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="table-form-row">
                              <div className="form-group d-flex align-items-center justify-content-center">
                                 <div className="form-group-left">
                                    <label className="form-label type2">
                                       Price*
                                    </label>
                                 </div>
                                 <div className="form-group-right d-flex">
                                    <div className="d-flex flex-column">
                                       <div
                                          className="form-radio-check-group d-flex flex-wrap align-items-center"
                                          id="price"
                                       >
                                          {priceList?.priceList?.map((p, i) => (
                                             <div
                                                key={i}
                                                onClick={(e) =>
                                                   formik?.setFieldValue(
                                                      "price",
                                                      parseInt(p?.price)
                                                   )
                                                }
                                                className="form-check custom-radio d-flex align-items-center"
                                             >
                                                <input
                                                   className="form-check-input"
                                                   type="radio"
                                                   name="price"
                                                   id={`${parseInt(p?.price)}${i}`}
                                                   checked={formik?.values?.price === parseInt(p?.price)}
                                                />
                                                <label
                                                   className="form-check-label"
                                                   htmlFor={`${parseInt(p?.price)}${i}`}
                                                >
                                                   ${parseInt(p?.price)}
                                                </label>
                                             </div>
                                          ))}
                                       </div>
                                       <ErrorMessage
                                          touched={formik.touched?.price}
                                          error={formik.errors?.price}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {addedItineraryList?.length > 0 &&
                           addedItineraryList?.map((data, index) => {
                              const city = _citiesList?.find((city) => (city?.value === data?.city));
                              const categoryOfLocation = itinerariesCategories?.find((cat) => (cat?.id === data?.category_of_location));
                              return (
                                 <div
                                    className="place-list-outer mb-3"
                                    key={index}
                                 >
                                    <ul className="place-list position-relative">
                                       <li
                                          className="place-item position-relative"
                                       >
                                          <ItineraryItemCard
                                             categoryOfLocation={categoryOfLocation?.name}
                                             isSeen={data?.is_seen}
                                             nameOfPlace={data?.name_of_place}
                                             address={data?.address}
                                             openTiming={data?.open_timing}
                                             entryFee={data?.entry_fees}
                                             locationImg={data?.location_images}
                                             direction={data?.direction}
                                             itineraryName={itinerary?.itinerary?.title}
                                             postCode={data?.post_code}
                                             city={city?.label}
                                             isFromUpdateIitinerary
                                             countryName={formik?.values?.selected_country_id?.label}
                                             handleUpdateAnItinerary={() => handleUpdateAnItinerary(data)}
                                          />
                                       </li>
                                       {addedItineraryList?.length ===
                                          index + 1 && (
                                             <li className="place-item position-relative">
                                                <button
                                                   className="add-btn d-flex align-items-center justify-content-center"
                                                   onClick={() => {
                                                      setShow(true);
                                                      setEditableItineraryItem({});
                                                   }}
                                                >
                                                   <div className="add-btn-icon d-flex align-items-center justify-content-center">
                                                      <Image
                                                         src="/images/add-button-icon.svg"
                                                         alt=""
                                                         width={20}
                                                         height={20}
                                                      />
                                                   </div>
                                                   Add item
                                                </button>
                                             </li>
                                          )}
                                    </ul>
                                 </div>
                              );
                           })}
                        <div className="col-lg-6 mx-auto mt-4">
                           <button
                              type="button"
                              disabled={loading}
                              onClick={formik.handleSubmit}
                              className="btn btn-default btn-block"
                           >
                              Update
                              {loading && (
                                 <div
                                    className="spinner-border spinner-border-sm mx-3"
                                    role="status"
                                 />
                              )}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <AddItemDrawer
            show={show}
            setShow={setShow}
            editableItineraryItem={editableItineraryItem}
            setAddedItineraryList={setAddedItineraryList}
            addedItineraryList={addedItineraryList}
            setEditableItineraryItem={setEditableItineraryItem}
            setAddedItineraryListErr={setAddedItineraryListErr}
            cities={_citiesList}
            options={itinerariesCategories}
         />
      </>
   );
}
