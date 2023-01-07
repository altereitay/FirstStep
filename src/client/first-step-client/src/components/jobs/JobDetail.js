import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";


const JobDetail = ({job, deleteJob, auth, profile, isEmployer = false, isAdmin = false}) => {
    const navigate = useNavigate()
    const onClick = (job) => {
        if (auth.user.typeOfUser === 'employer') {
            deleteJob(job?._id, navigate, profile?.profile._id, auth?.user._id)
        } else {
            deleteJob(job?._id, navigate)
        }
    }
    return (
        <div>
            <h3 className='text-dark'>Job name: {job?.jobTitle}</h3>
            <p>
                <strong>Description: </strong>{job?.description}
            </p>
            <p>
                <strong>location: </strong> {job?.location}
            </p>
            {
                isEmployer && <button className='btn btn-primary' onClick={() => {
                    return navigate(`/jobs/${job?._id}`)
                }}>Edit Job
                </button>
            }

            {
                (isEmployer || isAdmin) && <button className='btn btn-danger' onClick={() => onClick(job)}>Delete</button>
            }


        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profiles
});
export default connect(mapStateToProps, null)(JobDetail);