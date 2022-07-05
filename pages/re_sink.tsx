import React from 'react';
import { GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { BlogPost } from '../models/blog-post';
import { base, getPostPath } from '../models/urls';
import { getAllBlogPosts } from '../lib/graphql/queries/blog-post.query';
import nextI18NextConfig from '../next-i18next.config.js';

interface Props {
  posts: BlogPost[];
}

const BlogPostCard = React.memo((post: BlogPost) => (
  <a
    href={getPostPath(post.slug)}
    className='outline-none group block rounded-xl bg-gray-50 transition duration-200 pop group-hover:bg-green-100 focus:bg-green-100'
  >
    <div className='px-6 py-6 mt-6 rounded-xl transition duration-200 pop group-hover:bg-green-100'>
      <h2 className='text-lg'>{post.title}</h2>
      <p className='text-sm italic text-gray-400'>
        {Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(
          new Date(post.createdAt),
        )}
      </p>
    </div>
  </a>
));

BlogPostCard.displayName = 'BlogPostCard';

const BlogPage = ({ posts }: Props) => {
  const { t, i18n } = useTranslation('common');

  return (
    <>
      <NextSeo
        title={`${t('re_sink.title')} - Marko Cen`}
        canonical={`${base}/re_sink`}
        description={t('re_sink.intro')}
        openGraph={{
          title: `${t('re_sink.title')} - Marko Cen`,
          url: `${base}/re_sink`,
          site_name: `${t('re_sink.title')} - Marko Cen`,
          type: 'website',
          description: t('re_sink.intro'),
          locale: i18n.language,
        }}
      />
      <div className='w-full md:w-12/12 lg:w-6/12'>
        <h1 className='text-3xl font-bold'>{t('re_sink.title')}</h1>
        <h2 className='mt-2 mb-10'>{t('re_sink.intro')}</h2>
        {posts.map(post => (
          <BlogPostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps({ locale }): Promise<GetStaticPropsResult<Props>> {
  const posts: BlogPost[] = await getAllBlogPosts();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      posts,
    },
  };
}

export default BlogPage;
