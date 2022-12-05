import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const RegistrationSelector = ({isAuthenticated}) => {
    if (isAuthenticated) {
        return <Navigate to='/'/>
    }
    return (
        <Fragment>
            <Link to='/register' state={{typeOfUser: 'student'}}>
                <p className='btn btn-primary'>Sign Up As a Student</p>
            </Link>

            <Link to='/register' state={{typeOfUser: 'employer'}}>
                <p className='btn btn-primary'>Sign Up As an Employer</p>
            </Link>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(RegistrationSelector);