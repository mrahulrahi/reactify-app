import axios from "axios";
import Config from "../store/api";

export const getAnItinerary = async ({ access_token }) => {
  try {
    const headers = access_token ? {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    } : {
      "Content-Type": "application/json",
    };
    const response = await axios.get(
      `${Config.GENERATE_RECOMMENDED_TRIP}`,
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


export const deleteFromSavedItinerary = async ({ currentId, access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${Config?.DELETE_SAVED_ITINERARY}/${currentId}/`,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const saveItinerary = async ({ access_token, saveData }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.post(
      Config?.SAVE_ITINERARY,
      saveData,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const reduceLimit = async ({ access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.post(
      Config?.REDUCE_LIMIT,
      {},
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};


export const addToFav = async ({ access_token, currentId, isFavStatus }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  const data = {
    is_fav: isFavStatus
  }

  try {
    const response = await axios.post(
      `${Config?.ADD_TO_FAV}/${currentId}/update-fav/`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};


export const shareItinerary = async ({ access_token, saveData }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.post(
      Config?.SHARE_ITINERARY,
      saveData,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};


export const getSavedItineraries = async ({ access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.get(
      Config?.GET_SAVED_ITINERARIES,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getFavItineraries = async ({ access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.get(
      Config?.GET_FAV_ITINERARIES,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getFavItineraryById = async ({ id, access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.get(
      `${Config?.GET_SAVED_ITINERARIES_BY_ID}/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getSavedItineraryById = async ({ id, access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.get(
      `${Config?.GET_SAVED_ITINERARIES_BY_ID}/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getSharedItinerary = async ({ sessionId }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(
      `${Config?.GET_SHARED_ITINERARY}/${sessionId}/`,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};