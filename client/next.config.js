const path = require('path');

module.exports = {
  webpack: (config, options) => {
    // See https://github.com/zeit/next.js/issues/5666
    // This is used so NextJS transpiles the openapi folder.
    //
    config.module.rules.forEach((rule) => {
      const containsTs = rule.test && rule.test.toString().includes('ts');
      if (containsTs && rule.use) {
        rule.include.push(path.resolve(__dirname, '../openapi'));
      }
    });
    //...
    return config;
  },
  env: {
    API_URL: process.env.API_URL
  }
}

