import React  from "react";
import {useNavigate} from "react-router-dom";
import "./Button.css"
const DashboardAdmin = ({user})=>{
    const navigate = useNavigate();
    return (
        <div>
            <a class="rounded-button" href ="./test">
                <ion-icon name="settings-sharp" size="large"></ion-icon>
            </a>

        </div>

    );

}
export default DashboardAdmin;