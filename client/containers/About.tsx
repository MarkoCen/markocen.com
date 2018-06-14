import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import AnimatedWraperFn from '../components/AnimatedWraper';

class AboutPage extends Component<any> {
    public render() {
        return (
            <div style={this.props.style}>This is about page</div>
        );
    }
}

export default AnimatedWraperFn(AboutPage);
