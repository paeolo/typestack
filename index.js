// ./index.js

const express = require('express');

const clientApp = require('./client');
const apiApp = require('./server/dist/');

const main = async ()  => {
  const dev = process.env.NODE_ENV === 'development';
  const port = process.env.PORT || 3000;

  let client = await clientApp(dev,'client');
  const api = await apiApp.main();
    
  // Express
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
  main()
  .catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  })
}

