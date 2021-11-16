import { OverlayProvider } from '@react-aria/overlays';
import { GetStaticProps } from 'next';
import React from 'react';

import { ImageCard } from '../components/ImageCard/ImageCard';
import { MasonryLayout } from '../components/MasonryLayout/MasonryLayout';
import { Modal } from '../components/Modal/Modal';
import { TopNav } from '../components/TopNav/TopNav';
import { getAllImagePosts } from '../lib/graphql/queries/image-post.query';
import { ImagePost } from '../models/image-post';

interface Props {
  posts: ImagePost[];
}

const PageInternal = ({ posts }: Props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <TopNav />
      <div className='w-screen md:w-12/12 lg:w-10/12 px-2 pt-12 mx-auto'>
        <h1 className='text-3xl font-bold'>Ziran</h1>
        <h2 className='mt-2 mb-10'>
          <i>Primordial</i> state of all things
        </h2>
      </div>
      <div className='w-screen md:w-12/12 lg:w-10/12 px-2 mx-auto'>
        <MasonryLayout>
          {posts.map(post => (
            <ImageCard
              key={post.id}
              thumbnail={post.thumbnail}
              title={post.title}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          ))}
        </MasonryLayout>
      </div>
      {isModalOpen && <Modal isOpen title='test' onClose={() => setModalOpen(false)} />}
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
