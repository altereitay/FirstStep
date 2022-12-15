import './App.css';
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import {loadProfile} from "./actions/profiles";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import RegistrationSelector from "./components/auth/RegistrationSelector";
import StudentProfile from "./components/profiles/StudentProfile";
import EmployerProfile from "./components/profiles/EmployerProfile";
import Login from "./components/auth/Login";
import UploadJob from "./components/jobs/UploadJob";
import Dashboard from "./components/layout/Dashboard";
import DashboardAdmin from "./components/layout/DashboardAdmin";
if (localStorage.token) {
    setAuthToken(localStorage.token);
}


function App () {
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <section className='container'>
                        <Alert/>
                        <Routes>
                            <Route exact path='/register-select' element={<RegistrationSelector/>}/>
                            <Route exact path='/register' element={<Register/>}/>
                            <Route exact path='/student-signup' element={<StudentProfile/>}/>
                            <Route exact path='/employer-signup' element={<EmployerProfile/>}/>
                            <Route exact path='/login' element={<Login/>}/>
                            <Route exact path='/upload-job' element={<UploadJob/>}/>
                            <Route exact path='/dashboard' element={<Dashboard/>}/>
                            <Route exact path='/dashboardadmin' element={<DashboardAdmin/>}/>
                        </Routes>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    )
        ;
}

export default App;
