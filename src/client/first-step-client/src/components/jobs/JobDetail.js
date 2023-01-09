import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const JobDetail = ({job, deleteJob, auth, profile, isStudent = false}) => {
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
                !isStudent && <button className='btn btn-primary' onClick={() => {
                    return navigate(`/jobs/${job?._id}`)
                }}>Edit Job
                </button>
            }

            {
                !isStudent && <button className='btn btn-primary' onClick={() => onClick(job)}>Delete</button>
            }
            {
                !isStudent && <button className='btn btn-primary' onClick={() => {
                    return navigate(`/view/jobs/${job?._id}`)
                }}>Relevent Students
                </button>
            }


        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profiles
});
export default connect(mapStateToProps, null)(JobDetail);