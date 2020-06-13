import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NextLink, { LinkProps } from 'next/link';
import { I18nContext } from './I18nProvider';

export const Link: React.FC<LinkProps> = props => {

  const polyglot = useContext(I18nContext);
  const { as, children, href, ...options } = props;

  if (href.toString().startsWith('/')) {
    return (
      <NextLink
        href={'/[lang]'.concat(href.toString())}
        as={'/'.concat(polyglot.locale().concat((as || href).toString()))}
        children={children}
        {...options}
      />
    );
  }

  return (
    <NextLink
      href={href}
      as={as}
      children={children}
      {...options}
    />
  );
}

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

Link.defaultProps = {
  as: undefined,
};
