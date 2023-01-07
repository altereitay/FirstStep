import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { updateStudentProfile, uploadStudentCert } from "../../actions/profiles";
import { setAlert } from "../../actions/alert";

const EditStudentProfile = ({ profile, updateStudentProfile, uploadStudentCert }) => {
    const navigate = useNavigate();
    const student = profile;
    const [formData, setFormData] = useState({
        name: student?.name || '',
        dateOfBirth: student?.dateOfBirth || '',
        city: student?.city || '',
        education: student?.education || '',
        skills: student?.skills || [],
        picture: student?.picture || '',
        description: student?.description || ''
    })
    const showDate = student.dateOfBirth.split('T')[0];
    const { name, city, skills, description } = formData
    const [educationData, setEducation] = useState({
        school: student?.education[0].school || '',
        degree: student?.education[0].degree || '',
        from: student?.education[0].from || '',
        to: student?.education[0].to || '',
        current: student?.education.current || true
    })
    const fromDateToShow = educationData.from.split('T')[0];
    const toDateToShow = educationData.to.split('T')[0];
    const { school, degree } = educationData;
    const [availabilityData, setAvailability] = useState({
        sunday: student.availability[0].sunday,
        monday: student.availability[0].monday,
        tuesday: student.availability[0].tuesday,
        wednesday: student.availability[0].wednesday,
        thursday: student.availability[0].thursday,
        friday: student.availability[0].friday,
        saturday: student.availability[0].saturday
    })

    const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = availabilityData
    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const onChangeEducation = event => {
        setEducation({ ...educationData, [event.target.name]: event.target.value });
    }
    const skillsOnChange = e => {
        let skill = e.target.value.split(',');
        setFormData({ ...formData, skills: skill });
    }
    const onDegreeChange = e => {
        setEducation({ ...educationData, degree: e.target.value })
    }
    const availabilityOnChange = e => {
        setAvailability({ ...availabilityData, [e.target.name]: e.target.checked });
    }

    const [fileName, setFileName] = useState("");
    const onFileChange = event =>{
        setFileName(event.target.files[0])
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let fileData;
        if (fileName) {
            fileData = new FormData();
            fileData.append('image', fileName)
        }
        await updateStudentProfile(formData, educationData, availabilityData, profile, navigate);
        if (fileName) {
            uploadStudentCert(profile.user, fileData);
        }
    }

    return (
        <Fragment>
            <form className='form' onSubmit={event => onSubmit(event)}>
                <h1 className="large text-primary">Edit Profile</h1>
                <div className='form-group'>
                    <h3 className='large text-primary'>Full Name</h3>
                    <input type='text'
                        placeholder='Enter Name'
                        name='name'
                        value={name}
                        onChange={event => onChange(event)}
                        required />
                </div>
                <div className='form-group'>
                    <h3 className='large text-primary'>Date of Birth</h3>
                    <input type='date'
                        name='dateOfBirth'
                        value={showDate}
                        max={Date.now()}
                        onChange={event => onChange(event)}
                        required />
                </div>
                <div className='form-group'>
                    <h3 className='large text-primary'>City</h3>
                    <input type='text'
                        name='city'
                        placeholder='Enter Your City'
                        value={city}
                        onChange={event => onChange(event)}
                        required />
                </div>
                <div className='form-group'>
                    <h1 className='large text-primary'>Education</h1>
                    <h3 className='text-dark'>School</h3>
                    <input type='text'
                        name='school'
                        placeholder='Enter School'
                        value={school}
                        onChange={event => onChangeEducation(event)}
                        required />
                    <h3 className='text-dark'>Degree</h3>
                    <select onChange={e => onDegreeChange(e)} value={degree}>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Industrial Engineering">Industrial Engineering</option>
                        <option value="Architecture">Architecture</option>
                    </select>
                    <h3 className='text-dark'>Starting Date</h3>
                    <input type='date'
                        name='from'
                        value={fromDateToShow}
                        max={Date.now()}
                        onChange={event => onChangeEducation(event)}
                        required />
                    <h3 className='text-dark'>Expected Graduation</h3>
                    <input type='date'
                        name='to'
                        value={toDateToShow}
                        onChange={event => onChangeEducation(event)}
                        required />

                </div>
                <div className="form-group">
                    <h1 className='large text-primary'>Skills</h1>
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
                            id="sunday.box"
                            checked={sunday}
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
                            checked={monday}
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

                <div className='form-group'>
                    <h3 className='large text-primary'>Description</h3>
                    <textarea
                        placeholder='A Short Description About You'
                        name='description'
                        cols='5'
                        rows='5'
                        value={description}
                        onChange={event => onChange(event)}
                    />
                </div>
                <div className='form-group'>
                    <h3 className='large text-primary'>Certificate of Studying</h3>
                    <input type='file' onChange={e => onFileChange(e)}/>
                </div>
                <input type='submit' className='btn btn-primary my-1' />
            </form>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    profile: state.profiles.profile
})
export default connect(mapStateToProps, { updateStudentProfile, uploadStudentCert })(EditStudentProfile);
