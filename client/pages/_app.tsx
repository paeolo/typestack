/* Entry point
** See https://nextjs.org/docs/advanced-features/custom-app
*/

import { OpenAPI } from "@openapi/.";

OpenAPI.options.url = 'http://localhost:3000/api';

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
