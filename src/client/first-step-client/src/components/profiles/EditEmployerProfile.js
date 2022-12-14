import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {updateEmployerProfile, uploadEmployerCert} from "../../actions/profiles";
import {useNavigate} from "react-router-dom";

const EditEmployerProfile = ({profile, updateEmployerProfile,uploadEmployerCert}) => {
    const navigate = useNavigate();
    const employer = profile;
    const [formData, setFormData] = useState({
        name: employer.name,
        business: employer.business,
        description: employer.description
    })
    const {name, business, description} = formData
    const [fileName, setFileName] = useState("");
    const onFileChange = event =>{
        setFileName(event.target.files[0])
    }
    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let fileData;
        if (fileName) {
            fileData = new FormData();
            fileData.append('image', fileName)
        }
        await updateEmployerProfile(formData, profile, navigate);
        if (fileName) {
            uploadEmployerCert(profile.user, fileData);
        }
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
                        <h3 className='large text-primary'>Business</h3>
                        <input type='text'
                               placeholder='Enter Business Name'
                               name='business'
                               value={business}
                               onChange={event => onChange(event)}
                               required/>
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
                    <h3 className='large text-primary'>Picture</h3>
                    <input type='file' onChange={e => onFileChange(e)}/>
                </div>
                <input type='submit' className='btn btn-primary my-1'/>
            </form>

        </Fragment>
    )
}

const mapStateToProps = state =>({
    profile: state.profiles.profile
})
export default connect(mapStateToProps, {updateEmployerProfile,uploadEmployerCert})(EditEmployerProfile);
