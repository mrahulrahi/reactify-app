import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  buisnessInfo: {}
};

export const storeBusinessInfo = createAsyncThunk(
  "countries/get-countries",
  async (data) => {
    return data
  }
);

const businessSlices = createSlice({
  name: "business",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storeBusinessInfo.fulfilled, (state, { payload }) => {
        state.buisnessInfo = payload;
      })
  },
});

const { reducer } = businessSlices;
export default reducer;
