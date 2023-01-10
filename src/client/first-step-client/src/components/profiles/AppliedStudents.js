import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { aplicationStudent } from "../../actions/jobs";
import StudnetDetails from "./StudentDetails";
const AppliedStudents = ({ profiles, aplicationStudent }) => {
    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    const [currentProfiles, setCurrentProfiles] = useState([])
    useEffect(() => {
        setCurrentProfiles(profiles.profiles)
    }, [profiles.profiles])
    useEffect(() => {
        aplicationStudent(id)
    }, [])
    const onApply = (profile) => {
        let newProfiles = currentProfiles;
        
        if (newProfiles.length === 1){
            setCurrentProfiles([])
            return
        }
        const index = currentProfiles.indexOf(profile);
        
        newProfiles = newProfiles.splice(index - 1,1);
        setCurrentProfiles(newProfiles);
        
    }
    const navigate = useNavigate()
    return (
        <div>
            <h2 className='text-primary'>Relevant Students</h2>
            {currentProfiles.length === 0 && <h4>No Students Found</h4>}
            {currentProfiles?.map((profile) => {
                return (
                    <Fragment>
                        <StudnetDetails key={profile._id} profile={profile} />
                        <button className='btn btn-primary' onClick={() => onApply(profile)}>Accept</button>
                        <button className='btn btn-danger' onClick={() => onApply(profile)}>Decline</button>
                    </Fragment>
                )
            })}
        </div>
    )
}


const mapStateToProps = state => ({
    profiles: state.profiles
})

export default connect(mapStateToProps, { aplicationStudent })(AppliedStudents);