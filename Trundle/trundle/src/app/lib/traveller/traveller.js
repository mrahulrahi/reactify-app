import Config from "../../store/api";

export const getTravellerDetails = async ({ access_token }) => {
   try {
      const response = await fetch(Config.GET_TRAVELLER_DETAILS, {
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

export const getTravellingWithList = async () => {
   try {
      const response = await fetch(Config.GET_TRAVELLING_WITH_LIST_API, {
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


export const updateTravellerDetails = async ({ access_token, travellerDetails }) => {
   try {
      const response = await fetch(Config.UPDATE_TRAVELLER_DETAILS, {
         method: "POST",
         cache: "no-store",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
         body: JSON.stringify(travellerDetails),
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

export const postHelpPlanMyTrip = async ({ values }) => {
   try {
      const response = await fetch(Config.POST_HELP_PLAN_MY_TRIP, {
         method: "POST",
         cache: "no-store",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(values),
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

export const followTrundler = async ({ access_token, _data }) => {
   try {
      const response = await fetch(Config.FOLLOW_TRUNDLER, {
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

export const unFollowTrundler = async ({ access_token, _data }) => {
   try {
      const response = await fetch(Config.UNFOLLOW_TRUNDLER, {
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



export const getMyOrderedList = async ({ access_token }) => {
   try {
      const response = await fetch(Config.MY_ORDERS, {
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
