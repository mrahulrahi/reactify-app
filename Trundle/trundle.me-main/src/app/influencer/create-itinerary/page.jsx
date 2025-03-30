import { getServerSession } from "next-auth";
import CreateItineraryForm from "./create-itinerary-form/CreateItineraryForm";
import { authOptions } from "../../api/auth/authOptions";
import { getCoverCountries } from "../../lib/countries/countries";
import {
   getItinerariesCategories,
   getPriceList,
   getSuitableForList
} from "../../lib/itinerary/getItinerary";

const CreateItineraryPage = async () => {
   const session = await getServerSession(authOptions);

   const coverCountriesList = await getCoverCountries();

   const access_token = session?.user?.access_token;

   const itinerariesCategories = await getItinerariesCategories({ access_token });

   const suitableForList = await getSuitableForList({ access_token });

   const priceList = await getPriceList({ access_token });

   return (
      <CreateItineraryForm
         session={session}
         coverCountriesList={coverCountriesList}
         itinerariesCategories={itinerariesCategories}
         suitableForList={suitableForList}
         priceList={priceList}
      />
   );
};

export default CreateItineraryPage;
