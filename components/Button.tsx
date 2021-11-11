import React from 'react';
import { useButton } from 'react-aria';

const Link: React.FC<HTMLButtonElement> = props => {
  const ref = React.useRef();
  const { buttonProps } = useButton(
    {
      isDisabled: !!props.disabled,
      elementType: 'button',
    },
    ref,
  );

  return (
    <button
      {...buttonProps}
      {...props}
      className='rounded-lg ring-green-200 ring-4 px-8 py-1 hover:bg-green-200 active:bg-green-400 outline-none'
    >
      {props.children}
    </button>
  );
};

export { Link };
