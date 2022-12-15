import React  from "react";
import {useNavigate} from "react-router-dom";
import "./Button.css"
import PropTypes from "prop-types";
import Dashboard from "./Dashboard";
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
Dashboard.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});
export default DashboardAdmin;