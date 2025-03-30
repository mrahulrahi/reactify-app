import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Offcanvas } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { ErrorMessage, SelectField } from "../../components";
import toast from "react-hot-toast";

export default function AddItemDrawer({
   show,
   setShow,
   editableItineraryItem,
   addedItineraryList,
   setAddedItineraryList,
   setEditableItineraryItem,
   setAddedItineraryListErr,
   cities,
   options
}) {

   const [itemId, setItemId] = useState();

   const validationSchema = Yup.object().shape({
      name_of_place: Yup.string().required("Name of place is required"),
      description: Yup.string()
         .required("Description of place is required")
         .max(1200, "Description must be 1200 characters or less"),
      type_of_location: Yup.number().required("Type of location is required"),
      entry_fees: Yup.number().required("Type of entry fees is required"),
      category_of_location: Yup.object().required(
         "Category of location is required"
      ),
      post_code: Yup.string()
         // .required("Post code is required")
         .matches(/^[0-9]+$/, "Post code must contain only numbers").nullable(),
      // address: Yup.string().required("Address is required"),
      // discount_code: Yup.string().required("Discount code is required"),
      // open_timing: Yup.string().required("Open timing is required"),
      // best_time_to_visit: Yup.string().required(
      //    "Which time to visit is required"
      // ),
      discount_code: Yup.string(),
      affiliate_title: Yup.string().when("discount_code", (discount_code, schema) => {
         if (discount_code?.[0]?.trim().length > 0) {
            return schema.required("Affiliate title is required when affiliate link is provided");
         }
         return schema.notRequired();
      }),
      city: Yup.object().required("City is required"),
      direction: Yup.string()
         .matches(
            /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
            "Invalid URL. Must be a valid URL."
         )
         .required("Direction link is required"),
      location_images: Yup.array()
         .min(1, "Please upload at least one image")
         .max(5, "You can upload a maximum of five images"),
   });

   const handleFileChange = (e) => {
      const filesArray = Array.from(e.currentTarget.files);
      const updatedImages = [..._formik.values.location_images];
      filesArray.forEach((file) => {
         updatedImages.push(file);
      });
      _formik.setFieldValue("location_images", updatedImages);
   };

   const removeImage = (index) => {
      const updatedImages = [..._formik.values.location_images];
      updatedImages.splice(index, 1); // Remove the image at the specified index
      _formik.setFieldValue("location_images", updatedImages);
   };


   function isUrl(str) {
      const urlRegex = /^(?:https?|ftp):\/\/[\w/\-?=%.]+\.[\w/\-?=%.]+$/;
      return urlRegex.test(str);
   }

   const editableObjLength = Object.keys(editableItineraryItem).length;

   const itinerariesCategoriesList = options?.map((data, _) => ({
      value: data?.id,
      label: data?.name,
      id: data?.id
   }));

   const _formik = useFormik({
      initialValues: {
         name_of_place: "",
         description: "",
         type_of_location: null,
         category_of_location: "",
         entry_fees: null,
         address: "",
         post_code: "",
         city: "",
         direction: "",
         open_timing: "",
         // best_time_to_visit: "",
         discount_code: "",
         affiliate_title: "",
         location_images: [],
         is_seen: null
      },
      validationSchema,
      onSubmit: (values, { resetForm }) => {
         setAddedItineraryListErr(false);
         const addedLocation = {
            id: itemId || uuidv4(),
            name_of_place: values.name_of_place,
            description: values.description,
            type_of_location: values.type_of_location,
            entry_fees: values.entry_fees,
            category_of_location: values?.category_of_location?.value,
            address: values.address,
            post_code: values.post_code,
            city: values.city?.value,
            direction: values.direction,
            open_timing: values.open_timing,
            // best_time_to_visit: values.best_time_to_visit,
            discount_code: values.discount_code ? values.discount_code : "",
            affiliate_title: values.affiliate_title,
            location_images: values.location_images,
            is_seen: values?.is_seen
         };

         const existingIndex = addedItineraryList.findIndex((item) => {
            if (typeof values?.id === "number") {
               return parseInt(item.id) === parseInt(editableItineraryItem.id);
            } else {
               return item.id === editableItineraryItem.id;
            }
         });

         if (existingIndex !== -1) {
            const updatedList = [...addedItineraryList];
            updatedList[existingIndex] = addedLocation;
            setAddedItineraryList(updatedList);
         } else {
            setAddedItineraryList([...addedItineraryList, addedLocation]);
         }
         toast.success(editableObjLength > 0 ? `Updated successfully` : `Added successfully`);
         setShow(false);
         resetForm();
      },
   });

   useEffect(() => {
      const defaultCategory = itinerariesCategoriesList?.find(
         (item) =>
            item.id ===
            editableItineraryItem.category_of_location
      );

      const defaultCity = cities?.find(
         (item) => parseInt(item?.value) === parseInt(editableItineraryItem.city)
      );

      if (editableItineraryItem) {
         _formik.setValues({
            name_of_place: editableItineraryItem.name_of_place || "",
            description: editableItineraryItem.description || "",
            type_of_location: editableItineraryItem.type_of_location || "",
            entry_fees: editableItineraryItem.entry_fees || 0,
            category_of_location: defaultCategory || "",
            address: editableItineraryItem.address || "",
            post_code: editableItineraryItem.post_code || "",
            city: defaultCity,
            direction: editableItineraryItem.direction || "",
            open_timing: editableItineraryItem.open_timing || "",
            // best_time_to_visit: editableItineraryItem.best_time_to_visit || "",
            discount_code: editableItineraryItem.discount_code ? editableItineraryItem.discount_code : "",
            affiliate_title: editableItineraryItem.affiliate_title || "",
            location_images: editableItineraryItem.location_images || [],
            id: editableItineraryItem.id,
            is_seen: editableItineraryItem?.is_seen
         });

      }
      setItemId(editableItineraryItem?.id);
   }, [editableItineraryItem]);

   const locationOptions = [
      { id: 1, name: "Place" },
      { id: 2, name: "Food & Drink" },
      { id: 3, name: "Event" },
   ];

   const typeOfEntryFee = [
      { value: 0, label: "Free" },
      { value: 1, label: "Paid" },
   ];

   return (
      <Offcanvas
         show={show}
         onHide={() => {
            setEditableItineraryItem({});
            setShow(false);
         }}
         className="offcanvas offcanvas-end"
         placement="end"
      >
         <div className="offcanvas-header align-items-center justify-content-start">
            <button
               onClick={() => {
                  setEditableItineraryItem({});
                  setShow(false);
               }}
               type="button"
               className="modal-back-btn d-flex align-items-center justify-content-center"
            >
               <IoChevronBack />
            </button>
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
               {editableObjLength > 0 ? `Edit item` : "Add item"}
            </h5>
         </div>
         <div className="offcanvas-body" onSubmit={_formik.handleSubmit}>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">Name of place*</label>
                     <input
                        type="text"
                        placeholder="Eg. Tokyo Disneyland"
                        className="form-control"
                        name="name_of_place"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.name_of_place}
                     />
                     <ErrorMessage
                        touched={_formik.touched?.name_of_place}
                        error={_formik.errors?.name_of_place}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">Description*</label>
                     <textarea
                        type="text"
                        placeholder="Describe the event or activity you attended or participated in"
                        className="form-control"
                        name="description"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.description}
                     />
                     <ErrorMessage
                        touched={_formik.touched?.description}
                        error={_formik.errors?.description}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">Type of location*</label>
                     <div
                        className="form-radio-check-group d-flex flex-wrap align-items-center"
                        id="location"
                     >
                        {locationOptions.map((option, index) => (
                           <div
                              key={index}
                              className="form-check custom-radio d-flex align-items-center"
                              onClick={() => {
                                 _formik.setFieldValue(
                                    "type_of_location",
                                    option?.id
                                 );
                              }}
                           >
                              <input
                                 className="form-check-input"
                                 type="radio"
                                 name="location"
                                 id={`${option?.name}${option?.id}`}
                                 checked={_formik?.values?.type_of_location === option?.id}
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor={`${option?.name}${option?.id}`}
                              >
                                 {option?.name}
                              </label>
                           </div>
                        ))}
                     </div>
                     <ErrorMessage
                        touched={_formik.touched?.type_of_location}
                        error={_formik.errors?.type_of_location}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">Entry Fee*</label>
                     <div
                        className="form-radio-check-group d-flex flex-wrap align-items-center"
                        id="entry_fees"
                     >
                        {typeOfEntryFee.map((option, index) => (
                           <div
                              key={index}
                              className="form-check custom-radio d-flex align-items-center"
                              onClick={() =>
                                 _formik.setFieldValue(
                                    "entry_fees",
                                    option.value
                                 )
                              }
                           >
                              <input
                                 className="form-check-input"
                                 type="radio"
                                 name="entry_fees"
                                 // value={_formik?.values?.entry_fees}
                                 id={`${option?.label}${option?.value}`}
                                 checked={Object.keys(editableItineraryItem).length > 0 ? _formik?.values?.entry_fees == parseInt(option?.value) : null}
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor={`${option?.label}${option?.value}`}
                              >
                                 {option?.label}
                              </label>
                           </div>
                        ))}
                     </div>
                     <ErrorMessage
                        touched={_formik.touched?.entry_fees}
                        error={_formik.errors?.entry_fees}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">Category of location*</label>
                     <SelectField
                        className="form-select-container"
                        classNamePrefix="form-select"
                        name="category_of_location"
                        options={itinerariesCategoriesList}
                        onChange={(fieldName, data) => {
                           _formik.setFieldValue(fieldName, data);
                        }}
                        placeholder="Select"
                        onBlur={_formik.handleBlur}
                        error={
                           _formik.touched.category_of_location &&
                           _formik.errors.category_of_location
                        }
                        defaultValue={_formik?.values?.category_of_location}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">Address</label>
                     <input
                        type="text"
                        placeholder="Enter Address"
                        className="form-control"
                        name="address"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.address}
                     />
                     <ErrorMessage
                        touched={_formik.touched?.address}
                        error={_formik.errors?.address}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">Post code</label>
                     <input
                        type="text"
                        placeholder="Enter Postcode"
                        className="form-control"
                        name="post_code"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.post_code}
                     />
                     <ErrorMessage
                        touched={_formik.touched?.post_code}
                        error={_formik.errors?.post_code}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">City*</label>
                     <SelectField
                        className="form-select-container"
                        classNamePrefix="form-select"
                        name="city"
                        options={cities}
                        onChange={(fieldName, data) => {
                           _formik.setFieldValue(fieldName, data);
                        }}
                        placeholder="Select city"
                        onBlur={_formik.handleBlur}
                        error={_formik.touched.city && _formik.errors.city}
                        defaultValue={_formik?.values?.city}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">
                        Direction* <span>(Copy paste Google Map link here)</span>
                     </label>
                     <input
                        type="text"
                        placeholder="Paste link here"
                        className="form-control"
                        name="direction"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.direction}
                     />
                     <ErrorMessage
                        touched={_formik.touched?.direction}
                        error={_formik.errors?.direction}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">
                        Open timing <span>For eg: Open from 9am till 6pm</span>
                     </label>
                     <textarea
                        className="form-control"
                        placeholder="Enter"
                        name="open_timing"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.open_timing}
                     ></textarea>
                     <ErrorMessage
                        touched={_formik.touched?.open_timing}
                        error={_formik.errors?.open_timing}
                     />
                  </div>
               </div>
            </div>
            {/* <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">
                        Best time to visit*{" "}
                        <span>For eg: Early morning on weekdays</span>
                     </label>
                     <textarea
                        className="form-control"
                        placeholder="Enter"
                        name="best_time_to_visit"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.best_time_to_visit}
                     ></textarea>
                     <ErrorMessage
                        touched={_formik.touched?.best_time_to_visit}
                        error={_formik.errors?.best_time_to_visit}
                     />
                  </div>
               </div>
            </div> */}
            <div className="d-flex gap-1">
               <div className="col-12">
                  <div className="form-group px-1 mb-4">
                     <label className="form-label">
                        Affiliate title{" "}
                     </label>
                     <input
                        type="text"
                        placeholder="Enter the title"
                        className="form-control"
                        name="affiliate_title"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.affiliate_title}
                     />
                     <ErrorMessage
                        touched={_formik.touched?.affiliate_title}
                        error={_formik.errors?.affiliate_title}
                     />
                  </div>
               </div>
               <div className="col-12">
                  <div className="form-group px-1 mb-4">
                     <label className="form-label">
                        Affiliate link{" "}
                     </label>
                     <input
                        type="text"
                        placeholder="Paste the link here"
                        className="form-control"
                        name="discount_code"
                        onChange={_formik.handleChange}
                        onBlur={_formik.handleBlur}
                        value={_formik.values.discount_code}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group mb-4">
                     <label className="form-label">
                        Upload photos* <span>Max 5 images</span>
                     </label>
                     <input
                        name="location_images"
                        multiple
                        id="itinerary-image"
                        className="d-none"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        onBlur={_formik.handleBlur}
                        touched={_formik.touched.location_images}
                        error={_formik.errors.location_images}
                     />
                     <div className="upload-photo-list d-flex flex-wrap">
                        {_formik.values?.location_images?.map((data, index) => (
                           <div key={index} className="upload-photo-item">
                              <div className="upload-photo-box w-100 h-100">
                                 <div className="uploaded-photo">
                                    {isUrl(data?.image) ? (
                                       <Image
                                          src={data?.image}
                                          fill
                                          alt="uploaded photo"
                                       />
                                    ) : (
                                       <Image
                                          src={URL?.createObjectURL(data)}
                                          fill
                                          alt="uploaded photo"
                                       />
                                    )}
                                 </div>
                                 <button onClick={() => removeImage(index)} className="close-icon d-flex align-items-center justify-content-center overflow-hidden">
                                    <Image src="/images/close-icon.svg" fill alt="close icon" />
                                 </button>
                              </div>
                           </div>
                        ))}
                        {_formik.values?.location_images?.length !== 5 && (
                           <div className="upload-photo-item">
                              <div className="upload-photo-box w-100 h-100">
                                 <label
                                    htmlFor="itinerary-image"
                                    className="cursor-pointer upload-photo d-flex flex-column align-items-center justify-content-center"
                                 >
                                    <div className="upload-photo-icon d-flex flex-column align-items-center justify-content-center">
                                       <FaPlus />
                                    </div>
                                    <span className="d-none d-sm-block">
                                       Click to upload
                                    </span>
                                 </label>
                              </div>
                           </div>
                        )}
                     </div>
                     <ErrorMessage
                        touched={_formik.touched?.location_images}
                        error={_formik.errors?.location_images}
                     />
                  </div>
               </div>
            </div>
            <div className="row g-3">
               <div className="col-lg-12">
                  <div className="form-group">
                     <button
                        onClick={_formik.handleSubmit}
                        type="submit"
                        className="btn btn-default btn-block"
                     >
                        Submit
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </Offcanvas>
   );
}
