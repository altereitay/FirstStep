import axios from "axios";
import {setAlert} from "./alert";
import { NEW_STUDENT_PROFILE, PROFILE_ERROR, NEW_EMPLOYER_PROFILE } from "./types";

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