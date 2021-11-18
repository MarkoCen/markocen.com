import React from 'react';
import { GetStaticPropsResult } from 'next';
import { NextSeo } from 'next-seo';

import { BlogPost } from '../models/blog-post';
import { base, getPostPath } from '../models/urls';
import { getAllBlogPosts } from '../lib/graphql/queries/blog-post.query';
import { TopNav } from '../components/TopNav/TopNav';

interface Props {
  posts: BlogPost[];
}

const BlogPostCard = React.memo((post: BlogPost) => (
  <a href={getPostPath(post.slug)} className='group'>
    <div className='px-6 py-6 rounded-xl mt-6 bg-gray-50 transition duration-200 pop group-hover:bg-green-100'>
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
  return (
    <>
      <NextSeo
        title={`RE_Sink - Marko Cen`}
        canonical={`${base}/re_sink`}
        description='A mini blog to share my thoughts and learnings'
        openGraph={{
          title: `RE_Sink - Marko Cen`,
          url: `${base}/re_sink`,
          site_name: 'RE_Sink - Marko Cen',
          type: 'website',
          description: 'A mini blog to share my thoughts and learnings',
          locale: 'en_US',
        }}
      />
      <TopNav />
      <div className='w-screen md:w-8/12 lg:w-4/12 px-2 py-12 mx-auto'>
        <h1 className='text-3xl font-bold'>RE_Sink</h1>
        <h2 className='mt-2 mb-10'>A mini blog to share my thoughts and learnings</h2>
        {posts.map(post => (
          <BlogPostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const posts: BlogPost[] = await getAllBlogPosts();

  return {
    props: {
      posts,
    },
  };
}

export default BlogPage;
