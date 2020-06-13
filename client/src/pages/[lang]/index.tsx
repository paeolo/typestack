import { GetServerSideProps } from "next";

import { IndexPage } from "@components/Pages";
import { WithLocale, getLocaleProps } from "@components/I18n";
import { WithAuthentication, getAuthenticationProps } from "@components/Authentication";

const Index = () => {
  return (
    <IndexPage />
  );
}

export default WithLocale(WithAuthentication(Index));

export const getServerSideProps: GetServerSideProps = async context => {

  const lang = context.params.lang as string;
  const localeProps = await getLocaleProps(lang);
  const authenticationProps = await getAuthenticationProps(context.req);
  return {
    props: {
      ...authenticationProps,
      ...localeProps
    }
  }
}
