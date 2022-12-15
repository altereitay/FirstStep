import axios from "axios";
import {setAlert} from "./alert";
import {JOB_ERROR, NEW_JOB, NEW_STUDENT_PROFILE, PROFILE_ERROR} from "./types";

export const newJob = (formData, availabilityData, profile, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let body = {...formData, requiredDays: availabilityData, profile}
        const res = await axios.post('/api/jobs', body, config);
        dispatch({
            type: NEW_JOB,
            payload: res.data
        })
        dispatch(setAlert('Job Upload Successfully', 'success'));
        navigate('/dashboard')

    } catch (e) {
        const errors = e.response.data.errors;
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: JOB_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
