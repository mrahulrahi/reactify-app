import Config from "../../store/api";
import axios from 'axios';

export const getAnItinerary = async ({ itinerary_id, access_token }) => {
   try {
      const headers = access_token ? {
         "Content-Type": "application/json",
         Authorization: `Bearer ${access_token}`,
      } : {
         "Content-Type": "application/json",
      };
      const response = await axios.get(
         `${Config.GET_AN_ITINERAY}/${itinerary_id}`,
         {
            headers: headers,
            responseType: 'json',
            validateStatus: (status) => {
               return status >= 200 && status < 300;
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
   }
};

export const getItinerariesCategories = async ({ access_token }) => {
   try {
      const headers = {
         "Content-Type": "application/json",
         Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
         `${Config.GET_ITINERIES_CATEGORIES}`,
         {
            headers: headers,
            responseType: 'json',
            validateStatus: (status) => {
               return status >= 200 && status < 300;
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
   }
};


export const getPriceList = async () => {
   try {
      const headers = {
         "Content-Type": "application/json",
         // Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
         `${Config.GET_PRICE_LIST}`,
         {
            headers: headers,
            responseType: 'json',
            validateStatus: (status) => {
               return status >= 200 && status < 300;
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
   }
};


export const getNotificationsList = async ({ access_token }) => {
   try {
      const headers = {
         "Content-Type": "application/json",
         Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
         `${Config.GET_NOTIFICATIONS}`,
         {
            headers: headers,
            responseType: 'json',
            validateStatus: (status) => {
               return status >= 200 && status < 300;
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
   }
};

export const updateNotifictionStatus = async ({ notification_id, access_token, isAdminType }) => {
   try {
      const fullUrl = isAdminType ? `${Config.UPDATE_ADMIN_NOTIFICATION_STATUS}/${notification_id}` : `${Config.UPDATE_NOTIFICATION_STATUS}/${notification_id}`;

      const response = await fetch(fullUrl, {
         method: "POST",
         cache: "no-store",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      });
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

export const getSuitableForList = async ({ access_token }) => {
   try {
      const headers = {
         "Content-Type": "application/json",
         Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
         `${Config.GET_SUITABLE_FOR_LIST}`,
         {
            headers: headers,
            responseType: 'json',
            validateStatus: (status) => {
               return status >= 200 && status < 300;
            },
         }
      );
      return response.data;
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
      return response.data;
   } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
   }
};


export const getAllItineraies = async ({ queryString }) => {
   try {
      const fullUrl =
         queryString?.length === 0
            ? `${Config.GET_ALL_ITINERARIES}`
            : `${Config.GET_ALL_ITINERARIES}?${queryString}`;

      const response = await fetch(fullUrl, {
         method: "GET",
         cache: "no-store",
         headers: {
            "Content-Type": "application/json",
         },
      });
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


export const getPurchasedItineraries = async ({ access_token, queryString }) => {
   try {
      const fullUrl =
         queryString?.length === 0
            ? `${Config.PURCHASED_ITINERARIES}`
            : `${Config.PURCHASED_ITINERARIES}?${queryString}`;

      const response = await fetch(fullUrl, {
         method: "GET",
         cache: "no-store",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      });
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

export const getAllItinerariesByUserId = async ({ userId }) => {
   try {
      const response = await fetch(
         `${Config.GET_ALL_ITINERARIES_BY_USER_ID}/${userId}`,
         {
            method: "GET",
            cache: "no-store",
            headers: {
               "Content-Type": "application/json",
            },
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

export const getTravellerHomeData = async () => {
   try {
      const response = await fetch(Config.GET_TRAVELLER_HOME_DATA, {
         method: "GET",
         cache: "no-store",
         headers: {
            "Content-Type": "application/json",
         },
      });
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

export const deleteItinerary = async ({ access_token, id }) => {
   try {
      const response = await fetch(`${Config.DELEE_ITINERAY}/${id}`, {
         method: "DELETE",
         cache: "no-store",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      });
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

export const changeItineraryStatus = async ({
   access_token,
   itinerary_id,
   statusId,
}) => {
   const _data = {
      status: statusId,
   };

   try {
      const response = await fetch(`${Config.CHANGE_STATUS}/${itinerary_id}`, {
         method: "POST",
         cache: "no-store",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
         body: JSON.stringify(_data),
      });
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
