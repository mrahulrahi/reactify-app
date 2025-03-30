import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
   language: null,
};

export const changeLanguage = createAsyncThunk(
   "language",
   async (language) => {
      return language;
   }
);

const preferencesSlices = createSlice({
   name: "language",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(changeLanguage.fulfilled, (state, { payload }) => {
         state.language = payload;
      });
   },
});

const { reducer } = preferencesSlices;
export default reducer;
