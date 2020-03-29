# FASTIFY + MONGODB - example

This repo contains a simple CRUD based on an API RestFul  builded with Node.js + Fastify 
Database and persistance: MONGODB & Mongoose.

## Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- create a free acount on mongo DB <https://www.mongodb.com/download-center>
- create locally the `.env`  file and set all the environment variables required (check these env variables on the config file)
- `npm run dev` to start the local server

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose.
- `config/` - This folder contains  and exports all the configuration/environment variables.
- `server/` - This folder contains the fastify server instance.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `routes/` - this folder contains all the Rest endpoint verbs definition asociated to specific routes.
- `controllers/`- This folder contains the app logic and the operations neccesary for the application.
- `middlewares/`- This folder contains mdw validators
