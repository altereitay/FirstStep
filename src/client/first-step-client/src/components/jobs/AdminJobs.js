import React, {useEffect } from "react";
import { connect } from "react-redux";
import JobDetail from "../jobs/JobDetail";
import { loadJobs, loadJobsAdmin, deleteJob } from "../../actions/jobs";

const Adminjobs = ({auth, jobs,loadJobsAdmin, deleteJob}) => {
    useEffect(() => {
        if (auth.user?.typeOfUser === 'admin') {
            loadJobsAdmin()
        }
    }, [])
    return (
        <div>
            <h2 className='text-primary'>Jobs Managment</h2>
            {jobs.jobs?.map((job) => {
                return <JobDetail key={job._id} job={job} deleteJob={deleteJob} />
            })}
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs,
    profiles: state.profiles
});
export default connect(mapStateToProps, { loadJobs, loadJobsAdmin, deleteJob })(Adminjobs)