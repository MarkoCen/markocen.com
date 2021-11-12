import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { BlogPost, BlogPostDetail } from '../../models/blog-post';
import { getBlogPostDetail, getAllBlogPosts } from '../../lib/graphql/queries';
import { Markdown } from '../../components/Markdown/Markdown';
import { defaultLabels } from '../../models/label';
import { getPostPath } from '../../models/urls';

interface Props {
  post: BlogPostDetail;
}

const LabelTag = React.memo(({ name }: { name: string }) => <span>{name}</span>);

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

  return (
    <>
      <NextSeo
        title={`${post.title} - Marko Cen`}
        canonical={getPostPath(post.slug, true)}
        description={post.bodyText.slice(0, 150).replace(/\\n+/g, '')}
        openGraph={{
          title: `${post.title} - Marko Cen`,
          url: getPostPath(post.slug, true),
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
          <h2 title={`Last Updated on ${modifiedTime}`}>
            {modifiedTime}
            {displayLabels.map(l => (
              <LabelTag key={l} name={l} />
            ))}
          </h2>
          <Markdown markdown={post.body} />
        </article>
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
    props: { post },
  };
};

export default BlogPostPage;
