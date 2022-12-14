import axios from "axios";
import { setAlert } from "./alert";
import {
    APPLIED_JOBS_REPORT,
    AUTH_ERROR,
    JOB_ERROR,
    LOAD_JOBS,
    NEW_JOB,
    PROFILE_LOADED,
    UPDATE_JOB,
    LOAD_PROFILES
} from "./types";

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
        if (errors) {
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
export const loadJobsAdmin = () => async dispatch => {

    try {
        const jobs = await axios.get('/api/jobs/');
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
export const loadJobsStudent = (id) => async dispatch => {

    try {
        const jobs = await axios.get(`/api/jobs/student/${id}`)
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
export const updateJob = (formData, availabilityData, id, navigate) => async dispatch => {
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
        dispatch(setAlert('Job Updated Successfully', 'success'))
        navigate('/dashboard')
    } catch (err) {
        dispatch({
            type: JOB_ERROR
        })
    }
}

export const deleteJob = (id, navigate) => async dispatch => {
    try {
        const jobs = await axios.delete(`/api/jobs/${id}`)
        dispatch(setAlert(jobs.data.msg, 'success'))
        dispatch(loadJobsAdmin())
        navigate('/admin/jobs')
    } catch (err) {
        dispatch({
            type: JOB_ERROR
        })
    }
}


export const getAppliedJob = (id, navigate) => async dispatch => {

    try {
        const jobs = await axios.get(`/api/jobs/applied/${id}`)
        dispatch({
            type: APPLIED_JOBS_REPORT,
            payload: jobs.data
        })
    } catch (err) {
        console.log('error')
    }
}
export const deleteJobEmployer = (jobId, navigate, employerId, userId) => async dispatch => {
    try {
        const jobs = await axios.delete(`/api/jobs/${jobId}`)
        dispatch(setAlert(jobs.data.msg, 'success'))
        dispatch(loadJobs(employerId))
        navigate('/dashboard')
    } catch (err) {
        dispatch({
            type: JOB_ERROR
        })
    }
}
export const applyJob = (jobId, userId) => async dispatch => {
    try {
        let body = {userId}
        const res = await axios.put(`/api/jobs/apply/${jobId}`, body);
        dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
        dispatch(setAlert("Could'nt applied to requested job", 'danger'))
    }
}
export const aplicationStudent = (jobId) => async dispatch => {
    try {
        const student = await axios.get(`/api/jobs/aplication/${jobId}`)
        dispatch({
            type: LOAD_PROFILES,
            payload: student.data
        })
    } catch (err) {
        dispatch(setAlert('No Student Found', 'danger'));
    }
}

export const jobFilter = (formData, availabilityData) => async dispatch => {
    try {
        let params = {...formData, requiredDays: []}
        for (const [day, toAdd] of Object.entries(availabilityData)) {
            if (toAdd) {
                params.requiredDays.push(day);
            }
        }
        const res = await axios.get('/api/jobs/', {params});
        dispatch({
            type: LOAD_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert("Couldn't Get Jobs"), 'danger');
    }
}