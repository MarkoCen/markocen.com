import React, { FunctionComponent } from 'react';

const PageLayout: FunctionComponent = ({ children }) => {
    return <div className='container'>{children}</div>;
};

export default PageLayout;
