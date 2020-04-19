# Typestack
A Typescript starter based on NextJS and Loopback.

## API
The API is written in the Loopback 4 Framework: https://loopback.io/doc/en/lb4/.
It provides Dependency Injection, OpenAPI and Express routes.

This starter comes with some ready to use components:

### Logger
The logger component use Winston: https://github.com/winstonjs/winston.

### Authentication/Authorization
Basic Authentication is implemented with JWT and @loopback/authentication.
Authorization is implemented with @loopback/authorization

### TypeORM
The ORM is TypeORM: https://typeorm.io/#/

### CodeGEN
You describe your API using LB4 decorators, then a custom script generate a client in the openAPI folder.

## Client
The client is provided by the NextJS and React Framework. It uses the OpenAPI client to communicate with the API.

## Get started
* Install Node and YARN on your computer
* Go to config-files and copy the config.yaml in your root.
* Set-up you database connection in the config file.
* Do 'yarn install' in the client/server/openapi folders.
* Build the server in the server folder with ./build.sh
* Build the client in the client folder with yarn build.
* Start the API with ./run.sh in the root folder. To see the API visit localhost:8888/explorer.
* Start NextJS with 'yarn start' or 'yarn dev' in the client folder. Visit localhost:3000
* Take a coffee and code.

