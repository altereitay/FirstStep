import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    newEmployerProfile,
    uploadEmployerCert,
} from "../../actions/profiles";
import {useNavigate} from "react-router-dom";

const EmployerProfile = ({user, newEmployerProfile,uploadEmployerCert}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        business: '',
        description: ''
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
         await newEmployerProfile(formData, user?._id, navigate);
        if (fileName) {
            uploadEmployerCert(user?._id, fileData);
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

EmployerProfile.propTypes = {
    newEmployerProfile: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
}
const mapStateToProps = state =>({
    user: state.auth.user
})
export default connect(mapStateToProps, {newEmployerProfile,uploadEmployerCert})(EmployerProfile);
