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
      generic_discount_code: Yup.string(),
      affiliate_title: Yup.string().when("generic_discount_code", (genericDiscountCode, schema) => {
         if (genericDiscountCode?.[0]?.trim().length > 0) {
            return schema.required("Affiliate hyperlink title is required when affiliate link is provided");
         }
         return schema.notRequired();
      }),
      title: Yup.string()
         .required("Title is required")
         .min(48, "Title must be at least 48 characters")
         .max(96, "Title must be at most 96 characters"),
      description: Yup.string()
         .required("Description of location is required")
         .min(48, "Description must be at least 48 characters")
         .max(200, "Description must be at most 200 characters"),
      price: Yup.number()
         .required("Price is required")
         .test("is-valid-price", "Price must be a valid number between 1 and 200 or 0 (Free)", function (value) {
            const radioOptions = [0, ...priceList?.priceList?.map((p) => p.price)]; // Include 0 and other radio button values
            return radioOptions.includes(value) || (value >= 1 && value <= 200);
         })
         .typeError("Price must be a valid number"),
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

   const [deletedItineraries, setDeletedItineraries] = useState([]);

   const formik = useFormik({
      initialValues: {
         cover_image: itinerary?.itinerary?.cover_image || "",
         selected_country_id: selected_country,
         title: itinerary?.itinerary?.title || "",
         description: itinerary?.itinerary?.description || "",
         suitable_for_id: itinerary?.itinerary?.suitable_for || "",
         generic_discount_code:
            itinerary?.itinerary?.generic_discount_code || "",
         affiliate_title: itinerary?.itinerary?.affiliate_title || "",
         price: itinerary?.itinerary?.price || 0,
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
               const properties = ['name_of_place', 'description', 'type_of_location', 'entry_fees', 'category_of_location', 'address', 'post_code', 'city', 'direction', 'open_timing', 'best_time_to_visit', 'discount_code', 'is_seen'];
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
         formData.append("affiliate_title", data.affiliate_title);
         formData.append("price", data.price);
         for (let index = 0; index < changedItems.length; index++) {
            const singleItinerary = changedItems[index];
            const keys = Object.keys(singleItinerary);
            for (let i = 0; i < keys.length; i++) {
               const key = keys[i];

               // Skip appending if post_code value is an empty string
               if (key === "post_code" && singleItinerary[key] === "") {
                  continue;
               }

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

         formData.append("deleted_itineraries", JSON.stringify(deletedItineraries));

         // for (var pair of formData.entries()) {
         //    console.log(pair[0] + ", " + pair[1]);
         // }

         if (!itineraryListErr) {
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
         } else {
            setAddedItineraryListErr(true);
         }
      },
   });

   const deleteOnClick = (id) => {
      // console.log(typeof id);

      if (typeof id === "number") {
         setDeletedItineraries(prev => {
            if (!prev.includes(id)) {
               return [...prev, id]; // Append only if not already present
            }
            return prev; // Return unchanged state if ID exists
         });

      }
      const updatedAddedItinerariesList = addedItineraryList.filter(user => user.id !== id);
      setAddedItineraryList(updatedAddedItinerariesList);
      dispatch(_setAddedItineraryItemList(updatedAddedItinerariesList));
   }

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

                           <div className="d-flex table-form-row px-0">
                              <div className="table-form-row border-0">
                                 <div className="form-group d-flex align-items-center justify-content-center">
                                    <div className="form-group-left">
                                       <label className="form-label type2">
                                          Affiliate hyperlink title
                                       </label>
                                    </div>
                                    <div className="form-group-right d-flex flex-column">
                                       <input
                                          type="text"
                                          id="affiliate_title"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={
                                             formik.values.affiliate_title
                                          }
                                          placeholder="Enter the title"
                                          className="form-control type2"
                                          name="affiliate_title"
                                       />
                                       <ErrorMessage
                                          touched={formik.touched?.affiliate_title}
                                          error={formik.errors?.affiliate_title}
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="table-form-row border-0">
                                 <div className="form-group d-flex align-items-center justify-content-center">
                                    <div className="form-group-left">
                                       <label className="form-label type2">
                                          Affiliate hyperlink address
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
                                          placeholder="Paste the link here"
                                          className="form-control type2"
                                          name="generic_discount_code"
                                       />
                                    </div>
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
                                       <div className="form-radio-check-group d-flex flex-wrap align-items-center" id="price">
                                          {priceList?.priceList?.map((p, i) => (
                                             <div
                                                key={i}
                                                onClick={() => formik?.setFieldValue("price", p?.price)}
                                                className="form-check custom-radio d-flex align-items-center"
                                             >
                                                <input
                                                   className="form-check-input"
                                                   type="radio"
                                                   name="price"
                                                   id={`${p?.price}${i}`}
                                                   checked={formik?.values?.price == parseInt(p?.price)}
                                                   onChange={() => formik?.setFieldValue("price", parseInt(p?.price))}
                                                />
                                                <label className="form-check-label" htmlFor={`${p?.price}${i}`}>
                                                   {p?.price != 0 ? `$${parseInt(p?.price)}` : "Free"}
                                                </label>
                                             </div>
                                          ))}
                                          <div className="form-radio-check-group d-flex flex-wrap align-items-center">
                                             <div className="form-check custom-radio d-flex align-items-center">
                                                <input
                                                   style={{ height: "38px", width: "85px" }}
                                                   value={parseInt(formik?.values?.price)}
                                                   name="price"
                                                   id="priceInput"
                                                   onChange={(e) => {
                                                      const inputValue = e.target.value;

                                                      if (inputValue === "") {
                                                         // Allow clearing the input
                                                         formik?.setFieldValue("price", "");
                                                      } else {
                                                         // Parse the value as an integer if valid
                                                         formik?.setFieldValue("price", parseInt(inputValue, 10) || 0);
                                                      }
                                                   }}
                                                   placeholder="Custom"
                                                   className="form-control form-control-sm ml-2"
                                                   type="number"
                                                />
                                             </div>
                                          </div>
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
                                             affiliateTitle={data?.affiliate_title}
                                             discountCode={data?.discount_code}
                                             categoryOfLocation={categoryOfLocation?.name}
                                             isSeen={data?.is_seen}
                                             nameOfPlace={data?.name_of_place}
                                             description={data?.description}
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
                                             deleteOnClick={() => deleteOnClick(data?.id)}
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
                        {addedItineraryList?.length === 0 && (
                           <div
                              className="add-item-btn-box"
                              onClick={() => {
                                 setEditableItineraryItem({});
                                 setShow(true);
                              }}
                           >
                              <button
                                 type="button"
                                 className="add-btn d-flex align-items-center justify-content-center"
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
                           </div>
                        )}
                        {itineraryListErr && (
                           <p
                              className="text-danger mt-2 ms-2"
                              style={{ fontSize: "13px" }}
                           >
                              Minimum one itinerary item is required
                           </p>
                        )}
                        <div className="col-lg-6 mx-auto mt-4">
                           <button
                              type="button"
                              disabled={loading}
                              onClick={() => {
                                 if (addedItineraryList?.length === 0) {
                                    setAddedItineraryListErr(true);
                                 }
                                 formik.handleSubmit();
                              }}
                              // onClick={formik.handleSubmit}
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
