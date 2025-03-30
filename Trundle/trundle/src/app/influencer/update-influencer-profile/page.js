import React, { Suspense } from "react";
import MidContainer from "../../components/mid-container/MidContainer";
import InnerHero from "../../components/inner-hero/InnerHero";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOptions";
import { getTrundlerDetails } from "../../lib/trundler/getTrundlerDetails";
import { getAllCountriesList, getContentCovers, getCoverCountries, getLanguagesList } from "../../lib/countries/countries";
import { Loading } from "../../components/loading/Loading";
import { TrundlerProfileForm } from "../../components/trundler-profile-form/UpdateTrundlerForm";

export default async function UpdateTrundlerProfile() {
   const session = await getServerSession(authOptions);

   const userId = session?.user?.user_id;

   const trundlerDetails = await getTrundlerDetails({ userId });

   const countriesList = await getAllCountriesList();

   const languagesList = await getLanguagesList();

   const availableCountries = await getCoverCountries();

   const contentCovers = await getContentCovers();

   return (
      <Suspense fallback={<Loading />}>
         <InnerHero heading="Update your profile" subHeading="" />
         <MidContainer>
            <TrundlerProfileForm
               formType={'update'}
               trundlerProfile={trundlerDetails}
               countriesList={countriesList}
               session={session}
               languagesList={languagesList?.data}
               availableCountries={availableCountries?.data}
               contentCoversList={contentCovers?.data}
            />
         </MidContainer>
      </Suspense>
   );
}
