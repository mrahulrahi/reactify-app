import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   loading: false,
   countriesList: {},
   coverCountriesList: {},
   citiesList: {},
   selectedCountry: {},
   error: null,
};

export const getAllCountries = createAsyncThunk(
   "countries/get-countries",
   async () => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      try {
         const response = await axios.get(
            Config.GET_ALL_COUNTRIES_LIST,
            config
         );
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

export const getCoverCountries = createAsyncThunk(
   "countries/get-cover-countries",
   async ({ access_token }) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const response = await axios.get(Config.GET_COVER_COUNTRIES, config);
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

export const getCities = createAsyncThunk(
   "countries/get-cities",
   async ({ country_id }) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      try {
         const response = await axios.get(
            `${Config.GET_CITIES}/${country_id}`,
            config
         );
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

export const _setSelectedCountry = createAsyncThunk(
   "countries/_setSelectedCountry",
   async (country) => {
      return country
   }
);

const countriesSlice = createSlice({
   name: "countries",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllCountries.pending, (state) => {
            state.loading = true;
            state.countriesList = {};
            state.error = null;
         })
         .addCase(getAllCountries.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.countriesList = payload;
            state.error = null;
         })
         .addCase(getAllCountries.rejected, (state, { payload }) => {
            state.loading = false;
            state.countriesList = {};
            state.error = payload;
         })

         .addCase(getCoverCountries.pending, (state) => {
            state.loading = true;
            state.coverCountriesList = {};
            state.error = null;
         })
         .addCase(getCoverCountries.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.coverCountriesList = payload;
            state.error = null;
         })
         .addCase(getCoverCountries.rejected, (state, { payload }) => {
            state.loading = false;
            state.coverCountriesList = {};
            state.error = payload;
         })

         .addCase(getCities.pending, (state) => {
            state.loading = true;
            state.citiesList = {};
            state.error = null;
         })
         .addCase(getCities.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.citiesList = payload;
            state.error = null;
         })
         .addCase(getCities.rejected, (state, { payload }) => {
            state.loading = false;
            state.citiesList = {};
            state.error = payload;
         })

         .addCase(_setSelectedCountry.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.selectedCountry = payload;
            state.error = null;
         })
   },
});

const { reducer } = countriesSlice;
export default reducer;
