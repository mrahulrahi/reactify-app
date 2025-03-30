import axios from "axios";
import Config from "../store/api";

export const getArtists = async (serachParams) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const url = `${Config.SPOTIFY_ARTISTS_URL}?${serachParams}`;
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}


export const getFavouiriteActivities = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      Config.GET_FAVOURITE_ACTIVITIES,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const getSavedPreferences = async (token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(Config.GET_SAVED_PREFERENCES, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const postFavouriteActivities = async (data) => {
  const _token = data?.token;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${_token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      Config.POST_FAVOURITE_ACTIVITIES,
      data?.activity_id,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const postFavouriteArtists = async (data) => {
  try {
    const token = data?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      Config.POST_FAVOURITE_ARTIST,
      data,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}