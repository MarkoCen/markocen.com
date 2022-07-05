import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { BlogPost, BlogPostDetail } from '../../models/blog-post';
import { Markdown } from '../../components/Markdown/Markdown';
import { defaultLabels } from '../../models/label';
import { getPostPath } from '../../models/urls';
import { getAllBlogPosts, getBlogPostDetail } from '../../lib/graphql/queries/blog-post.query';

interface Props {
  post: BlogPostDetail;
}

const LabelTag = React.memo(({ name }: { name: string }) => (
  <span className='bg-green-100 px-3 py-1 rounded-full text-xs'>{name}</span>
));

LabelTag.displayName = 'LabelTag';

const BlogPostPage = ({ post }: Props) => {
  const modifiedTime = React.useMemo<string>(() => {
    const postedAt = Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short', year: 'numeric' }).format(
      new Date(post.createdAt),
    );
    const modifiedAt =
      post.updatedAt && new Date(post.updatedAt) >= new Date(post.createdAt)
        ? Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short', year: 'numeric' }).format(
            new Date(post.createdAt),
          )
        : undefined;

    return modifiedAt || postedAt;
  }, [post.createdAt, post.updatedAt]);

  const displayLabels = React.useMemo<string[]>(() => {
    return post.labels.filter(label => defaultLabels.indexOf(label.name) <= 0).map(label => label.name);
  }, [post.labels]);

  const trimBodyText = (text: string) => text.slice(0, 150).replace(/\\n+/g, '');

  return (
    <>
      <NextSeo
        title={`${post.title} - Marko Cen`}
        canonical={getPostPath(post.slug, true)}
        description={trimBodyText(post.bodyText)}
        openGraph={{
          title: `${post.title} - Marko Cen`,
          url: getPostPath(post.slug, true),
          site_name: 'RE_Sink by Marko',
          type: 'article',
          description: trimBodyText(post.bodyText),
          locale: 'en_US',
          article: {
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            authors: ['Marko Cen'],
            tags: post.labels.map(label => label.name),
          },
        }}
      />
      <div className='w-full md:w-8/12 lg:w-6/12 pb-48'>
        <article>
          <h1 className='text-3xl font-bold mb-0'>{post.title}</h1>
          <h2 className='mt-0 mb-5 flex justify-start items-center' title={`Last Updated on ${modifiedTime}`}>
            <span className='flex justify-center items-center text-gray-400 text-sm mr-1'>Marko</span>
            <span className='text-gray-400 text-sm mr-2'>- {modifiedTime}</span>
          </h2>
          <Markdown markdown={post.body} />
        </article>

        {displayLabels && displayLabels.length > 0 && (
          <div>
            <span className='font-bold'>Tags: </span>
            {displayLabels.map(l => (
              <LabelTag key={l} name={l} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts: BlogPost[] = await getAllBlogPosts();

  return {
    paths: posts.map(p => getPostPath(p.slug)),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async context => {
  const [_, number] = context.params.slug.split('__');

  const post = await getBlogPostDetail(Number(number));

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      post,
    },
  };
};

export default BlogPostPage;
