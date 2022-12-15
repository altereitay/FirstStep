import {
    NEW_JOB,JOB_ERROR
} from "../actions/types";

const initialState = {
    loading: true,
    jobs: [],
    errors:{}
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case NEW_JOB:
            let jobs = state.jobs;
            jobs.unshift(payload)
            return {...state,jobs, loading: false}
        case JOB_ERROR:
            return {...state, errors: payload, loading: false}
        default:
            return state;
    }
}