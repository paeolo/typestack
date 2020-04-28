// ./client/index.js

const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const YAML = require('yaml');
const path = require('path');
const fs = require('fs');

const application = async (dev = false, dir = '.') =>  {
  const app = next({ dev, dir });
  await app.prepare();
  return app;
};

const main = async ()  => {
  const dev = process.env.NODE_ENV === 'development';
  const port = process.env.PORT || 3000;

  let config = YAML.parse(
    fs.readFileSync(path.join(__dirname, '../config.yaml')).toString()
  );
  let api = {
    host: config.rest.host,
    port: config.rest.port
  };
  
  // NextJS
  let clientApp = await application(dev, __dirname);
  const handle = clientApp.getRequestHandler();
    
  // Express
  const server = express();
  server.use(
    '/api',
    createProxyMiddleware({
      target: `http://${api.host}:${api.port}`,
      ws: true,
      pathRewrite: {'^/api' : ''}
    })
  );
  server.use(express.static(`./static`));
  server.get('*', (req, res) => handle(req, res));
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  })
}

module.exports = application;

if (require.main === module) {
  main()
  .catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  })
}
