import "../form.css";
import "./Header.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import Main from "./Main";
import { getCoverCountries } from "../lib/countries/countries";
import { getNotificationsList } from "../lib/itinerary/getItinerary";
import HeaderContent from "./HeaderContent";

const Header = async () => {

   const session = await getServerSession(authOptions);

   const role = session?.user?.user_role;

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

   const access_token = session?.user?.access_token;

   let notificationList;

   if (session?.user?.user_role === 2) {
      notificationList = await getNotificationsList({ access_token });
   }


   return (
      <Main>
         <HeaderContent
            fromCountriesOptions={fromCountriesOptions}
            session={session}
            notificationList={notificationList}
            role={role}
         />
      </Main>
   );
};

export default Header;
