import Head from 'next/head';
import { useTranslate } from '../../hooks';

interface HtmlHeadPros {
  title?: string;
  description?: string;
}

export const HtmlHead = (props: HtmlHeadPros) => {

  const { locale, t } = useTranslate();

  return (
    <Head>
      <title>{props.title || t('header.title')}</title>
      <meta name='description' content={props.description || t('header.description')} />
      <meta httpEquiv="content-language" content={locale} />
    </Head>
  );
}

export default HtmlHead;
