import React from 'react';
import Masonry from 'react-masonry-css';

import styles from './MasonryLayout.module.scss';

export const MasonryLayout: React.FC = ({ children }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 3,
    500: 2,
  };

  return (
    <Masonry breakpointCols={breakpointColumnsObj} className={styles.masonry} columnClassName={styles.masonryCol}>
      {children}
    </Masonry>
  );
};
