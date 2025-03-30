
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoCloseCircleSharp } from "react-icons/io5";

const CheckboxGroup = ({
   items,
   itemType,
   handleCheckboxChange,
   selectedItems,
   removeSelectedItem,
   handleNextOnClick,
   btnDisable,
   access_token,
   isFrom,
   nextBtnLoading
}) => {

   const pathname = usePathname();

   const isSelect = (pathname === "/select-favorite-activities" || pathname === "/select-favorite-artist");

   return (
      <>
         <h6>
            {isSelect ? "Select" : "Update"} your favorite {itemType}
         </h6>
         <div className="d-flex flex-wrap gap-2 mb-1 align-items-center">
            {selectedItems?.length !== 0 &&
               <p className="fw-medium lh-1 mb-0 flex-shrink-0">Selected {itemType} : </p>
            }

            {selectedItems?.map((item, index) => (
               <div
                  key={index}
                  className="py-1 ps-3 pe-2 rounded-5 fw-medium shadow border-0 flex-shrink-0"
               >
                  <div
                     className="d-flex align-items-center justify-content-center gap-2"
                     style={{ fontSize: "10px" }}>
                     {item.name}
                     <button
                        onClick={() => removeSelectedItem(item, itemType)}
                        className="border-0 bg-transparent fw-bold text-light rounded"
                     >
                        <IoCloseCircleSharp size={24} color="#FF0000" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
         <div className="row">
            <div
               className="d-flex pagination-btn-wrapper align-items-center justify-content-end activity-next-btn my-3 pe-3 p-0">
               <button
                  onClick={handleNextOnClick}
                  disabled={btnDisable}
                  className="btn btn-default" type="button">
                  {access_token ? "Update" : "Next"}
                  {nextBtnLoading && (
                     <div
                        className="spinner-border spinner-border-sm ms-2"
                        role="status"
                     />
                  )}
               </button>
            </div>
         </div>
         <div className={`row gx-3 gy-4 ${isFrom !== "modal" && "mt-2"}`}>
            {items && Array.isArray(items) && items.map((item, index) => (
               <label
                  key={index}
                  className={`col-xl-3 col-md-4 col-sm-6 cursor-pointer position-relative`}
               >
                  {selectedItems?.some(
                     (selected) => selected.id === item?.id
                  ) && (
                        <Image
                           width={31.65}
                           height={31.65}
                           style={{
                              right: "18px",
                              top: "10px",
                              opacity: 1,
                              position: "absolute",
                              borderRadius: "10px",
                              objectFit: "contain"
                           }}
                           src={'/images/tick.svg'}
                           alt=""
                        />
                     )}
                  <div
                     className={`d-flex h-100 gap-2 flex-column justify-content-between ${selectedItems?.some(
                        (selected) => selected?.id === item?.id
                     )}`}
                  >
                     <img
                        src={
                           itemType !== "artists"
                              ? item?.image
                              : item?.images?.[0]?.url ? item?.images?.[0]?.url : "../images/artist_no_image.svg"
                        }
                        width={"100%"}
                        height={185}
                        style={{
                           height: '100%',
                           objectFit: "cover",
                           borderRadius: "8px",
                           border: selectedItems?.some(
                              (selected) => selected?.id === item?.id
                           ) ? "3px solid #00A3FF" : "",
                           borderRadius: "10px",
                           aspectRatio: "1/1"
                        }}
                     />
                     <span className="fw-medium" style={{ fontSize: "10px" }}>{item?.name}</span>
                     <input
                        className="d-none"
                        type="checkbox"
                        checked={selectedItems?.some(
                           (selected) => selected?.id === item?.id
                        )}
                        onChange={() => handleCheckboxChange(item)}
                     />
                  </div>
               </label>
            ))}
         </div >
      </>
   );
};

export default CheckboxGroup;
