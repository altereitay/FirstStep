import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";
import {approveCert} from "../../actions/profiles";
const StudnetDetails = ({profile,approveCert}) => {
    const [image, setImage] = useState('')
    useEffect(()=>{
        if (profile.certificateOfStudying){
            setImage(profile.certificateOfStudying.replaceAll('\\','/').split('public')[1])
        }
    }, [image])
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
            {(profile.certificateOfStudying && profile.isApproved===false)&&
                <img src={image} alt='img'/>

            }
            {(profile.certificateOfStudying && profile.isApproved===false)&&
                <button onClick={e=>approveCert(profile._id,"student")}>Approve</button>

            }
            <br></br>
        </div>
    )
}
export default connect(null,{approveCert})(StudnetDetails);