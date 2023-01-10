import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {studentFilter} from "../../actions/profiles";
import StudentDetails from "./StudentDetails";
const StudentsFilter = ({profiles, studentFilter}) => {
    const [showStudents, setShowStudents] = useState(false);
    const [formData, setFormData] = useState({
        city: '',
        education: [],
        skills: [],
        availability: []
    })
    const {city, skills} = formData

    const [educationData, setEducation] = useState({
        school: '',
        degree: '',
        current: true
    })
    const {school} = educationData;

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

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }
    const onDegreeChange = e => {
        setEducation({...educationData, degree: e.target.value})
    }
    const onChangeEducation = event => {
        setEducation({...educationData, [event.target.name]: event.target.value});
    }

    const skillsOnChange = e => {
        let skill = e.target.value.split(',');
        setFormData({...formData, skills: skill});
    }

    const availabilityOnChange = e => {
        setAvailability({...availabilityData, [e.target.name]: e.target.checked});
    }

    const onSubmit = event => {
        event.preventDefault();
        studentFilter(formData, availabilityData)
        setShowStudents(true);
    }


    return(
        <Fragment>

            <h1 className='text-primary'>Choose Parameters For Your Desired Student</h1>
            <form onSubmit={e => {
                onSubmit(e)
            }}>
                <div className='form-group'>
                    <h3 className='text-dark'>City</h3>
                    <input type='text'
                           name='city'
                           placeholder='Enter City'
                           value={city}
                           onChange={event => onChange(event)}
                           required />
                </div>
                <div className='form-group'>
                    <h1 className='big text-dark'>Education</h1>
                    <h3 className='text-dark'>school</h3>
                    <input type='text'
                           className='my-1'
                           name='school'
                           placeholder='Enter School'
                           value={school}
                           onChange={event => onChangeEducation(event)}
                           required />
                    <select onChange={e => onDegreeChange(e)}>
                        <option value="" disabled selected>Select Your Degree</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Industrial Engineering">Industrial Engineering</option>
                        <option value="Architecture">Architecture</option>
                    </select>

                </div>
                <div className="form-group">
                    <h3 className='text-dark'>Skills</h3>
                    <input type="text"
                           placeholder="Enter Skills"
                           name="skills"
                           value={skills}
                           onChange={(e) => skillsOnChange(e)} />
                    <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                </div>

                <div className="form-group">
                    <h3 className='text-dark'>Availability</h3>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="sunday"
                               className='my-1'
                               value={sunday}
                               onChange={(e) => availabilityOnChange(e)} />
                        Sunday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="monday"
                               className='my-1'
                               value={monday}
                               onChange={(e) => availabilityOnChange(e)} />
                        Monday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="tuesday"
                               className='my-1'
                               value={tuesday}
                               onChange={(e) => availabilityOnChange(e)} />
                        Tuesday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="wednesday"
                               className='my-1'
                               value={wednesday}
                               onChange={(e) => availabilityOnChange(e)} />
                        Wednesday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="thursday"
                               className='my-1'
                               value={thursday}
                               onChange={(e) => availabilityOnChange(e)} />
                        Thursday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="friday"
                               className='my-1'
                               value={friday}
                               onChange={(e) => availabilityOnChange(e)} />
                        Friday
                    </label>
                    <label className='my-1'>
                        <input type="checkbox"
                               name="saturday"
                               className='my-1'
                               value={saturday}
                               onChange={(e) => availabilityOnChange(e)} />
                        Saturday
                    </label>
                </div>
                <button className='btn btn-primary my-1' onClick={e => onSubmit(e)}>Filter</button>
            </form>
            { showStudents &&
                profiles.profiles.map((student) => {
                    return <StudentDetails key={student._id} profile={student} />

                })
            }
        </Fragment>
    )
}
const mapStateToProps = state => ({
    profiles: state.profiles
})

export default connect(mapStateToProps, {studentFilter})(StudentsFilter)