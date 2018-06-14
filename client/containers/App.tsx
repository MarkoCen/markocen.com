import 'normalize.css';
import PropTypes from 'prop-types';
import React, { Component, Props } from 'react';
import { BrowserRouter, Link, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import Routes from '../modules/routes';
import { flexLayout } from '../theme/mixin';

import BirdBackground from '../components/BirdBackground';
import AboutPage from './About';
import MainPage from './Main';

const AppContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    ${flexLayout()}
`;

class App extends Component {
    public static propTypes = {

    };

    public render() {
        return (
            <AppContainer>
                <BirdBackground />
                <BrowserRouter>
                    <div>
                        <Link to="/">Main</Link>
                        <Link to="/about">About</Link>
                        <Switch>

                                <Route
                                    path={Routes.About.path}
                                    children={(props: RouteComponentProps<any>) => (
                                        <AboutPage {...props} />
                                    )}
                                />
                                <Route component={MainPage} />
                            </Switch>
                    </div>
                </BrowserRouter>
            </AppContainer>
        );
    }
}

export default App;
