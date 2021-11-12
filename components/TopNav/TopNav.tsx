import React from 'react';

import { Link } from '../Link/Link';

export const TopNav = React.memo(() => {
  return (
    <header className='hidden md:flex px-4 md:px-20 py-3 bg-white md:bg-transparent w-screen justify-end items-center fixed'>
      <Link to='/'>Home</Link>
    </header>
  );
});

TopNav.displayName = 'TopNav';
