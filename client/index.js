// ./client/index.js

const dotenv = require('dotenv');
const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');

const cookieParser = require('cookie-parser');
const sslRedirect = require('heroku-ssl-redirect');
const { localeMiddleware } = require('./middleware/locale-middleware');
const { removeTrailingSlashes } = require('./middleware/trailing-slashes');
const { createProxyMiddleware } = require('http-proxy-middleware');

const checkEnvironment = (envRequired) => {
  for (let key of envRequired) {
    if (process.env[key] === undefined)
      throw new Error(`Environment variable ${key} is undefined`);
  }
};

const createServer = async (directory, proxyApi, listenOnStart) => {

  checkEnvironment([
    'API_URL',
  ]);

  const dev = process.env.NODE_ENV === 'development';
  const port = process.env.PORT || 3000;

  const nextServer = next({ dev: dev, dir: directory });
  await nextServer.prepare();
  const handler = nextServer.getRequestHandler();

  const server = express();
  if (process.env.HTTPS_REDIRECT) {
    server.use(sslRedirect());
  }
  if (proxyApi) {
    const envConfig = dotenv.parse(fs.readFileSync(
      path.resolve(__dirname, '../server.env'))
    );
    const api = {
      host: envConfig.HOST,
      port: envConfig.PORT
    };
    server.use(
      '/api',
      createProxyMiddleware({
        target: `http://${api.host}:${api.port}`,
        pathRewrite: { '^/api': '' }
      })
    );
  }
  server.use(cookieParser());
  server.use(localeMiddleware);
  server.use(removeTrailingSlashes);
  server.get('*', (req, res) => handler(req, res));
  if (listenOnStart) {
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    })
  }
  return server;
}

module.exports = createServer;

if (require.main === module) {
  dotenv.config({ path: path.resolve(__dirname, '../client.env') });
  const proxyApi = process.env.NODE_ENV === 'development';

  createServer(__dirname, proxyApi, true)
    .catch(err => {
      console.error('Cannot start the application.', err);
      process.exit(1);
    })
}
