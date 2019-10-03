import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

interface IProps {
    title: string;
    description: string;
    canonical: string;
}

const PageHeader: FunctionComponent<IProps> = ({ title, description, canonical }) => {
    const base = 'https://www.markocen.com';

    return (
        <>
            <Helmet>
                <html lang='en' />
                <meta charSet='utf-8' />
                <meta http-equiv='x-ua-compatible' content='ie=edge' />
                <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                <title>{title}</title>
                <meta name='description' content={description} />
                <link rel='canonical' href={`${base}/${canonical}`} />
            </Helmet>
        </>
    );
};

export default PageHeader;
