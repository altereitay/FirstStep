import React, {useEffect } from "react";
import { connect } from "react-redux";
import JobDetail from "../jobs/JobDetail";
import { loadJobsStudent } from "../../actions/jobs";


const StudentJobs = ({auth, jobs,loadJobsStudent, deleteJob, profiles}) => {
    useEffect(() => {
        if (auth.user?.typeOfUser === 'student') {
            loadJobsStudent(profiles.profile._id)
        }
    }, [])
    return (
        <div>
            <h2 className='text-primary'>Jobs For You</h2>
            {jobs.jobs?.map((job) => {
                return <JobDetail key={job._id} job={job} isStudent={true} />
            })}
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs,
    profiles: state.profiles
});
export default connect(mapStateToProps, { loadJobsStudent })(StudentJobs)