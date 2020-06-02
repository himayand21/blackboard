const nodemailer = require('nodemailer');
const router = require('express').Router();

function forgotPassword(User) {
    return router.post('/resend-otp', (req, res) => {
        try {
            const {body} = req;
            const bodyKeys = Object.keys(body);
            if (!bodyKeys.includes('email') && !bodyKeys.includes('id')) {
                res.status(400).send({
                    error: {
                        status: 400,
                        message: 'Missing identifier in request.',
                        key: 'missing_identifier_key'
                    }
                });
            } else {
                const {email, id} = body;
                if (email) {
                    User.findOne({email}, 'email otp', (err, user) => {
                        if (!user) {
                            res.status(401).send({
                                error: {
                                    status: 401,
                                    message: 'Email is not registered.',
                                    key: 'email_not_registered'
                                }
                            });
                        } else {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.BLACKBOARD_EMAIL,
                                    pass: process.env.BLACKBOARD_PASS
                                }
                            });
                            transporter.sendMail({
                                from: `"Blackboard Solutions" <${process.env.BLACKBOARD_EMAIL}>`,
                                to: user.email,
                                subject: '[Resent] Verify your Email Address.',
                                text: '[Resent] Verify your Email Address.',
                                html: `<div>
                                <h3>Well, I guess it got lost in the mail.</h3>
                                <p>Enter this OTP and verify your registered email address.</p>
                                <h2>${user.otp}</h2>
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
                } else {
                    User.findById(id, 'email otp', (err, user) => {
                        if (!user) {
                            res.status(401).send({
                                error: {
                                    status: 401,
                                    message: 'Email is not registered.',
                                    key: 'email_not_registered'
                                }
                            });
                        } else {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.BLACKBOARD_EMAIL,
                                    pass: process.env.BLACKBOARD_PASS
                                }
                            });
                            transporter.sendMail({
                                from: `"Blackboard Solutions" <${process.env.BLACKBOARD_EMAIL}>`,
                                to: user.email,
                                subject: '[Resent] Verify your Email Address.',
                                text: '[Resent] Verify your Email Address.',
                                html: `<div>
                                <h3>Well, I guess it got lost in the mail.</h3>
                                <p>Enter this OTP and verify your registered email address.</p>
                                <h2>${user.otp}</h2>
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

module.exports = forgotPassword;