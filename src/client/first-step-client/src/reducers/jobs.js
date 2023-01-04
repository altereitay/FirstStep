import {
    NEW_JOB, JOB_ERROR, LOAD_JOBS, UPDATE_JOB, CLEAR_JOBS
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
        case LOAD_JOBS:
            return {...state, jobs: payload, loading: false}
        case UPDATE_JOB:
            let job=state.jobs;
            const id=payload._id
            let indexToChange=job.map(job=>job._id).indexOf(id)
            job[indexToChange]=payload
            return {...state,jobs:job,loading: false}
        case CLEAR_JOBS:
            return {...state, loading: false, jobs: [], errors: {}}
        default:
            return {...state, loading: false};
    }
}