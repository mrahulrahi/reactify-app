import { authOptions } from "../api/auth/authOptions";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import HeroSearch from "../components/hero-search/HeroSearch";
import ItineraryCard from "../components/itineraryCard/ItineraryCard";
import InfluencerCard from "../components/influencerCard/InfluencerCard";
import { redirect } from "next/navigation";
import { getTravellerHomeData } from "../lib/itinerary/getItinerary";
import { Suspense } from "react";
import { Loading } from "../components/loading/Loading";
import { getCoverCountries } from "../lib/countries/countries";
import { formatLocationName } from "../lib/formatHeading";
import Link from "next/link";
import { _metadata } from "../lib/metadata";

// export async function generateMetadata({ params }, parent) {

//    const previousImages = (await parent).openGraph?.images || [];

//    return {
//       title: _metadata?.homepage?.title,
//       description: _metadata?.homepage?.description,
//       openGraph: {
//          images: [
//             {
//                url: "https://api.trundle.me/media/itinerary_images/file_rXQ4f7G.jpeg",
//                width: 1200,  // common recommended width
//                height: 630   // common recommended height
//             },
//             ...previousImages
//          ],
//       },
//    }
// }

// export const metadata = {
//    title: _metadata?.homepage?.title,
//    description: _metadata?.homepage?.description,
//    metadataBase: new URL('https://api.trundle.me'),
//    openGraph: {
//       images: '/media/itinerary_images/file_rXQ4f7G.jpeg',
//    },
// };



const Home = async ({ searchParams }) => {

   const session = await getServerSession(authOptions);

   const role = session?.user?.user_role;

   const queryString = Object.keys(searchParams)
      .map(
         (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
               searchParams[key]
            )}`
      )
      .join("&");

   if (role === 1) {
      redirect("/influencer/my-profile");
   }

   const homeData = await getTravellerHomeData();

   const availableCountries = await getCoverCountries();

   const fromCountriesOptions = availableCountries?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: convertToTitleCase(data?.name),
      id: data?.id,
      iso3: data?.iso3,
   }));

   function convertToTitleCase(str) {
      return str.charAt(0) + str.slice(1).toLowerCase();
   }

   return (
      <>
         <div className="hero-container">
            <div className="container">
               <div className="row">
                  <div className="col-xl-10 mx-auto">
                     <div className="hero-content-box w-100 h-100 position-relative">
                        <div className="hero-bg position-relative">
                           <Image
                              src="/images/hero-bg.png"
                              alt="hero"
                              fill
                              priority
                              style={{ objectFit: "cover" }}
                           />
                        </div>
                        <div className="hero-text d-flex align-items-center">
                           <h1>
                              Curated itineraries from professional travel influencers
                           </h1>
                        </div>
                     </div>
                     <div className="hero-search-wrapper d-flex justify-content-center">
                        <HeroSearch
                           countriesList={fromCountriesOptions}
                           queryString={queryString}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Suspense fallback={<Loading />}>
            <div className="content-container">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-10 mx-auto">
                        <div className="heading d-flex align-items-center justify-content-between">
                           <h5>Itineraries</h5>
                        </div>
                     </div>
                     {homeData?.results?.data?.first_row_itineraries?.length >
                        0 ? (
                        <div className="col-xl-10 mx-auto">
                           <div className="row g-4">
                              {homeData?.results?.data?.first_row_itineraries?.map(
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
                        <p className="text-center">No itineraries found</p>
                     )}
                  </div>
               </div>
            </div>
            <div className="content-container p-0">
               <div className="container">
                  {homeData?.results?.popular_influencers?.length !== 0 && (
                     <div className="row">
                        <div className="col-xl-10 mx-auto">
                           <div className="heading d-flex justify-content-between">
                              <h5>Popular influencers</h5>
                              <div className="heading-right ps-3 flex-shrink-0">
                                 <Link href="/influencers" className="link">View all</Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
                  {homeData?.results?.popular_influencers?.length > 0 ? (
                     <div className="row">
                        <div className="col-xl-10 mx-auto">
                           <div className="user-card-wrapper">
                              <div className="user-card-list d-flex">
                                 {homeData?.results?.popular_influencers?.map(
                                    (data, index) => {
                                       return (
                                          <div
                                             className="user-card-item"
                                             key={index}
                                          >
                                             <InfluencerCard
                                                influencer={data}
                                             />
                                          </div>
                                       );
                                    }
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <p className="text-center">No influencer found</p>
                  )}
               </div>
            </div>
            <div className="content-container">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-10 mx-auto">
                        <div className="row g-4">
                           {homeData?.results?.data?.second_row_itineraries?.map(
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
                  </div>
                  <div className="row justify-content-center">
                     <div className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex">
                        <Link href={"/itineraries"} className="btn btn-primary mt-lg-5 mt-md-4 mt-3 mx-2 w-100 text-decoration-none">View all itineraries</Link>
                     </div>
                  </div>
               </div>
            </div>
         </Suspense>
      </>
   );
};

export default Home;
