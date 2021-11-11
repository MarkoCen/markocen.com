import React from 'react';

import { AppProps } from 'next/app';

import '../styles/global.css';
import { DefaultSeo } from 'next-seo';

const MyBlog = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo
        title='Marko Cen'
        description='Hi This is Marko, I am a full-stack software engineer with over 8 years experiences and this is my personal website.'
      />
      <Component {...pageProps} />
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyBlog;
