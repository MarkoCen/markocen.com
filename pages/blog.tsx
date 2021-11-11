import { GetStaticPropsResult } from 'next';
import React from 'react';
import { getBlogPosts } from '../lib/graphql/queries';
import { BlogPost } from '../models/blog-post';

interface Props {
  posts: BlogPost[];
}

const BlogPage = ({ posts }: Props) => {
  return (
    <>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  let posts: BlogPost[] = [];
  let cursor = '';

  const res = await getBlogPosts();

  cursor = res.cursor;
  posts = [...posts, ...res.posts];

  while (cursor) {
    const { posts: nextPosts, cursor: nextCursor } = await getBlogPosts(cursor);
    cursor = nextCursor;
    posts = [...posts, ...nextPosts];
  }

  return {
    props: {
      posts,
    },
  };
}

export default BlogPage;
