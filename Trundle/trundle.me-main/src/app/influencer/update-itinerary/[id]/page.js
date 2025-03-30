import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { authOptions } from "../../../api/auth/authOptions";
import { getCoverCountries } from "../../../lib/countries/countries";
import UpdateItineraryForm from "../update-itinerary-form/UpdateItineraryForm";
import { getAnItinerary, getItinerariesCategories, getPriceList, getSuitableForList } from "../../../lib/itinerary/getItinerary";
import { Loading } from "../../../components/loading/Loading";

export default async function UpdateItinerary({ params }) {
   const session = await getServerSession(authOptions);

   const access_token = session?.user?.access_token;

   const coverCountriesList = await getCoverCountries();

   const itinerary_id = params?.id;

   const itinerary = await getAnItinerary({ access_token, itinerary_id });

   const itinerariesCategories = await getItinerariesCategories({ access_token });

   const priceList = await getPriceList({ access_token });

   const suitableForList = await getSuitableForList({ access_token });


   return (
      <Suspense fallback={<Loading />}>
         <UpdateItineraryForm
            session={session}
            coverCountriesList={coverCountriesList}
            itinerary={itinerary}
            itinerariesCategories={itinerariesCategories}
            suitableForList={suitableForList}
            priceList={priceList}
         />
      </Suspense>
   );
}
