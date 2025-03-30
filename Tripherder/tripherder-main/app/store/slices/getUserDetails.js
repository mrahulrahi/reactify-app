import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
   name: "Tom",
   email: "top123@gmail.com",
   password: "tom@123",
   gender: "Male",
   age: "40",
   maritalStatus: "Married",
   travelPurpose: "Livemusics",
   maxDriveDistance: "25",
   state: "state one",
   city: "Ariyalur",
   postal_code: "621718",
   activities: ["Hiking"],
};

const userSlices = createSlice({
   name: "users",
   initialState: {
      userDetail: initialUser,
   },
   reducers: {
      setUser: (state, action) => {
         state.userDetail = action.payload;
      },
      getUser: (state) => {
         return state.userDetail;
      },
   },
});

export const { getUser, setUser } = userSlices.actions;

const { reducer } = userSlices;
export default reducer;
