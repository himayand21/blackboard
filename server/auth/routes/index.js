const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const current = require('./current');
const changePassword = require('./changePassword');
const forgotPassword = require('./forgotPassword');
const verifyOTP = require('./verifyOTP');

function createAuth(model) {
    return [
        current(model),
        login(model),
        logout(model),
        signup(model),
        forgotPassword(model),
        changePassword(model),
        verifyOTP(model)
    ];
}

module.exports = createAuth;