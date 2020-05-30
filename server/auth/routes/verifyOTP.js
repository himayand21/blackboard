const router = require('express').Router();

function login(User) {
    return router.post('/verify-otp', async (req, res) => {
        try {
            const {body} = req;
            const bodyKeys = Object.keys(body);

            if (!bodyKeys.includes('email') || !bodyKeys.includes('otp')) {
                res.status(400).send({
                    error: {
                        status: 400,
                        message: 'Missing email/otp key in request.',
                        key: 'missing_email_password_key'
                    }
                });
            } else {
                const {email, otp} = body;
                User.findOne({email}, 'email otp tokens', async (err, validUser) => {
                    if (!validUser) {
                        res.status(401).send({
                            error: {
                                status: 401,
                                message: 'Login failed! Email is not registered.',
                                key: 'email_not_registered'
                            }
                        });
                    } else if (validUser.otp !== otp) {
                        res.status(401).send({
                            error: {
                                status: 401,
                                message: 'Login failed! OTP does not match.',
                                key: 'otp_mismatch'
                            }
                        });
                    } else {
                        validUser.tokens = [];
                        validUser.otp = null;
                        const token = await validUser.generateAuthToken();
                        await validUser.save();
                        res.status(200).send({
                            user: {
                                email: validUser.email,
                                // eslint-disable-next-line no-underscore-dangle
                                id: validUser._id,
                            },
                            token
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
    });
}

module.exports = login;