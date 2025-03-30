import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
   selectedArists: {},
   selectedEvents: {},
   selectedActivities: {},
};

export const setSelectedArtists = createAsyncThunk(
   "artists/setSelectedArtist",
   async (data) => {
      return data;
   }
);

const stateSlices = createSlice({
   name: "state",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(setSelectedArtists.fulfilled, (state, { payload }) => {
         state.selectedArists = payload;
      });
   },
});

const { reducer } = stateSlices;
export default reducer;
