import Image from "next/image";
import Link from "next/link";
import { formatLocationName } from "../../../lib/formatHeading";
import { ItineraryActions } from "../../../components/itineraries-action/ItineraryActions"
import { getAllItinerariesByUserId } from "../../../lib/itinerary/getItinerary";
import { authOptions } from "../../../api/auth/authOptions";
import { getServerSession } from "next-auth";
import "./ItineraryCard.css";
import moment from "moment";

export async function MyItineraries({
   active_itineraries,
   itineraries_bought,
   followed_count,
   total_amount_earned,
   transferedAmount,
   next_invoice_amount,
   next_payment_due_date
}) {
   const session = await getServerSession(authOptions);

   const access_token = session?.user?.access_token;

   const userId = session?.user?.user_id;

   const itinerariesList = await getAllItinerariesByUserId({ userId });

   return (
      <div className="content-container">
         <div className="container">
            <div className="row">
               <div className="col-lg-10 mx-auto">
                  <div className="my-profile-body">
                     <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                           <button
                              className="nav-link active"
                              id="first-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#first-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="first-tab-pane"
                              aria-selected="true"
                           >
                              My itineraries
                           </button>
                        </li>
                        <li className="nav-item" role="presentation">
                           <button
                              className="nav-link"
                              id="second-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#second-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="second-tab-pane"
                              aria-selected="false"
                           >
                              Summary
                           </button>
                        </li>
                     </ul>
                     <div className="tab-content" id="myTabContent">
                        <>
                           <div
                              className="tab-pane show active"
                              id="first-tab-pane"
                              role="tabpanel"
                              aria-labelledby="first-tab"
                              tabIndex="0"
                           >
                              <div className="heading d-flex align-items-center justify-content-between">
                                 <h5>
                                    My itineraries (
                                    {itinerariesList?.itineraries?.length})
                                 </h5>
                                 <div className="heading-right ps-3 flex-shrink-0">
                                    <Link
                                       href="/influencer/create-itinerary"
                                       className="btn btn-primary"
                                    >
                                       <span>
                                          <Image
                                             src="/images/upload-icon.svg"
                                             width={20}
                                             height={19}
                                             alt="Upload Itinerary"
                                          />
                                       </span>{" "}
                                       Create{" "}
                                       <span className="d-none d-md-inline">
                                          itinerary
                                       </span>
                                    </Link>
                                 </div>
                              </div>
                              {itinerariesList?.itineraries?.length > 0 ? (
                                 <div className="card-container">
                                    <div className="row g-4">
                                       {itinerariesList?.itineraries?.map(
                                          (data, index) => {
                                             return (
                                                <div
                                                   className="col-lg-4 col-md-6"
                                                   key={index}
                                                >
                                                   <div className="card-box d-flex flex-column w-100 h-100 overflow-hidden">
                                                      <div className="card-image position-relative overflow-hidden">
                                                         {data?.cover_image && (
                                                            <Link
                                                               href={`/influencer/itinerary/${data?.id}`}
                                                            >
                                                               <Image
                                                                  priority
                                                                  width={1000}
                                                                  height={1000}
                                                                  src={
                                                                     data?.cover_image
                                                                  }
                                                                  alt=""
                                                               />
                                                            </Link>
                                                         )}
                                                         <div
                                                            className={`card-status position-absolute overflow-hidden ${data?.status ===
                                                               1
                                                               ? "active"
                                                               : "inactive"
                                                               }`}
                                                         >
                                                            {data?.status === 1
                                                               ? "Active"
                                                               : "Inactive"}
                                                         </div>
                                                      </div>
                                                      <div className="card-content">
                                                         <div className="card-content-upper d-flex justify-content-between">
                                                            <div className="ccu-left pe-4">
                                                               <Link
                                                                  href={`/influencer/itinerary/${data?.id}`}
                                                               >
                                                                  <h6>
                                                                     {data?.title}{" "}
                                                                  </h6>
                                                               </Link>
                                                               <span className="place">
                                                                  {formatLocationName(
                                                                     data?.country
                                                                  )}
                                                               </span>
                                                            </div>
                                                            <div className="ccu-right">
                                                               <span className="price">
                                                                  Price
                                                               </span>
                                                               {data?.price > 0 ?
                                                                  <h6>${data?.price}</h6>
                                                                  : <h6>Free</h6>
                                                               }
                                                            </div>
                                                         </div>

                                                         <div className="card-content-lower has-border d-flex justify-content-between">
                                                            <div className="card-info-details">
                                                               <span>
                                                                  Views
                                                               </span>
                                                               <h6>
                                                                  {data?.views}
                                                               </h6>
                                                            </div>
                                                            <div className="card-info-details">
                                                               <span>
                                                                  Bought
                                                               </span>
                                                               <h6>
                                                                  {data?.bought}
                                                               </h6>
                                                            </div>
                                                            <div className="card-info-details">
                                                               <span>
                                                                  Revenue
                                                               </span>
                                                               <h6>
                                                                  $
                                                                  {
                                                                     data?.revenue
                                                                  }
                                                               </h6>
                                                            </div>
                                                         </div>
                                                      </div>
                                                      <div className="card-cta d-flex align-items-center mt-auto gap-2">
                                                         <div className="card-cta-left w-100">
                                                            <Link
                                                               href={`/influencer/itinerary/${data?.id}`}
                                                               className="btn btn-primary btn-block"
                                                            >
                                                               View details
                                                            </Link>
                                                         </div>
                                                         <ItineraryActions
                                                            itinerary_id={data?.id}
                                                            access_token={
                                                               access_token
                                                            }
                                                            buyCount={data?.bought}
                                                            status={data?.status}
                                                         />
                                                      </div>
                                                   </div>
                                                </div>
                                             );
                                          }
                                       )}
                                    </div>
                                 </div>
                              ) : (
                                 <p>No data found</p>
                              )}
                           </div>
                           <div
                              className="tab-pane"
                              id="second-tab-pane"
                              role="tabpanel"
                              aria-labelledby="second-tab"
                              tabIndex="0"
                           >
                              <div className="summary-list d-flex flex-wrap row">
                                 <div className="summary-item col-md-4 col-sm-6 col-12">
                                    <div className="summary-box">
                                       <h3 className="summary-heading">{active_itineraries}</h3>
                                       <div className="summary-body">
                                          Active <br />
                                          itineraries
                                       </div>
                                    </div>
                                 </div>
                                 <div className="summary-item col-md-4 col-sm-6 col-12">
                                    <div className="summary-box">
                                       <h3 className="summary-heading">{itineraries_bought}</h3>
                                       <div className="summary-body">
                                          Itineraries <br />
                                          bought
                                       </div>
                                    </div>
                                 </div>
                                 <div className="summary-item col-md-4 col-sm-6 col-12">
                                    <div className="summary-box">
                                       <h3 className="summary-heading">{followed_count}</h3>
                                       <div className="summary-body">
                                          Followers
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <p style={{ fontWeight: 600, fontSize: "16px" }} className="mb-1 mt-4">Payment details</p>
                              <div className="summary-list d-flex flex-wrap row">
                                 <div className="summary-item col-md-4 col-sm-6 col-12">
                                    <div className="summary-box">
                                       <h3 className="summary-heading">{total_amount_earned}</h3>
                                       <div className="summary-body">
                                          Total amount earned so far
                                       </div>
                                    </div>
                                 </div>
                                 <div className="summary-item col-md-4 col-sm-6 col-12">
                                    <div className="summary-box">
                                       <h3 className="summary-heading">${transferedAmount}</h3>
                                       <div className="summary-body">
                                          Transferred to your account
                                       </div>
                                    </div>
                                 </div>
                                 <div className="summary-item col-md-4 col-sm-6 col-12">
                                    <div className="summary-box">
                                       <h3 className="summary-heading">${next_invoice_amount}</h3>
                                       <div className="summary-body">
                                          Next invoice payment amount
                                          <span className="summary-due-date d-block mt-1 text-red">
                                             Due date : {moment(next_payment_due_date).format('DD, MMMM YYYY')}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
