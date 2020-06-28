import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import AuthPage from './pages/AuthPage'
import TarifsPage from './pages/TarifsPage'
import DelTarifsPage from './pages/DelTarifsPage'
import LogoutPage from './pages/LogoutPage'
import TarifSelectionPage from './pages/TarifSelectionPage'

import Loading2 from './components/Loading2'


function useRoutes(isAuthentificated) {
    if (isAuthentificated) {
        return (
            <Switch>
                <Route path="/select">
                    <TarifSelectionPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/tarifs">
                    <TarifsPage />
                </Route>
                <Route path="/deltarifs">
                    <DelTarifsPage />
                </Route>
                <Route path="/logout">
                    <LogoutPage />
                </Route>
                <Redirect to="/tarifs" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/loading">
                <Loading2 />
            </Route>
            <Route path="/tarifs">
                <TarifsPage />
            </Route>
            <Route path="/select">
                <TarifSelectionPage />
            </Route>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            <Redirect to="/tarifs" />
        </Switch>
    )
}
export default useRoutes