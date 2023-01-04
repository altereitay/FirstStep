import React from "react";
import { useNavigate } from "react-router-dom";
const StudnetDetails = ({profile}) => {
    const navigate = useNavigate()
    return (
        <div>
            <h3 className='text-dark'>user name: {profile?.name}</h3>

            <p>
                <strong>user description: </strong>{profile?.description}
            </p>

            <p>
                <strong>user dateOfBirth: </strong>{profile?.dateOfBirth}
            </p>

            <p>
                <strong>user city: </strong>{profile?.city}
            </p>

            <p>
                <strong>user skills: </strong>{profile?.skills}
            </p>
            <br></br>
        </div>
    )
}
export default StudnetDetails;