import axios from "axios";
import {setAlert} from "./alert";
import {AUTH_ERROR, JOB_ERROR, LOAD_JOBS, NEW_JOB, PROFILE_LOADED, UPDATE_JOB} from "./types";

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

export const loadJobs = (id) => async dispatch => {

    try {
        const jobs = await axios.get(`/api/jobs/${id}`)
        dispatch({
            type: LOAD_JOBS,
            payload: jobs.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR
        })
    }
}
export const updateJob=(formData, availabilityData, id, navigate)=> async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let body = {...formData, requiredDays: availabilityData}
        const res = await axios.put(`/api/jobs/${id}`, body, config);
        dispatch({
            type: UPDATE_JOB,
            payload: res.data
        })
        dispatch(setAlert('Job Updated Successfully','success'))
        navigate('/dashboard')
    } catch (err) {
        dispatch({
            type: JOB_ERROR
        })
    }
}
