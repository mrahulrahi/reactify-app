import "../form.css";
import InnerHero from "../components/inner-hero/InnerHero";
import MidContainer from "../components/mid-container/MidContainer";
import HelpPlanTripForm from "./help-plan-trip-form/HelpPlanTripForm";
import { getAllCountriesList, getProbableMonthTravel, getPurposeOfTravelList } from "../lib/countries/countries";
import { Suspense } from "react";
import { Loading } from "../components/loading/Loading";
import { OG_IMAGE, SITE_NAME, _metadata } from "../lib/metadata";

export async function generateMetadata(parent) {

   const previousImages = (await parent).openGraph?.images || [];

   return {
      title: _metadata?.help_me_plan_my_trip?.title,
      description: _metadata?.help_me_plan_my_trip?.description,
      openGraph: {
         siteName: SITE_NAME, // Add your site name here
         url: 'https://trundle.me', // Add your website URL here
         images: [
            {
               url: OG_IMAGE,
               width: 1200,  // common recommended width
               height: 630   // common recommended height
            },
            ...previousImages
         ],
      },
      twitter: {
         card: 'summary_large_image', // Twitter card type
         title: _metadata?.help_me_plan_my_trip?.title,
         description: _metadata?.help_me_plan_my_trip?.description,
         image: {
            url: OG_IMAGE,
            width: 1200,  // common recommended width
            height: 630   // common recommended height
         },
      }
   }
}


const CreateYourProfilePage = async () => {
   const allCountriesList = await getAllCountriesList();

   const purposeOfTravelList = await getPurposeOfTravelList();

   const probableMonthTravel = await getProbableMonthTravel();

   return (
      <Suspense fallback={<Loading />}>
         <InnerHero midHeading="Let us know details about your travel plans and our team will prepare a personalized itinerary for you." />
         <MidContainer size="lg">
            <HelpPlanTripForm
               allCountriesList={allCountriesList}
               purposeOfTravelList={purposeOfTravelList?.data}
               probableMonthTravel={probableMonthTravel}
            />
         </MidContainer>
      </Suspense>
   );
};

export default CreateYourProfilePage;
