import React, {useEffect } from "react";
import { connect } from "react-redux";
import ProfileDetails from "./profileDetails";
import {loadProfiles} from "../../actions/profiles";
import {deleteUser} from "../../actions/auth";
import {loadEmployer} from "../../actions/profiles";
import EmployerDetails from "./EmployerDetails";

const EmployerReport = ({profiles, loadProfiles}) =>{
    useEffect(() => {
        loadProfiles();
    }, [])
    return (
        <div>
            <h2 className='text-primary'>Employers Report</h2>
            {profiles.profiles?.map((profile) => {
                return <EmployerDetails key={profile._id} profile={profile}  />
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    profiles: state.profiles
});
export default connect(mapStateToProps, { loadProfiles,deleteUser })(EmployerReport)
