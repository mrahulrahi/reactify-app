// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { baseUrl } from "../api.js";

// const initialState = {
//    loading: false,
//    sportsList: {},
//    error: null,
// };

// const customHeaders = {
//    "Content-Type": "application/json",
//    mode: "no-cors",
//    "X-Originating-IP": "223.178.81.124",
// };

// export const getSports = createAsyncThunk(
//    "sports/getSports",
//    async (params) => {
//       const config = {
//          header: customHeaders,
//       };

//       try {
//          const response = await axios.get(baseUrl, config);
//          return response.data;
//       } catch (error) {
//          console.error("An error occurred while fetching sports data:", error);
//          throw error; // Rethrow the error so that the Redux Toolkit will mark the request as failed.
//       }
//    }
// );

// const sportSlices = createSlice({
//    name: "sports",
//    initialState,
//    reducers: {},
//    extraReducers: (builder) => {
//       builder
//          .addCase(getSports.pending, (state) => {
//             state.loading = true;
//             state.sportsList = {};
//             state.error = null;
//          })
//          .addCase(getSports.fulfilled, (state, { payload }) => {
//             state.loading = false;
//             state.sportsList = payload;
//             state.error = null;
//          })
//          .addCase(getSports.rejected, (state, { payload }) => {
//             state.loading = false;
//             state.sportsList = {};
//             state.error = payload;
//          });
//    },
// });

// const { reducer } = sportSlices;
// export default reducer;
