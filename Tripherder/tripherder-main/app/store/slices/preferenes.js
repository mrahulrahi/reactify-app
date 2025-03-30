import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   loading: false,
   error: null,
   saveArtistLoading: false,
   postSettingsRes: {},
   postActivitiesRes: {},
   favoiriteActivities: null,
   savedPreferencesList: {},
   citiesList: {},
   removeArtistRes: {},
   removeInterestRes: {},
   deleteArtistsLoading: false,
   deleteInterestLoading: false,
   isFrom: {},
   city: null,
   state: null,
   drivingDistance: null,
   _startDate: null,
   _endDate: null,
   priority: null,
   numberOfNights: null,
   preferenceModalShow: false,
   activeStep: 0,
};

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

export const postTripSettings = createAsyncThunk(
   "post_trip_settings",
   async (data) => {
      const token = data?.token;
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      };
      try {
         const response = await axios.post(
            Config.POST_TRIP_SETTINGS,
            data,
            config
         );
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);



export const getFavouiriteActivities = createAsyncThunk(
   "get_favourite_activities",
   async (token) => {
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
         throw error;
      }
   }
);

export const getCities = createAsyncThunk(
   "get_cities",
   async ({ access_token }) => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${access_token}`,
            },
         };
         const response = await axios.get(Config.GET_CITIES, config);
         return response.data;
      } catch (error) {
         throw error;
      }
   }
);

export const getSavedPreferences = createAsyncThunk(
   "get_saved_preferences",
   async (token) => {
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
         throw error;
      }
   }
);

export const removeArtist = createAsyncThunk(
   "remove_arists",
   async ({ token, id }) => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };
         await axios.delete(`${Config.DELETE_FAVOURITE_ARTIST}/${id}`, config);
         return id;
      } catch (error) {
         throw error;
      }
   }
);

export const removeInterest = createAsyncThunk(
   "remove_interest",
   async ({ token, id }) => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };
         await axios.delete(`${Config.DELETE_FAVOURITE_INTERST}/${id}`, config);
         return id;
      } catch (error) {
         throw error;
      }
   }
);

export const setIsFrom = createAsyncThunk("set-is-from", (path) => {
   return path;
});

export const setCity = createAsyncThunk("set-city", (data) => {
   return data;
});

export const setState = createAsyncThunk("set_state", (data) => {
   return data;
});

export const setPriority = createAsyncThunk("set-priority", (data) => {
   return data;
});

export const _setStartDate = createAsyncThunk("start-date", (date) => {
   return date;
});

export const _setEndDate = createAsyncThunk("end-date", (date) => {
   return date;
});

export const setDrivingDistance = createAsyncThunk(
   "set=driwing-distance",
   (driving_distance) => {
      return driving_distance;
   }
);

export const setNumOfNights = createAsyncThunk(
   "num_of_nights",
   (num_of_nights) => {
      return num_of_nights;
   }
);

export const setPreferenceModalShow = createAsyncThunk(
   "modal_show", (status) => {
      return status
   }
)

export const setActiveStep = createAsyncThunk(
   "active_step", (status) => {
      return status
   }
)

const preferencesSlices = createSlice({
   name: "preferences",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
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
         })

         .addCase(postTripSettings.pending, (state) => {
            state.loading = true;
            state.postSettingsRes = {};
            state.error = null;
         })
         .addCase(postTripSettings.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.postSettingsRes = payload;
            state.error = null;
         })
         .addCase(postTripSettings.rejected, (state, { payload }) => {
            state.loading = false;
            state.postSettingsRes = {};
            state.error = payload;
         })

         .addCase(getFavouiriteActivities.pending, (state) => {
            state.loading = true;
            state.favoiriteActivities = {};
            state.error = null;
         })
         .addCase(getFavouiriteActivities.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.favoiriteActivities = payload;
            state.error = null;
         })
         .addCase(getFavouiriteActivities.rejected, (state, { payload }) => {
            state.loading = false;
            state.favoiriteActivities = {};
            state.error = payload;
         })

         .addCase(getSavedPreferences.pending, (state) => {
            state.loading = true;
            state.savedPreferencesList = {};
            state.error = null;
         })

         .addCase(getSavedPreferences.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.savedPreferencesList = payload;
            state.error = null;
         })
         .addCase(getSavedPreferences.rejected, (state, { payload }) => {
            state.loading = false;
            state.savedPreferencesList = {};
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

         .addCase(removeArtist.pending, (state) => {
            state.deleteArtistsLoading = true;
            state.removeArtistRes = {};
            state.error = null;
         })
         .addCase(removeArtist.fulfilled, (state, { payload }) => {
            state.deleteArtistsLoading = false;
            if (
               state.savedPreferencesList &&
               state.savedPreferencesList.spotify_data
            ) {
               state.savedPreferencesList.spotify_data =
                  state.savedPreferencesList.spotify_data
                     .map((artist) => {
                        if (artist.id === payload) {
                           return null; // We'll filter these out later
                        }
                        return artist; // Return all other artists as is
                     })
                     .filter(Boolean); // Filter out null values (the artist to be removed)
            }
            state.error = null;
         })
         .addCase(removeArtist.rejected, (state, { payload }) => {
            state.deleteArtistsLoading = false;
            state.removeArtistRes = {};
            state.error = payload;
         })

         .addCase(removeInterest.pending, (state) => {
            state.deleteInterestLoading = true;
            state.removeInterestRes = {};
            state.error = null;
         })
         .addCase(removeInterest.fulfilled, (state, { payload }) => {
            state.deleteInterestLoading = false;
            if (
               state.savedPreferencesList &&
               state.savedPreferencesList.travel_intrest.sports
            ) {
               state.savedPreferencesList.travel_intrest.sports =
                  state.savedPreferencesList.travel_intrest.sports
                     .map((interest) => {
                        if (interest.id === payload) {
                           return null; // We'll filter these out later
                        }
                        return interest; // Return all other artists as is
                     })
                     .filter(Boolean); // Filter out null values (the artist to be removed)
            }
            state.error = null;
         })
         .addCase(removeInterest.rejected, (state, { payload }) => {
            state.deleteInterestLoading = false;
            state.removeInterestRes = {};
            state.error = payload;
         })

         .addCase(setIsFrom.fulfilled, (state, { payload }) => {
            state.isFrom = payload;
         })

         .addCase(setCity.fulfilled, (state, { payload }) => {
            state.city = payload;
         })

         .addCase(setState.fulfilled, (state, { payload }) => {
            state.state = payload;
         })

         .addCase(setPriority.fulfilled, (state, { payload }) => {
            state.priority = payload;
         })

         .addCase(setDrivingDistance.fulfilled, (state, { payload }) => {
            state.drivingDistance = payload;
         })

         .addCase(setNumOfNights.fulfilled, (state, { payload }) => {
            state.numberOfNights = payload;
         })

         .addCase(_setStartDate.fulfilled, (state, { payload }) => {
            state._startDate = payload;
         })

         .addCase(_setEndDate.fulfilled, (state, { payload }) => {
            state._endDate = payload;
         })

         .addCase(setPreferenceModalShow.fulfilled, (state, { payload }) => {
            state.preferenceModalShow = payload;
         })

         .addCase(setActiveStep.fulfilled, (state, { payload }) => {
            state.activeStep = payload;
         });
   },
});

const { reducer } = preferencesSlices;
export default reducer;
