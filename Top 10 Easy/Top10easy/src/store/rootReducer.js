import { combineReducers } from "redux";
import language from "./slices/payment";

const rootReducer = combineReducers({
   language: language,
});

export default rootReducer;
