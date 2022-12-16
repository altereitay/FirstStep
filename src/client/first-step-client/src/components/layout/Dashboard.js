import React, { useState, Fragment, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import JobDetail from "../jobs/JobDetail";
import { loadJobs } from "../../actions/jobs";

const Dashboard = ({auth,jobs, profiles, loadJobs}) => {
    const navigate = useNavigate();
    useEffect (()=>{
        if (auth.user?.typeOfUser==='employer'){
            loadJobs(profiles.profile._id)
        }
    }, [])
    return (
       <div>

        <div className='profile-edu bg-white p-2'>

        <Fragment>
        {auth.user?.typeOfUser==='employer' &&
            <Fragment>
                <h2 className='text-primary'>My Jobs</h2>
                {jobs.jobs.map((job)=>{
                    return <JobDetail key={job._id} job={job}/>
                }
                )}
            </Fragment>
        }
        </Fragment>
            <Fragment>
                {auth.user?.typeOfUser==='student' &&
                    <Fragment>
                  <button onClick={()=>navigate(`/student/${profiles.profile._id}`)}>Edit Profile</button>
                    </Fragment>
                }
            </Fragment>
        </div>
       </div>
    )
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    jobs:PropTypes.object.isRequired,
    profiles:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs,
    profiles: state.profiles
});
export default connect(mapStateToProps, {loadJobs})(Dashboard)