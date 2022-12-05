import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Navbar = ({auth: {loading}}) => {
    const guestLinks = (
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"/> FirstStep</Link>
            </h1>
            {!loading && (
                <Fragment>
                    {guestLinks}
                </Fragment>
            )
            }
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