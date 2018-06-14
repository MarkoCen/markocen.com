import PropTypes from 'prop-types';
import React, { Component, Props } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Transition} from 'react-transition-group';
import styled from 'styled-components';

const AnimatedWrapperFn = (
    WrappedComponent: new(props: Props<any>) => Component<any, any>,
) => class AnimatedWrapper extends Component {
    public static propTypes = {
        match: PropTypes.object.isRequired,
    };

    public state = {
        isActive: false,
        duration: 3000,
    };

    constructor(props: RouteComponentProps<any>) {
        super(props);
        this.state = {
            isActive: props.match.path === props.match.url,
            duration: 3000,
        };
    }

    public render() {
        const { isActive, duration } = this.state;
        const defaultStyle = {
            transition: `all ${duration}ms ease-in-out`,
        };

        const transitionStyles: any = {

            exiting: { opacity: 1, transform: 'translateY(0)' },
            exited: { opacity: 0, transform: 'translateY(-100vh)' },
        };

        return (
            <Transition in={true} timeout={duration}>
            {
                (state: string) => {
                    console.log(state);
                    const style = {
                        ...defaultStyle,
                        ...transitionStyles[state.toString()],
                    };
                    return (
                        <WrappedComponent
                            style={style}
                        />
                    );
                }
            }
            </Transition>
        );
    }
};

export default AnimatedWrapperFn;
