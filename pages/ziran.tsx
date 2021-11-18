import { OverlayProvider } from '@react-aria/overlays';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { ImageCard } from '../components/ImageCard/ImageCard';
import { MasonryLayout } from '../components/MasonryLayout/MasonryLayout';
import { Modal } from '../components/Modal/Modal';
import { TopNav } from '../components/TopNav/TopNav';
import { getAllImagePosts } from '../lib/graphql/queries/image-post.query';
import { ImagePost } from '../models/image-post';
import { base } from '../models/urls';

interface Props {
  posts: ImagePost[];
}

const PageInternal = ({ posts }: Props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [openedPost, setOpenedPost] = React.useState<ImagePost | undefined>(undefined);

  const onCardClick = React.useCallback(
    (postId: string) => {
      const post = posts.find(p => p.id === postId);

      if (post) {
        setModalOpen(true);
        setOpenedPost(post);
      }
    },
    [posts],
  );

  return (
    <>
      <NextSeo
        title={`Ziran 自然 - Marko Cen`}
        canonical={`${base}/ziran`}
        description='Primordial state of all things'
        openGraph={{
          title: `Ziran 自然 - Marko Cen`,
          url: `${base}/ziran`,
          site_name: 'Ziran 自然',
          type: 'website',
          description: 'Primordial state of all things',
          locale: 'en_US',
        }}
      />
      <TopNav />
      <div className='w-screen md:w-12/12 lg:w-10/12 px-2 pt-12 mx-auto'>
        <h1 className='text-3xl font-bold'>Ziran 自然</h1>
        <h2 className='mt-2 mb-10'>
          <i>Primordial</i> state of all things
        </h2>
      </div>
      <div className='w-screen md:w-12/12 lg:w-10/12 px-2 mx-auto'>
        <MasonryLayout>
          {posts.map(post => (
            <ImageCard
              key={post.id}
              id={post.id}
              thumbnail={post.thumbnail}
              title={post.title}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              onClick={onCardClick}
            />
          ))}
        </MasonryLayout>
      </div>
      {isModalOpen && (
        <Modal
          number={openedPost.number}
          title={openedPost.title}
          description={openedPost.description}
          postId={openedPost.id}
          imageUrl={openedPost.thumbnail}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

const ZiranPage = (props: Props) => {
  return (
    <>
      <OverlayProvider>
        <PageInternal {...props} />
      </OverlayProvider>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllImagePosts();

  return {
    props: {
      posts,
    },
  };
};

export default ZiranPage;
