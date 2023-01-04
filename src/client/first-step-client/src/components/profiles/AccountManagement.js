import React, {useEffect } from "react";
import { connect } from "react-redux";
import ProfileDetails from "./profileDetails";
import {loadProfiles} from "../../actions/profiles";
import {deleteUser} from "../../actions/auth";

const AccountManagement = ({profiles,deleteUser, loadProfiles}) =>{
    useEffect(() => {
    loadProfiles();
    }, [])
    return (
        <div>
            <h2 className='text-primary'>User Managment</h2>
            {profiles.profiles?.map((profile) => {
                return <ProfileDetails key={profile._id} profile={profile} deleteUser={deleteUser} />
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    profiles: state.profiles
});
export default connect(mapStateToProps, { loadProfiles,deleteUser })(AccountManagement)
