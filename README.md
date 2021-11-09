# Hackerbay Node Microservice

A Nodejs microservice with three main features

 **1.** Authentication with JWT
 **2.** JSON patch Object
 **3.** Thumbnail Creation

## This project was built with

 **1.** [NodeJS](https://nodejs.org)
 **2.** [ExpressJS](https://expressjs.com/)
 **3.** [Mocha](https://mochajs.org/)
 **4.** [Docker](https://www.docker.com/get-started)

## Description on how to run this project

You need to have [NodeJS](https://nodejs.org/en/download/) installed on your machine.

## Clone this repository with the below command
```
git clone https://github.com/crud-engr/node-microservice.git
```

## Navigate to the directory with this command
```
cd node-microservice
```

## Installation 
```bash
# Run this command to install all dependencies
$ npm install
```

## Include .env file in the root directory 
```bash
# Set the following
PORT=3000
NODE_ENV='development'
JWT_SECRET='your-jwt-secret-here'
JWT_EXPIRES_IN='90d'
```

## Running the app

```bash
# The app will run on http://localhost:3000 by default
$ npm start
```

## For all API endpoint descriptions 
[Swagger](https://swagger.io/) was used to generate the api documentation.

Navigate to ``` http://localhost:3000/api-docs ``` in your browser to view the documentation.

Use [Postman](https://www.postman.com/downloads/) to test all api endpoints. Swagger can also be used to test the endpoints directly in the browser.

## Unit Testing

```bash
# Run this command to test the app. Mocha was used as the testing library and chai as the assertion library.
$ npm test
```

## Docker Container

```bash
# Run the docker container of the app. It runs on port 4000 (http://localhost:4000)
$ docker run -it -p 4000:3000 node-microservice (locally)
```
You can pull the docker image [here](https://hub.docker.com/r/crudengr/node-microservice)

## Logging Activities

```bash
# All request activities
$ All logs are stored in request-activiries.log in app root.
```