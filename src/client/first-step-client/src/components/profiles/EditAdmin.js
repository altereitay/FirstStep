import React, { Fragment, useState } from "react";
import {connect} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { updateInfo } from "../../actions/auth";

const EditAdmin = ({user, setAlert, updateInfo}) =>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: user.email,
        password: '',
        password2: ''
    })
    const {email, password, password2} = formData

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (password !== password2){
            setAlert("Passwords Don't Match", 'danger');
        }else {
            updateInfo(user._id, email, password, navigate);
        }
    }


    return (
        <Fragment>
            <form className='form' onSubmit={event=> onSubmit(event)}>
                <div className='form-group'>
                    <h3 className='large text-primary'>Email</h3>
                    <input type='email'
                           placeholder='Enter Email'
                           name='email'
                           value={email}
                           onChange={event => onChange(event)}
                           required/>
                </div>

                <div className='form-group'>
                    <h3 className='large text-primary'>Password</h3>
                    <input type='password'
                           placeholder='Enter new password'
                           name='password'
                           value={password}
                           onChange={event => onChange(event)}
                           required/>
                </div>

                <div className='form-group'>
                    <h3 className='large text-primary'>Confirm Password</h3>
                    <input type='password'
                           placeholder='Re-Enter Password'
                           name='password2'
                           value={password2}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <input type='submit' className='btn btn-primary my-1'/>
            </form>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {setAlert, updateInfo})(EditAdmin);