import React from 'react';
import { useTranslation } from 'next-i18next';

enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export const DarkModeSwitch = React.memo(() => {
  const { t } = useTranslation('common');
  const [mode, setMode] = React.useState<Theme | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const savedTheme = window.localStorage.getItem('theme');
      const theme =
        savedTheme === '' || savedTheme === null || savedTheme === undefined
          ? Theme.Light
          : savedTheme === Theme.Dark
          ? savedTheme
          : Theme.Light;

      setDomClass(theme);

      window.localStorage.setItem('theme', theme);
      setMode(theme);
      setTimeout(() => {
        window.document.querySelector('body').classList.remove('opacity-0');
      }, 100);
    }
  }, [setMode]);

  const setDomClass = theme => {
    if (theme === Theme.Light) {
      window.document.querySelector('html').classList.remove(Theme.Dark);
    } else {
      window.document.querySelector('html').classList.add(Theme.Dark);
    }
  };

  const onSwitch = () => {
    const newMode = mode === Theme.Dark ? Theme.Light : Theme.Dark;
    setMode(newMode);

    window.localStorage.setItem('theme', newMode);

    setDomClass(newMode);
  };

  return (
    <>
      <div className='mx-3 opacity-60 hover:opacity-100'>
        <button
          onClick={onSwitch}
          title={mode === Theme.Dark ? t('top_nav.light_theme') : t('top_nav.dark_theme')}
          className='outline-0 bg-transparent m-0 p-0 align-bottom'
        >
          {mode === 'light' && (
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
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              />
            </svg>
          )}
          {mode === 'dark' && (
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
                d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
});

DarkModeSwitch.displayName = 'DarkModeSwitch';
1;
