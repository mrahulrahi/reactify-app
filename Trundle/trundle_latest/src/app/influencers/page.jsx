import { Suspense } from "react";
import { Loading } from "../components/loading/Loading";
import TrundlerCard from "../components/trundlerCard/TrundlerCard";
import { getAllTrundlers } from "../lib/trundler/getTrundlers";
import Pagination from "../components/react-paginate/Pagination";
import FilterButton from "../components/filters/FilterButton";
import { getCoverCountries } from "../lib/countries/countries";
import FilteredQueries from "../components/filtered-queries/FilteredQueries"
import FollowType from "./type/FollowType"
import { authOptions } from "../api/auth/authOptions";
import { getServerSession } from "next-auth";

const TrundlersPage = async ({ searchParams }) => {

   const session = await getServerSession(authOptions);

   const access_token = session?.user?.access_token

   const queryString = Object.keys(searchParams)
      .map(
         (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
               searchParams[key]
            )}`
      )
      .join("&");

   const trundlersList = await getAllTrundlers({ access_token, queryString });

   const availableCountries = await getCoverCountries();

   return (
      <Suspense fallback={<Loading />}>
         <div className="content-container">
            <div className="container">
               <div className="row">
                  <div className="col-xl-10 mx-auto">
                     <div className="heading d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-center gap-3">
                           <h5>Influencers</h5>
                           {access_token &&
                              <FollowType subCount={trundlersList?.subscribed_trundlers_count} />
                           }
                        </div>
                     </div>
                  </div>
                  <FilteredQueries countriesList={availableCountries} />
                  <div className="col-xl-10 mx-auto">
                     <div className="row g-4">
                        {trundlersList?.count === 0 ? (
                           <div className="text-center">No data found</div>
                        ) : (
                           <>
                              {trundlersList?.results?.map((data, index) => {
                                 return (
                                    <div
                                       key={index}
                                       className="col-lg-4 col-md-6"
                                    >
                                       <TrundlerCard trundlerDetails={data} />
                                    </div>
                                 );
                              })}
                           </>
                        )}
                     </div>
                  </div>
                  {trundlersList?.count > trundlersList?.per_page && (
                     <Pagination itinerariesList={trundlersList} />
                  )}
               </div>
            </div>
         </div>
      </Suspense>
   );
};

export default TrundlersPage;
