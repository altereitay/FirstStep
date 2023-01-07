import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";
import {approveCert} from "../../actions/profiles";
const EmployerDetails = ({profile,approveCert}) => {
    const navigate = useNavigate()
    const [image, setImage] = useState('')
    useEffect(()=>{
        if (profile.picture){
            setImage(profile.picture.replaceAll('\\','/').split('public')[1])
        }
    }, [image])
    return (
        <div>
            <h3 className='text-dark'>user name: {profile?.name}</h3>
            <p>
                <strong>user business: </strong>{profile?.business}
            </p>

            <p>
                <strong>user description: </strong>{profile?.description}
            </p>
            { profile.isApproved===false &&
                <img src={image} alt='img'/>

            }
            {profile.isApproved===false &&
            <button onClick={e=>approveCert(profile._id,"employer")}>Approve</button>
            }

            <br></br>
        </div>
    )
}
export default connect(null,{approveCert})(EmployerDetails);