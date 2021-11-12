import React from 'react';
import { BlogPostDetail } from '../../models/blog-post';
import { GetServerSidePropsContext, GetStaticPropsResult } from 'next';
import { getBlogPostDetail } from '../../lib/graphql/queries';

interface Props {
  post: BlogPostDetail;
}

const BlogPostPage = ({ post }: Props) => {
  return <>{post.body}</>;
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> {
  const [_, number] = (context.query.slug as string).split('__');

  const post = await getBlogPostDetail(Number(number));
  return {
    props: { post },
  };
}

export default BlogPostPage;
