import React from "react";
import PropTypes from "prop-types";

const JobDetail=({jobs: {job: {jobTitle, description, location}}})=> {

    return (
        <div>
            <h3 className='text-dark'>Job name : {jobTitle}</h3>

            <p>
                <strong>Description: </strong>{description}
            </p>
            <p>
                <strong>location :  </strong>  {location}
            </p>
            <button>edit</button>
            <button>delete</button>

        </div>
    )
}
    JobDetail.propTypes = {
        jobs: PropTypes.object.isRequired
    }

    export default JobDetail;