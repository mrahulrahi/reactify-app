import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
   error: null,
   loading: false,
   intent: {},
};

export const saveIntent = createAsyncThunk(
   "save_intent",
   async (intent) => {
      return intent
   }
);

const paymentSlices = createSlice({
   name: "payment",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(saveIntent.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.intent = payload;
         state.error = null;
      });
   },
});

const { reducer } = paymentSlices;
export default reducer;
