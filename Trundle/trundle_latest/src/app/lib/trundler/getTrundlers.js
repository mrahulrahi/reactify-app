import Config from "../../store/api";

export const getAllTrundlers = async ({ access_token, queryString }) => {
   const fullUrl =
      queryString?.length === 0
         ? `${Config.GET_ALL_TRUNDLERS}`
         : `${Config.GET_ALL_TRUNDLERS}?${queryString}`;

   const _headers = access_token ? {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
   } : {
      "Content-Type": "application/json",
   }

   const response = await fetch(fullUrl, {
      cache: "no-store",
      method: "GET",
      headers: _headers,
   });
   if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
   }
   const data = await response.json();
   return data;
};
