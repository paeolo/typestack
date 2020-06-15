import React from 'react';
import styles from './Signin.module.scss';

import { SigninForm } from './SigninForm';
import { Header, Footer } from '@components/Layout';

export const SigninPage = () => {

  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <SigninForm />
      </div>
      <Footer />
    </React.Fragment >
  );
}
