# Typestack
A full-stack template based on NextJS and Loopback 4.

## What's inside?
- Loopback 4 (https://loopback.io/doc/en/lb4/)
- NextJS (https://nextjs.org/)
- Polyglot (https://airbnb.io/polyglot.js/)
- JWT (https://fr.wikipedia.org/wiki/JSON_Web_Token)
- TypeORM (https://typeorm.io/#/)
- Bulma CSS (https://bulma.io/)
- Winston (https://github.com/winstonjs/winston)
- Codegen (Custom)


## Dependencies
- nodeJS
- yarn
- postgreSQL

## Get started
* cp misc/{client,server}.env .
* yarn install && yarn build && yarn dev
* Take a coffee and code.

## Configuration
You need to provide the following environment variables, either directly,
either using the server.env and client.env files.

### Server

* DATABASE_URL
* JWT_SECRET

### Client

* API_URL

## I'm developing on Windows 10
Fine,
* Install node-gyp with "yarn global add node-gyp"
* Install cross-env with "yarn add --dev cross-env"
* In your package.json file, prefix every "NODE_ENV=development" occurence with "cross-env "

## Take a tour!

* Build you application using 'yarn build'
* Start LB4 and NextJS altogether in development mode using 'yarn dev'
* Go to http://localhost:3000/api/explorer/
* Expand the '/user/register' endpoint and click on 'Try it out'
* Fill username and password and click on 'Execute'
* Go to http://localhost:3000/
* Go to Signin page
* Fill username and password and click on Signin.
* You are logged, impressive!
* Try to register an user using the register page, it works too.

