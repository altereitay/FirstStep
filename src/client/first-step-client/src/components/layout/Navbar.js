import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({auth, logout}) => {
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
            <li><Link to="/upload-job">Upload Job</Link></li>
            <li><Link onClick={logout} to="/">
                <i className='fas fa-sign-out-alt'/> {' '}
                <span className='hide-sm'>Logout</span>
            </Link></li>
        </ul>
    );
    const adminLinks = (
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link onClick={logout} to="/">
                <i className='fas fa-sign-out-alt'/> {' '}
                <span className='hide-sm'>Logout</span>
            </Link></li>
        </ul>
    )
    const studentLinks = (
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link onClick={logout} to="/">
                <i className='fas fa-sign-out-alt'/> {' '}
                <span className='hide-sm'>Logout</span>
            </Link></li>
        </ul>
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
                    {auth.isAuthenticated && auth.user?.typeOfUser === 'employer' ? employerLinks :
                        auth.isAuthenticated && auth.user?.typeOfUser === 'admin' ? adminLinks :
                        auth.isAuthenticated && auth.user?.typeOfUser === 'student' ? studentLinks :
                        guestLinks}
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
export default connect(mapStateToProps, {logout})(Navbar)