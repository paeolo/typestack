/* Custom App
** See https://nextjs.org/docs/advanced-features/custom-app
*/

import 'mobx-react-lite/batchingForReactDom'
import '../assets/sass/main.scss'

import { OpenAPI } from "@openapi/."
import { useStaticRendering } from 'mobx-react-lite'
import getConfig from 'next/config'


const { publicRuntimeConfig } = getConfig();

if (publicRuntimeConfig.API_URL !== undefined)
  OpenAPI.options.url = publicRuntimeConfig.API_URL;

if (typeof window === 'undefined') {
  useStaticRendering(true);
}

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
