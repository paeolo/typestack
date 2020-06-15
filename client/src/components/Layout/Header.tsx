import React from 'react';
import styles from './Layout.module.scss';

export const Header: React.FC = props => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        {props.children}
      </div>
    </React.Fragment>
  );
}
