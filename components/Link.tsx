import React from 'react';
import { useLink } from 'react-aria';

interface Prop {
  to: string;
  target?: HTMLAnchorElement['target'];
  rel?: HTMLAnchorElement['rel'];
  disabled?: boolean;
}

const Link: React.FC<Prop> = props => {
  const ref = React.useRef();
  const { linkProps } = useLink(
    {
      isDisabled: !!props.disabled,
      elementType: 'a',
    },
    ref,
  );

  return (
    <a {...linkProps} href={props.to} target={props.target} rel={props.rel} className='text-base'>
      {props.children}
    </a>
  );
};

export { Link };
