const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const UserRoute = require('./routes/UserRoute');
require('dotenv').config();

// Swagger setup and configuration
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hackerbay NodeJS Microservice API",
        version: "1.0.0",
        description: "Node Microservice api for users"
      },
      contact: {
        name: "Abeeb Ayinla",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./routes/*.js"]
  }

// start express app
const app = express();

// all log activities
const log = fs.createWriteStream(path.join(__dirname, "request-activities.log"),{ flags: "a" });

// swagger speficication
const spec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec));

// allow cross request origin sharing on this api
app.use(cors());

// get value from the request body
app.use(express.json());

// logger
app.use(morgan('dev'));

app.use(morgan("combined", { stream: log }));

// general route handler
app.use('/api/v1/', UserRoute);

// url not found handler
app.all('*', (req, res) => {
    return res.status(404).json({
        status: 'fail',
        message: `The url ${req.originalUrl} not found on the server.`,
        code: 404
    })
})

// set port and listen to incoming requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;