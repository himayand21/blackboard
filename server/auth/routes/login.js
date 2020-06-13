const router = require('express').Router();

function login(User) {
    return router.post('/login', async (req, res) => {
        try {
            const {body} = req;
            const bodyKeys = Object.keys(body);

            if (!bodyKeys.includes('email') || !bodyKeys.includes('password')) {
                res.status(400).send({
                    error: {
                        status: 400,
                        message: 'Missing email/password key in request.',
                        key: 'missing_email_password_key'
                    }
                });
            } else {
                const {email, password} = body;
                const user = new User({email, password});

                const validationError = await user.validateUser();
                if (validationError) {
                    res.status(422).send({
                        error: {
                            status: 422,
                            ...validationError
                        }
                    });
                } else {
                    User.findOne({email}, 'email password tokens verified', (err, validUser) => {
                        if (!validUser) {
                            res.status(401).send({
                                error: {
                                    status: 401,
                                    message: 'Login failed! Email is not registered.',
                                    key: 'email_not_registered'
                                }
                            });
                        } else {
                            validUser.comparePassword(password, async (err, isMatch) => {
                                if (!isMatch) {
                                    res.status(401).send({
                                        error: {
                                            status: 401,
                                            message: 'Login failed! Password does not match.',
                                            key: 'password_mismatch'
                                        }
                                    });
                                } else if (validUser.verified) {
                                    const token = await validUser.generateAuthToken();
                                    await validUser.save();
                                    res.cookie('token', token, {
                                        httpOnly: true,
                                        sameSite: true
                                    });
                                    res.status(200).send({
                                        user: {
                                            email: validUser.email,
                                            // eslint-disable-next-line no-underscore-dangle
                                            id: validUser._id,
                                            verified: validUser.verified
                                        }
                                    });
                                } else {
                                    await validUser.save();
                                    res.status(200).send({
                                        user: {
                                            email: validUser.email,
                                            // eslint-disable-next-line no-underscore-dangle
                                            id: validUser._id,
                                            verified: validUser.verified
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
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

module.exports = login;