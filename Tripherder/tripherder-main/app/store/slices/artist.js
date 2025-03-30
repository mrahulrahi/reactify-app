import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   loading: false,
   artistsList: {},
   postArtistRes: {},
   error: null,
   saveArtistLoading: false,
};

export const getArtists = createAsyncThunk(
   "artists/getArtists",
   async (serachParams) => {
      const config = {
         "Content-Type": "application/json",
      };
      try {
         const url = `${Config.SPOTIFY_ARTISTS_URL}?${serachParams}`;
         const response = await axios.get(url, config);
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

   export const postFavouriteArtists = createAsyncThunk(
      "artists/post_fav_artists",
      async (data) => {
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
   );

const artistSlices = createSlice({
   name: "artists",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getArtists.pending, (state) => {
            state.loading = true;
            state.artistsList = {};
            state.error = null;
         })
         .addCase(getArtists.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.artistsList = payload;
            state.error = null;
         })
         .addCase(getArtists.rejected, (state, { payload }) => {
            state.loading = false;
            state.artistsList = {};
            state.error = payload;
         })

         .addCase(postFavouriteArtists.pending, (state) => {
            state.saveArtistLoading = true;
            state.postArtistRes = {};
            state.error = null;
         })
         .addCase(postFavouriteArtists.fulfilled, (state, { payload }) => {
            state.saveArtistLoading = false;
            state.postArtistRes = payload;
            state.error = null;
         })
         .addCase(postFavouriteArtists.rejected, (state, { payload }) => {
            state.saveArtistLoading = false;
            state.postArtistRes = {};
            state.error = payload;
         });
   },
});

const { reducer } = artistSlices;
export default reducer;
