import "./ItineraryDetails.css";
import Image from "next/image";
import { getAnItinerary } from "../../../lib/itinerary/getItinerary";
import BuyCard from "../../../components/buyCard/BuyCard";
import { CopyToClipBoard } from "../../../components/copy-clip-board/CopyToClipBoard";
import { Loading } from "../../../components/loading/Loading";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOptions";
import ProfileCard from "../../../components/profileCard/ProfileCard";
import Link from "next/link";
import ItitneraryItemCard from "../../../components/itineraryItemCard.js/itineraryItemCard"

const ItinerarySinglePage = async ({ params }) => {
   const session = await getServerSession(authOptions);

   const role = session?.user?.user_role;

   const access_token = session?.user?.access_token;

   const itinerary_id = params?.id;

   const itinerary = await getAnItinerary({ access_token, itinerary_id });

   const price = itinerary?.itinerary?.price

   function capitalizeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
   }

   const isPurchased = itinerary?.purchase_status;


   return (
      <Suspense fallback={<Loading />}>
         <div className="content-container position-relative py-4">
            <div className="container">
               <div className="row">
                  <div className="col-xl-10 mx-auto">
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item">
                              <Link href={"/traveller/itineraries"}>{"Itineraries"}</Link>
                           </li>
                           <li className="breadcrumb-item active" aria-current="page">
                              {itinerary?.itinerary?.title}
                           </li>
                        </ol>
                     </nav>
                     <div className="itenerary-details-hero">
                        <div className="itenerary-details-hero-img">
                           <Image
                              src={itinerary?.itinerary?.cover_image}
                              alt="itenerary details hero img"
                              fill
                              sizes="100VW"
                           />
                        </div>
                        <div className="itenerary-details-hero-details">
                           <div className="id-head">
                              <div className="id-hero-options d-flex align-items-center gap-2">
                                 {/* <div className="id-options-price d-none d-md-flex">
                                    ${parseFloat(itinerary?.itinerary?.price)}
                                 </div> */}
                                 <CopyToClipBoard />
                              </div>
                              <h1 className="id-title">
                                 {itinerary?.itinerary?.title}
                              </h1>
                              <div className="id-country">
                                 {capitalizeName(
                                    itinerary?.itinerary?.selected_country?.name
                                 )}
                              </div>
                              <div className="id-options-price d-md-none">
                                 ${parseFloat(itinerary?.itinerary?.price)}
                              </div>
                           </div>
                           <div className="id-body">
                              <div className="id-text">
                                 <p>{itinerary?.itinerary?.description}</p>
                              </div>
                              <div className="id-info-list d-flex flex-wrap">
                                 <div className="id-info-item d-flex flex-wrap align-items-center">
                                    <div className="id-info-icon me-1">
                                       <Image
                                          src="/images/food-icon.svg"
                                          width={28}
                                          height={21}
                                          alt="Food"
                                       />
                                    </div>
                                    <div className="id-info-text">
                                       <strong>
                                          {
                                             itinerary?.type_of_location_counts
                                                ?.food_drink
                                          }
                                       </strong>{" "}
                                       Food & Drink
                                    </div>
                                 </div>
                                 <div className="id-info-item d-flex flex-wrap align-items-center">
                                    <div className="id-info-icon me-1">
                                       <Image
                                          src="/images/flag-icon.svg"
                                          width={20}
                                          height={21}
                                          alt="flag"
                                       />
                                    </div>
                                    <div className="id-info-text">
                                       <strong>
                                          {
                                             itinerary?.type_of_location_counts
                                                ?.places
                                          }
                                       </strong>{" "}
                                       Places{" "}
                                    </div>
                                 </div>
                                 <div className="id-info-item d-flex flex-wrap align-items-center">
                                    <div className="id-info-icon me-1">
                                       <Image
                                          src="/images/events.svg"
                                          width={20}
                                          height={21}
                                          alt="flag"
                                       />
                                    </div>
                                    <div className="id-info-text">
                                       <strong>
                                          {
                                             itinerary?.type_of_location_counts
                                                ?.event
                                          }
                                       </strong>{" "}
                                       Events
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="content-container position-relative pt-0">
            <div className="container">
               <div className="row">
                  <div className="col-xl-10 mx-auto">
                     <div className="row">
                        <div className="col-lg-8">
                           <div className="card-box">
                              <div className="card-box-head">
                                 <h3 className="card-box-title">
                                    <span className="d-flex me-2">
                                       <Image
                                          src="/images/listing-icon.svg"
                                          alt="listing icon"
                                          width={15}
                                          height={13}
                                       />{" "}
                                    </span>
                                    Itinerary
                                 </h3>
                              </div>
                              <div className={`card-box-body ${parseInt(isPurchased) === 0 && `unlock-login position-relative`}`}>
                                 <ul className="place-list position-relative">
                                    {itinerary?.itinerary_items?.map(
                                       (data, index) => (
                                          <li
                                             key={index}
                                             className="place-item position-relative"
                                          >
                                             <ItitneraryItemCard
                                                categoryOfLocation={data?.category_of_location}
                                                isSeen={data?.is_seen || null}
                                                nameOfPlace={data?.name_of_place}
                                                address={data?.address}
                                                openTiming={data?.open_timing}
                                                entryFee={data?.entry_fees}
                                                locationImg={data?.location_images}
                                                direction={data?.direction}
                                                itineraryName={itinerary?.itinerary?.title}
                                                role = {role}
                                             />
                                          </li>
                                       )
                                    )}
                                 </ul>
                                 {
                                    isPurchased === 0 &&
                                    <div className="unlock-login-container d-flex align-items-center justify-content-center">
                                       <div className="unlock-login-inside w-100 h-auto d-flex align-items-center justify-content-center">
                                          <div className="unlock-login-head mb-3">
                                             <h5>Unlock the best of Trundle</h5>
                                             <p>
                                                Buy this itinerary to view entire list
                                             </p>
                                             <BuyCard
                                                price={price}
                                                itineraryId={itinerary_id}
                                                access_token={access_token}
                                             />
                                          </div>

                                       </div>
                                    </div>
                                 }
                              </div>
                           </div>
                        </div>
                        {role !== 1 &&
                           <div className="col-lg-4 mt-4 mt-lg-0">
                              <div className="itinerary-single-sidebar">
                                 <div className="iss-box">
                                    <ProfileCard userDetails={itinerary?.itinerary?.user} />
                                 </div>
                              </div>
                           </div>
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Suspense>
   );
};

export default ItinerarySinglePage;
