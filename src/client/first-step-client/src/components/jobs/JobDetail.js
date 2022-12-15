import React from "react";

const JobDetail = (job) => {
    return (
        <div>
            <h3 className='text-dark'>Job name : {job.job.jobTitle}</h3>
            <p>
                <strong>Description: </strong>{job.job.description}
            </p>
            <p>
                <strong>location : </strong> {job.job.location}
            </p>
            <button>edit</button>
            <button>delete</button>
        </div>
    )
}
export default JobDetail;