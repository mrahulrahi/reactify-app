import React, { Suspense } from "react";
import MidContainer from "../components/mid-container/MidContainer";
import InnerHero from "../components/inner-hero/InnerHero";
import { TrundlerProfileForm } from "../components/trundler-profile-form/UpdateTrundlerForm";
import { Loading } from "../components/loading/Loading";
import {
   getAllCountriesList,
   getContentCovers,
   getCoverCountries,
   getLanguagesList
} from "../lib/countries/countries";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { redirect } from "next/navigation";

export default async function Page() {

   const session = await getServerSession(authOptions);

   const role = session?.user?.user_role;

   // if (session) {
   //    if (role === 1) {
   //       redirect('/influencer/my-profile');
   //    } else {
   //       redirect('/travellers')
   //    }
   // }

   const countriesList = await getAllCountriesList();

   const languagesList = await getLanguagesList();

   const availableCountries = await getCoverCountries();

   const contentCovers = await getContentCovers();

   return (
      <Suspense fallback={<Loading />}>
         <InnerHero heading="Create your profile" subHeading="" />
         <MidContainer>
            <TrundlerProfileForm
               formType="create"
               countriesList={countriesList}
               languagesList={languagesList?.data}
               availableCountries={availableCountries?.data}
               contentCoversList={contentCovers?.data}
            />
         </MidContainer>
      </Suspense>
   );
}
