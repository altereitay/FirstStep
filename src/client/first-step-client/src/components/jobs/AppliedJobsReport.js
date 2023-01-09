import React, { Fragment, useEffect } from "react";
import {connect} from "react-redux";
import JobDetail from "../jobs/JobDetail";
import {useNavigate} from "react-router-dom";
import {getAppliedJob} from "../../actions/jobs";
import ViewJobs from "./ViewJobs";
const AppliedJobsReport = ({jobs, getAppliedJob, profiles}) => {
    const nav = useNavigate();
    useEffect(()=>{
        getAppliedJob(profiles.profile.user,nav)
    }, [])
    return(
        <Fragment>
            <h2 className='text-primary'>My Applied Jobs</h2>
            {jobs.jobs.map((job)=>{
                    return <ViewJobs key={job._id} job={job}/>
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