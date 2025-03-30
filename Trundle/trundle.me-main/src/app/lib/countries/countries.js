import Config from "../../store/api";

export const getAllCountriesList = async () => {
   try {
      const response = await fetch(Config.GET_ALL_COUNTRIES_LIST, {
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

export const getPurposeOfTravelList = async () => {
   try {
      const response = await fetch(Config.GET_TRAVEL_PURPOSES, {
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


export const getProbableMonthTravel = async () => {
   try {
      const response = await fetch(Config.GET_TRAVEL_MONTHS, {
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

export const getLanguagesList = async () => {
   try {
      const response = await fetch(Config.GET_LANGUAGES_LIST, {
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

export const getCoverCountries = async () => {
   try {
      const response = await fetch(Config.GET_COVER_COUNTRIES, {
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

export const getContentCovers = async () => {
   try {
      const response = await fetch(Config.GET_CONTENT_COVERS, {
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

export const getCitiesByCountryId = async ({ countryId }) => {
   try {
      const response = await fetch(`${Config.GET_CITIES}/${countryId}`, {
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
