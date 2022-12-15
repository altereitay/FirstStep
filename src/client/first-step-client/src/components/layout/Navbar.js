import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Navbar = ({auth}) => {
    const guestLinks = (
        <ul>
            <li><Link to="/register-select">Register</Link></li>
            <li><Link to="/login">Login</Link></li>

        </ul>
    );

    const indicator = (
        <h3 className='text-primary'>
            {auth.isAuthenticated ? `Hello ${auth.user?.typeOfUser}` : 'Hello Stranger'}
        </h3>
    )
    const employerLinks = (
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/uploadjob">uploadjob</Link></li>
            <li><Link>signout</Link></li>
        </ul>
    );
    const adminLinks = (
        <li><Link to="/dashboardadmin">Dashboard</Link></li>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"/>FirstStep</Link>
            </h1>
            {!auth.loading && (
                <Fragment>
                    {indicator}
                    {auth.user?.typeOfUser === 'employer' ? employerLinks :
                        auth.user?.typeOfUser === 'admin' ? adminLinks : guestLinks}
                </Fragment>
            )}
        </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(Navbar)
