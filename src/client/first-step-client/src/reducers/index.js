import {combineReducers} from "redux";
import auth from "./auth";
import alert from "./alert";
import profiles from "./profiles";
export default combineReducers({
    auth,
    alert,
    profiles
});