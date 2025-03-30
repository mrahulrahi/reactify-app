'use client'
import { formatLocationName } from "../../lib/formatHeading";
import { ItineraryCard } from "../../components";

export async function MyItineraries({ itinerariesList }) {

   return (
      <div className="content-container">
         <div className="container">
            <div className="row">
               <div className="col-lg-10 mx-auto">
                  <div className="my-profile-body">
                     <div className="tab-content" id="myTabContent">
                        <div
                           className="tab-pane show active"
                        >
                           <div className="heading d-flex align-items-center justify-content-between">
                              <h5>
                                 Itineraries (
                                 {itinerariesList?.length})
                              </h5>
                           </div>
                           <div className="card-container">
                              <div className="row g-4">
                                 {itinerariesList?.map(
                                    (data, index) => {
                                       return (
                                          <div
                                             className="col-lg-4 col-md-6"
                                             key={index}
                                          >
                                             <ItineraryCard
                                                key={index}
                                                trundlerImage={data?.user?.photo}
                                                trundlerFirstName={data?.user?.first_name}
                                                trundlerMiddleName={data?.user?.middle_name}
                                                trundlerLastName={data?.user?.last_name}
                                                coverImage={data?.cover_image}
                                                username={data?.user?.username}
                                                itineraryTitle={data?.title}
                                                price={parseFloat(data?.price)}
                                                countryName={formatLocationName(data?.selected_country?.name)}
                                                placeCount={data?.type_of_location_counts?.places}
                                                foodDrinkCount={data?.type_of_location_counts?.food_drink}
                                                eventsCount={data?.type_of_location_counts?.event}
                                                itineraryId={data?.id}
                                             />
                                          </div>
                                       );
                                    }
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}