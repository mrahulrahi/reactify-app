import { combineReducers } from "redux";
import loginSlice from "./slices/auth";
import countriesSlice from "./slices/countries";
import trunderSlices from "./slices/trundler";
import itinerarySlices from "./slices/itinerary";
import paymentSlices from "./slices/payment";

const rootReducer = combineReducers({
   authData: loginSlice,
   countries: countriesSlice,
   trundler: trunderSlices,
   itineraries: itinerarySlices,
   payment: paymentSlices,
});

export default rootReducer;
