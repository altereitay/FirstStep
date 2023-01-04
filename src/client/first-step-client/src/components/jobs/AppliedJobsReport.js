import React, { Fragment, useEffect } from "react";
import {connect} from "react-redux";
import JobDetail from "../jobs/JobDetail";
import {useNavigate} from "react-router-dom";
import {getAppliedJob} from "../../actions/jobs";
const AppliedJobsReport = ({jobs, getAppliedJob, profiles}) => {
    const nav = useNavigate();
    useEffect(()=>{
        getAppliedJob(profiles.profile._id,nav)
    }, [])
    return(
        <Fragment>
            <h2 className='text-primary'>My Applied Jobs</h2>
            {jobs.jobs.map((job)=>{
                    return <JobDetail key={job._id} job={job} isStudent={true}/>
                }
            )}
        </Fragment>
    )
}
const mapStateToProps = state => ({
    jobs: state.jobs,
    profiles: state.profiles
})

export default connect(mapStateToProps, {getAppliedJob})(AppliedJobsReport)