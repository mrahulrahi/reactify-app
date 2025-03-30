import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api.js";

const initialState = {
   loginData: {},
   signupRes: {},
   name: {},
   error: null,
   loading: false,
   resendOtp: {},
   spotifyLoading: false,
   decodedAuthData: {},
   spotifyToken: {},
};

export const loginUser = createAsyncThunk("auth/login", async (values) => {
   const config = {
      header: {
         "Content-Type": "application/json",
      },
   };
   try {
      const res = await axios.post(Config.LOGIN_URL, values, config);
      return res?.data;
   } catch (err) {
      return err.response;
   }
});

export const loginWithSpotify = createAsyncThunk(
   "auth/login_with_spotify",
   async (values) => {
      const config = {
         header: {
            "Content-Type": "application/json",
         },
      };
      try {
         const res = await axios.post(
            Config.LOGIN_WITH_SPOTIFY_URL,
            values,
            config
         );
         return res?.data;
      } catch (err) {
         return err.response;
      }
   }
);

export const signupUser = createAsyncThunk("auth/signup", async (values) => {
   const config = {
      header: { "Content-Type": "application/json" },
   };
   try {
      const res = await axios.post(Config.SIGNUP_URL, values, config);
      return res;
   } catch (err) {
      return err.response;
   }
});

export const verifyOTP = createAsyncThunk("auth/verify_otp", async (values) => {
   const config = {
      header: {
         "Content-Type": "application/json",
      },
   };
   try {
      const res = await axios.post(Config.VERIFY_OTP_URL, values, config);
      return res;
   } catch (err) {
      return err.response;
   }
});

export const resendOTP = createAsyncThunk("auth/resend_otp", async (values) => {
   const config = {
      header: { "Content-Type": "application/json" },
   };
   try {
      const res = await axios.post(Config.RESEND_OTP_URL, values, config);
      return res;
   } catch (err) {
      return err.response;
   }
});

export const setEmail = createAsyncThunk("auth/set_email", async (email) => {
   return email;
});

export const setSpotifyToken = createAsyncThunk(
   "auth/set_spotify_token",
   async (sp_token) => {
      return sp_token;
   }
);

export const logoutUser = createAsyncThunk("auth/logout_user", async (data) => {
   return data;
});

const loginSice = createSlice({
   name: "authenticate",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      // login user ----------------------------------------------

      builder.addCase(loginUser.pending, (state) => {
         state.loading = true;
         state.loginData = {};
         state.error = null;
      });
      builder.addCase(loginUser.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.loginData = payload;
         state.error = null;
      });
      builder.addCase(loginUser.rejected, (state, { payload }) => {
         state.loading = false;
         state.loginData = {};
         state.error = payload;
      });

      // login with spotify ----------------------------------------------

      builder.addCase(loginWithSpotify.pending, (state) => {
         state.spotifyLoading = true;
         state.loginData = {};
         state.error = null;
      });
      builder.addCase(loginWithSpotify.fulfilled, (state, { payload }) => {
         state.spotifyLoading = false;
         state.loginData = payload;
         state.error = null;
      });
      builder.addCase(loginWithSpotify.rejected, (state, { payload }) => {
         state.spotifyLoading = false;
         state.loginData = {};
         state.error = payload;
      });

      // sigup ----------------------------------------------------

      builder.addCase(signupUser.pending, (state) => {
         state.loading = true;
         state.signupRes = {};
         state.error = null;
      });
      builder.addCase(signupUser.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.signupRes = payload;
         state.error = null;
      });
      builder.addCase(signupUser.rejected, (state, { payload }) => {
         state.loading = false;
         state.signupRes = {};
         state.error = payload;
      });

      // verifyOTP -------------------------------------------------

      builder.addCase(verifyOTP.pending, (state) => {
         state.loading = true;
         state.loginData = {};
         state.error = null;
      });
      builder.addCase(verifyOTP.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.loginData = payload;
         state.error = null;
      });
      builder.addCase(verifyOTP.rejected, (state, { payload }) => {
         state.loading = false;
         state.loginData = {};
         state.error = payload;
      });

      // resend OTP ------------------------------------------------

      builder.addCase(resendOTP.pending, (state) => {
         state.loading = true;
         state.resendOtp = {};
         state.error = null;
      });
      builder.addCase(resendOTP.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.resendOtp = payload;
         state.error = null;
      });
      builder.addCase(resendOTP.rejected, (state, { payload }) => {
         state.loading = false;
         state.resendOtp = {};
         state.error = payload;
      });

      // set email when login and signup ---------------------------

      builder.addCase(setEmail.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.name = payload;
         state.error = null;
      });

      builder.addCase(setSpotifyToken.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.spotifyToken = payload;
         state.error = null;
      });

      // logout user -----------------------------------------------

      builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.loginData = payload;
         state.error = null;
      });
   },
});

const { reducer } = loginSice;
export default reducer;
