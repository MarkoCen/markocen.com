import React from 'react';
import { GetStaticPropsResult } from 'next';

import { getAllBlogPosts } from '../lib/graphql/queries';
import { BlogPost } from '../models/blog-post';
import { getPostPath } from '../models/urls';

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
      <div className='w-screen md:w-8/12 lg:w-4/12 px-2 py-12 mx-auto'>
        <h1 className='text-3xl font-bold'>RE_Sink</h1>
        <p className='mt-2 mb-10'>A mini blog to share my thoughts and learnings</p>
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
