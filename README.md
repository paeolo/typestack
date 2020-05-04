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

## Take a tour!
This is a starter pack and as so, it doesn't come with any already coded end-user features. Still, you can take a tour!

* Build you application using 'yarn build'
* Start LB4 and NextJS altogether in development mode using 'yarn dev'
* Go to http://localhost:3000/api/explorer/
* Expand the '/user/register' endpoint and click on 'Try it out'
* Fill username, password, firstName and lastName and click on 'Execute'
* Go to http://localhost:3000/
* Fill username and password and click on Login.
* Your firstName and lastName appears, impressive!

