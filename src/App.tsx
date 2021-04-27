import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Dashboard } from './pages/Dashboard/Dashboard'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/login'} component={Login} />
                <Route path={'/'} component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
