const nodemailer = require('nodemailer');
const router = require('express').Router();

function signup(User) {
    return router.post('/signup', async (req, res) => {
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
                    User.findOne({email}, 'email', async (err, existingUser) => {
                        if (existingUser) {
                            res.status(409).send({
                                error: {
                                    status: 409,
                                    message: 'Email is already in use.',
                                    key: 'email_in_use'
                                }
                            });
                        } else {
                            // const token = await user.generateAuthToken();
                            user.verified = false;
                            await user.save();
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.BLACKBOARD_EMAIL,
                                    pass: process.env.BLACKBOARD_PASS
                                }
                            });
                            transporter.sendMail({
                                from: `"Blackboard Solutions" <${process.env.BLACKBOARD_EMAIL}>`,
                                to: email,
                                subject: 'Welcome to Blackboard !',
                                text: 'Welcome to Blackboard',
                                html: `<div>
                                <h3>Welcome Aboard.</h3>
                                <p>Feel free to contact us right <a href="mailto:${process.env.BLACKBOARD_EMAIL}">here</a>, if you face any further issues.</p>
                                <p>See you around.</p>
                                <p><b>Team Blackboard</b></p>
                                </div>`,
                            }, (err) => {
                                if (err) {
                                    res.status(400).send({
                                        key: 'email_invalid',
                                        message: 'Failed to send OTP to email address.',
                                        status: 400
                                    });
                                } else {
                                    res.status(200).send({
                                        user: {
                                            email: user.email,
                                            // eslint-disable-next-line no-underscore-dangle
                                            id: user._id,
                                            verified: user.verified
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

module.exports = signup;