/* Entry point
** See https://nextjs.org/docs/advanced-features/custom-app
*/

import { OpenAPI } from "@openapi/.";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

OpenAPI.options.url = publicRuntimeConfig.apiURL;

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
