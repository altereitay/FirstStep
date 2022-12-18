import React from "react";
import { useNavigate } from "react-router-dom";
import './Jobs.css'



const JobDetail = ({job, deleteJob}) => {
    const navigate = useNavigate()
    return (
        <div className="job-table">
            <h1 className='text-dark'>{job?.jobTitle}</h1>
            <p>
                <strong>Description: </strong>{job?.description}
            </p>
            <p>
                <strong>location : </strong> {job?.location}
            </p>
            <button onClick={() => {
                return navigate(`/jobs/${job?._id}`)
            }}>Edit Job
            </button>
            <button onClick={() => deleteJob(job?._id, navigate)}>delete</button>
        </div>
    )
}
export default JobDetail;