import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import Alert from "./components/layout/alert";

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
                <div>
                    <h1>Hello</h1>
                    {/*<Alert/>*/}
                    <Routes>
                        <Route exact path='/register' element={<Register typeOfUser='admin'/>}/>
                    </Routes>
                </div>
            </Router>
        </Provider>
    )
        ;
}

export default App;
