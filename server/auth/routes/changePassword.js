const router = require('express').Router();
const auth = require('../checkAuth');

function changePassword(model) {
    return router.post('/change-password', auth(model), async (req, res) => {
        try {
            const {
                body,
                user
            } = req;

            const bodyKeys = Object.keys(body);

            if (!bodyKeys.includes('password')) {
                res.status(400).send({
                    error: {
                        status: 400,
                        message: 'Missing password key in request.',
                        key: 'missing_password_key'
                    }
                });
            } else {
                const {password} = body;
                model.findById(user.id, 'password email', async (err, loggedInUser) => {
                    loggedInUser.comparePassword(password, async (err, isMatch) => {
                        if (isMatch) {
                            res.status(400).send({
                                error: {
                                    status: 400,
                                    message: 'You need to provide a different password.',
                                    key: 'same_current_password'
                                }
                            });
                        } else {
                            loggedInUser.password = password;
                            const validationError = await loggedInUser.validateUser();
                            if (validationError) {
                                res.status(422).send({
                                    error: {
                                        status: 422,
                                        ...validationError
                                    }
                                });
                            } else {
                                await loggedInUser.save();
                                res.status(200).send({
                                    user: {
                                        email: loggedInUser.email
                                    }
                                });
                            }
                        }
                    });
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
    });
}

module.exports = changePassword;