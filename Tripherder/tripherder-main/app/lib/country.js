import axios from "axios";
import Config from "../store/api";

export const getStates = async ({ access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.get(Config?.GET_STATES_LIST, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const fetchCities = async ({ access_token, state_id }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.get(`https://api.tripherder.com/api-v1/account/cities/?state_id=${state_id}`, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getAllCountry = async ({ access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.get(Config.GET_ALL_COUNRIES_LIST, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};