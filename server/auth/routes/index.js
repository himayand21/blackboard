const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const current = require('./current');
const changePassword = require('./changePassword');
const verifyOTP = require('./verifyOTP');
const sendOTP = require('./sendOTP');
const forgotPassword = require('./forgotPassword');
const resendOTP = require('./resendOTP');

function generateProtectedRoutes(model) {
    return [
        current(model),
        logout(model),
        changePassword(model)
    ];
}

function generateUnprotectedRoutes(model) {
    return [
        login(model),
        signup(model),
        sendOTP(model),
        forgotPassword(model),
        verifyOTP(model),
        resendOTP(model)
    ];
}

module.exports = {
    generateProtectedRoutes,
    generateUnprotectedRoutes
};