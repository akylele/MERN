import React from 'react';
import useRoutes from '../src/routes'
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css'
import Navbar from './components/Navbar';
import Alert from "./hooks/message.hook";


function App() {
    // const { token, login, logout, userId, len, getLen } = useAuth()
    // const isAuthentificated = !!token
    // const routes = useRoutes(isAuthentificated)
    const routes = useRoutes(false)

    return (
        <Router>
            <Alert/>
            <Navbar isAuthentificated={false}/>
            <div className="container">
                {routes}
            </div>
        </Router>
    );
}

export default App;
