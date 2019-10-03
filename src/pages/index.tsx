import React, { FunctionComponent } from 'react';
import PageHeader from '../components/common/PageHeader';

const IndexPage: FunctionComponent = () => {
    const date = new Date();
    const hours = date.getHours();
    let greetings = '';

    if (hours > 5 && hours < 12) {
        greetings = 'Good Morning';
    } else if (hours >= 12 && hours < 18) {
        greetings = 'Good Afternoon';
    } else {
        greetings = 'Good Evening';
    }

    const yearsOfExperiences = date.getFullYear() - 2013;

    return (
        <>
            <PageHeader
                title='Marko Cen'
                canonical=''
                description={`I am Marko Cen, a full stack software engineer with over ${yearsOfExperiences} years of web
    development experiences, currently located in Boston area.`}
            />
            <div className='container vw-100 vh-100 d-flex align-items-center'>
                <div className='row w-100'>
                    <div className='col-12'>
                        <h1>{greetings}!</h1>
                    </div>
                    <div className='col-12'>
                        <p className=''>
                            I am Marko Cen, a full stack software engineer with over {yearsOfExperiences} years of web
                            development experiences, currently located in Boston area.
                        </p>
                    </div>
                    <div className='col-12'>
                        <p className=''>
                            You could see my professional experiences on
                            <a href='https://www.linkedin.com/in/markocen/' rel='nofollow'>
                                LinkedIn
                            </a>
                            , and my open source code on
                            <a href='https://github.com/markocen' rel='nofollow'>
                                GitHub
                            </a>
                            . For a hobby, I like to answer questions on
                            <a href='https://stackoverflow.com/users/5454390/markocen?tab=profile' rel='nofollow'>
                                Stack Overflow
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndexPage;
