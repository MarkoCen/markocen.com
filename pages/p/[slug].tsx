import React from 'react';
import { BlogPostDetail } from '../../models/blog-post';
import { GetServerSidePropsContext, GetStaticPropsResult } from 'next';
import { getBlogPostDetail } from '../../lib/graphql/queries';
import { Markdown } from '../../components/Markdown/Markdown';
import { NextSeo } from 'next-seo';

interface Props {
  post: BlogPostDetail;
}

const BlogPostPage = ({ post }: Props) => {
  return (
    <>
      <NextSeo
        title={`${post.title} - Marko Cen`}
        canonical={`https://www.markocen.com/p/${post.slug}`}
        description={post.bodyText.slice(0, 150).replace(/\\n+/g, '')}
        openGraph={{
          title: `${post.title} - Marko Cen`,
          url: `https://www.markocen.com/p/${post.slug}`,
          site_name: 'RE_Sink by Marko',
          type: 'article',
          description: post.bodyText.slice(0, 150).replace(/\\n+/g, ''),
          locale: 'en_US',
          article: {
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            authors: ['Marko Cen'],
            tags: post.labels.map(label => label.name),
          },
        }}
      />
      <div className='w-screen md:w-8/12 lg:w-4/12 px-2 py-12 mx-auto'>
        <article>
          <h1 className='text-3xl font-bold mb-5'>{post.title}</h1>
          <Markdown markdown={post.body} />
        </article>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> {
  const [_, number] = (context.query.slug as string).split('__');

  const post = await getBlogPostDetail(Number(number));

  return {
    props: { post },
  };
}

export default BlogPostPage;
