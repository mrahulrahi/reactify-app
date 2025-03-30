import Config from "../../store/api";

export const getTrundlerDetails = async ({ access_token, userId }) => {

   const _headers = access_token ?
      {
         "Content-Type": "application/json",
         Authorization: `Bearer ${access_token}`,
      } : {
         "Content-Type": "application/json",
      }

   const response = await fetch(`${Config.GET_TRUBDLER_DETAILS}/${userId}`, {
      method: "GET",
      headers: {
         ..._headers,
         'Cache-Control': 'no-cache',
      },
      next: { revalidate: 0 }
   });
   if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
   }
   const data = await response.json();
   return data;
};

export const updateTrundlerDetails = async ({ access_token, formData }) => {
   try {
      const response = await fetch(Config.UPDATE_TRUNDLER_PROFILE, {
         cache: "no-store",
         method: "POST",
         headers: {
            Authorization: `Bearer ${access_token}`,
         },
         body: formData,
      });
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error updating Trundler details:", error);
      throw error;
   }
};
