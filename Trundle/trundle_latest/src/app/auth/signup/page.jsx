import React from 'react'
import TravellerProfileForm from '../../components/traveller-profile-form/TravellerProfileForm'
import { getAllCountriesList } from '../../lib/countries/countries';

export default async function Page() {

   const countriesList = await getAllCountriesList();

   const countriestOptions = countriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: `+${data?.phone_code}`,
      id: data?.id,
   }));

   return (
      <TravellerProfileForm
         formType={'create'}
         countriestOptions={countriestOptions}
      />
   )
}

