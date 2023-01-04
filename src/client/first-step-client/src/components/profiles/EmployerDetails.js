import React from "react";
import { useNavigate } from "react-router-dom";
const EmployerDetails = ({profile}) => {
    const navigate = useNavigate()
    return (
        <div>
            <h3 className='text-dark'>user name: {profile?.name}</h3>
            <p>
                <strong>user business: </strong>{profile?.business}
            </p>

            <p>
                <strong>user description: </strong>{profile?.description}
            </p>
            <br></br>
        </div>
    )
}
export default EmployerDetails;