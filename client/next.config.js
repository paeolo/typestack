const path = require('path')

module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['@openapi'] = path.resolve(__dirname, '../openapi/dist/')
    return config
  },
}

