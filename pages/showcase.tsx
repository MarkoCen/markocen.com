import { GetStaticPropsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import nextI18NextConfig from '../next-i18next.config';
import { base } from '../models/urls';
import { Link } from '../components/Link/Link';

interface ShowcaseCardProps {
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  title: string;
  description: string;
  linkTo: string;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = React.memo(props => {
  return (
    <>
      <div className='w-full flex flex-col md:flex-row justify-center items-center group mb-24'>
        <div className='w-full text-center md:w-1/2 lg:w-1/3 px-6 md:px-12 py-3 opacity-80 group-hover:opacity-100'>
          <Image src={props.imgSrc} width={props.imgWidth} height={props.imgHeight} />
        </div>
        <div className='w-full md:w-1/2 lg:w-2/3 px-6 md:px-12 py-3 md:border-l-2'>
          <h2 className='text-2xl md:text-3xl mb-4 flex items-center'>
            {props.title}
            <Link to={props.linkTo} target='_blank' rel='nofollow' className='opacity-60 group-hover:opacity-100 ml-2'>
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
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </Link>
          </h2>
          <p className='text-lg'>{props.description}</p>
        </div>
      </div>
    </>
  );
});

ShowcaseCard.displayName = 'ShowcaseCard';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ShowcasePage = (_: Props) => {
  const { t, i18n } = useTranslation('common');

  return (
    <>
      <NextSeo
        title={`${t('showcase.title')} - Marko Cen`}
        canonical={`${base}/showcase`}
        description={t('showcase.intro')}
        openGraph={{
          title: `${t('showcase.title')} - Marko Cen`,
          url: `${base}/showcase`,
          site_name: `${t('showcase.title')} - Marko Cen`,
          type: 'website',
          description: t('showcase.intro'),
          locale: i18n.language,
        }}
      />
      <div className='container mx-auto columns-1 w-full md:w-1/3 lg:w-1/2'>
        <ShowcaseCard
          imgSrc='/bubble_nation_logo.png'
          imgWidth={128}
          imgHeight={128}
          title={t('showcase.bubble_nation.name')}
          description={t('showcase.bubble_nation.desc')}
          linkTo='https://bubblenation.us/order-online'
        />
        <ShowcaseCard
          imgSrc='/345tool_logo.png'
          imgWidth={128}
          imgHeight={128}
          title={t('showcase.345tool.name')}
          description={t('showcase.345tool.desc')}
          linkTo='https://345tool.com/'
        />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }): Promise<GetStaticPropsResult<Props>> {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default ShowcasePage;
