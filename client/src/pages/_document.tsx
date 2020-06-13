/* Custom Document
** See https://nextjs.org/docs/advanced-features/custom-document
*/

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { createContainer, InversifyContext } from '../container';

class MainDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const originalRenderPage = context.renderPage;

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => {
          return (
            <InversifyContext.Provider value={createContainer()}>
              <App {...props} />
            </InversifyContext.Provider>
          );
        },
        enhanceComponent: Component => Component
      });

    const initialProps = await Document.getInitialProps(context);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MainDocument
