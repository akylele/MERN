import React from 'react';
import useRoutes from '../src/routes'
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css'
import Navbar from './components/Navbar';
import Alert from "./hooks/message.hook";
import {useSelector} from "react-redux";
import {getCookie} from "./hooks/cookie";


function App() {
    const isAuth = !!useSelector(store => store.authReducer.profile.token) || getCookie('token')

    const routes = useRoutes(isAuth)

    return (
        <Router>
            <Alert/>
            <Navbar/>
            <div className="container">
                {routes}
            </div>
        </Router>
    );
}

export default App;
