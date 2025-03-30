import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOptions";
import { getTravellerDetails } from "../../lib/traveller/traveller";
import { redirect } from "next/navigation";
import { getAllCountriesList } from "../../lib/countries/countries";
import TravellerProfileForm from "../../components/traveller-profile-form/TravellerProfileForm"

const Page = async () => {
   const session = await getServerSession(authOptions);

   const access_token = session?.user?.access_token;

   if (!session) {
      redirect('/travellers');
   }

   const travellerDetails = await getTravellerDetails({ access_token });

   const countriesList = await getAllCountriesList();

   const countriestOptions = countriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: `+${data?.phone_code}`,
      id: data?.id,
   }));

   return (
      <TravellerProfileForm
         formType='update'
         travellerDetails={travellerDetails}
         access_token={access_token}
         countriestOptions={countriestOptions}
      />
   );
};

export default Page;
