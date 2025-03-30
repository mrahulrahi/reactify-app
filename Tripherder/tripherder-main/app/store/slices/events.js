import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   loading: false,
   filtersLoading: false,
   eventsList: {},
   countriesList: {},
   homeDataList: {},
   statesList: {},
   genresList: {},
   error: null,
};

const customHeaders = {
   "Content-Type": "application/json",
};

export const getEvents = createAsyncThunk("events/getEvents", async (token) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   };
   try {
      const response = await axios.get(
         // `${Config.GET_ALL_EVENTS}/?${serachParams}`,
         Config.GET_ALL_EVENTS,
         config
      );
      return response.data;
   } catch (error) {
      throw error;
   }
});

export const getCountries = createAsyncThunk(
   "events/get_countries",
   async () => {
      const config = {
         header: customHeaders,
         params: { apikey: Config.API_KEY },
      };
      try {
         const response = await axios.get(Config.GET_COUNTRIES_URL, config);
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

export const getStates = createAsyncThunk(
   "events/get_states",
   async (params) => {
      const config = {
         header: customHeaders,
         params: { apikey: Config.API_KEY },
      };
      try {
         const response = await axios.get(Config.GET_STATES_URL, config);
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

export const getGenres = createAsyncThunk("events/getGenres", async () => {
   const config = {
      header: customHeaders,
      params: { apikey: Config.API_KEY },
   };
   try {
      const response = await axios.get(Config.GET_GENRES_URL, config);
      return response.data;
   } catch (error) {
      throw error;
   }
});

export const getSportsEventsAlbums = createAsyncThunk(
   "events/getAll",
   async ({ access_token, _params }) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const url = !_params
            ? Config.GET_SPORTS_EVENTS_ALBUMS
            : `${Config.GET_SPORTS_EVENTS_ALBUMS}?${_params}`;
         const response = await axios.get(url, config);
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

const eventsSlices = createSlice({
   name: "events",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getEvents.pending, (state) => {
            state.loading = true;
            state.eventsList = {};
            state.error = null;
         })
         .addCase(getEvents.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.eventsList = payload;
            state.error = null;
         })
         .addCase(getEvents.rejected, (state, { payload }) => {
            state.loading = false;
            state.eventsList = {};
            state.error = payload;
         })

         .addCase(getCountries.pending, (state) => {
            state.filtersLoading = true;
            state.countriesList = {};
            state.error = null;
         })
         .addCase(getCountries.fulfilled, (state, { payload }) => {
            state.filtersLoading = false;
            state.countriesList = payload;
            state.error = null;
         })
         .addCase(getCountries.rejected, (state, { payload }) => {
            state.filtersLoading = false;
            state.countriesList = {};
            state.error = payload;
         })

         .addCase(getStates.pending, (state) => {
            state.filtersLoading = true;
            state.statesList = {};
            state.error = null;
         })
         .addCase(getStates.fulfilled, (state, { payload }) => {
            state.filtersLoading = false;
            state.statesList = payload;
            state.error = null;
         })
         .addCase(getStates.rejected, (state, { payload }) => {
            state.filtersLoading = false;
            state.statesList = {};
            state.error = payload;
         })

         .addCase(getGenres.pending, (state) => {
            state.filtersLoading = true;
            state.genresList = {};
            state.error = null;
         })
         .addCase(getGenres.fulfilled, (state, { payload }) => {
            state.filtersLoading = false;
            state.genresList = payload;
            state.error = null;
         })
         .addCase(getGenres.rejected, (state, { payload }) => {
            state.filtersLoading = false;
            state.genresList = {};
            state.error = payload;
         })

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
   },
});

const { reducer } = eventsSlices;
export default reducer;
