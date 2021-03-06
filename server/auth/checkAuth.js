/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

function checkAuth(User) {
    return async function(req, res, next) {
        try {
            const {token} = req.cookies;
            if (!token) {
                res.status(401).send({
                    error: {
                        status: 401,
                        key: 'missing_token',
                        message: 'You need an authorization token to access this information.'
                    }
                });
            } else {
                jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                    if (err) {
                        res.status(401).send({
                            error: {
                                message: 'You are not authorized to access this information.',
                                key: 'token_mismatch',
                                status: 401
                            }
                        });
                    } else {
                        User.findOne({_id: decoded._id, 'tokens.token': token}, 'email _id verified', (err, user) => {
                            if (err || !user) {
                                res.status(401).send({
                                    error: {
                                        message: 'Token might have expired in a previous session.',
                                        key: 'token_expired',
                                        status: 401
                                    }
                                });
                            } else {
                                req.user = {
                                    email: user.email,
                                    id: user._id,
                                    verified: user.verified
                                };
                                next();
                            }
                        });
                    }
                });
            }
        } catch (error) {
            res.status(500).send({
                error: {
                    key: 'server_error',
                    message: 'Some error occured.',
                    status: 500
                }
            });
        }
    };
}

module.exports = checkAuth;