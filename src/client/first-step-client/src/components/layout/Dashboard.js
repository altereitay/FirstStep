import React, {useState, Fragment} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import JobDetail from "../jobs/JobDetail";

const Dashboard = ({auth,jobs}) => {
    const navigate = useNavigate();
    return (
       <div>
           <h2 className='text-primary'>My Jobs</h2>
        <div className='profile-edu bg-white p-2'>

        <Fragment>

        {auth.user?.typeOfUser==='employer' &&
            <Fragment>
                {jobs.jobs.map((job)=>{
                    return <JobDetail key={job._id} job={job}/>
                }
                )}
            </Fragment>
        }
        </Fragment>
        </div>
       </div>
    )
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    jobs:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs
});
export default connect(mapStateToProps)(Dashboard)