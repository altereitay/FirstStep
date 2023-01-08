import axios from "axios";
import {setAlert} from "./alert";
import {
    NEW_STUDENT_PROFILE,
    PROFILE_ERROR,
    NEW_EMPLOYER_PROFILE,
    PROFILE_LOADED,
    AUTH_ERROR,
    UPDATE_STUDENT_PROFILE,
    UPDATE_EMPLOYER_PROFILE,
    LOAD_JOBS, JOB_ERROR, LOAD_PROFILES
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const newStudentProfile = (formData,educationData ,availabilityData, user, navigate) => async (dispatch) =>{
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        let body = {...formData};
        body.education.push(educationData);
        body.availability = {...availabilityData};
        body.user = user;
        const res = await axios.post('/api/profiles/student', body, config);
        dispatch({
            type:NEW_STUDENT_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile Created', 'success'));
        navigate('/')
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

export const newEmployerProfile = (formData, user, navigate) => async (dispatch) =>{
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        let body = {...formData};
        body.user = user;
        const res = await axios.post('/api/profiles/employer', body, config);
        dispatch({
            type:NEW_EMPLOYER_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile Created', 'success'));
        navigate('/')
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

export const loadProfile = (id) => async dispatch => {
    if (id === ''){
        return
    }
    try {
        const profile = await axios.get(`/api/profiles/${id}`)
        dispatch({
            type: PROFILE_LOADED,
            payload: profile.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const updateStudentProfile = (formData, educationData, availabilityData, profile, navigate)=> async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let body = {...formData};
        body.education[0] = educationData;
        body.availability = {...availabilityData};
        body.user = profile.user;
        const res = await axios.put(`/api/profiles/student/${profile._id}`, body, config);
        dispatch({
            type: UPDATE_STUDENT_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile updated successfully','success'))
        navigate('/dashboard')
    } catch (err) {
        console.error('action error', err)
        dispatch({
            type: PROFILE_ERROR
        })
    }
}

export const updateEmployerProfile = (formData, profile, navigate) => async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        let body = {...formData};
        body.user = profile.user;
        const res = await axios.put(`/api/profiles/employer/${profile._id}`, body, config);
        dispatch({
            type:UPDATE_EMPLOYER_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile updated successfully', 'success'));
        navigate('/dashboard')
    }catch (err) {
        console.error('action error', err)
        dispatch({
            type: PROFILE_ERROR
        })
    }
}
export const loadProfiles = () => async dispatch => {
    try {
        const profiles = await axios.get('/api/profiles/');
        dispatch({
            type: LOAD_PROFILES,
            payload: profiles.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR
        })
    }
}
export const loadStudent = () => async dispatch => {
    try {
        const students = await axios.get('/api/profiles/student');
        dispatch({
            type: LOAD_PROFILES,
            payload: students.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR
        })
    }
}

export const loadEmployer = () => async dispatch => {
    try {
        const employer = await axios.get('/api/profiles/employer');
        dispatch({
            type: LOAD_PROFILES,
            payload: employer.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR
        })
    }
}

export const uploadStudentCert = (userID, fileData) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res = await axios.post(`/api/profiles/students/certs/${userID}`, fileData, config);
        dispatch(setAlert('Certificate of Studying Upload Successfully', 'success'));
    } catch (err) {
        dispatch(setAlert('Certificate of Studying Did Not Uploaded', 'danger'));
    }
}
    export const uploadEmployerCert = (userID, fileData) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res = await axios.post(`/api/profiles/employers/certs/${userID}`, fileData, config);
        dispatch(setAlert('Certificate of Studying Upload Successfully', 'success'));
    } catch (err) {
        dispatch(setAlert('Certificate of Studying Did Not Uploaded', 'danger'));
    }
}

export const approveCert=(profileId,typeOfUser)=>async dispatch =>{
    try{
        const body={typeOfUser}
       await axios.put(`/api/profiles/approve/${profileId}`,body)
        dispatch(setAlert('Profile Approved', 'success'));
    }catch (err){
        dispatch(setAlert('Profile did not approved', 'danger'));
    }
}
export const relevantStudent=(jobId)=>async  dispatch =>{
    try{
        console.log('hello')
        const student=await axios.get(`/api/profiles/relevant/${jobId}`)
        dispatch({
            type: LOAD_PROFILES,
            payload: student.data
        })
    }catch(err){
        dispatch(setAlert('No Student Found', 'danger'));
    }
}