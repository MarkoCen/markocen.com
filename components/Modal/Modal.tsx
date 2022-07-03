import React from 'react';
import { FocusScope, OverlayContainer, useButton, useDialog, useModal, useOverlay, usePreventScroll } from 'react-aria';
import dynamic from 'next/dynamic';

interface Props {
  number: number;
  title: string;
  description: string;
  postId: string;
  imageUrl: string;
  onClose: () => void;
}

const DynamicMarkdown = dynamic(() => import('../Markdown/Markdown').then(mod => mod.Markdown));

export const Modal = (props: Props) => {
  const closeButtonRef = React.useRef();
  const { onClose } = props;

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => onClose(),
      'aria-label': 'Close Dialog',
    },
    closeButtonRef,
  );

  const ref = React.useRef();
  const { overlayProps, underlayProps } = useOverlay(
    {
      isDismissable: true,
      isOpen: true,
      onClose,
      isKeyboardDismissDisabled: false,
      shouldCloseOnBlur: false,
    },
    ref,
  );

  usePreventScroll();
  const { modalProps } = useModal();

  const { dialogProps, titleProps } = useDialog(
    {
      id: 'ziran-modal',
      role: 'dialog',
    },
    ref,
  );

  React.useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keyup', eventHandler);

    return () => {
      window.removeEventListener('keyup', eventHandler);
    };
  }, [onClose]);

  return (
    <OverlayContainer>
      <div className='fixed z-10 inset-0 overflow-y-auto' {...underlayProps}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

          <FocusScope contain>
            <div
              {...overlayProps}
              {...dialogProps}
              {...modalProps}
              ref={ref}
              className='outline-none inline-block bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-lg'
            >
              <div className='bg-white'>
                <div className='flex flex-col justify-center items-start lg:flex-row'>
                  <img alt={props.title} className='max-h-90vh opacity-90' src={props.imageUrl} />
                  <div className='p-5 flex flex-col items-start text-left'>
                    <div className='w-full flex justify-between items-center'>
                      <h3 className='font-bold text-lg  text-gray-900' id='modal-title' {...titleProps}>
                        {props.title}
                      </h3>
                    </div>

                    <div className='mt-4 mb-4 flex-grow'>
                      <DynamicMarkdown markdown={props.description} />
                    </div>

                    <div className='w-full flex items-center justify-end'>
                      <button
                        {...closeButtonProps}
                        className='outline-none border-2 rounded-lg border-yellow-100 text-gray-500 px-8 py-1 hover:bg-yellow-100'
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FocusScope>
        </div>
      </div>
    </OverlayContainer>
  );
};
