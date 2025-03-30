import React from "react";
import Select from "react-select";

export default function PhoneCodeSelect() {
   const countriestOptions = countriesList?.data?.map((data, _) => ({
      value: data?.phone_code,
      label: `+${data?.phone_code}`,
      id: data?.id,
   }));
   return <div>PhoneCodeSelect</div>;
}
