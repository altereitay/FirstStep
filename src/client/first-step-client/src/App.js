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
                    <Navbar typeOfUser='admin'/>
                    <section className='container'>
                        <Alert/>
                        <Routes>
                            <Route exact path='/register' element={<Register typeOfUser='admin'/>}/>
                        </Routes>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    )
        ;
}

export default App;
