// ./server/index.js

const application = require('./dist');
const dotenv = require('dotenv');
const path = require('path');

module.exports = application;

if (require.main === module) {
  dotenv.config({ path: path.resolve(__dirname, '../server.env') });
  application.main().catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
