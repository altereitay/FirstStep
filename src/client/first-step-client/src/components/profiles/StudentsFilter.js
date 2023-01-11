import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {studentFilter} from "../../actions/profiles";
import StudentDetails from "./StudentDetails";
const StudentsFilter = ({profiles, studentFilter}) => {
    const [showStudents, setShowStudents] = useState(false);
    const [formData, setFormData] = useState({
        city: undefined,
        school: undefined,
        degree:undefined,
        skills: [],
        availability: []
    })
    const {city, skills, school, degree} = formData

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
        setFormData({...formData, degree: e.target.value})
    }

    const skillsOnChange = e => {
        let skill = e.target.value.split(',');
        setFormData({...formData, skills: skill});
    }

    const availabilityOnChange = e => {
        setAvailability({...availabilityData, [e.target.name]: e.target.checked});
    }

    const onSubmit = async event => {
        event.preventDefault();
        await studentFilter(formData, availabilityData)
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
                    />
                </div>
                <div className='form-group'>
                    <h1 className='big text-dark'>Education</h1>
                    <h3 className='text-dark'>school</h3>
                    <input type='text'
                           className='my-1'
                           name='school'
                           placeholder='Enter School'
                           value={school}
                           onChange={event => onChange(event)}
                    />
                    <select onChange={e => onDegreeChange(e)}>
                        <option value="" selected>Select Your Degree</option>
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