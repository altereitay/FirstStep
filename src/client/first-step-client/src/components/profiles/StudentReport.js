import React, {useEffect } from "react";
import { connect } from "react-redux";
import ProfileDetails from "./profileDetails";
import {loadStudent} from "../../actions/profiles";
import StudnetDetails from "./StudentDetails";
const StudentReport= ({profiles, loadStudent}) =>{
    useEffect(() => {
        loadStudent();
    }, [])
    return (
        <div>
            <h2 className='text-primary'>User Managment</h2>
            {profiles.profiles?.map((profile) => {
                return <StudnetDetails key={profile._id} profile={profile} />
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    profiles: state.profiles
});
export default connect(mapStateToProps, { loadStudent })(StudentReport)