import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Trans, useTranslation } from 'next-i18next';

import { Link } from '../components/Link/Link';
import nextI18NextConfig from '../next-i18next.config.js';

const IndexPage = () => {
  const { t } = useTranslation('common');

  const years = React.useMemo<number>(() => {
    return new Date().getFullYear() - 2013;
  }, []);

  return (
    <>
      <article className='flex flex-col justify-center items-center'>
        <section>
          <img alt="Marko's Avatar" src='/avatar.jpg' className='rounded-full' />
        </section>
        <h1 className='text-4xl font-bold mt-5'>
          {t('index_title')} {t('first_name')}
        </h1>
        <section className='flex flex-col justify-center items-start w-100 md:w-8/12 lg:w-4/12 mt-2'>
          <p className='text-lg w-full mb-2 text-center'>
            <Trans
              t={t}
              i18nKey='self_intro.s1'
              ns='common'
              values={{
                years,
              }}
              components={{
                yearLink: <Link to='https://www.linkedin.com/in/markocen/' target='_blank' rel='noopener noreferrer' />,
                codingLink: <Link to='https://github.com/markocen' target='_blank' rel='noopener noreferrer' />,
                helpLink: (
                  <Link
                    to='https://stackoverflow.com/users/5454390/markocen?tab=profile'
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                ),
              }}
            />
          </p>
        </section>
        <section className='flex justify-center items-center w-100 md:w-8/12 lg:w-4/12 mt-12'>
          <Link
            to='/re_sink'
            className='outline-none bg-gray-50 rounded-lg bg-transparent m-5 px-5 py-1 transition pop hover:bg-green-100 focus:bg-green-100'
          >
            {t('re_sink.title')}
          </Link>
          <Link
            to='/ziran'
            className='outline-none bg-gray-50 rounded-lg bg-transparent m-5 px-5 py-1 transition pop hover:bg-green-100 focus:bg-green-100'
          >
            {t('ziran.title')}
          </Link>
        </section>
      </article>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
};

export default IndexPage;
