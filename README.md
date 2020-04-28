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
* cp config-files/config.yaml .
* yarn install && yarn build && yarn dev
* Take a coffee and code.

