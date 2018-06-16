import 'normalize.css';
import PropTypes from 'prop-types';
import React, { Component, Props } from 'react';
import { BrowserRouter, Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { flexLayout } from '../theme/mixin';

import BirdBackground from '../components/BirdBackground';
import RouteContainer from '../components/RouteContainer';

const AppContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    ${flexLayout()}
`;

class App extends Component<any, any> {
    public render() {
        const { location, history } = this.props;
        return (
            <AppContainer>
                <BirdBackground />
                <BrowserRouter>
                    <RouteContainer />
                </BrowserRouter>
            </AppContainer>
        );
    }
}

export default App;
