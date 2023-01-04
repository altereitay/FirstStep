import React, {useEffect } from "react";
import { connect } from "react-redux";
import ProfileDetails from "./profileDetails";
import {loadProfiles} from "../../actions/profiles";
import {deleteUser} from "../../actions/auth";
import { useNavigate } from "react-router-dom";

const AccountManagement = ({profiles,deleteUser, loadProfiles}) =>{
    const navigate = useNavigate();
    useEffect(() => {
    loadProfiles();
    }, [])
    return (
        <div>
            <h2 className='text-primary'>User Managment</h2>
            <button className='btn btn-primary' onClick={()=> navigate('/add-admin')}>Add New Admin</button>
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
