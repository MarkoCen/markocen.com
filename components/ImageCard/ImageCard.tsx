import React from 'react';

interface Props {
  title: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export const ImageCard = React.memo(({ thumbnail, title, createdAt }: Props) => {
  return (
    <a href='#' className='group relative bg-gray-100 rounded-lg block'>
      <div className='w-full aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
        <img src={thumbnail} className='w-full h-full object-center object-cover opacity-80' />
      </div>
      <h3 className='mt-4 text-sm text-gray-700 whitespace-pre-wrap'>{title}</h3>
      <p className='mt-1 text-lg font-medium text-gray-900'>
        {Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short', year: 'numeric' }).format(
          new Date(createdAt),
        )}
      </p>
    </a>
  );
});

ImageCard.displayName = 'ImageCard';
