import React from 'react';
import { useLink } from 'react-aria';

import styles from './Link.module.css';

interface Prop {
  to: string;
  target?: HTMLAnchorElement['target'];
  rel?: HTMLAnchorElement['rel'];
  disabled?: boolean;
  children: React.ReactNode
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
    <a {...linkProps} href={props.to} target={props.target} rel={props.rel} className={styles.link}>
      {props.children}
    </a>
  );
};

export { Link };
