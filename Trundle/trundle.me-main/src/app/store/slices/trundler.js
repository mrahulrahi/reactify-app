import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   onboardRes: {},
   aboutUsRes: {},
   error: null,
   loading: false,
   trundlerProfile: {},
   newsRes: {},
};

export const sendTrundlerRequest = createAsyncThunk(
   "onboard/request",
   async (values) => {
      const config = {
         header: {
            "Content-Type": "application/json",
         },
      };
      try {
         const res = await axios.post(
            Config.SEND_TRUNDLER_INVITATION,
            values,
            config
         );
         return res;
      } catch (err) {
         return err.response;
      }
   }
);

export const postAboutUsEmail = createAsyncThunk(
   "anbout-us/request",
   async (values) => {
      const config = {
         header: {
            "Content-Type": "application/json",
         },
      };
      try {
         const res = await axios.post(
            Config.POST_ABOUT_US_EMAIL,
            values,
            config
         );
         return res;
      } catch (err) {
         return err.response;
      }
   }
);


export const getTrundlerDetails = createAsyncThunk(
   "get_trundler_details",
   async ({ access_token }) => {
      const config = {
         headers: {
            // Change 'header' to 'headers'
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`, // Use the access_token parameter
         },
      };
      try {
         const res = await axios.get(Config.GET_TRUBDLER_DETAILS, config);
         return res.data; // Assuming you want to return the data property of the response
      } catch (err) {
         console.error("Error in getTrundlerDetails:", err);
         throw err; // Re-throw the error to be handled by the calling code
      }
   }
);

export const sendNewsLetter = createAsyncThunk(
   "send_news_letter",
   async ({ access_token, news_letter }) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const res = await axios.post(
            Config.SEND_NEWS_LETTER,
            news_letter,
            config
         );
         return res.data;
      } catch (err) {
         console.error("Error in getTrundlerDetails:", err);
         throw err;
      }
   }
);

const trundlerSlices = createSlice({
   name: "trundler",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(sendTrundlerRequest.pending, (state) => {
         state.loading = true;
         state.onboardRes = {};
         state.error = null;
      });
      builder.addCase(sendTrundlerRequest.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.onboardRes = payload;
         state.error = null;
      });
      builder.addCase(sendTrundlerRequest.rejected, (state, { payload }) => {
         state.loading = false;
         state.onboardRes = {};
         state.error = payload;
      });

      builder.addCase(getTrundlerDetails.pending, (state) => {
         state.loading = true;
         state.trundlerProfile = {};
         state.error = null;
      });
      builder.addCase(getTrundlerDetails.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.trundlerProfile = payload;
         state.error = null;
      });
      builder.addCase(getTrundlerDetails.rejected, (state, { payload }) => {
         state.loading = false;
         state.trundlerProfile = {};
         state.error = payload;
      });

      builder.addCase(sendNewsLetter.pending, (state) => {
         state.loading = true;
         state.newsRes = {};
         state.error = null;
      });
      builder.addCase(sendNewsLetter.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.newsRes = payload;
         state.error = null;
      });
      builder.addCase(sendNewsLetter.rejected, (state, { payload }) => {
         state.loading = false;
         state.newsRes = {};
         state.error = payload;
      });

      builder.addCase(postAboutUsEmail.pending, (state) => {
         state.loading = true;
         state.aboutUsRes = {};
         state.error = null;
      });
      builder.addCase(postAboutUsEmail.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.aboutUsRes = payload;
         state.error = null;
      });
      builder.addCase(postAboutUsEmail.rejected, (state, { payload }) => {
         state.loading = false;
         state.aboutUsRes = {};
         state.error = payload;
      });
   },
});

const { reducer } = trundlerSlices;
export default reducer;
