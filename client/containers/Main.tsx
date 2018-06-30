import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Slogan = styled.h1`
    font-size: 3rem;
    opacity: .65;
    color: #525252;
    line-height: 1.2;
    margin-top: -2rem;
    letter-spacing: .1rem;
    font-family: Tahoma, Helvetica, Arial, STFangsong, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif;
    @media (max-width: 700px) {
        font-size: 1.5rem;
    }
`;

class MainPage extends Component<any, {}> {
    public render() {
        return (
            <Container>
                <Slogan>
                菩提本无树<br />
                明镜亦非台<br />
                本来无一物<br />
                何处惹尘埃<br />
                </Slogan>
            </Container>
        );
    }
}

export default MainPage;
