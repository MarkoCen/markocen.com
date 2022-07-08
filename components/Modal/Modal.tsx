import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';

interface Props {
  open: boolean;
  title: string;
  description: string;
  postId: string;
  imageUrl: string;
  imageHeight: number;
  imageWidth: number;
  onClose: () => void;
}

const DynamicMarkdown = dynamic(() => import('../Markdown/Markdown').then(mod => mod.Markdown));

export const Modal = (props: Props) => {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const isHorizontal = props.imageWidth ? props.imageWidth >= props.imageHeight : false;

  return (
    <Transition
      show={props.open}
      enter='transition duration-100 ease-out'
      enterFrom='transform scale-95 opacity-0'
      enterTo='transform scale-100 opacity-100'
      leave='transition duration-75 ease-out'
      leaveFrom='transform scale-100 opacity-100'
      leaveTo='transform scale-95 opacity-0'
    >
      <Dialog initialFocus={closeButtonRef} onClose={props.onClose} className='relative z-50'>
        {/*backdrop*/}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* scrollable container*/}
        <div className='fixed inset-0 flex items-center justify-center p-4 overflow-y-auto'>
          <div className={`flex items-center justify-center ${isHorizontal ? 'md:mt-48' : ''}`}>
            <Dialog.Panel className='mx-auto max-w-screen-lg rounded bg-white dark:bg-zinc-900'>
              <div className={`flex flex-col justify-center items-start ${!isHorizontal ? 'lg:flex-row' : ''}`}>
                <img alt={props.title} className='max-h-90vh opacity-90 rounded-tl rounded-bl' src={props.imageUrl} />
                <div className='p-5 flex flex-col items-start text-left'>
                  <div className='w-full flex justify-between items-center'>
                    <Dialog.Title className='font-bold text-lg  text-gray-900'>{props.title}</Dialog.Title>
                  </div>

                  <div className='mt-4 mb-4 flex-grow'>
                    <Dialog.Description>
                      <DynamicMarkdown markdown={props.description} />
                    </Dialog.Description>
                  </div>

                  <div className='w-full flex items-center justify-end'>
                    <button
                      ref={closeButtonRef}
                      type='button'
                      onClick={props.onClose}
                      className='outline-none rounded-lg bg-gray-100 px-8 py-1 hover:bg-green-100 dark:text-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-600'
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
