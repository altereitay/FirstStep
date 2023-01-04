import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import JobDetail from "../jobs/JobDetail";
import { loadJobs, loadJobsAdmin, deleteJob } from "../../actions/jobs";

const Dashboard = ({ auth, jobs, profiles, loadJobs, loadJobsAdmin, deleteJob }) => {
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
                                <button onClick={() => navigate(`/employer/${profiles.profile._id}`)}>Edit Profile</button>
                            </div>
                            <h2 className='text-primary'>Jobs</h2>
                            {jobs.jobs.map((job) => {
                                return <JobDetail key={job._id} job={job} deleteJob={deleteJob} />
                            }
                            )}
                        </Fragment>
                    }
                </Fragment>
                <Fragment>
                    {auth.user?.typeOfUser === 'student' &&
                        <Fragment>
                            <button onClick={() => navigate(`/student/${profiles.profile._id}`)}>Edit Profile</button>
                        </Fragment>
                    }
                </Fragment>
                <Fragment>
                    {auth.user?.typeOfUser === 'admin' &&
                        <Fragment>
                            <Fragment>
                                <button onClick={() => navigate(`/admin/jobs`)}>Job Managment</button>
                            </Fragment>
                            <Fragment>
                                <button onClick={() => navigate(`/admin/accounts`)}>Account Managment</button>
                            </Fragment>
                            <Fragment>
                                <button onClick={() => navigate(`/admin/add`)}>Add New Admin</button>
                            </Fragment>
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
export default connect(mapStateToProps, { loadJobs, loadJobsAdmin, deleteJob })(Dashboard)
