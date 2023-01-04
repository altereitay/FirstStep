import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    CLEAR_JOBS, JOB_ERROR, UPDATE_STUDENT_PROFILE, USER_ERROR
} from "./types";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {loadProfile} from "./profiles";
import {loadJobs, loadJobsAdmin} from "./jobs";
import {loadProfiles} from "./profiles";

export const register = ({email, password, typeOfUser}, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password, typeOfUser});
    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        if (typeOfUser === 'student'){
            navigate('/student-signup');
        } else if (typeOfUser === 'employer'){
            navigate('/employer-signup');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        dispatch(loadProfile(res.data._id))

        if(res.data.typeOfUser === 'employer'){
            const profile = await axios.get(`api/profiles/${res.data._id}`)
            dispatch(loadJobs(profile.data._id))
        }
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }

}
export const login = (email, password, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post('/api/auth/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        })
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        dispatch(loadUser())
        dispatch(loadProfile(res.data.user))
        navigate("/");
        dispatch(setAlert('Login Success', 'success'));
    } catch (e) {
        dispatch({type: LOGIN_FAIL});
        dispatch(setAlert('Login Failed', 'danger'));
    }
}

export const logout = () => dispatch =>{
    dispatch({type: CLEAR_PROFILE});
    dispatch({type: LOGOUT});
    dispatch({type: CLEAR_JOBS});
}
export const deleteUser = (id, navigate) => async dispatch => {
    try {
        const users = await axios.delete(`/api/users/${id}`)
        dispatch(setAlert(users.data.msg, 'success'))
        dispatch(loadProfiles())
        navigate('/admin/accounts')
    } catch (err) {
        dispatch({
            type: USER_ERROR
        })
    }
}

