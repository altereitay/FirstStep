import {PROFILE_ERROR, NEW_STUDENT_PROFILE, PROFILE_LOADED, NEW_EMPLOYER_PROFILE, UPDATE_STUDENT_PROFILE} from "../actions/types";

const initialState = {
    profile: null,
    loading: true,
    error: {},
    profiles: null
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case NEW_EMPLOYER_PROFILE:
        case NEW_STUDENT_PROFILE:
            return {...state, profile: payload, loading: false};
        case UPDATE_STUDENT_PROFILE:
            return {...state, profile: payload.profile, loading: false};
        case PROFILE_LOADED:
            return {...state, profile: payload, loading: false};
        case PROFILE_ERROR:
            return {...state, error: payload, loading: false, profile: null}
        default:
            return {...state, loading: false}
    }
}