import React from 'react';
import styles from './Layout.module.scss';

export const Footer: React.FC = props => {
  return (
    <React.Fragment>
      <div className={styles.footer}>
        {props.children}
      </div>
    </React.Fragment>
  );
}
