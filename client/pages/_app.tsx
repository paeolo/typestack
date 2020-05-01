/* Entry point
** See https://nextjs.org/docs/advanced-features/custom-app
*/

import { OpenAPI } from "@openapi/.";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

if (publicRuntimeConfig.API_URL !== undefined)
  OpenAPI.options.url = publicRuntimeConfig.API_URL;

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
