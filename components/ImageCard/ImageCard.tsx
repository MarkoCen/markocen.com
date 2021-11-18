import React, { CSSProperties } from 'react';
import { useButton } from 'react-aria';

interface Props {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  onClick(id: string): void;
}

export const ImageCard = React.memo(({ id, thumbnail, title, onClick }: Props) => {
  const [showImage, setShowImage] = React.useState(false);

  const imageStyles: CSSProperties = showImage ? {} : { width: 0, height: 0, zIndex: -1, opacity: 0 };

  const ref = React.useRef();

  const { buttonProps } = useButton(
    {
      isDisabled: false,
      elementType: 'div',
    },
    ref,
  );

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowImage(false);
      const img = new Image();
      img.onload = () => {
        setShowImage(true);
      };
      img.src = thumbnail;
    }
  }, [thumbnail]);

  return (
    <div
      {...buttonProps}
      className='relative group bg-gray-300 rounded-lg w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-16 xl:aspect-h-9 cursor-pointer'
      onClick={() => onClick(id)}
    >
      <img
        src={thumbnail}
        className='absolute w-full h-full object-center object-cover opacity-75 transition-opacity pop'
        style={imageStyles}
      />
      <div className='bg-gradient-to-b from-transparent to-gray-800 flex items-end opacity-0 transform transition pop translate-y-5 px-4 py-6 hover:opacity-100 hover:translate-y-0'>
        <h3 className='font-bold text-2xl text-white'>{title}</h3>
      </div>
    </div>
  );
});

ImageCard.displayName = 'ImageCard';
