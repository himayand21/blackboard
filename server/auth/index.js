const checkAuth = require('./checkAuth');
const createSchema = require('./createSchema');
const {generateProtectedRoutes, generateUnprotectedRoutes} = require('./routes');

module.exports = {
    checkAuth,
    createSchema,
    generateProtectedRoutes,
    generateUnprotectedRoutes
};