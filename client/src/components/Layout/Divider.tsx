import React from 'react';
import styles from './Layout.module.scss';

export const Divider = () => {
  return (
    <React.Fragment>
      <hr className={styles.divider} />
    </React.Fragment>
  )
}
