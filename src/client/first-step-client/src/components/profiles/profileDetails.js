import React from "react";
import { useNavigate } from "react-router-dom";
const ProfileDetails = ({profile, deleteUser}) => {
    const navigate = useNavigate()
    return (
        <div>
            <h3 className='text-dark'>user name: {profile?.name}</h3>
            <p>
                <strong>user description: </strong>{profile?.description}
            </p>
            <button className='btn btn-danger' onClick={() => deleteUser(profile?.user, navigate)}>delete</button>
        </div>
    )
}
export default ProfileDetails;