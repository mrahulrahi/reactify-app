import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   loading: false,
   countriesList: {},
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
         const response = await axios.get(Config.GET_ALL_COUNRIES_LIST, config);
         return response.data;
      } catch (error) {
         throw error;
      }
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
         });
   },
});

const { reducer } = countriesSlice;
export default reducer;
