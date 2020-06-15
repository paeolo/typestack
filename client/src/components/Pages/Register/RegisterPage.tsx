import React from 'react';
import styles from './Register.module.scss';

import { RegisterForm } from './RegisterForm';
import { Header, Footer } from '@components/Layout';

export const RegisterPage = () => {

  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <RegisterForm />
      </div>
      <Footer />
    </React.Fragment >
  );
}
