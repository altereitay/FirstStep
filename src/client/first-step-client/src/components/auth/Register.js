import React, { useState, Fragment } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) => {
    const location = useLocation();
    const nav = useNavigate();
    const typeOfUser = location.state?.typeOfUser || null;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    })
    const {email, password, password2} = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        if (password !== password2) {
            setAlert("Password Don't Match", 'danger');
        } else {
            register({email, password, typeOfUser});
        }
        if (typeOfUser === 'student'){
            console.log('student signup')
            nav('/student-signup');
        } else if (typeOfUser === 'employer'){
            nav('/employer-signup');
        } else {
            return <Navigate to='/'/>
        }
    }

    // if (isAuthenticated) {
    //     return <Navigate to='/'/>;
    // }
    if (typeOfUser === null) {
        return <Navigate to='/register-select'/>
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account</p>
            <form className='form' onSubmit={event => onSubmit(event)}>
                <div className="form-group">
                    <input type='email'
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
                <div className="form-group">
                    <input type='password'
                           placeholder='Confirm Password'
                           name='password2'
                           value={password2}
                           onChange={event => onChange(event)}
                           required/>
                </div>
                <input className="btn btn-primary" type='submit' value='Register'/>
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);