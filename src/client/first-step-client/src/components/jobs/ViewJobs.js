import React from "react";

const ViewJobs = ({job}) => {
    return (
        <div>
            <h3 className='text-dark'>Job name: {job?.jobTitle}</h3>
            <p>
                <strong>Description: </strong>{job?.description}
            </p>
            <p>
                <strong>location: </strong> {job?.location}
            </p>
        </div>
    )
}

export default ViewJobs;