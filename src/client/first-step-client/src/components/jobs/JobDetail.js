import React from "react";
import { useNavigate } from "react-router-dom";


const JobDetail = ({job, deleteJob}) => {
    const navigate = useNavigate()
    return (
        <div>
            <h3 className='text-dark'>Job name : {job?.jobTitle}</h3>
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