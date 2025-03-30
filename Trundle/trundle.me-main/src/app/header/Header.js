import "../form.css";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";
import { NavList } from "./nav-list/NavList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import Main from "./Main";
import { getCoverCountries } from "../lib/countries/countries";
import { getNotificationsList } from "../lib/itinerary/getItinerary";
import DropDown from "./DropDown"

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
         <header id="header">
            <nav className="navbar navbar-expand-xl">
               <div className="container">
                  <div className="nav-inside d-flex align-items-center justify-content-between">
                     <Link
                        className="navbar-brand flex-shrink-0"
                        href={`${role === 1 ? `/influencer/my-profile` : `/`}`}
                     >
                        <Image
                           src="/images/logo.svg"
                           width={135}
                           height={36}
                           alt="Trundle"
                           priority
                        />
                     </Link>
                     <>
                        {role === 1 ? (
                           <DropDown />
                        ) : (
                           <NavList
                              countriesList={fromCountriesOptions}
                              session={session}
                              notificationList={notificationList}
                           />
                        )}
                     </>
                  </div>
               </div>
            </nav>
         </header>
      </Main>
   );
};

export default Header;
