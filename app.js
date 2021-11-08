const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const UserRoute = require('./routes/UserRoute');
require('dotenv').config();

// start express app
const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

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