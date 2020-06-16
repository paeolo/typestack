/* Custom App
** See https://nextjs.org/docs/advanced-features/custom-app
*/

import '../assets/sass/main.scss';
import 'mobx-react-lite/batchingForReactDom';

import ms from 'ms';
import { OpenAPI, obtain, InfoController } from "@openapi/.";
import { useStaticRendering } from 'mobx-react-lite';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useInjection } from '../hooks';
import { UserStore } from '../stores';
import { StoresBindings } from '../container';

function AppInit() {
  if (process.env.API_URL !== undefined) {
    OpenAPI.options.url = process.env.API_URL;
  }

  if (typeof window === 'undefined') {
    useStaticRendering(true);
  }
}

AppInit();

export default ({ Component, pageProps }: AppProps) => {

  const userStore = useInjection<UserStore>(StoresBindings.USER);
  useEffect(() => { initInterval() }, []);

  async function initInterval() {

    const info = await obtain(InfoController.info());
    const interval = ms(info.AUTH_ACCESS_EXPIRES);
    setInterval(
      userStore.autologin,
      interval
    );
  }

  return <Component {...pageProps} />
}
