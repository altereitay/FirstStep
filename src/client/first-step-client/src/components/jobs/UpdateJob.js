import React, { useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { updateJob } from "../../actions/jobs";
import { setAlert } from "../../actions/alert";

const UpdateJob = ({ jobs, updateJob, setAlert }) => {
    const { id } = useParams();
    let index = jobs.jobs.map(job => job._id).indexOf(id);
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
    const { jobTitle, business, percentageOfJob, location, jobType, description, requiredSkills } = formData
    const [availabilityData, setAvailability] = useState({
        sunday: job.requiredDays.sunday,
        monday: job.requiredDays.monday,
        tuesday: job.requiredDays.tuesday,
        wednesday: job.requiredDays.wednesday,
        thursday: job.requiredDays.thursday,
        friday: job.requiredDays.friday,
        saturday: job.requiredDays.saturday
    })
    const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = availabilityData

    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const skillsOnChange = e => {
        let reqSkill = e.target.value.split(',');
        setFormData({ ...formData, requiredSkills: reqSkill });
    }
    const onJobChange = e => {
        setFormData({ ...formData, jobType: e.target.value })
    }
    const availabilityOnChange = e => {
        setAvailability({ ...availabilityData, [e.target.name]: e.target.checked });
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (jobType === "") {
            setAlert("Job Type Must Be Selected", "danger")
            return;
        }
        updateJob(formData, availabilityData, id, navigate);
    }

    return (
        <form onSubmit={e => {
            onSubmit(e)
        }}>
            <Fragment>
                <h1 className="large text-primary">Update Job</h1>
                <div className='form-group'>
                    <h3 style={{ color: '#38a1f3' }}>Job Title</h3>
                    <input type='text'
                        placeholder='Update Job Title'
                        name='jobTitle'
                        value={jobTitle}
                        onChange={event => onChange(event)}
                        required />
                </div>
                <div className='form-group'>
                    <h3 style={{ color: '#38a1f3' }}>Business</h3>
                    <input type='text'
                        placeholder='Update Business Title'
                        name='business'
                        value={business}
                        onChange={event => onChange(event)}
                        required />
                </div>
                <div className='form-group'>
                    <h3 style={{ color: '#38a1f3' }}>Job Type</h3>
                    <select onChange={e => onJobChange(e)} value={jobType}>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Industrial Engineering">Industrial Engineering</option>
                        <option value="Architecture">Architecture</option>
                    </select>
                </div>
                <div className='form-group'>
                    <h3 style={{ color: '#38a1f3' }}>Description</h3>
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
                    <h3 style={{ color: '#38a1f3' }}>Job Percent</h3>
                    <input type='text'
                        placeholder='Update Job Percent'
                        name='percentageOfJob'
                        value={percentageOfJob}
                        onChange={event => onChange(event)}
                        required />
                </div>
                <div className='form-group'>
                    <h3 style={{ color: '#38a1f3' }}>location</h3>
                    <input type='text'
                        placeholder='Update Job Location'
                        name='location'
                        value={location}
                        onChange={event => onChange(event)}
                        required />
                </div>
                <div className="form-group">
                    <h3 style={{ color: '#38a1f3' }}>Required Skills</h3>
                    <input type="text"
                        placeholder="Update Required Skills"
                        name="requiredSkills"
                        value={requiredSkills}
                        onChange={(e) => skillsOnChange(e)} />
                </div>
                <div className="form-group">
                    <h3 style={{ color: '#38a1f3' }}>Required Days</h3>
                    <label className='my-1'>
                        <input type="checkbox"
                            name="sunday"
                            checked={sunday}
                            className='my-1'
                            value={sunday}
                            onChange={(e) => availabilityOnChange(e)} />
                        Sunday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                            name="monday"
                            checked={monday}
                            className='my-1'
                            value={monday}
                            onChange={(e) => availabilityOnChange(e)} />
                        Monday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                            name="tuesday"
                            checked={tuesday}
                            className='my-1'
                            value={tuesday}
                            onChange={(e) => availabilityOnChange(e)} />
                        Tuesday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                            name="wednesday"
                            checked={wednesday}
                            className='my-1'
                            value={wednesday}
                            onChange={(e) => availabilityOnChange(e)} />
                        Wednesday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                            name="thursday"
                            checked={thursday}
                            className='my-1'
                            value={thursday}
                            onChange={(e) => availabilityOnChange(e)} />
                        Thursday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                            name="friday"
                            checked={friday}
                            className='my-1'
                            value={friday}
                            onChange={(e) => availabilityOnChange(e)} />
                        Friday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                            name="saturday"
                            checked={saturday}
                            className='my-1'
                            value={saturday}
                            onChange={(e) => availabilityOnChange(e)} />
                        Saturday
                    </label>
                </div>
                <input type='submit' className='btn btn-primary my-1' />
            </Fragment>
        </form>
    )
}

const mapStateToProps = state => ({
    jobs: state.jobs
})
export default connect(mapStateToProps, { updateJob, setAlert })(UpdateJob)