"use client";

import React from "react";
import {
   useEffect,
   useState
} from "react";
import "../../../form.css";
import "../CreateItinerary.css";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
   ErrorMessage,
   SelectField
} from "../../../components";
import AddItemDrawer from "../AddItemDrawer";
import { useDispatch, useSelector } from "react-redux";
import {
   createItinerary,
   _setAddedItineraryItemList,
   setCoverImage,
   setDescription,
   setGenericDiscountCode,
   setPrice,
   setSelectedCountry,
   setSuitableFor,
   setTitle
} from "../../../store/slices/itinerary";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCities } from "../../../store/slices/countries";
import ItineraryItemCard from "../../../components/itineraryItemCard.js/itineraryItemCard";

export default function CreateItineraryForm({
   session,
   coverCountriesList,
   itinerariesCategories,
   suitableForList,
   priceList
}) {

   const access_token = session?.user?.access_token;

   const dispatch = useDispatch();

   const {
      selectedCountry,
      title,
      description,
      suitableFor,
      genericDiscountCode,
      price,
      addedItinerariesList,
      coverImage
   } = useSelector((state) => state?.itineraries);

   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const [editableItineraryItem, setEditableItineraryItem] = useState({});

   const [addedItineraryList, setAddedItineraryList] = useState(addedItinerariesList || []);

   const [itineraryListErr, setAddedItineraryListErr] = useState(false);

   const [show, setShow] = useState(false);

   const [previewImage, setPreviewImage] = useState(coverImage);

   const { citiesList } = useSelector((state) => state.countries);

   const validationSchema = Yup.object().shape({
      cover_image: Yup.mixed()
         .required("Cover image is required"),
      selected_country_id: Yup.object().required("Country is required"),
      title: Yup.string()
         .required("Title is required")
         .min(48, "Title must be at least 48 characters")
         .max(96, "Title must be at most 96 characters"),
      description: Yup.string()
         .required("Description of location is required")
         .min(48, "Description must be at least 48 characters")
         .max(200, "Description must be at most 200 characters"),
      // suitable_for_id: Yup.array()
      //    .min(1, "At least one must be selected")
      //    .required("Suitable for is required"),
      price: Yup.string().required("Price is required"),
   });

   function base64ToFile(base64) {
      if (typeof base64 !== 'string') {
         throw new TypeError('Expected base64 to be a string');
      }

      // Split the base64 string to get the content type and the data
      const [metadata, base64Data] = base64.split(',');

      if (!metadata || !base64Data) {
         throw new Error('Invalid base64 string format');
      }

      const mimeTypeMatch = metadata.match(/:(.*?);/);

      if (!mimeTypeMatch) {
         throw new Error('Invalid metadata in base64 string');
      }

      const mimeType = mimeTypeMatch[1];
      const fileExtension = mimeType.split('/')[1];
      const defaultFileName = `file.${fileExtension}`;

      // Decode the base64 string to binary data
      const byteCharacters = atob(base64Data);

      // Create an array of 8-bit unsigned integers
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      // Create a Blob from the array of bytes
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      // Convert the Blob to a File object
      const file = new File([blob], defaultFileName, { type: mimeType });

      return file;
   }


   const formik = useFormik({
      initialValues: {
         cover_image: coverImage,
         selected_country_id: selectedCountry,
         title: title,
         description: description,
         suitable_for_id: suitableFor,
         generic_discount_code: genericDiscountCode,
         price: price,
      },
      validationSchema,
      onSubmit: async (itinerary) => {
         const formData = new FormData();
         const cover_image = base64ToFile(coverImage);
         formData.append("cover_image", cover_image);
         formData.append(
            "selected_country_id",
            itinerary.selected_country_id?.id
         );
         formData.append("title", itinerary.title);
         formData.append("description", itinerary.description);

         if (itinerary?.suitable_for_id) {
            itinerary?.suitable_for_id?.map((item) =>
               formData.append("suitable_for_id", item.value)
            );
         }

         formData.append(
            "generic_discount_code",
            itinerary.generic_discount_code
         );
         formData.append("price", itinerary.price);
         addedItineraryList.forEach((singleItinerary, index) => {
            for (const key in singleItinerary) {
               if (key === "location_images") {
                  singleItinerary[key].forEach((image) => {
                     const convertedImage = base64ToFile(image)
                     formData.append(`itineraries[${index}][${key}]`, convertedImage);
                  });
               } else {
                  formData.append(
                     `itineraries[${index}][${key}]`,
                     singleItinerary[key]
                  );
               }
            }
         });

         formData.append("itinerary_count", addedItineraryList?.length);

         // for (var pair of formData.entries()) {
         //    console.log(pair[0] + ", " + pair[1]);
         // }

         if (!itineraryListErr) {
            setLoading(true);
            const res = await dispatch(
               createItinerary({ access_token, formData })
            );
            if (res?.payload?.status === true) {
               // setLoading(false);
               toast.success(res?.payload?.message);
               await dispatch(setTitle(''));
               await dispatch(setDescription(''));
               await dispatch(setCoverImage(null));
               await dispatch(setSelectedCountry(null));
               await dispatch(setSuitableFor(null));
               await dispatch(setGenericDiscountCode(''));
               await dispatch(setPrice(''));
               await dispatch(_setAddedItineraryItemList([]));
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

   const handleUpdateAnItinerary = (data) => {
      setEditableItineraryItem(data);
      setShow(true);
   };

   const deleteOnClick = (id) => {
      const updatedAddedItinerariesList = addedItinerariesList.filter(user => user.id !== id);
      setAddedItineraryList(updatedAddedItinerariesList);
      dispatch(_setAddedItineraryItemList(updatedAddedItinerariesList));
   }

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      formik.setFieldValue("cover_image", file);
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreviewImage(reader.result);
            dispatch(setCoverImage(reader.result));
         };
         reader.readAsDataURL(file);
      }
   };


   function convertToTitleCase(str) {
      return str.charAt(0) + str.slice(1).toLowerCase();
   }

   const fromCountriesOptions = coverCountriesList?.data?.map((data, _) => ({
      value: data?.id,
      label: convertToTitleCase(data?.name),
      id: data?.id,
   }));

   const _suitableForList = suitableForList?.map((data, _) => ({
      value: data?.id,
      label: data?.name,
   }));

   const _citiesList = citiesList?.data?.map((data, _) => ({
      value: data?.id,
      label: data?.name,
      id: data?.id,
   }));

   const categoriesList = itinerariesCategories?.map((data, _) => ({
      value: data?.id,
      label: data?.name,
      id: data?.id,
   }));

   useEffect(() => {
      if (session?.status !== "loading") {
         const country_id = 99;
         dispatch(
            getCities({
               access_token,
               country_id,
            })
         );
      }
   }, [access_token, dispatch, session?.status]);

   return (
      <>
         <div className="content-container position-relative pt-0">
            <div className="container">
               <div className="row">
                  <div className="col-lg-10 mx-auto">
                     <div className="itinerary-form-container position-relative">
                        <div className="table-form-heading">
                           Create Itinerary
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
                        {previewImage &&
                           <label className='uplaod-itinerary-img-btn btn btn-primary' style={{ position: 'absolute', right: "43px", top: "87px", zIndex: 1 }} htmlFor="upload-btn">Change/Replace</label>
                        }
                        <div className="mb-4">
                           <div className={`upload-cover-img`}>
                              <label htmlFor={`${!previewImage && `upload-btn`}`}>
                                 {previewImage ? (
                                    <Image src={previewImage} fill alt="" />
                                 ) : (
                                    <Image
                                       className="cursor-pointer"
                                       src="/images/upload-cover.jpg"
                                       fill
                                       alt=""
                                    />
                                 )}
                              </label>
                           </div>
                           <ErrorMessage
                              touched={formik.touched?.cover_image}
                              error={formik.errors?.cover_image}
                           />
                        </div>
                        <div className="table-form-wrapper mb-4">
                           <div className="table-form-row">
                              <div className="form-group d-flex align-items-center justify-content-center">
                                 <div className="form-group-left">
                                    <label className="form-label type2">
                                       Select Country*
                                    </label>
                                 </div>
                                 <div className="form-group-right create-itinerary-country-dropdown">
                                    <SelectField
                                       borderNone
                                       className="form-select-container"
                                       classNamePrefix="form-select"
                                       name="selected_country_id"
                                       options={fromCountriesOptions}
                                       onChange={(fieldName, data) => {
                                          formik.setFieldValue(fieldName, data);
                                          dispatch(getCities({ country_id: data?.id }));
                                          dispatch(setSelectedCountry(data))
                                       }}
                                       placeholder="Select"
                                       onBlur={formik.handleBlur}
                                       error={
                                          formik.touched.selected_country_id &&
                                          formik.errors.selected_country_id
                                       }
                                       defaultValue={formik?.values?.selected_country_id}
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
                                          onChange={(e) => {
                                             formik.setFieldValue('title', e.target.value);
                                             dispatch(setTitle(e.target.value))
                                          }}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.title || title}
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
                                          onChange={(e) => {
                                             formik.setFieldValue('description', e.target.value);
                                             dispatch(setDescription(e.target.value));
                                          }}
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
                                 <div className="form-group-right create-itinerary-suitable-dropdown">
                                    <SelectField
                                       isMulti
                                       borderNone
                                       className="form-select-container multi-select"
                                       classNamePrefix="form-select"
                                       isSearchable={false}
                                       name="suitable_for_id"
                                       options={_suitableForList}
                                       onChange={(fieldName, data) => {
                                          formik.setFieldValue(fieldName, data);
                                          dispatch(setSuitableFor(data))
                                       }}
                                       placeholder="Select"
                                       onBlur={formik.handleBlur}
                                       // error={
                                       //    formik.touched.suitable_for_id &&
                                       //    formik.errors.suitable_for_id
                                       // }
                                       defaultValue={formik?.values?.suitable_for_id}
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
                                       onChange={(e) => {
                                          formik.setFieldValue('generic_discount_code', e.target.value);
                                          dispatch(setGenericDiscountCode(e.target.value))
                                       }} onBlur={formik.handleBlur}
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
                                                onClick={() => {
                                                   formik?.setFieldValue(
                                                      "price",
                                                      parseInt(p?.price)
                                                   );
                                                   dispatch(setPrice(parseInt(p?.price)))
                                                }
                                                }
                                                className="form-check custom-radio d-flex align-items-center"
                                             >
                                                <input
                                                   className="form-check-input"
                                                   type="radio"
                                                   name="price"
                                                   id={`${parseInt(p?.price)}${i}`}
                                                   checked={parseInt(formik?.values?.price) === parseInt(p?.price)}
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
                        {addedItineraryList?.length > 0 &&
                           addedItineraryList?.map((data, index) => {

                              const city = _citiesList?.find((city) => (city?.id === data?.city));

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
                                             postCode={data?.post_code}
                                             city={city?.label}
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
                                                   onClick={() => setShow(true)}
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
                              onClick={() => {
                                 if (addedItineraryList?.length === 0) {
                                    setAddedItineraryListErr(true);
                                 }
                                 formik.handleSubmit();
                              }}
                              className="btn btn-default btn-block"
                           >
                              Publish
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
            options={categoriesList}
            editableItineraryItem={editableItineraryItem}
            setAddedItineraryList={setAddedItineraryList}
            addedItineraryList={addedItineraryList}
            setEditableItineraryItem={setEditableItineraryItem}
            setAddedItineraryListErr={setAddedItineraryListErr}
            cities={_citiesList}
         />
      </>
   );
}
