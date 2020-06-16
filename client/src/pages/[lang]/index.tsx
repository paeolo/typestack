import React from "react";
import { GetServerSideProps } from "next";

import { IndexPage } from "@components/Pages";
import { WithLocale, getLocaleProps } from "@components/I18n";
import { WithAuthentication, getAuthenticationProps } from "@components/Authentication";
import { HtmlHead } from "@components/Core";
import { WithNavbar } from "@components/Navbar";

const Index = () => {
  return (
    <React.Fragment>
      <HtmlHead />
      <WithNavbar>
        <IndexPage />
      </WithNavbar>
    </React.Fragment>
  );
}

export default WithLocale(WithAuthentication(Index));

export const getServerSideProps: GetServerSideProps = async context => {

  const lang = context.params.lang as string;
  const localeProps = await getLocaleProps(lang);
  const authenticationProps = await getAuthenticationProps(context);
  return {
    props: {
      ...authenticationProps,
      ...localeProps
    }
  }
}
