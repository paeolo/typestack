import React from 'react';

import styles from './Navbar.module.scss';
import Navbar from './Navbar';

export const WithNavbar: React.FC = props => {
  return (
    <div className={styles.paddingTop}>
      <Navbar />
      {props.children}
    </div>
  )
}
