import Config from "../../store/api";

export const initiatePayment = async ({ itineraryId, access_token }) => {
   const payment = {
      itinerary_id: `${itineraryId}`,
   };
   try {
      const response = await fetch(
         `${Config.GET_INTERNT_ID}/${itineraryId}`,
         {
            method: "POST",
            cache: "no-store",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(payment),
         }
      );
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
   }
};

export const getIpDetails = async () => {
   try {
      const headers = {
         "Content-Type": "application/json",
      };

      const response = await axios.get(
         `${Config.GET_CURRENT_IP_ADDRESS}`,
         {
            headers: headers,
            responseType: 'json',
            validateStatus: (status) => {
               return status >= 200 && status < 300;
            },
         }
      );
      if (response?.data?.currency === "INR") {
         return "₹"
      } else {
         return "$"
      }
   } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
   }
};
