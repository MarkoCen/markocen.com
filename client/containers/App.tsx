import 'normalize.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Routes from '../modules/routes';

import BirdBackground from '../components/BirdBackground';
import Main from './Main';

const AppContainer = styled.div`
    background: whitesmoke;
    width: 100%;
    min-height: 100vh;
`;

class App extends Component {
    public static propTypes = {

    };

    public render() {
        return (
            <AppContainer>
                <BirdBackground />
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path={Routes.Home.path} component={Main} />
                        <Route component={Main} />
                    </Switch>
                </BrowserRouter>
            </AppContainer>
        );
    }
}

export default App;
