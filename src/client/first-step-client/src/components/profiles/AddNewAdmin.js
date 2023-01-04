import React, {Fragment, useState } from "react";
import {addAdmin} from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";

const AddNewAdmin = ({addAdmin, setAlert}) =>{
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    })
    const {email, password, password2} = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const onSubmit = event =>{
        event.preventDefault()
        if (password !== password2) {
            setAlert("Password Don't Match", 'danger');
        } else {
            addAdmin({email, password, typeOfUser:'admin'}, nav);
        }
    }

    return (
        <div>
            <h1 className='large text-primary'>Add A New Admin</h1>
            <Fragment>
                <form className='form' onSubmit={event=> onSubmit(event)}>
                    <div className='form-group'>
                        <h3 className='text-primary'>Email</h3>
                        <input type='email'
                               placeholder='Enter Email'
                               name='email'
                               value={email}
                               onChange={event => onChange(event)}
                               required/>
                    </div>

                    <div className='form-group'>
                        <h3 className='text-primary'>Password</h3>
                        <input type='password'
                               placeholder='Enter Password'
                               name='password'
                               value={password}
                               onChange={event => onChange(event)}
                               required/>
                    </div>

                    <div className='form-group'>
                        <h3 className='text-primary'>Confirm Password</h3>
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
        </div>
    );
}

export default connect(null, {addAdmin, setAlert})(AddNewAdmin);
