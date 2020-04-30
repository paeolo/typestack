const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

module.exports = {
  webpack: (config, options) => {
    // See https://github.com/zeit/next.js/issues/5666
    // This is used so NextJS transpiles the openapi folder.
    //
    config.module.rules.forEach((rule) => {
      const containsTs = rule.test && rule.test.toString().includes('ts');
      if (containsTs && rule.use && rule.use.loader === 'next-babel-loader') {
        rule.include.push(path.resolve(__dirname, '../openapi'));
      }
    });
    //...

    return config;
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL
  },
}
