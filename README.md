# Typestack
A Typescript starter based on NextJS and Loopback 4.

## What's inside?
- A mono-repository with NextJS and Loopback 4 preconfigured.
- A codegen script to link front and back based on openAPI.
- Some components in the back-end like authentication, authorization, typeORM and logging facilities.

## Dependencies
- nodeJS
- yarn
- postgreSQL

## Get started
* cp misc/config.env .
* yarn install && yarn build && yarn dev
* Take a coffee and code.

## Configuration
You need to provide the following environment variables, either directly,
either using the config.env file.

### Server

* DATABASE_URL
* JWT_SECRET

### Client

* API_URL
