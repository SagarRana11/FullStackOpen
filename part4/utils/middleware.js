const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path :', request.path)
    logger.info('Body:', request.body)
    logger.info('-----')
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// const tokenExtractor = (req, res, next) => {
//     const authorizationHeader = req.get('Authorization');

//     if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
//         req.token = authorization.replace('Bearer ', '');
//     } else {
//         req.token = null;
//     }

//     next();
// };

// const userExtractor = async (req, res, next) => {
//     const token = req.token;

//     if (!token) {
//         req.user = null;
//         return next();
//     }

//     try {
//         const decodedToken = jwt.verify(token, process.env.SECRET); // Replace 'your-secret-key' with your actual secret key
//         const user = await User.findById(decodedToken.id);

//         req.user = user;
//         next();
//     } catch (error) {
//         req.user = null;
//         next(error);
//     }
// };



module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint,

}