import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

const Root = (
    <StrictMode>
        <App />
    </StrictMode>
);

ReactDOM.render(Root , document.querySelector('#root'));
