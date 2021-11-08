const jwt = require('jsonwebtoken');
require('dotenv').config();

// check jwt
exports.protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in. Please log in.',
            code: 401
        })
    }
    next();
}