import { combineReducers } from "redux";
import eventsList from "./slices/events";
import artistSlices from "./slices/artist";
import preferencesSlices from "./slices/preferenes";
import loginSlice from "./slices/auth";
import homeSlices from "./slices/home";
import state from "./slices/state";
import countries from "./slices/countries";
import billingSlices from "./slices/billing";

const rootReducer = combineReducers({
   authData: loginSlice,
   events: eventsList,
   artists: artistSlices,
   preferences: preferencesSlices,
   home: homeSlices,
   state: state,
   countries: countries,
   billing: billingSlices,
});

export default rootReducer;
