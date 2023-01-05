import './App.css';
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import RegistrationSelector from "./components/auth/RegistrationSelector";
import StudentProfile from "./components/profiles/StudentProfile";
import EmployerProfile from "./components/profiles/EmployerProfile";
import Login from "./components/auth/Login";
import UploadJob from "./components/jobs/UploadJob";
import Dashboard from "./components/layout/Dashboard";
import EditStudentProfile from "./components/profiles/EditStudentProfile";
import UpdateJob from "./components/jobs/UpdateJob";
import EditEmployerProfile from './components/profiles/EditEmployerProfile';
import AppliedJobsReport from "./components/jobs/AppliedJobsReport";
import Adminjobs from './components/jobs/AdminJobs';
import AccountManagement from './components/profiles/AccountManagement';
import AddNewAdmin from './components/profiles/AddNewAdmin';
import profileDetails from "./components/profiles/profileDetails";
import StudentJobs from './components/jobs/StudentJobs';
import EmployerReport from "./components/profiles/EmployerReport";
import StudentReport from "./components/profiles/StudentReport";
import EditAdmin from "./components/profiles/EditAdmin";
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
                            <Route exact path='/uploadjob' element={<UploadJob/>}/>
                            <Route exact path='/jobs/:id' element={<UpdateJob/>}/>
                            <Route exact path='/student/:id' element={<EditStudentProfile/>}/>
                            <Route exact path='/employer/:id' element={<EditEmployerProfile/>}/>
                            <Route exact path='/applied/:userId' element={<AppliedJobsReport/>}/>
                            <Route exact path='/admin/jobs' element={<Adminjobs/>}/>
                            <Route exact path='/admin/accounts' element={<AccountManagement/>}/>
                            <Route exact path='/admin/add' element={<AddNewAdmin/>}/>
                            <Route exact path='/student/jobs' element={<StudentJobs/>}/>
                            <Route exact path ='/admin/studentReport' element={<StudentReport/>}/>
                            <Route exact path='/add-admin' element={<AddNewAdmin/>}/>
                            <Route exact path='/admin/employerReport' element={<EmployerReport/>}/>
                            <Route exact path='/admin/edit' element={<EditAdmin/>}/>
                        </Routes>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    )
        ;
}

export default App;
