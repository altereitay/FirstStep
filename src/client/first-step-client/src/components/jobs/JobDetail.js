import React from "react";
import { Link, useNavigate } from "react-router-dom";

const JobDetail = (job) => {
    const navigate = useNavigate()
    return (
        <div>
            <h3 className='text-dark'>Job name : {job.job.jobTitle}</h3>
            <p>
                <strong>Description: </strong>{job.job.description}
            </p>
            <p>
                <strong>location : </strong> {job.job.location}
            </p>
            <button onClick={() => {
                console.log('job edit', job.job)
                return navigate(`/jobs/${job.job._id}`)
            }}>Edit Job
            </button>
            <button>delete</button>
        </div>
    )
}
export default JobDetail;