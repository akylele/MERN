import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import LogoutPage from './pages/LogoutPage'



function useRoutes(isAuthentificated) {
    if (isAuthentificated) {
        return (
            <Switch>
                <Route path="/logout">
                    <LogoutPage />
                </Route>
                <Route path="/profile">
                    <ProfilePage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Redirect to="/login" />
        </Switch>
    )
}
export default useRoutes