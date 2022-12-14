import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { jobFilter } from "../../actions/jobs";
import ViewJobs from "./ViewJobs";
import JobDetail from "./JobDetail";

const JobsFilter = ({jobs, jobFilter}) => {
    const [showJobs, setShowJobs] = useState(false);

    const [formData, setFormData] = useState({
        business: '',
        percentageOfJob: '',
        location: '',
        jobType: '',
        requiredSkills: []
    })
    const {business, percentageOfJob, location, jobType, requiredSkills} = formData

    const [availabilityData, setAvailability] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    })
    const {sunday, monday, tuesday, wednesday, thursday, friday, saturday} = availabilityData

    const onJobChange = e => {
        setFormData({...formData, jobType: e.target.value})
    }

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const skillsOnChange = e => {
        let reqSkill = e.target.value.split(',');
        setFormData({...formData, requiredSkills: reqSkill});
    }

    const availabilityOnChange = e => {
        setAvailability({...availabilityData, [e.target.name]: e.target.checked});
    }

    const onSubmit = event => {
        event.preventDefault();
        jobFilter(formData, availabilityData)
        setShowJobs(true);

    }

    return (
        <Fragment>
            <h1 className='text-primary'>Choose Parameters For Your Desired Job</h1>
            <form onSubmit={e => {
                onSubmit(e)
            }}>
                <Fragment>
                    <div className='form-group'>
                        <h3 style={{color: '#38a1f3'}}>Business</h3>
                        <input type='text'
                               placeholder='Enter Business Title'
                               name='business'
                               value={business}
                               onChange={event => onChange(event)}
                               />
                    </div>
                    <div className='form-group'>
                        <h3 style={{color: '#38a1f3'}}>Job Type</h3>
                        <select onChange={e => onJobChange(e)}>
                            <option value="" >Select Job Type</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Industrial Engineering">Industrial Engineering</option>
                            <option value="Architecture">Architecture</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <h3 style={{color: '#38a1f3'}}>Job Percent</h3>
                        <input type='text'
                               placeholder='Enter Job Percent'
                               name='percentageOfJob'
                               value={percentageOfJob}
                               onChange={event => onChange(event)}
                               />
                    </div>
                    <div className='form-group'>
                        <h3 style={{color: '#38a1f3'}}>location</h3>
                        <input type='text'
                               placeholder='Enter Job Location'
                               name='location'
                               value={location}
                               onChange={event => onChange(event)}
                               />
                    </div>
                    <div className="form-group">
                        <h3 style={{color: '#38a1f3'}}>Required Skills</h3>
                        <input type="text"
                               placeholder="Enter Required Skills"
                               name="requiredSkills"
                               value={requiredSkills}
                               onChange={(e) => skillsOnChange(e)}/>
                    </div>
                    <div className="form-group">
                        <h3 style={{color: '#38a1f3'}}>Required Days</h3>
                        <label className='my-1'>
                            <input type="checkbox"
                                   name="sunday"
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
                    <button className='btn btn-primary my-1' onClick={e => onSubmit(e)}>Filter</button>
                </Fragment>
            </form>
            { showJobs &&
                jobs.jobs.map((job) => {
                    return <JobDetail key={job._id} job={job} isStudent={true}/>

                })
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    jobs: state.jobs
})

export default connect(mapStateToProps, {jobFilter})(JobsFilter)