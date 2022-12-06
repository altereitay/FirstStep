import axios from "axios";
import {setAlert} from "./alert";
import { NEW_STUDENT_PROFILE, PROFILE_ERROR } from "./types";

export const newStudentProfile = (formData, availabilityData, userId) => async (dispatch) =>{
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        let body = {formData, availability:availabilityData, user: userId};
        console.log(formData);
        const res = await axios.post('/api/profiles/student', body, config);
        dispatch({
            type:NEW_STUDENT_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile Created', 'success'));
    }catch (e) {
        const errors = e.response.data.errors;
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}