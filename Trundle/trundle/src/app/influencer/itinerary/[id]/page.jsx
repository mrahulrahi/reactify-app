import "./ItineraryDetails.css";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import {
   getAnItinerary, getItinerariesCategories,
} from "../../../lib/itinerary/getItinerary";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOptions";
import { CopyToClipBoard } from "../../../components/copy-clip-board/CopyToClipBoard";
import { Suspense } from "react";
import { Loading } from "../../../components/loading/Loading";
import ItineraryItemCard from "../../../components/itineraryItemCard.js/itineraryItemCard";
import { ItineraryActions } from "../../../components/itineraries-action/ItineraryActions";
import { SITE_NAME } from "../../../lib/metadata";


export async function generateMetadata({ params }, parent) {

   const previousImages = (await parent).openGraph?.images || [];

   const itinerary_id = params?.id;

   const itinerary = await getAnItinerary({ itinerary_id });

   return {
      title: itinerary?.itinerary?.title,
      description: itinerary?.itinerary?.description,
      openGraph: {
         siteName: SITE_NAME, // Add your site name here
         url: 'https://trundle.me', // Add your website URL here
         images: [
            {
               url: itinerary?.itinerary?.cover_image,
               width: 1200,  // common recommended width
               height: 630   // common recommended height
            },
            ...previousImages
         ],
      },
      twitter: {
         card: 'summary_large_image', // Twitter card type
         title: itinerary?.itinerary?.title,
         description: itinerary?.itinerary?.description,
         image: {
            url: itinerary?.itinerary?.cover_image,
            width: 1200,  // common recommended width
            height: 630   // common recommended height
         },
      }
   }
}


const ItinerarySinglePage = async ({ params }) => {
   const session = await getServerSession(authOptions);

   const itinerary_id = params?.id;

   const access_token = session?.user?.access_token;

   const itinerary = await getAnItinerary({ access_token, itinerary_id });

   // console.log(itinerary?.itinerary_items);

   function capitalizeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
   }

   const itinerariesCategories = await getItinerariesCategories({ access_token });

   const isValidURL = (string) => {
      try {
         const url = new URL(string); // Attempt to create a URL object
         return true; // Valid if no error is thrown
      } catch (e) {
         return false; // Invalid URL
      }
   }
   return (
      <Suspense fallback={<Loading />}>
         <div className="content-container position-relative py-4">
            <div className="container">
               <div className="row">
                  <div className="col-xl-10 mx-auto">
                     <Breadcrumbs heading={itinerary?.itinerary?.title} prevTitle={"My Account"} prevPath={"/influencer/my-profile"} />
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
                                 <div className="id-options-price d-none d-md-flex">
                                    {itinerary?.itinerary?.price > 0 ?
                                       <>
                                          ${parseFloat(itinerary?.itinerary?.price)}
                                       </> : <h6 className="mb-0">Free</h6>
                                    }
                                 </div>
                                 <Link
                                    href={`/influencer/update-itinerary/${itinerary?.itinerary?.id}`}
                                    className="btn btn-primary"
                                 >
                                    <span>
                                       <Image
                                          src="/images/edit-icon.svg"
                                          width={15}
                                          height={15}
                                          alt="Edit Itinerary"
                                       />
                                    </span>{" "}
                                    Edit
                                 </Link>
                                 <CopyToClipBoard id={params?.id} />
                                 <ItineraryActions
                                    itinerary_id={itinerary?.itinerary?.id}
                                    access_token={access_token}
                                    buyCount={itinerary?.itineraries_bought}
                                    status={itinerary?.itinerary?.status}
                                 />
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
                              {isValidURL(itinerary?.itinerary?.generic_discount_code) ?
                                 <div className="id-text">
                                    <Link style={{ color: "rgb(111, 39, 255)" }} target="_blank" href={itinerary?.itinerary?.generic_discount_code}>{itinerary?.itinerary?.affiliate_title}</Link>
                                 </div> :
                                 <div className="id-text">
                                    {itinerary?.itinerary?.affiliate_title} {" "} {itinerary?.itinerary?.generic_discount_code}
                                 </div>
                              }
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
                              <div className="card-box-body">
                                 <ul className="place-list position-relative">
                                    {itinerary?.itinerary_items?.map(
                                       (data, index) => {
                                          const categoryOfLocation = itinerariesCategories?.find((cat) => (cat?.id === data?.category_of_location));
                                          return (
                                             <li
                                                key={index}
                                                className="place-item position-relative"
                                             >
                                                <ItineraryItemCard
                                                   affiliateTitle={data?.affiliate_title}
                                                   destination={data?.destination}
                                                   route={data?.route}
                                                   hyperlinkTitle={data?.hyper_link_title}
                                                   hyperlinkAddress={data?.hyper_link_address}
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
                                                   city={data?.city_name}
                                                   countryName={capitalizeName(itinerary?.itinerary?.selected_country?.name)}
                                                   isFromItinerary
                                                />
                                             </li>
                                          )
                                       }
                                    )}
                                 </ul>
                              </div>
                           </div>

                           <div className="mt-4">
                              <div className="itinerary-outcome-wrapper">
                                 <div className="itinerary-outcome-head d-flex align-items-center">
                                    <span className="itinerary-outcome-icon d-flex align-items-center justify-content-center">
                                       <img src="/images/listing-icon.svg" alt="listing icon" />
                                    </span>
                                    <h3>Itinerary</h3>
                                 </div>
                                 <div className="itinerary-outcome-body position-relative">
                                    <div className="io-tab-row d-flex flex-wrap align-items-center gap-2">
                                       <div className="io-tab-col">
                                          <div className="io-tab-btn active">Day <span>01</span></div>
                                       </div>
                                       <div className="io-tab-col">
                                          <div className="io-tab-btn">Day <span>02</span></div>
                                       </div>
                                       <div className="io-tab-col">
                                          <div className="io-tab-btn">Day <span>03</span></div>
                                       </div>
                                       <div className="io-tab-col">
                                          <div className="io-tab-btn">Day <span>04</span></div>
                                       </div>
                                       <div className="io-tab-col">
                                          <div className="io-tab-btn">Day <span>05</span></div>
                                       </div>
                                    </div>
                                    <div className="io-destination-row">
                                       <div className="io-destination-head">Day 01</div>
                                       <ul className="io-destination-list position-relative">
                                          <li className="io-destination-item position-relative">
                                             <div className="io-destination-box w-100 h-100 d-flex flex-wrap border flex-column-reverse flex-md-row">
                                                <div className="io-destination-left">
                                                   <div className="io-destination-content">

                                                      <div className="io-destination-label">Religious</div>
                                                      <div className="io-destination-title">Osaka Castle</div>
                                                      <ul className="iod-desc-list">
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/location-icon.svg" alt="location" />
                                                               </div>
                                                               <div className="iod-desc-text"><p className="text-wrap">2 Chome-24-7 Gotokuji, Setagaya City, Tokyo-154-0021</p></div>
                                                            </div>
                                                         </li>
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/clock-icon.svg" alt="time" />
                                                               </div>
                                                               <div className="iod-desc-text">10:00am - 5:00pm</div>
                                                            </div>
                                                         </li>
                                                      </ul>
                                                      <a className="io-destination-link position-relative" href="#!">
                                                         <div className="iod-link-icon d-flex align-items-center justify-content-center">
                                                            <img src="/images/itinerary/link-icon.svg" alt="link" />
                                                         </div>
                                                         <span>View Direction</span>
                                                      </a>
                                                   </div>
                                                </div>
                                                <div className="io-destination-right">
                                                   <div className="io-destination-img">
                                                      <img alt="place img" src="/images/itinerary/place-img-1.jpg" />
                                                   </div>
                                                </div>
                                             </div>
                                          </li>
                                          <li className="io-destination-item position-relative">
                                             <div className="io-destination-box w-100 h-100 d-flex flex-wrap border flex-column-reverse flex-md-row">
                                                <div className="io-destination-left">
                                                   <div className="io-destination-content">

                                                      <div className="io-destination-label">Religious</div>
                                                      <div className="io-destination-title">Taisha Shrine</div>
                                                      <ul className="iod-desc-list">
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/location-icon.svg" alt="location" />
                                                               </div>
                                                               <div className="iod-desc-text"><p className="text-wrap">2 Chome-24-7 Gotokuji, Setagaya City, Tokyo-154-0021</p></div>
                                                            </div>
                                                         </li>
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/clock-icon.svg" alt="time" />
                                                               </div>
                                                               <div className="iod-desc-text">10:00am - 5:00pm</div>
                                                            </div>
                                                         </li>
                                                      </ul>
                                                      <a className="io-destination-link position-relative" href="#!">
                                                         <div className="iod-link-icon d-flex align-items-center justify-content-center">
                                                            <img src="/images/itinerary/link-icon.svg" alt="link" />
                                                         </div>
                                                         <span>View Direction</span>
                                                      </a>
                                                   </div>
                                                </div>
                                                <div className="io-destination-right">
                                                   <div className="io-destination-img">
                                                      <img alt="place img" src="/images/itinerary/place-img-2.jpg" />
                                                   </div>
                                                </div>
                                             </div>
                                          </li>
                                       </ul>
                                    </div>
                                    <div className="io-destination-row">
                                       <div className="io-destination-head">Day 02</div>
                                       <ul className="io-destination-list position-relative">
                                          <li className="io-destination-item position-relative">
                                             <div className="io-destination-box w-100 h-100 d-flex flex-wrap border flex-column-reverse flex-md-row">
                                                <div className="io-destination-left">
                                                   <div className="io-destination-content">

                                                      <div className="io-destination-label">Nature</div>
                                                      <div className="io-destination-title">Nara Park</div>
                                                      <ul className="iod-desc-list">
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/location-icon.svg" alt="location" />
                                                               </div>
                                                               <div className="iod-desc-text"><p className="text-wrap">2 Chome-24-7 Gotokuji, Setagaya City, Tokyo-154-0021</p></div>
                                                            </div>
                                                         </li>
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/clock-icon.svg" alt="time" />
                                                               </div>
                                                               <div className="iod-desc-text">10:00am - 5:00pm</div>
                                                            </div>
                                                         </li>
                                                      </ul>
                                                      <a className="io-destination-link position-relative" href="#!">
                                                         <div className="iod-link-icon d-flex align-items-center justify-content-center">
                                                            <img src="/images/itinerary/link-icon.svg" alt="link" />
                                                         </div>
                                                         <span>View Direction</span>
                                                      </a>
                                                   </div>
                                                </div>
                                                <div className="io-destination-right">
                                                   <div className="io-destination-img">
                                                      <img alt="place img" src="/images/itinerary/place-img-3.jpg" />
                                                   </div>
                                                </div>
                                             </div>
                                          </li>
                                          <li className="io-destination-item position-relative">
                                             <div className="io-destination-box w-100 h-100 d-flex flex-wrap border flex-column-reverse flex-md-row">
                                                <div className="io-destination-left">
                                                   <div className="io-destination-content">

                                                      <div className="io-destination-label">Religious</div>
                                                      <div className="io-destination-title">Taisha Shrine</div>
                                                      <ul className="iod-desc-list">
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/location-icon.svg" alt="location" />
                                                               </div>
                                                               <div className="iod-desc-text"><p className="text-wrap">2 Chome-24-7 Gotokuji, Setagaya City, Tokyo-154-0021</p></div>
                                                            </div>
                                                         </li>
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/clock-icon.svg" alt="time" />
                                                               </div>
                                                               <div className="iod-desc-text">10:00am - 5:00pm</div>
                                                            </div>
                                                         </li>
                                                      </ul>
                                                      <a className="io-destination-link position-relative" href="#!">
                                                         <div className="iod-link-icon d-flex align-items-center justify-content-center">
                                                            <img src="/images/itinerary/link-icon.svg" alt="link" />
                                                         </div>
                                                         <span>View Direction</span>
                                                      </a>
                                                   </div>
                                                </div>
                                                <div className="io-destination-right">
                                                   <div className="io-destination-img">
                                                      <img alt="place img" src="/images/itinerary/place-img-4.jpg" />
                                                   </div>
                                                </div>
                                             </div>
                                          </li>
                                       </ul>
                                    </div>
                                    <div className="io-destination-row">
                                       <div className="io-destination-head">Day 03</div>
                                       <ul className="io-destination-list position-relative">
                                          <li className="io-destination-item position-relative">
                                             <div className="io-destination-box w-100 h-100 d-flex flex-wrap border flex-column-reverse flex-md-row">
                                                <div className="io-destination-left">
                                                   <div className="io-destination-content">

                                                      <div className="io-destination-label">Architecture</div>
                                                      <div className="io-destination-title">Dotombori</div>
                                                      <ul className="iod-desc-list">
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/location-icon.svg" alt="location" />
                                                               </div>
                                                               <div className="iod-desc-text"><p className="text-wrap">2 Chome-24-7 Gotokuji, Setagaya City, Tokyo-154-0021</p></div>
                                                            </div>
                                                         </li>
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/clock-icon.svg" alt="time" />
                                                               </div>
                                                               <div className="iod-desc-text">10:00am - 5:00pm</div>
                                                            </div>
                                                         </li>
                                                      </ul>
                                                      <a className="io-destination-link position-relative" href="#!">
                                                         <div className="iod-link-icon d-flex align-items-center justify-content-center">
                                                            <img src="/images/itinerary/link-icon.svg" alt="link" />
                                                         </div>
                                                         <span>View Direction</span>
                                                      </a>
                                                   </div>
                                                </div>
                                                <div className="io-destination-right">
                                                   <div className="io-destination-img">
                                                      <img alt="place img" src="/images/itinerary/place-img-5.jpg" />
                                                   </div>
                                                </div>
                                             </div>
                                          </li>
                                          <li className="io-destination-item position-relative">
                                             <div className="io-destination-box w-100 h-100 d-flex flex-wrap border flex-column-reverse flex-md-row">
                                                <div className="io-destination-left">
                                                   <div className="io-destination-content">

                                                      <div className="io-destination-label">Religious</div>
                                                      <div className="io-destination-title">Taisha Shrine</div>
                                                      <ul className="iod-desc-list">
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/location-icon.svg" alt="location" />
                                                               </div>
                                                               <div className="iod-desc-text"><p className="text-wrap">2 Chome-24-7 Gotokuji, Setagaya City, Tokyo-154-0021</p></div>
                                                            </div>
                                                         </li>
                                                         <li className="iod-desc-item">
                                                            <div className="iod-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                                               <div className="iod-desc-icon d-flex align-items-center justify-content-center">
                                                                  <img src="/images/itinerary/clock-icon.svg" alt="time" />
                                                               </div>
                                                               <div className="iod-desc-text">10:00am - 5:00pm</div>
                                                            </div>
                                                         </li>
                                                      </ul>
                                                      <a className="io-destination-link position-relative" href="#!">
                                                         <div className="iod-link-icon d-flex align-items-center justify-content-center">
                                                            <img src="/images/itinerary/link-icon.svg" alt="link" />
                                                         </div>
                                                         <span>View Direction</span>
                                                      </a>
                                                   </div>
                                                </div>
                                                <div className="io-destination-right">
                                                   <div className="io-destination-img">
                                                      <img alt="place img" src="/images/itinerary/place-img-6.jpg" />
                                                   </div>
                                                </div>
                                             </div>
                                          </li>
                                       </ul>
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

      </Suspense>
   );
};

export default ItinerarySinglePage;
