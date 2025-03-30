"use client";

import Link from "next/link";
import "./ItineraryCard.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfilePlaceHolder from "../profile-placeholder/ProfilePlaceHolder";

const ItineraryCard = ({
   trundlerImage,
   trundlerFirstName,
   trundlerMiddleName,
   trundlerLastName,
   coverImage,
   username,
   itineraryTitle,
   price,
   countryName,
   placeCount,
   foodDrinkCount,
   eventsCount,
   itineraryId,
   genericDiscountCode,
}) => {

   const router = useRouter()

   return (
      <div className="card-box d-flex flex-column w-100 h-100 overflow-hidden">
         <div className="card-head d-flex align-items-center">
            {trundlerImage ?
               <Link href={`/${username}`} className="card-head-image">
                  <Image
                     src={trundlerImage}
                     alt="flag"
                     width={29}
                     height={29}
                     objectFit="contain"
                  />
               </Link> :
               <ProfilePlaceHolder
                  marginTop={0}
                  marginBottom={0}
                  width={40}
                  height={40}
                  border="4px solid white"
                  name={`${trundlerFirstName} ${trundlerLastName}`}
                  fontSize={13}
               />
            }
            <Link href={`/${username}`} className="card-head-title text-decoration-none">
               <div className="d-flex gap-1 flex-wrap cursor-pointer">
                  <h4>{trundlerFirstName}</h4>
                  <h4>{trundlerLastName}</h4>
               </div>
               <h6 className="username">@{username}</h6>
            </Link>
         </div>
         <div className="card-image position-relative overflow-hidden">
            <Image
               className="cursor-pointer"
               onClick={() => router.push(`/itineraries/${itineraryId}`)}
               src={coverImage} fill alt="place-img" sizes="100VW" />
            {genericDiscountCode &&
               <div className="card-coupons position-absolute overflow-hidden">
                  Coupons Available
               </div>
            }
         </div>
         <div className="card-content">
            <div className="card-content-upper d-flex justify-content-between">
               <div className="ccu-left pe-4">
                  <h6 className="cursor-pointer"
                     style={{ overflowWrap: "anywhere" }}
                     onClick={() => router.push(`/itineraries/${itineraryId}`)}
                  >{itineraryTitle}</h6>
                  <span className="place">{countryName}</span>
               </div>
               <div className="ccu-right">
                  <span className="price">Price</span>
                  {price > 0 ?
                     <h6>${price}</h6>
                     : <h6>Free</h6>
                  }
               </div>
            </div>
            <div className="card-box-lower d-flex mt-1">
               <div className="card-info-list d-flex">
                  <div className="cil-box d-flex align-items-center">
                     <Image
                        src="/images/flag-icon.svg"
                        width={20}
                        height={21}
                        alt="flag"
                     />
                     <span>{placeCount}</span> places
                  </div>
                  <div className="cil-box d-flex align-items-center">
                     <Image
                        src="/images/food-icon.svg"
                        width={28}
                        height={21}
                        alt="Food"
                     />
                     <span>{foodDrinkCount}</span> F&D
                  </div>
                  <div className="cil-box d-flex align-items-center">
                     <Image
                        className="me-1"
                        src="/images/events.svg"
                        width={20}
                        height={18}
                        alt="Food"
                     />
                     <span>{eventsCount}</span>{" "}
                     Event
                  </div>
               </div>
            </div>
         </div>
         <div className="card-cta d-flex align-items-center mt-auto">
            <Link
               href={`/itineraries/${itineraryId}`}
               className="btn btn-default btn-block"
            >
               View details
            </Link>
         </div>
      </div>
   );
};

export default ItineraryCard;
