import React from 'react';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import { useTranslation } from 'next-i18next';

const locales = {
  en: 'English',
  zh: '中文',
};

export const TranslateDropdown = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <Menu className='relative' as='div'>
      <Menu.Button title={t('select_lang')} className='opacity-60 mx-3 hover:opacity-100 align-bottom'>
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
            d='M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129'
          />
        </svg>
      </Menu.Button>
      <Menu.Items className='absolute flex flex-col bg-white' as='ul'>
        {Object.keys(locales).map(locale => (
          <Menu.Item key={locale} className='my-2 cursor-pointer' as='li'>
            {({ active }) => (
              <a
                onClick={() => router.push(router.pathname, undefined, { locale })}
                className={`${active ? 'opacity-100' : 'opacity-70'}`}
              >
                {locales[locale]}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
