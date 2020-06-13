// ./middleware/locale-middleware.js

const { cookieName, defaultLocale, locales } = require('../src/locales');

const localeMiddleware = (request, response, next) => {

  if (request.path !== '/') {
    next();
  }
  else {
    const locale = detectLocale(request);
    response.redirect(307, `/${locale}`);
  }
}

const detectLocale = (request) => {

  if (request.cookies[cookieName] !== undefined) {
    const locale = request.cookies[cookieName];
    if (locales.includes(locale))
      return locale;
  }

  const acceptedLocales = extractLocalesFromHeader(request);
  for (const locale of acceptedLocales) {
    if (locales.includes(locale))
      return locale;
  }
  return defaultLocale;
}

const extractLocalesFromHeader = (request) => {

  const locales = [];
  const acceptLanguage = request.headers['accept-language'];

  if (acceptLanguage) {
    const languages = [];
    const regex = /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi;
    let array;

    do {
      array = regex.exec(acceptLanguage)
      if (array) {
        const language = array[1];
        const weight = array[5] || '1';
        const q = Number(weight);
        if (language && !isNaN(q)) {
          languages.push({ lng: language, q })
        }
      }
    } while (array)

    languages.sort((a, b) => { return b.q - a.q });

    for (let i = 0; i < languages.length; i++) {
      locales.push(languages[i].lng.split('-')[0]);
    }
  }

  return locales;
}

exports.localeMiddleware = localeMiddleware;
