import React from 'react';
import { useLink } from '@react-aria/link';
import { default as NextLink } from 'next/link';

import styles from './Link.module.css';

interface Prop {
  to: string;
  title?: string;
  locale?: string;
  className?: string;
  target?: HTMLAnchorElement['target'];
  rel?: HTMLAnchorElement['rel'];
  disabled?: boolean;
  children?: React.ReactNode;
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
    <NextLink href={props.to} target={props.target} rel={props.rel} locale={props.locale}>
      <a
        {...linkProps}
        title={props.title}
        href={props.to}
        target={props.target}
        rel={props.rel}
        className={`${props.className ? props.className : styles.link}`}
      >
        {props.children}
      </a>
    </NextLink>
  );
};

export { Link };
