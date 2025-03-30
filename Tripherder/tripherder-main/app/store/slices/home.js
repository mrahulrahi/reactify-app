import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";
import toast from "react-hot-toast";

const initialState = {
   loading: false,
   homeDataList: {},
   recommendedTrips: null,
   recommendedTripsDev: {},
   error: null,
};

export const getSportsEventsAlbums = createAsyncThunk(
   "home/get_sports_events_albums",
   async (access_token) => {
      const config = {
         "Content-Type": "application/json",
         Authorization: `Bearer ${access_token}`,
      };
      try {
         const response = await axios.get(
            Config.GET_SPORTS_EVENTS_ALBUMS,
            config
         );
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

export const generateTripEngine = createAsyncThunk(
   "home/recommend_trips",
   async ({ token, data }) => {
      const config = {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      };
      const _data = {
         headers: config,
         params: Object.entries(data).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
         }, {}),
      };
      try {
         const response = await axios.get(
            Config.GENERATE_RECOMMENDED_TRIP,
            _data
         );
         return response?.data;
      } catch (error) {
         toast.error(error?.response?.data?.message);
         throw error;
      }
   }
);
export const generateTripEngineDevelopment = createAsyncThunk(
   "home/recommend_trips_dev",
   async ({ token, data }) => {
      const config = {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      };
      const _data = {
         headers: config,
         params: Object.entries(data).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
         }, {}),
      };
      try {
         const response = await axios.get(
            Config.GENERATE_RECOMMENDED_TRIP_DEV,
            _data
         );
         return response?.data;
      } catch (error) {
         throw error;
      }
   }
);

const homeSlices = createSlice({
   name: "home_list",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getSportsEventsAlbums.pending, (state) => {
            state.loading = true;
            state.homeDataList = {};
            state.error = null;
         })
         .addCase(getSportsEventsAlbums.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.homeDataList = payload;
            state.error = null;
         })
         .addCase(getSportsEventsAlbums.rejected, (state, { payload }) => {
            state.loading = false;
            state.homeDataList = {};
            state.error = payload;
         });

      builder
         .addCase(generateTripEngine.pending, (state) => {
            state.loading = true;
            // state.recommendedTrips = {};
            state.error = null;
         })
         .addCase(generateTripEngine.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.recommendedTrips = payload;
            state.error = null;
         })
         .addCase(generateTripEngine.rejected, (state, { payload }) => {
            state.loading = false;
            state.recommendedTrips = {};
            state.error = payload;
         });

      builder
         .addCase(generateTripEngineDevelopment.pending, (state) => {
            state.loading = true;
            // state.recommendedTrips = {};
            state.error = null;
         })
         .addCase(
            generateTripEngineDevelopment.fulfilled,
            (state, { payload }) => {
               state.loading = false;
               state.recommendedTripsDev = payload;
               state.error = null;
            }
         )
         .addCase(
            generateTripEngineDevelopment.rejected,
            (state, { payload }) => {
               state.loading = false;
               // state.recommendedTrips = {};
               state.error = payload;
            }
         );
   },
});

const { reducer } = homeSlices;
export default reducer;
