import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import JobDetail from "../jobs/JobDetail";
import { loadJobs, loadJobsAdmin, deleteJob, deleteJobEmployer } from "../../actions/jobs";

const Dashboard = ({auth, jobs, profiles, loadJobs, loadJobsAdmin, deleteJob, deleteJobEmployer}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.user?.typeOfUser === 'employer') {
            loadJobs(profiles.profile._id)
        }
        if (auth.user?.typeOfUser === 'admin') {
            loadJobsAdmin()
        }
    }, [])
    return (
        <div>

            <div className='profile-edu bg-white p-2'>

                <Fragment>
                    {auth.user?.typeOfUser === 'employer' &&
                        <Fragment>
                            <div>
                                <button className='btn btn-primary' onClick={() => navigate(`/employer/${profiles.profile._id}`)}>Edit Profile
                                </button>
                            </div>
                            <h2 className='text-primary'>My Jobs</h2>
                            {jobs.jobs.map((job) => {
                                    return <JobDetail key={job._id} job={job} deleteJob={deleteJobEmployer}/>
                                }
                            )}
                        </Fragment>
                    }
                </Fragment>
                <Fragment>
                    {auth.user?.typeOfUser === 'student' &&
                        <Fragment>
                            <button className='btn btn-primary'
                                    onClick={() => navigate(`/student/${profiles.profile._id}`)}>Edit Profile
                            </button>
                            <button className='btn btn-primary'
                                    onClick={() => navigate(`/applied/${profiles.profile._id}`)}>Get applied Jobs Report
                            </button>
                            <button className='btn btn-primary' onClick={() => navigate(`/student/jobs`)}>Find Jobs
                            </button>
                            <button className='btn btn-primary' onClick={() => navigate(`/job-filter`)}>Filter Jobs
                            </button>
                        </Fragment>
                    }
                </Fragment>
                <Fragment>
                    {auth.user?.typeOfUser === 'admin' &&
                        <Fragment>
                            <button className='btn btn-primary' onClick={() => navigate(`/admin/jobs`)}> Job Management </button>
                            <button className='btn btn-primary' onClick={() => navigate(`/admin/accounts`)}> Account Management </button>
                            <button className='btn btn-primary' onClick={() => navigate(`/admin/studentReport`)}>Student report</button>
                            <button className='btn btn-primary' onClick={() => navigate(`/admin/employerReport`)}>Get Employer Report</button>
                            <button className='btn btn-primary' onClick={() => navigate(`/admin/edit`)}>Edit Account</button>
                        </Fragment>
                    }
                </Fragment>
            </div>
        </div>
    )
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs,
    profiles: state.profiles
});
export default connect(mapStateToProps, {loadJobs, loadJobsAdmin, deleteJob, deleteJobEmployer})(Dashboard)
