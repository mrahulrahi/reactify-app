import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   createItineraryRes: {},
   itinerariesList: {},
   error: null,
   loading: false,
   itinerary: {},
   coverImage: null,
   selectedCountry: null,
   suitableFor: null,
   title: "",
   description: "",
   genericDiscountCode: "",
   price: "",
   addedItinerariesList: []
};


export const setCoverImage = createAsyncThunk(
   "set_cover_image",
   async (file) => {
      return file
   }
);

export const setSelectedCountry = createAsyncThunk(
   "set_selected_country",
   async (data) => {
      return data
   }
);

export const setSuitableFor = createAsyncThunk(
   "set_syuitable_for",
   async (data) => {
      return data
   }
);

export const setTitle = createAsyncThunk(
   "setTitle",
   async (data) => {
      return data
   }
);

export const setDescription = createAsyncThunk(
   "setDescription",
   async (data) => {
      return data
   }
);

export const setGenericDiscountCode = createAsyncThunk(
   "set_generic_discount_code",
   async (data) => {
      return data
   }
);

export const setPrice = createAsyncThunk(
   "set_price",
   async (data) => {
      return data
   }
);

export const _setAddedItineraryItemList = createAsyncThunk(
   "add_itineraries_list",
   async (data) => {
      return data
   }
);


export const deleteItineraryItem = createAsyncThunk(
   "delete_itinerary_item",
   async ({ access_token, id }) => {
      const config = {
         headers: {
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const res = await axios.delete(`${Config.DELETE_ITINERARY_ITEM}/${id}`, config);
         return res.data;
      } catch (err) {
         console.error("Error in Delete an Itinerary:", err);
         throw err;
      }
   }
);

export const createItinerary = createAsyncThunk(
   "create_itinerary",
   async ({ access_token, formData }) => {
      const config = {
         headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const res = await axios.post(Config.POST_ITINERARY, formData, config);
         return res.data;
      } catch (err) {
         console.error("Error in getTrundlerDetails:", err);
         throw err;
      }
   }
);

export const updateItinerary = createAsyncThunk(
   "update_itinerary",
   async ({ access_token, formData, id }) => {
      const config = {
         headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const res = await axios.put(
            `${Config.UPDATE_ITINERARY}/${id}`,
            formData,
            config
         );
         return res.data;
      } catch (err) {
         console.log("Error in getTrundlerDetails:", err);
         throw err;
      }
   }
);

export const getAllItineraries = createAsyncThunk(
   "get_all_itineraries",
   async ({ access_token }) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const res = await axios.get(Config.GET_ALL_ITINERARIES, config);
         return res.data;
      } catch (err) {
         console.error("Error in getTrundlerDetails:", err);
         throw err;
      }
   }
);

export const deleteItinerary = createAsyncThunk(
   "delete_itinerary",
   async ({ access_token, id }) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const res = await axios.delete(
            `${Config.DELEE_ITINERAY}/${id}`,
            config
         );

         const data = { id, res };
         return data;
      } catch (err) {
         console.error("Error in getTrundlerDetails:", err);
         throw err;
      }
   }
);

export const getItineraryById = createAsyncThunk(
   "get_itinerary_by_id",
   async ({ access_token, id }) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
         },
      };
      try {
         const res = await axios.get(`${Config.GET_AN_ITINERAY}/${id}`, config);
         return res.data;
      } catch (err) {
         console.error("Error in getTrundlerDetails:", err);
         throw err;
      }
   }
);

const itinerarySlices = createSlice({
   name: "itinerary",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(createItinerary.pending, (state) => {
         state.loading = true;
         state.createItineraryRes = {};
         state.error = null;
      });
      builder.addCase(createItinerary.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.createItineraryRes = payload;
         state.error = null;
      });
      builder.addCase(createItinerary.rejected, (state, { payload }) => {
         state.loading = false;
         state.createItineraryRes = {};
         state.error = payload;
      });

      builder.addCase(getAllItineraries.pending, (state) => {
         state.loading = true;
         state.itinerariesList = {};
         state.error = null;
      });
      builder.addCase(getAllItineraries.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.itinerariesList = payload;
         state.error = null;
      });
      builder.addCase(getAllItineraries.rejected, (state, { payload }) => {
         state.loading = false;
         state.itinerariesList = {};
         state.error = payload;
      });

      builder.addCase(getItineraryById.pending, (state) => {
         state.loading = true;
         state.itinerary = {};
         state.error = null;
      });
      builder.addCase(getItineraryById.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.itinerary = payload;
         state.error = null;
      });
      builder.addCase(getItineraryById.rejected, (state, { payload }) => {
         state.loading = false;
         state.itinerary = {};
         state.error = payload;
      });

      builder.addCase(deleteItinerary.pending, (state) => {
         state.loading = true;
         state.itinerary = {};
         state.error = null;
      });
      builder.addCase(deleteItinerary.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.itinerary = payload;
         if (state.itinerariesList && state.itinerariesList?.itineraries) {
            state.itinerariesList.itineraries =
               state.itinerariesList.itineraries
                  .map((interest) => {
                     if (interest.id === payload?.id) {
                        return null; // We'll filter these out later
                     }
                     return interest; // Return all other artists as is
                  })
                  .filter(Boolean); // Filter out null values (the artist to be removed)
         }
         state.error = null;
      });
      builder.addCase(deleteItinerary.rejected, (state, { payload }) => {
         state.loading = false;
         state.itinerary = {};
         state.error = payload;
      });

      builder.addCase(setCoverImage.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.coverImage = payload;
         state.error = null;
      });

      builder.addCase(setSelectedCountry.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.selectedCountry = payload;
         state.error = null;
      });

      builder.addCase(setSuitableFor.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.suitableFor = payload;
         state.error = null;
      });

      builder.addCase(setTitle.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.title = payload;
         state.error = null;
      });

      builder.addCase(setDescription.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.description = payload;
         state.error = null;
      });

      builder.addCase(setGenericDiscountCode.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.genericDiscountCode = payload;
         state.error = null;
      });

      builder.addCase(setPrice.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.price = payload;
         state.error = null;
      });

      builder.addCase(_setAddedItineraryItemList.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.addedItinerariesList = payload;
         state.error = null;
      });
   },
});

const { reducer } = itinerarySlices;
export default reducer;
