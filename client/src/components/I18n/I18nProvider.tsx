import React from 'react';
import PropTypes from 'prop-types';
import Polyglot, { PolyglotOptions } from 'node-polyglot';

import { defaultLocale } from '../../locales';

export const I18nContext = React.createContext(
  new Polyglot({
    locale: defaultLocale,
    phrases: {}
  })
);

export default class I18nProvider extends React.Component<PolyglotOptions> {

  private readonly polyglot: Polyglot;

  constructor(props: PolyglotOptions) {
    super(props);

    this.polyglot = new Polyglot({
      locale: props.locale || defaultLocale,
      phrases: props.phrases || {},
      allowMissing: props.allowMissing,
      onMissingKey: props.onMissingKey,
      interpolation: props.interpolation,
    })
  }

  componentDidUpdate(props: PolyglotOptions) {
    if (props.locale !== this.props.locale) {
      this.polyglot.locale(this.props.locale)
    }

    if (props.phrases !== this.props.phrases) {
      this.polyglot.replace(this.props.phrases)
    }
  }

  static propTypes = {
    locale: PropTypes.string.isRequired,
    allowMissing: PropTypes.bool,
    onMissingKey: PropTypes.func,
    interpolation: PropTypes.shape({
      suffix: PropTypes.string,
      prefix: PropTypes.string,
    }),
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
    allowMissing: false,
    onMissingKey: undefined,
    interpolation: undefined,
  };

  render() {
    const { children } = this.props

    return (
      <I18nContext.Provider value={this.polyglot}>
        {React.Children.only(children)}
      </I18nContext.Provider>
    )
  }
}
