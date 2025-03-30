import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   authDetails: {},
   email: null,
   error: null,
   loading: false,
   updateProfileRes: {},
   emailPassword: {},
   otpRes: {},
};

export const createTrundlerProfile = createAsyncThunk(
   "auth/login",
   async (values) => {
      const config = {
         header: {
            "Content-Type": "multipart/form-data",
         },
      };
      try {
         const res = await axios.post(
            Config.CREATE_TRUNDLER_PROFILE,
            values,
            config
         );
         return res;
      } catch (err) {
         return err.response;
      }
   }
);

export const updateTrundlerProfile = createAsyncThunk(
   "auth/update_profile",
   async ({ access_token, formData }) => {
      try {
         const res = await axios.post(
            Config.UPDATE_TRUNDLER_PROFILE,
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${access_token}`,
               },
            }
         );
         return res;
      } catch (err) {
         return err.response;
      }
   }
);

export const verifyOtp = createAsyncThunk("auth/get-otp", async (values) => {
   const config = {
      header: {
         "Content-Type": "applcation/json",
      },
   };
   try {
      const res = await axios.post(Config.VERIFY_OTP, values, config);
      return res;
   } catch (err) {
      return err.response;
   }
});

export const resendOtp = createAsyncThunk("auth/resend-otp", async (values) => {
   const config = {
      header: {
         "Content-Type": "applcation/json",
      },
   };
   try {
      const res = await axios.post(Config.RESEND_OTP, values, config);
      return res;
   } catch (err) {
      return err.response;
   }
});

export const setEmail = createAsyncThunk("auth/set_email", async (data) => {
   return data;
});

export const setEmailPassword = createAsyncThunk(
   "auth/set_email_password",
   async (data) => {
      return data;
   }
);

const loginSice = createSlice({
   name: "authenticate",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(createTrundlerProfile.pending, (state) => {
         state.loading = true;
         state.otpRes = {};
         state.error = null;
      });
      builder.addCase(createTrundlerProfile.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.otpRes = payload;
         state.error = null;
      });
      builder.addCase(createTrundlerProfile.rejected, (state, { payload }) => {
         state.loading = false;
         state.otpRes = {};
         state.error = payload;
      });

      builder.addCase(verifyOtp.pending, (state) => {
         state.loading = true;
         state.authDetails = {};
         state.error = null;
      });
      builder.addCase(verifyOtp.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.authDetails = payload;
         state.error = null;
      });
      builder.addCase(verifyOtp.rejected, (state, { payload }) => {
         state.loading = false;
         state.authDetails = {};
         state.error = payload;
      });

      builder.addCase(resendOtp.pending, (state) => {
         state.loading = true;
         state.otpRes = {};
         state.error = null;
      });
      builder.addCase(resendOtp.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.otpRes = payload;
         state.error = null;
      });
      builder.addCase(resendOtp.rejected, (state, { payload }) => {
         state.loading = false;
         state.otpRes = {};
         state.error = payload;
      });

      builder.addCase(updateTrundlerProfile.pending, (state) => {
         state.loading = true;
         state.updateProfileRes = {};
         state.error = null;
      });
      builder.addCase(updateTrundlerProfile.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.updateProfileRes = payload;
         state.error = null;
      });
      builder.addCase(updateTrundlerProfile.rejected, (state, { payload }) => {
         state.loading = false;
         state.updateProfileRes = {};
         state.error = payload;
      });

      builder.addCase(setEmail.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.email = payload;
         state.error = null;
      });

      builder.addCase(setEmailPassword.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.emailPassword = payload;
         state.error = null;
      });
   },
});

const { reducer } = loginSice;
export default reducer;
