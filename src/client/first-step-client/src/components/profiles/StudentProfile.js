import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {newStudentProfile} from "../../actions/profiles";
import {useNavigate} from "react-router-dom";

const StudentProfile = ({ user, newStudentProfile}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        city: '',
        education: [],
        skills: [],
        picture: '',
        description: '',
        availability: []
    })
    const {name, dateOfBirth, city, skills, description} = formData

    const [educationData, setEducation] = useState({
        school: '',
        degree: '',
        from:'',
        to: '',
        current: true
    })
    const {school, degree, from, to} = educationData;

    const [availabilityData, setAvailability] = useState({
        'sunday': false,
        'monday': false,
        'tuesday': false,
        'wednesday': false,
        'thursday': false,
        'friday': false,
        'saturday': false
    })
    const {sunday, monday, tuesday, wednesday, thursday, friday, saturday} = availabilityData

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }
    const onChangeEducation = event => {
        setEducation({...educationData, [event.target.name]: event.target.value});
    }
    const skillsOnChange = e => {
        let skill = e.target.value.split(',');
        setFormData({...formData, skills: skill});
    }

    const availabilityOnChange = e => {
        if (e.target.value === 'false') {
            setAvailability({...availabilityData, [e.target.name]: true});
        }else {
            setAvailability({...availabilityData, [e.target.name]: false});
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        newStudentProfile(formData,educationData ,availabilityData, user?._id, navigate);
    }

    return (
        <Fragment>
            <form className='form' onSubmit={event=> onSubmit(event)}>
                <div className='form-group'>
                    <h3 className='large text-primary'>Full Name</h3>
                    <input type='text'
                           placeholder='Enter Name'
                           name='name'
                           value={name}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className='form-group'>
                    <h3 className='large text-primary'>Date of Birth</h3>
                    <input type='date'
                           name='dateOfBirth'
                           value={dateOfBirth}
                           max={Date.now()}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className='form-group'>
                    <h3 className='large text-primary'>City</h3>
                    <input type='text'
                           name='city'
                           placeholder='Enter Your City'
                           value={city}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className='form-group'>
                    <h1 className='large text-primary'>Education</h1>
                    <input type='text'
                           className='my-1'
                           name='school'
                           placeholder='Enter School'
                           value={school}
                           onChange={event => onChangeEducation(event)}
                           required/>

                    <input type='text'
                           className='my-1'
                           placeholder='Enter Degree'
                           name='degree'
                           value={degree}
                           onChange={event => onChangeEducation(event)}
                           required/>

                    <input type='date'
                           className='my-1'
                           name='from'
                           value={from}
                           max={Date.now()}
                           onChange={event => onChangeEducation(event)}
                           required/>

                    <input type='date'
                           className='my-1'
                           name='to'
                           value={to}
                           onChange={event => onChangeEducation(event)}
                           required/>

                </div>
                <div className="form-group">
                    <h3 className='text-dark'>Skills</h3>
                    <input type="text"
                           placeholder="Enter Skills"
                           name="skills"
                           value={skills}
                           onChange={(e) => skillsOnChange(e)}/>
                    <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                </div>

                <div className="form-group">
                    <h3 className='text-dark'>Availability</h3>
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

                <div className='form-group'>
                    <h3 className='large text-primary'>Description</h3>
                    <textarea
                           placeholder='A Short Description About You'
                           name='description'
                           cols='5'
                           rows='5'
                           value={description}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <input type='submit' className='btn btn-primary my-1'/>
            </form>

        </Fragment>
    )
}

//
// StudentProfile.propTypes = {
//     newStudentProfile: PropTypes.func.isRequired,
//     user: PropTypes.any.isRequired
// }
const mapStateToProps = state =>({
    user: state.auth.user
})
export default connect(mapStateToProps, {newStudentProfile})(StudentProfile);
