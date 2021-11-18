import React from 'react';

import { Link } from '../components/Link/Link';

const IndexPage = () => {
  const year = React.useMemo<number>(() => {
    return new Date().getFullYear() - 2013;
  }, []);

  return (
    <>
      <article className='w-screen flex flex-col justify-center items-center pt-16 px-5'>
        <section>
          <img alt="Marko's Avatar" src='/avatar.jpg' className='rounded-full' />
        </section>
        <h1 className='text-4xl font-bold mt-5'>Hi This is Marko</h1>
        <section className='flex flex-col justify-center items-start w-100 md:w-8/12 lg:w-4/12 mt-2'>
          <p className='text-lg w-full mb-2 text-center'>
            I am a full-stack software engineer with over{' '}
            <Link to='https://www.linkedin.com/in/markocen/' target='_blank'>
              {year} Years
            </Link>{' '}
            experiences, currently living in Boston Massachusetts with my wife.
          </p>
          <p className='text-lg w-full mb-2 text-center'>
            I{' '}
            <Link to='https://github.com/markocen' target='_blank'>
              LOVE coding
            </Link>{' '}
            and{' '}
            <Link to='https://stackoverflow.com/users/5454390/markocen?tab=profile' target='_blank'>
              help the community
            </Link>
            !
          </p>
        </section>
        <section className='flex justify-center items-center w-100 md:w-8/12 lg:w-4/12 mt-12'>
          <a
            href='/re_sink'
            className='outline-none border-2 border-yellow-100 rounded-lg bg-transparent m-5 px-5 py-1 transition pop hover:bg-yellow-100 hover:border-yellow-100'
          >
            RE_Sink
          </a>
          <a
            href='/ziran'
            className='outline-none border-2 border-yellow-100 rounded-lg bg-transparent m-5 px-5 py-1 transition pop hover:bg-yellow-100 hover:border-yellow-100'
          >
            Ziran 自然
          </a>
        </section>
      </article>
    </>
  );
};

export default IndexPage;
