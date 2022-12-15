import {combineReducers} from "redux";
import auth from "./auth";
import alert from "./alert";
import profiles from "./profiles";
import jobs from "./jobs";
export default combineReducers({
    auth,
    alert,
    profiles,
    jobs
});