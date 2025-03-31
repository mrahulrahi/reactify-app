import axios from 'axios';
import { Config } from './api';

import algoliasearch from 'algoliasearch';

const client = algoliasearch(Config.APPLICATION_ID, Config.SEARCH_ONLY_API_KEY);

const index = client.initIndex(Config.INDEX_PREFIX);

// Fetch all countries
export const getAllCountries = async () => {
  try {
    const response = await axios.get(Config.GET_COUNTRY_LIST);
    console.log('Countries:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Fetch states by country ID
export const getStatesByCountryId = async (countryId) => {
  try {
    const response = await axios.get(`${Config.GET_STATE_LIST}?country_id=${countryId}`);
    console.log('States:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching states for country ID ${countryId}:`, error);
    throw error;
  }
};

// Fetch cities by state ID
export const getCitiesByStateId = async (stateId) => {
  try {
    const response = await axios.get(`${Config.GET_CITY_LIST}?state_id=${stateId}`);
    console.log('Cities:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for state ID ${stateId}:`, error);
    throw error;
  }
};

// Fetch sub-micro markets by city ID
export const getSubMicroMarketsByCityId = async (cityId) => {
  try {
    const response = await axios.get(`${Config.GET_SUB_MICRO_MARKET_LIST}?city_id=${cityId}`);
    console.log('Sub-Micro Markets:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sub-micro markets for city ID ${cityId}:`, error);
    throw error;
  }
};

// Function to fetch a record by objectID
export const fetchRecordByObjectID = async (objectID) => {
  try {
    const record = await index.getObject(objectID);
    return record;
  } catch (error) {
    console.error(`Error fetching record with objectID ${objectID}:`, error);
    throw error;
  }
};

export const fetchRecordBySlug = async (slugToFind) => {
  try {
    const { hits } = await index.search('', {
      filters: `slug:"${slugToFind}"`,
      hitsPerPage: 1,
    });

    console.log(hits, "Hits");

  } catch (err) {
    console.error('Error fetching record:', err);
    throw err; // Rethrow for higher-level handling if needed
  }
};
