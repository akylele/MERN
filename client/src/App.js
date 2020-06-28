import React from 'react';
import useRoutes from '../src/routes'
import { BrowserRouter as Router } from 'react-router-dom';
import useAuth from './hooks/auth.hook';
import AuthContext from './context/auth.context';
import 'materialize-css'
import Navbar from './components/Navbar';


function App() {
  const { token, login, logout, userId, len, getLen } = useAuth()
  const isAuthentificated = !!token
  const routes = useRoutes(isAuthentificated)

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthentificated, len, getLen }}>
      <Router>
        <Navbar isAuthentificated={isAuthentificated}/>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
