import React, { useState, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
// import components
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { AuthContext } from './context/authContext';

const App = () => {
    const { state } = useContext(AuthContext);
    const { user } = state;

    const client = new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        request: (operation) => {
            operation.setContext({
                headers: {
                    authtoken: user ? user.token : ''
                }
            });
        }
    });

    return (
        <ApolloProvider client={client}>
            <Nav />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/complete-registration" component={CompleteRegistration} />
            </Switch>
        </ApolloProvider>
    );
};

export default App;
