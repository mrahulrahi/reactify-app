import ItineraryCard from "../components/itineraryCard/ItineraryCard";
import FilterButton from "../components/filters/Filter";
import { getAllItineraies } from "../lib/itinerary/getItinerary";
import { Suspense } from "react";
import { Loading } from "../components/loading/Loading";
import { getCoverCountries } from "../lib/countries/countries";
import Pagination from "../components/react-paginate/Pagination";
import FilteredQueries from "../components/filtered-queries/FilteredQueries";
import { formatLocationName } from "../lib/formatHeading";
import Image from "next/image";
import { _metadata } from "../lib/metadata";

export async function generateMetadata() {
   return {
      title: _metadata?.itineraries?.title,
      description: _metadata?.itineraries?.description,
      openGraph: {
         images: [
            {
               url: "https://api.trundle.me/static/assets/logo_.jpg",
               width: 1200,  // common recommended width
               height: 630   // common recommended height
            },
         ],
      },
   }
}

const Itineraries = async ({ searchParams }) => {
   const queryString = Object.keys(searchParams)
      .map(
         (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
               searchParams[key]
            )}`
      )
      .join("&");

   const allItineraries = await getAllItineraies({ queryString });

   const availableCountries = await getCoverCountries();

   return (
      <Suspense fallback={<Loading />}>
         <div className="content-container">
            <div className="container">
               <div className="row">
                  <div className="col-xl-10 mx-auto">
                     <div className="heading d-flex d-flex flex-column-reverse flex-sm-row align-items-sm-center justify-content-between gap-2">
                        <div className="heading d-flex align-items-center justify-content-between mb-0">
                           <div className="heading-left">
                              {
                                 allItineraries?.count > 0 ?
                                    <div className="search-head">
                                       <h5>
                                          <span className="text-purple">{allItineraries?.count}</span>{" "}
                                          results in itineraries{" "}
                                          <em>(Showing {((allItineraries?.current_page - 1) * allItineraries?.per_page) + 1}-{Math.min(allItineraries?.count, allItineraries?.current_page * allItineraries?.per_page)} Itineraries)</em>
                                       </h5>
                                    </div>
                                    :
                                    <div className="search-head">
                                       <h5>
                                          <span className="text-purple">{allItineraries?.count}</span>{" "}
                                          results in itineraries{" "}
                                       </h5>
                                    </div>
                              }
                           </div>
                        </div>
                        <div className="heading-right ps-sm-3 flex-shrink-0">
                           <div className="filter-sort-btn-box d-flex justify-content-end">
                              <div className="fs-btn">
                                 <FilterButton
                                    countriesList={availableCountries}
                                    fetchedItinerariesLength={
                                       allItineraries?.count
                                    }
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <FilteredQueries countriesList={availableCountries} />
                  {allItineraries?.results?.data?.length > 0 ? (
                     <div className="col-xl-10 mx-auto">
                        <div className="row g-4">
                           {allItineraries?.results?.data?.map(
                              (data, index) => {
                                 return (
                                    <div
                                       key={index}
                                       className="col-lg-4 col-md-6"
                                    >
                                       <ItineraryCard
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
                                          genericDiscountCode={data?.generic_discount_code}
                                       />
                                    </div>
                                 );
                              }
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="content-container">
                        <div className="container">
                           <div className="row">
                              <div className="col-xl-10 mx-auto">
                                 <div className="search-empty-box d-flex flex-column align-items-center justify-content-center text-center">
                                    <div className="search-empty-icon">
                                       <Image
                                          src="/images/search-empty-icon.svg"
                                          alt="search empty icon"
                                          width={203}
                                          height={106}
                                       />
                                    </div>
                                    <h5>No results found</h5>
                                    <p>
                                       Try adjusting your search <br /> to find what you are
                                       looking for
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>)}
                  {allItineraries?.count > allItineraries?.per_page && (
                     <Pagination itinerariesList={allItineraries} />
                  )}
               </div>
            </div>
         </div>
      </Suspense>
   );
};

export default Itineraries;
