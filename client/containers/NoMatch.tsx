import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Routes from '../modules/routes';

class NoMatch extends Component {
    public render() {
        return (
            <Redirect to={Routes.Home.path} />
        );
    }
}

export default NoMatch;
