const nodemailer = require('nodemailer');
const router = require('express').Router();

function forgotPassword(User) {
    return router.post('/forgot-password', (req, res) => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        try {
            const {body} = req;
            const bodyKeys = Object.keys(body);
            if (!bodyKeys.includes('email')) {
                res.status(400).send({
                    error: {
                        status: 400,
                        message: 'Missing email ID in request.',
                        key: 'missing_email_key'
                    }
                });
            } else {
                const {email} = body;
                User.findOne({email}, 'email', (err, user) => {
                    if (!user) {
                        res.status(401).send({
                            error: {
                                status: 401,
                                message: 'Login failed! Email is not registered.',
                                key: 'email_not_registered'
                            }
                        });
                    } else {
                        User.findOneAndUpdate({email}, {otp}, async (err) => {
                            if (err) {
                                res.status(500).send({
                                    error: {
                                        key: 'server_error',
                                        message: 'Some error occured.',
                                        status: 500
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
                                    to: email,
                                    subject: 'Forgot your Password?',
                                    text: 'Forgot your Password?',
                                    html: `<div>
                                    <h3>Well, it happens to the best of us.</h3>
                                    <p>Enter this OTP and proceed to change your password.</p>
                                    <h2>${otp}</h2>
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
                                            ok: true
                                        });
                                    }
                                });
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

module.exports = forgotPassword;