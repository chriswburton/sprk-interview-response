import React, { FC } from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ACCESS_TOKEN } from './interfaces/local-storage.constants'

type Props = RouteProps & { component: FC<any> }

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
    return (
        <Route
            {...rest}
            render={(props: any) =>
                localStorage.getItem(ACCESS_TOKEN) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={'/login'} />
                )
            }
        />
    )
}
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/login'} component={Login} />
                <PrivateRoute path={'/'} component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
