// ./index.js

const dotenv = require('dotenv');
const express = require('express');
const loopback = require('./server/dist/');
const nextjs = require('./client');
const path = require('path');

const main = async () => {
  process.env.MONOLITHIC = true;
  const dev = process.env.NODE_ENV === 'development';
  const port = process.env.PORT || 3000;

  const api = await loopback.main();
  const client = await nextjs(dev, 'client');

  const server = express();
  server.use('/api', api.requestHandler);
  server.use(express.static('client/static'));
  server.get('*', (req, res) => client.getRequestHandler()(req, res));
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  })
}

if (require.main === module) {
  dotenv.config({ path: path.resolve(__dirname, 'client.env') });
  dotenv.config({ path: path.resolve(__dirname, 'server.env') });
  main()
    .catch(err => {
      console.error('Cannot start the application.', err);
      process.exit(1);
    })
}

