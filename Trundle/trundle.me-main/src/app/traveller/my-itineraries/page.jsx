import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOptions";
import ItineraryCard from "../../components/itineraryCard/ItineraryCard";
import { getPurchasedItineraries } from "../../lib/itinerary/getItinerary"
import { getCoverCountries } from "../../lib/countries/countries";
import Filter from "../../components/filters/Filter";
import FilteredQueries from "../../components/filtered-queries/FilteredQueries"
import Pagination from "../../components/react-paginate/Pagination";
import { formatLocationName } from "../../lib/formatHeading";
import { redirect } from "next/navigation";

const MyItineraries = async ({ searchParams }) => {

   const session = await getServerSession(authOptions);

   const access_token = session?.user?.access_token;

   const queryString = Object.keys(searchParams)
      .map(
         (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
               searchParams[key]
            )}`
      )
      .join("&");

   const availableCountries = await getCoverCountries();

   let purchasedItineraries;


   if (session) {
      purchasedItineraries = await getPurchasedItineraries({ queryString, access_token });
   } else {
      redirect('/')
   }

   // console.log(purchasedItineraries?.results?.orders);


   return (
      <div div className="content-container" >
         <div className="container">
            <div className="row">
               <div className="col-xl-10 mx-auto">
                  <div className="heading d-flex align-items-center justify-content-between">
                     <h5>My Itineraries</h5>
                     <div className="heading-right ps-3 flex-shrink-0">
                        <div className="filter-sort-btn-box d-flex">
                           <div className="fs-btn">
                              <Filter
                                 countriesList={availableCountries}
                                 fetchedItinerariesLength={
                                    purchasedItineraries?.orders?.length
                                 }
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <FilteredQueries countriesList={availableCountries} />
               {purchasedItineraries?.count > 0 ?
                  <div className="col-xl-10 mx-auto">
                     <div className="row g-4">
                        {purchasedItineraries?.results?.orders?.map((data, index) => {
                           return (
                              <div className="col-lg-4 col-md-6" key={index}>
                                 <ItineraryCard
                                    trundlerImage={data?.user?.photo}
                                    trundlerFirstName={data?.user?.first_name}
                                    trundlerMiddleName={data?.user?.middle_name}
                                    trundlerLastName={data?.user?.last_name}
                                    coverImage={data?.itinerary_cover_image}
                                    username={data?.user?.username}
                                    itineraryTitle={data?.itinerary_title}
                                    price={parseFloat(data?.total_amount)}
                                    countryName={formatLocationName(data?.country)}
                                    placeCount={data?.type_of_location_counts?.places}
                                    foodDrinkCount={data?.type_of_location_counts?.food_drink}
                                    eventsCount={data?.type_of_location_counts?.event}
                                    itineraryId={data?.itinerary}
                                    genericDiscountCode={data?.generic_discount_code}
                                 />
                              </div>
                           )
                        })}
                     </div>
                  </div>
                  :
                  <p className="text-center">No itineraries found</p>
               }
               {purchasedItineraries?.count > purchasedItineraries?.per_page && (
                  <Pagination itinerariesList={purchasedItineraries} />
               )}
            </div>
         </div>
      </div >)

};

export default MyItineraries;
