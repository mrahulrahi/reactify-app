import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  storeClientSecret: null,
  paidPrice: null
};

export const setStoreClientSecret = createAsyncThunk(
  "countries/get-client-secret",
  async (data) => {
    return data
  }
);

export const setPaidAmount = createAsyncThunk(
  "paid-amount",
  async (data) => {
    return data
  }
);

const billingSlices = createSlice({
  name: "billing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setStoreClientSecret.fulfilled, (state, { payload }) => {
        state.storeClientSecret = payload;
      })
    builder
      .addCase(setPaidAmount.fulfilled, (state, { payload }) => {
        state.paidPrice = payload;
      })
  },
});

const { reducer } = billingSlices;
export default reducer;
