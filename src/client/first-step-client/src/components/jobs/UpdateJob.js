import React, { useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { updateJob } from "../../actions/jobs";

const UpdateJob = ({jobs, updateJob}) => {
    const {id} = useParams();
    let index = jobs.jobs.map(job=>job._id).indexOf(id);
    let job = jobs.jobs[index];
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        jobTitle: job.jobTitle,
        business: job.business,
        picture: job.picture,
        description: job.description,
        percentageOfJob: job.percentageOfJob,
        location: job.location,
        jobType: job.jobType,
        requiredSkills: job.requiredSkills
    })
    const {jobTitle, business, percentageOfJob, location, jobType, description, requiredSkills} = formData
    const [availabilityData, setAvailability] = useState({
        'sunday': job.requiredDays?.sunday || false,
        'monday': job.requiredDays?.monday || false,
        'tuesday': job.requiredDays?.tuesday || false,
        'wednesday': job.requiredDays?.wednesday || false,
        'thursday': job.requiredDays?.thursday || false,
        'friday': job.requiredDays?.friday || false,
        'saturday': job.requiredDays?.saturday
    })
    const {sunday, monday, tuesday, wednesday, thursday, friday, saturday} = availabilityData

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }
    const skillsOnChange = e => {
        let reqSkill = e.target.value.split(',');
        setFormData({...formData, requiredSkills: reqSkill});
    }
    const availabilityOnChange = e => {
        if (e.target.value === 'false') {
            setAvailability({...availabilityData, [e.target.name]: true});
        } else {
            setAvailability({...availabilityData, [e.target.name]: false});
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        updateJob(formData, availabilityData, id, navigate);
    }

    return (
        <form onSubmit={e => {
            onSubmit(e)
        }}>
            <Fragment>
                <h1 className="large text-primary">Update Job</h1>
                <div className='form-group'>
                    <h3 style={{color: '#38a1f3'}}>Job Title</h3>
                    <input type='text'
                           placeholder='Update Job Title'
                           name='jobTitle'
                           value={jobTitle}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className='form-group'>
                    <h3 style={{color: '#38a1f3'}}>Business</h3>
                    <input type='text'
                           placeholder='Update Business Title'
                           name='business'
                           value={business}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className='form-group'>
                    <h3 style={{color: '#38a1f3'}}>Job Type</h3>
                    <input type='text'
                           placeholder='Update Job Type'
                           name='jobType'
                           value={jobType}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className='form-group'>
                    <h3 style={{color: '#38a1f3'}}>Description</h3>
                    <textarea
                        placeholder='A Description About The Job'
                        name='description'
                        cols='5'
                        rows='5'
                        value={description}
                        onChange={event => onChange(event)}
                    />
                </div>
                <div className='form-group'>
                    <h3 style={{color: '#38a1f3'}}>Job Percent</h3>
                    <input type='text'
                           placeholder='Update Job Percent'
                           name='percentageOfJob'
                           value={percentageOfJob}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className='form-group'>
                    <h3 style={{color: '#38a1f3'}}>location</h3>
                    <input type='text'
                           placeholder='Update Job Location'
                           name='location'
                           value={location}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className="form-group">
                    <h3 style={{color: '#38a1f3'}}>Required Skills</h3>
                    <input type="text"
                           placeholder="Update Required Skills"
                           name="requiredSkills"
                           value={requiredSkills}
                           onChange={(e) => skillsOnChange(e)}/>
                </div>
                <div className="form-group">
                    <h3 style={{color: '#38a1f3'}}>Required Days</h3>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="sunday "
                               className='my-1'
                               value={sunday}
                               onChange={(e) => availabilityOnChange(e)}/>
                        Sunday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="monday"
                               className='my-1'
                               value={monday}
                               onChange={(e) => availabilityOnChange(e)}/>
                        Monday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="tuesday"
                               className='my-1'
                               value={tuesday}
                               onChange={(e) => availabilityOnChange(e)}/>
                        Tuesday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="wednesday"
                               className='my-1'
                               value={wednesday}
                               onChange={(e) => availabilityOnChange(e)}/>
                        Wednesday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="thursday"
                               className='my-1'
                               value={thursday}
                               onChange={(e) => availabilityOnChange(e)}/>
                        Thursday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="friday"
                               className='my-1'
                               value={friday}
                               onChange={(e) => availabilityOnChange(e)}/>
                        Friday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="saturday"
                               className='my-1'
                               value={saturday}
                               onChange={(e) => availabilityOnChange(e)}/>
                        Saturday
                    </label>
                </div>
                <input type='submit' className='btn btn-primary my-1'/>
            </Fragment>
        </form>
    )
}

const mapStateToProps = state =>({
    jobs: state.jobs
})
export default connect(mapStateToProps, {updateJob})(UpdateJob)