import React, {useState, Fragment} from "react";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import PropTypes from 'prop-types';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();

    }

    const {email, password} = formData;
    return (
        <div>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Log In To Your Account </p>

            <form className='form' onSubmit={event => onSubmit(event)}>
                <div className="form-group">
                    <input type='text'
                           placeholder='Enter Email'
                           name='email'
                           value={email}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <div className="form-group">
                    <input type='password'
                           placeholder='Enter Password'
                           name='password'
                           value={password}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <input className="btn btn-primary" type='submit' value='Login'/>
            </form>
        </div>
    )
}
export default Login