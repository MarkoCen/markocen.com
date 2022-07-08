import React from 'react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { appWithTranslation, useTranslation } from 'next-i18next';

import '../styles/global.scss';
import { TopNav } from '../components/TopNav/TopNav';

const MyBlog = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      <DefaultSeo title='Marko Cen' description={t('seo_self_intro', { years: new Date().getFullYear() - 2013 })} />
      <TopNav />
      <div className='w-full px-6 pt-20 md:pt-32 mx-auto flex justify-center items-center'>
        <Component {...pageProps} />
      </div>
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

export default appWithTranslation(MyBlog);
