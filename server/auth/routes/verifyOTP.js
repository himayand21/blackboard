const router = require('express').Router();

function verifyOTP(User) {
    return router.post('/verify-otp', async (req, res) => {
        try {
            const {body} = req;
            const bodyKeys = Object.keys(body);

            if (!bodyKeys.includes('id') || !bodyKeys.includes('otp')) {
                res.status(400).send({
                    error: {
                        status: 400,
                        message: 'Missing id/otp key in request.',
                        key: 'missing_id_password_key'
                    }
                });
            } else {
                const {id, otp} = body;
                User.findById(id, 'email otp', async (err, validUser) => {
                    if (!validUser) {
                        res.status(401).send({
                            error: {
                                status: 401,
                                message: 'User is not registered.',
                                key: 'user_not_registered'
                            }
                        });
                    } else if (validUser.otp !== otp) {
                        res.status(401).send({
                            error: {
                                status: 401,
                                message: 'OTP does not match.',
                                key: 'otp_mismatch'
                            }
                        });
                    } else {
                        validUser.tokens = [];
                        validUser.otp = null;
                        validUser.verified = true;
                        const token = await validUser.generateAuthToken();
                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: true
                        });
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

module.exports = verifyOTP;