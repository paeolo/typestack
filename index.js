// ./index.js

const express = require('express');
const nextjs = require('./client');
const loopback = require('./server/dist/');

const main = async () => {
  const dev = process.env.NODE_ENV === 'development';
  const port = process.env.PORT || 3000;

  await loopback.main();
  const client = await nextjs(dev, 'client');

  const server = express();
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
