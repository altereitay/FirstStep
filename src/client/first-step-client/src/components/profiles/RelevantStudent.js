import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";
import StudnetDetails from "./StudentDetails";
import {relevantStudent} from "../../actions/profiles";
const RelevantStudent = ({profiles,job,relevantStudent}) => {
    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    useEffect(()=>{
        relevantStudent(id)
    }, [])
    return (
        <div>
            <h2 className='text-primary'>Relevant Students</h2>
            {profiles.profiles?.map((profile) => {
                return <StudnetDetails key={profile._id} profile={profile} />
            })}
        </div>
    )
}
const mapStateToProps = state => ({
    profiles: state.profiles
})
export default connect(mapStateToProps,{relevantStudent})(RelevantStudent);
