// ./client/index.js

const dotenv = require('dotenv');
const express = require('express');
const next = require('next');
const path = require('path');

const { createProxyMiddleware } = require('http-proxy-middleware');

const application = async (dev, directory) => {
  const nextjs = next({ dev: dev, dir: directory });
  await nextjs.prepare();
  return nextjs;
};

const main = async () => {
  const port = process.env.PORT || 3000;
  const dev = process.env.NODE_ENV === 'development';

  const nextjs = await application(dev, __dirname);
  const handler = nextjs.getRequestHandler();

  const server = express();
  if (dev) {
    const api = {
      host: process.env.API_HOST,
      port: process.env.API_PORT
    };
    server.use(
      '/api',
      createProxyMiddleware({
        target: `http://${api.host}:${api.port}`,
        pathRewrite: { '^/api': '' }
      })
    );
  }
  server.use(express.static(`./static`));
  server.get('*', (req, res) => handler(req, res));
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  })
}

module.exports = application;

if (require.main === module) {
  dotenv.config({ path: path.resolve(__dirname, '../config.env') });
  main()
    .catch(err => {
      console.error('Cannot start the application.', err);
      process.exit(1);
    })
}
