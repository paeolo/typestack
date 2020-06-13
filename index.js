// ./index.js

const dotenv = require('dotenv');
const express = require('express');
const createApi = require('./server/dist/');
const createClient = require('./client');
const path = require('path');

const main = async () => {
  process.env.MONOLITHIC = true;
  const port = process.env.PORT || 3000;

  const api = await createApi.main();
  const client = await createClient('client', false, false);

  const server = express();
  server.use('/api', api.requestHandler);
  server.get('*', (req, res) => client(req, res));
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
