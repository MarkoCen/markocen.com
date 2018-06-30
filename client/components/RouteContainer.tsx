import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Routes from '../modules/routes';
import { duration, transitionName } from '../modules/transitions';

import MainPage from '../containers//Main';
import AboutPage from '../containers/About';

class RouteContainer extends Component<RouteComponentProps<any>, any> {
    public render() {
        const { location } = this.props;

        return (
            <div>
                <Link to="/">Main</Link>
                <Link to="/about">About</Link>
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames={transitionName} timeout={duration}>
                        <Switch location={location}>
                            <Route path={Routes.About.path} component={AboutPage} />
                            <Route exact={true} path={Routes.Home.path} component={MainPage} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}

export default withRouter(RouteContainer);