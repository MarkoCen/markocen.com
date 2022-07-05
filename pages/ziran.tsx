import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { ImageCard } from '../components/ImageCard/ImageCard';
import { MasonryLayout } from '../components/MasonryLayout/MasonryLayout';
import { Modal } from '../components/Modal/Modal';
import { getAllImagePosts } from '../lib/graphql/queries/image-post.query';
import { ImagePost } from '../models/image-post';
import { base } from '../models/urls';
import nextI18nNextConfig from '../next-i18next.config.js';

interface Props {
  posts: ImagePost[];
}

const PageInternal = ({ posts }: Props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [openedPost, setOpenedPost] = React.useState<ImagePost | undefined>(undefined);

  const { t, i18n } = useTranslation('common');

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
        title={`${t('ziran.title')} - Marko Cen`}
        canonical={`${base}/ziran`}
        description={t('ziran.intro')}
        openGraph={{
          title: `${t('ziran.title')} - Marko Cen`,
          url: `${base}/ziran`,
          site_name: t('ziran.title'),
          type: 'website',
          description: t('ziran.intro'),
          locale: i18n.language,
        }}
      />
      <div className='w-full lg:w-10/12'>
        <h1 className='text-3xl font-bold'>{t('ziran.title')}</h1>
        <h2 className='mt-2 mb-10'>{t('ziran.intro')}</h2>
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
      <Modal
        open={isModalOpen}
        title={openedPost?.title}
        description={openedPost?.description}
        postId={openedPost?.id}
        imageUrl={openedPost?.thumbnail}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

const ZiranPage = (props: Props) => {
  return (
    <>
      <PageInternal {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const posts = await getAllImagePosts();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nNextConfig)),
      posts,
    },
  };
};

export default ZiranPage;
