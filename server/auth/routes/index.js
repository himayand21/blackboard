const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const current = require('./current');
const changePassword = require('./changePassword');

function createAuth(model) {
    return [
        current(model),
        login(model),
        logout(model),
        signup(model),
        changePassword(model)
    ];
}

module.exports = createAuth;