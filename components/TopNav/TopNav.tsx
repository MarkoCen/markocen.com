import React from 'react';
import { useRouter } from 'next/router';

import { Link } from '../Link/Link';
import { TranslateDropdown } from '../TranslateDropdown/TranslateDropdown';
import { DarkModeSwitch } from '../DarkModeSwitch/DarkModeSwitch';

const ActionIcon: React.FC<{ children: React.ReactNode; to: string; title: string }> = ({ children, to, title }) => {
  return (
    <div className='mx-3'>
      <Link to={to} title={title} className='opacity-60 hover:opacity-100 flex justify-center items-center'>
        {children}
      </Link>
    </div>
  );
};

const ReSinkIcon = () => (
  <ActionIcon to='/re_sink' title='Re_Sink'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
      />
    </svg>
  </ActionIcon>
);

const CameraIcon = () => (
  <ActionIcon to='/ziran' title='Ziran 自然'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
      />
      <path strokeLinecap='round' strokeLinejoin='round' d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
    </svg>
  </ActionIcon>
);

export const TopNav = React.memo(() => {
  const { pathname } = useRouter();

  const actions = React.useMemo<{
    showHomeLink: boolean;
    showI18n: boolean;
    showBlogLink: boolean;
    showShowcaseLink: boolean;
    showGalleryLink: boolean;
  }>(() => {
    return {
      showHomeLink: pathname !== '/',
      showI18n: !pathname.startsWith('/p'),
      showBlogLink: pathname !== '/',
      showShowcaseLink: false,
      showGalleryLink: pathname !== '/',
    };
  }, [pathname]);

  return (
    <header className='flex px-4 md:px-8 py-3 bg-white dark:bg-zinc-900 transition-colors duration-200 ease-out w-screen justify-between items-center fixed'>
      <div>
        {actions.showHomeLink && (
          <Link to='/' className='rounded-full w-12'>
            <img src='/avatar.jpg' alt={'Home'} className='rounded-full w-12 opacity-60 hover:opacity-100' />
          </Link>
        )}
      </div>
      <div className='flex items-center justify-center'>
        {actions.showI18n && <TranslateDropdown />}
        {actions.showBlogLink && <ReSinkIcon />}
        {actions.showGalleryLink && <CameraIcon />}
        <DarkModeSwitch />
      </div>
    </header>
  );
});

TopNav.displayName = 'TopNav';
