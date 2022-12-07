import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {login} from "../../actions/auth";

const Login=({login})=> {
    const nav=useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData;
    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }
    const onSubmit = event => {
        event.preventDefault();
        login(formData.email,formData.password,nav);
    }
    return (
        <div>
            <h1 className="large text-primary">sign in</h1>
            <p className="lead">
                <i className="fas fa-user"> Login to your account</i></p>
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
                <input className="btn btn-primary" type='submit' />
            </form>


        </div>

    );
}
export default connect(null,{login}) (Login);



