import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './App.css';

function App() {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/" component={MainPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
