import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {AuthContext} from './context/auth';

import Login from './components/login/Login';
import Main from './components/main/Main';

import Users from './components/users';
import Exercise from './components/exercise';

import './App.css';
import PrivateRoute from './lib/PrivateRoute';

function App() {

    const existingTokens = JSON.parse(localStorage.getItem('tokens'));
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const setTokens = (data) => {
        localStorage.setItem('tokens', JSON.stringify(data));
        setAuthTokens(data);
    };

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Main>
                        <PrivateRoute exact path="/users" component={Users} />
                        <PrivateRoute exact path="/exercise" component={Exercise} />
                    </Main>
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
